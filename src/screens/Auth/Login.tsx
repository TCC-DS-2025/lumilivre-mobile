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
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../contexts/AuthContext';
import { login as apiLogin } from '../../services/authService';
import ThemeToggle from '../../components/ThemeToggle';

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
  const [keepConnected, setKeepConnected] = useState(true);

  const [biometryType, setBiometryType] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // login com biometria ou reconhecimento facial
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (compatible) {
        const types =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (
          types.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
          )
        ) {
          setBiometryType('Rosto');
        } else if (
          types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
        ) {
          setBiometryType('Digital');
        }
      }
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
      cancelLabel: 'Cancelar',
      disableDeviceFallback: true,
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

          <View style={styles.extraOptionsContainer}>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: '#767577', true: '#C964C5' }}
                thumbColor={keepConnected ? '#762075' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setKeepConnected}
                value={keepConnected}
              />
              <Text style={styles.switchLabel}>Continuar Conectado</Text>
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

          {biometryType && (
            <Pressable
              style={styles.biometricButton}
              onPress={handleBiometricAuth}
            >
              <Image
                source={require('../../assets/images/icons/biometric.png')}
                style={styles.biometricImage}
                resizeMode="contain"
              />
              <Text style={styles.biometricText}>
                Entrar com {biometryType}
              </Text>
            </Pressable>
          )}

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guestButton}
            onPress={() =>
              Alert.alert('Navegação', 'Indo para a tela de convidado...')
            }
          >
            <Text style={styles.guestButtonText}>Entrar como Convidado</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>
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
  },
  formContainer: {
    width: '100%',
    gap: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  biometricText: {
    color: '#762075',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  biometricImage: {
    width: 24,
    height: 24,
  },
  guestButton: {
    marginTop: 24,
    borderWidth: 2,
    borderColor: '#762075',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  guestButtonText: {
    color: '#762075',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  extraOptionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
  themeToggleContainer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
  },
});
