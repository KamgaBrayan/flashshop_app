// src/screens/Authentication/VerifyCode/index.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT

import notificationService from '../../../service/notificationService';
import styles from './style';

const OTP_STORAGE_KEY_PREFIX = 'otp_data_';
const OTP_EXPIRATION_MINUTES = 5;
const RESEND_COOLDOWN_SECONDS = 60;

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const VerifyCode = () => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const navigation = useNavigation();
  const route = useRoute();
  
  const { 
    identifier,
    operationType,
    email: emailFromParamsForAccountVerification, 
    phoneNumber: phoneFromParamsForAccountVerification,
    yowyobUserId 
  } = route.params || {};

  const displayIdentifierForSubtitle = operationType === 'accountVerification' 
    ? (emailFromParamsForAccountVerification || phoneFromParamsForAccountVerification) 
    : identifier;

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      setCanResend(false);
      timer = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const getStorageKeyForOperation = useCallback(() => {
    if (!identifier) {
        console.error("VerifyCode: Identifier is missing for getStorageKeyForOperation.");
        return null; 
    }
    const suffix = operationType === 'passwordReset' ? '_reset' : '';
    return `${OTP_STORAGE_KEY_PREFIX}${identifier}${suffix}`;
  }, [identifier, operationType]);
  
  const storeOtpData = useCallback(async (otp) => {
    const storageKey = getStorageKeyForOperation();
    if (!storageKey) {
        notificationService.showError("Cannot store OTP: User identifier missing.");
        return;
    }
    try {
      const data = {
        otp,
        identifier, 
        email: operationType === 'accountVerification' ? emailFromParamsForAccountVerification : (identifier.includes('@') ? identifier : null),
        phoneNumber: operationType === 'accountVerification' ? phoneFromParamsForAccountVerification : null,
        yowyobUserId: operationType === 'accountVerification' ? yowyobUserId : null,
        operationType,
        expiresAt: Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000,
      };
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      console.log(`VerifyCode: OTP data stored for key ${storageKey} (Op: ${operationType}):`, otp);
    } catch (e) {
      console.error("VerifyCode: Failed to store OTP data.", e);
      notificationService.showError("System error: Could not save OTP data.");
    }
  }, [getStorageKeyForOperation, identifier, operationType, emailFromParamsForAccountVerification, phoneFromParamsForAccountVerification, yowyobUserId]);

  const getStoredOtpData = useCallback(async () => {
    const storageKey = getStorageKeyForOperation();
    if (!storageKey) return null;
    try {
      const dataString = await AsyncStorage.getItem(storageKey);
      if (dataString) {
        const data = JSON.parse(dataString);
        return data;
      }
      return null;
    } catch (e) {
      console.error("VerifyCode: Failed to retrieve OTP data.", e);
      return null;
    }
  }, [getStorageKeyForOperation]);

  const clearStoredOtpData = useCallback(async () => {
    const storageKey = getStorageKeyForOperation();
    if (!storageKey) return;
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (e) {
      console.error("VerifyCode: Failed to clear OTP data.", e);
    }
  }, [getStorageKeyForOperation]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);

    if (text.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (!identifier) {
        notificationService.showError(t('verifyCode.notification_identifierMissing'));
        return;
    }
    setIsLoading(true);
    const enteredCode = code.join('');
    if (enteredCode.length !== 6) {
      notificationService.showError(t('verifyCode.notification_enterCode'));
      setIsLoading(false);
      return;
    }

    const storedData = await getStoredOtpData();

    if (!storedData) {
      notificationService.showError(t('verifyCode.notification_otpNotFound'));
      setIsLoading(false);
      return;
    }

    if (Date.now() > storedData.expiresAt) {
      notificationService.showError(t('verifyCode.notification_otpExpired'));
      await clearStoredOtpData();
      setIsLoading(false);
      return;
    }

    if (storedData.otp === enteredCode) {
      await clearStoredOtpData();
      
      if (storedData.operationType === 'accountVerification') {
        notificationService.showSuccess(t('verifyCode.notification_accountVerified'));
        navigation.replace('SignIn', { email: storedData.email });
      } else if (storedData.operationType === 'passwordReset') {
        notificationService.showSuccess(t('verifyCode.notification_identityVerified'));
        navigation.replace('NewPass', { identifier: storedData.identifier }); 
      } else {
        notificationService.showError(t('verifyCode.notification_unknownError'));
        navigation.replace('SignIn');
      }
    } else {
      notificationService.showError(t('verifyCode.notification_otpInvalid'));
    }
    setIsLoading(false);
  };

  const handleResendCode = async () => {
    if (!canResend || !identifier) {
        if (!identifier) notificationService.showError(t('verifyCode.notification_resendIdentifierMissing'));
        return;
    }
    setIsLoading(true);
    const newOtp = generateOTP();
    await storeOtpData(newOtp);

    console.log(`SIMULATED OTP RESEND to ${displayIdentifierForSubtitle} for ${operationType}: ${newOtp}`);
    notificationService.showInfo(t('verifyCode.notification_otpResent', { otp: newOtp }));
    
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setIsLoading(false);
  };

  const handleGoBack = () => {
    if (operationType === 'passwordReset') {
      navigation.replace('SignIn');
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('CreateA');
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>
          {operationType === 'passwordReset' ? t('verifyCode.titleIdentity') : t('verifyCode.titleAccount')}
        </Text>
        <Text style={styles.subtitle}>
          {t('verifyCode.subtitle', { identifier: '' })}
          {displayIdentifierForSubtitle && <Text style={styles.email}>{displayIdentifierForSubtitle}</Text>}
        </Text>
      </View>      
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => inputRefs.current[index] = el}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            placeholder='-'
            editable={!isLoading}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleResendCode} disabled={!canResend || isLoading}>
        <Text style={[styles.resendText, (!canResend || isLoading) && styles.disabledText]}>
          {t('verifyCode.didntReceiveOTP')} {'\n'}
          {canResend ? (
            <Text style={styles.resendLink}>{t('verifyCode.resendCode')}</Text>
          ) : (
            <Text style={styles.cooldownText}>
              {t('verifyCode.resendIn', { seconds: resendCooldown })}
            </Text>
          )}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.verifyButton, isLoading && styles.disabledButton]} 
        onPress={handleVerify}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.verifyButtonText}>{t('verifyCode.verifyButton')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VerifyCode;