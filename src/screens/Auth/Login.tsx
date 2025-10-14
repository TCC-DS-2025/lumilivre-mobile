import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';

import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../contexts/AuthContext';
import { login as apiLogin } from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigation = useNavigation<LoginNavigationProp>();

  const [isBiometrySupported, setIsBiometrySupported] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometrySupported(compatible);
    })();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBiometricAuth = async () => {
    const savedCredentials = await getSavedCredentials();
    if (!savedCredentials) {
      Alert.alert(
        'Atenção',
        'Faça login com sua senha uma vez antes de usar a biometria.',
      );
      return;
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login no LumiLivre',
    });

    if (biometricAuth.success) {
      setUsuario(savedCredentials.user);
      setSenha(savedCredentials.password);
      Alert.alert('Sucesso', 'Biometria reconhecida! Fazendo login...');
      await handleLogin(savedCredentials.user, savedCredentials.password);
    }
  };

  const handleLogin = async (userParam?: string, passwordParam?: string) => {
    const userToLogin = userParam || usuario;
    const passwordToLogin = passwordParam || senha;

    if (!userToLogin || !passwordToLogin) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    setIsLoading(true);
    try {
      const responseData = await apiLogin({
        user: userToLogin,
        senha: passwordToLogin,
      });
      await login(responseData);
      await saveCredentials(userToLogin, passwordToLogin);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        'Usuário ou senha inválidos.';
      Alert.alert('Erro no Login', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // salva e pega credenciais (sem criptografia por enquanto)
  const saveCredentials = async (user: string, pass: string) => {
    await AsyncStorage.setItem(
      '@LumiLivre:credentials',
      JSON.stringify({ user, pass }),
    );
  };

  const getSavedCredentials = async () => {
    const creds = await AsyncStorage.getItem('@LumiLivre:credentials');
    return creds ? JSON.parse(creds) : null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/icons/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>LumiLivre</Text>
          </View>

          <View style={styles.formContainer}>
            <View>
              <Text style={styles.label}>Matrícula ou Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu usuário"
                placeholderTextColor="#9CA3AF"
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#9CA3AF"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin} // onPressIn?
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Entrando...' : 'ENTRAR'}
            </Text>
          </TouchableOpacity>

          {isBiometrySupported && (
            <Pressable
              style={styles.biometricButton}
              onPress={handleBiometricAuth}
            >
              <Image
                source={require('../../assets/images/icons/biometric.png')}
                style={styles.biometicImage}
                resizeMode="contain"
              />
              <Text style={styles.biometricText}>Entrar com digital</Text>
            </Pressable>
          )}

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#C964C5',
    marginBottom: 4,
    marginLeft: 12,
  },
  input: {
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  button: {
    marginTop: 24,
    width: '100%',
    backgroundColor: '#762075',
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotPasswordContainer: {
    marginTop: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
  biometricButton: {
    marginTop: 20,
    padding: 10,
  },
  biometricText: {
    color: '#762075',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  biometicImage: {
    width: 15,
    height: 15,
  },
});
