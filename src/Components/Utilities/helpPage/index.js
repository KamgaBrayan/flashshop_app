import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';
import AppHeader from '../../../reusableComponents/header';

const HelpCenter = () => {

  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('FAQ');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [expandedContact, setExpandedContact] = useState(null);

  const faqData = [
    {
      question: "Can I track my order's delivery status?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Is there a return policy?",
      answer: "Our return policy allows returns within 30 days of purchase..."
    },
    {
      question: "Can I save my favorite items for later?",
      answer: "Yes, you can save items to your wishlist by clicking the heart icon..."
    },
    {
      question: "Can I share products with my friends?",
      answer: "Yes, each product has a share button that allows you to share via various platforms..."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support through various channels listed in the Contact Us section..."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit cards, PayPal, and other major payment methods..."
    },
    {
      question: "How to add review?",
      answer: "You can add a review on any product page after purchasing the item..."
    }
  ];

  const contactData = [
    {
      title: "Customer Service",
      icon: "headphones",
      content: "24/7 Support Available"
    },
    {
      title: "WhatsApp",
      icon: "whatsapp",
      content: "(480) 555-0103"
    },
    {
      title: "Website",
      icon: "web",
      content: "www.example.com"
    },
    {
      title: "Facebook",
      icon: "facebook",
      content: "@company"
    },
    {
      title: "Twitter",
      icon: "twitter",
      content: "@company"
    },
    {
      title: "Instagram",
      icon: "instagram",
      content: "@company"
    }
  ];

  const handleContactPress = (type, content) => {
    switch(type) {
      case 'WhatsApp':
        Linking.openURL(`whatsapp://send?phone=${content}`);
        break;
      case 'Website':
        Linking.openURL(`https://${content}`);
        break;
      // Add other social media handlers as needed
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'FAQ') {
      return (
        <ScrollView style={styles.contentContainer}>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>General</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Account</Text>
            </TouchableOpacity>
          </View>
          {faqData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqItem}
              onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Icon
                  name={expandedFaq === index ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#666"
                />
              </View>
              {expandedFaq === index && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.contentContainer}>
          {contactData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactItem}
              onPress={() => handleContactPress(item.title, item.content)}
            >
              <Icon name={item.icon} size={24} color="#666" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{item.title}</Text>
                <Text style={styles.contactContent}>{item.content}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
  };

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Help Center" onPress={handleGoBack} />
      
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'FAQ' && styles.activeTab]}
          onPress={() => setActiveTab('FAQ')}
        >
          <Text style={[styles.tabText, activeTab === 'FAQ' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Contact' && styles.activeTab]}
          onPress={() => setActiveTab('Contact')}
        >
          <Text style={[styles.tabText, activeTab === 'Contact' && styles.activeTabText]}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>
      
      {renderTabContent()}
    </View>
  );
};

export default HelpCenter;