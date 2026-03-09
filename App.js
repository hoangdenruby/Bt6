import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const SignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const validatePhoneNumber = (phone) => {
    const cleaned = phone.replace(/\s/g, ''); 
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(cleaned);
  };

  const handleTextChange = (text) => {
    const cleaned = text.replace(/\D/g, '');

    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6 && cleaned.length <= 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length > 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }

    setPhoneNumber(formatted);

    if (cleaned.length > 0 && cleaned.length < 10) {
      setErrorMessage('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
    } else if (cleaned.length === 10 && !validatePhoneNumber(formatted)) {
      setErrorMessage('Số điện thoại không hợp lệ.');
    } else {
      setErrorMessage('');
    }
  };
  
  const handleContinue = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        'Lỗi',
        'Số điện thoại không đúng định dạng. Vui lòng nhập lại',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Thành công', 'Chuyển sang bước tiếp theo!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đăng nhập</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Nhập số điện thoại</Text>
        <Text style={styles.subtitle}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản OneHousing Pro
        </Text>

        <TextInput
          style={[
            styles.textInput,
            errorMessage ? styles.textInputError : null,
          ]}
          value={phoneNumber}
          onChangeText={handleTextChange}
          keyboardType="numeric"
          placeholder="Số điện thoại của bạn"
          maxLength={13} // 10 số + 3 khoảng trắng
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 8,
  },
  textInputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
