// src/screens/Organization/CreateOrganization/index.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/authContext/authContext';
import organizationApiService from '../../../service/organizationService/organizationApiService';
import notificationService from '../../../service/notificationService';
import AppHeader from '../../../reusableComponents/header';
import styles from './style';

const CreateOrganizationScreen = () => {
    const navigation = useNavigation();
    const { user, loadUserOrganization } = useAuth();

    // État de chargement global pour le processus de création
    const [isCreating, setIsCreating] = useState(false);
    // État de chargement pour les options du formulaire (domaines, formes légales)
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);

    const [formOptions, setFormOptions] = useState({ domains: [], legalForms: [] });
    
    // États pour le formulaire
    const [actorData, setActorData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        profession: '',
        biography: '',
        nationality: '',
        gender: null,
        birth_date: null,
    });

    const [orgData, setOrgData] = useState({
        long_name: '',
        short_name: '',
        description: '',
        web_site_url: '',
        social_network: '',
        business_registration_number: '',
        tax_number: '',
        ceo_name: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
    });

    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedLegalForm, setSelectedLegalForm] = useState(null);

    // Charger les options (domaines et formes légales) une seule fois au montage
    useEffect(() => {
        const fetchFormOptions = async () => {
          setIsLoadingOptions(true);
          try {
            const [domains, legalForms] = await Promise.all([
              organizationApiService.getBusinessDomains(),
              organizationApiService.getLegalForms()
            ]);
            
            if (Array.isArray(domains) && Array.isArray(legalForms)) {
                setFormOptions({ domains, legalForms });
                if (domains.length > 0) {
                  setSelectedDomain(domains[0].id);
                }
                if (legalForms.length > 0) {
                  setSelectedLegalForm(legalForms[0].id);
                }
            } else {
                setFormOptions({ domains: [], legalForms: [] });
                notificationService.showError("Could not load creation options correctly.");
            }
          } catch (error) {
            notificationService.showError("Failed to load required data. Organization API is not available. Please try again later.");
            navigation.goBack();
          } finally {
            setIsLoadingOptions(false);
          }
        };
        fetchFormOptions();
    }, [navigation]); // `navigation` est une dépendance stable

    const handleActorDataChange = useCallback((field, value) => {
        setActorData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleOrgDataChange = useCallback((field, value) => {
        setOrgData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleCreate = async () => {
        // Validation des champs requis
        if (!orgData.long_name.trim() || !orgData.short_name.trim() || !orgData.description.trim() || !selectedDomain || !selectedLegalForm) {
            notificationService.showError("Please fill in all required fields in the 'Organization / Shop' section.");
            return;
        }
        
        setIsCreating(true);
        try {
            // 1. Préparer et créer le Business Actor
            const actorPayload = {
                ...actorData,
                type: 'PROVIDER',
                is_individual: true,
                birth_date: actorData.birth_date ? new Date(actorData.birth_date).toISOString() : null,
            };
            Object.keys(actorPayload).forEach(key => (actorPayload[key] === '' || actorPayload[key] === null) && delete actorPayload[key]);
            
            const createdActor = await organizationApiService.createBusinessActor(actorPayload);
            if (!createdActor || !createdActor.business_actor_id) {
                throw new Error("Business profile creation failed: No valid ID was returned.");
            }

            // 2. Préparer et créer l'Organisation
            const orgPayload = {
                ...orgData,
                long_name: orgData.long_name.trim(),
                short_name: orgData.short_name.trim(),
                description: orgData.description.trim(),
                business_domains: [selectedDomain],
                legal_form: selectedLegalForm,
                email: actorData.email,
            };
            Object.keys(orgPayload).forEach(key => (orgPayload[key] === '' || orgPayload[key] === null) && delete orgPayload[key]);

            const createdOrg = await organizationApiService.createOrganization(orgPayload);
            if (createdOrg?.ok === false) {
                const errorDetails = Object.values(createdOrg.errors || {}).join(', ');
                throw new Error(errorDetails || createdOrg.message || "Organization creation failed due to a server validation error.");
            }
            // L'ID de l'organisation se trouve dans createdOrg.id d'après la doc
            if (!createdOrg || !createdOrg.business_actor_id) {
                throw new Error("Organization creation failed: No valid ID was returned.");
            }
            
            // 3. Lier l'utilisateur à l'organisation comme employé
            await organizationApiService.addEmployeeToOrganization(createdOrg.id, {
                businessActorId: createdActor.business_actor_id,
                userId: user.id,
                role: 'ADMIN',
            });
            
            // 4. Succès et finalisation
            notificationService.showSuccess("Congratulations! You are now a producer.");
            await loadUserOrganization();
            navigation.replace('PC');

        } catch (error) {
            console.error("Full organization creation process failed:", error);
            // La plupart des erreurs spécifiques sont déjà notifiées par le service API.
            // On peut afficher un message d'erreur plus général ici si le `catch` est atteint.
            notificationService.showError(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };
    
    // Afficher un loader pendant que les options du formulaire sont chargées
    if (isLoadingOptions) {
        return (
            <SafeAreaView style={styles.container}>
                <AppHeader title="Become a Producer" onGoBack={() => navigation.goBack()} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#8B4513" />
                    <Text style={{ marginTop: 10, color: '#555' }}>Loading options...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader title="Become a Producer" onGoBack={() => navigation.goBack()} />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.headerTextContainer}>
                    <Text style={styles.title}>Unlock Your Producer Space</Text>
                    <Text style={styles.subtitle}>Complete your profile to start listing products and services.</Text>
                </View>

                {/* --- Section Organisation (Requis) --- */}
                <Text style={styles.sectionTitle}>Organization / Shop (Required)</Text>
                <TextInput style={styles.input} value={orgData.long_name} onChangeText={v => handleOrgDataChange('long_name', v)} placeholder="Full Organization or Shop Name" />
                <TextInput style={styles.input} value={orgData.short_name} onChangeText={v => handleOrgDataChange('short_name', v)} placeholder="Short Name or Acronym" />
                <TextInput style={[styles.input, styles.textArea]} value={orgData.description} onChangeText={v => handleOrgDataChange('description', v)} placeholder="Describe what you sell or offer..." multiline />
                
                <Text style={styles.label}>Business Domain</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedDomain}
                        enabled={!isCreating}
                        onValueChange={(itemValue) => setSelectedDomain(itemValue)}
                        style={styles.picker}
                    >
                        {formOptions.domains.map(domain => (
                            <Picker.Item key={domain.id} label={domain.name} value={domain.id} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Legal Form</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedLegalForm}
                        enabled={!isCreating}
                        onValueChange={(itemValue) => setSelectedLegalForm(itemValue)}
                        style={styles.picker}
                    >
                        {formOptions.legalForms.map(form => (
                            <Picker.Item key={form.id} label={form.name} value={form.id} />
                        ))}
                    </Picker>
                </View>

                {/* --- Section Profil Professionnel (Pré-rempli & Optionnel) --- */}
                <Text style={styles.sectionTitle}>Your Professional Profile</Text>
                <TextInput style={styles.input} value={actorData.first_name} onChangeText={v => handleActorDataChange('first_name', v)} placeholder="First Name" />
                <TextInput style={styles.input} value={actorData.last_name} onChangeText={v => handleActorDataChange('last_name', v)} placeholder="Last Name" />
                <TextInput style={styles.input} value={actorData.email} onChangeText={v => handleActorDataChange('email', v)} placeholder="Contact Email" keyboardType="email-address" autoCapitalize="none" />
                <TextInput style={styles.input} value={actorData.phone_number} onChangeText={v => handleActorDataChange('phone_number', v)} placeholder="Contact Phone (Optional)" keyboardType="phone-pad" />
                <TextInput style={styles.input} value={actorData.profession} onChangeText={v => handleActorDataChange('profession', v)} placeholder="Profession (Optional)" />
                <TextInput style={[styles.input, styles.textArea]} value={actorData.biography} onChangeText={v => handleActorDataChange('biography', v)} placeholder="A short bio... (Optional)" multiline />
                <Text style={styles.label}>Gender (Optional)</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={actorData.gender} onValueChange={v => handleActorDataChange('gender', v)} style={styles.picker}>
                        <Picker.Item label="Select Gender..." value={null} />
                        <Picker.Item label="Male" value="MALE" />
                        <Picker.Item label="Female" value="FEMALE" />
                    </Picker>
                </View>
                
                {/* --- Section Informations Entreprise (Optionnel) --- */}
                <Text style={styles.sectionTitle}>Business Information (Optional)</Text>
                <TextInput style={styles.input} value={orgData.ceo_name} onChangeText={v => handleOrgDataChange('ceo_name', v)} placeholder="CEO Name" />
                <TextInput style={styles.input} value={orgData.web_site_url} onChangeText={v => handleOrgDataChange('web_site_url', v)} placeholder="Website URL (e.g., https://myshop.com)" keyboardType="url" />
                <TextInput style={styles.input} value={orgData.social_network} onChangeText={v => handleOrgDataChange('social_network', v)} placeholder="Social Network Link (e.g., Instagram page)" />
                <TextInput style={styles.input} value={orgData.business_registration_number} onChangeText={v => handleOrgDataChange('business_registration_number', v)} placeholder="Business Registration Number" />
                <TextInput style={styles.input} value={orgData.tax_number} onChangeText={v => handleOrgDataChange('tax_number', v)} placeholder="Tax Number" />
                
                <TouchableOpacity style={[styles.createButton, isCreating && styles.disabledButton]} onPress={handleCreate} disabled={isCreating}>
                    {isCreating ? <ActivityIndicator color="#FFF" /> : <Text style={styles.createButtonText}>Create and Start Selling</Text>}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateOrganizationScreen;