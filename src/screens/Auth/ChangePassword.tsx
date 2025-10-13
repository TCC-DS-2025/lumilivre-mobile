import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../navigation/AppNavigator';
import {
  validarTokenReset,
  mudarSenhaComToken,
} from '../../services/authService';

type ChangePasswordRouteProp = RouteProp<AuthStackParamList, 'ChangePassword'>;
type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function ChangePasswordScreen() {
  const route = useRoute<ChangePasswordRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  // state para controle da UI e dados
  const [token, setToken] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromParams = route.params?.token;
    if (!tokenFromParams) {
      setError('Token de redefinição não fornecido.');
      setIsLoading(false);
      return;
    }
    setToken(tokenFromParams);

    const verificarToken = async () => {
      try {
        const isValid = await validarTokenReset(tokenFromParams);
        if (isValid) {
          setIsTokenValid(true);
        } else {
          setError(
            'Token inválido ou expirado. Por favor, solicite um novo link.',
          );
        }
      } catch {
        setError('Ocorreu um erro ao validar o token. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    verificarToken();
  }, [route.params?.token]);

  const handleSubmit = async () => {
    setError(null);
    if (novaSenha.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!token) {
      setError('Token inválido.');
      return;
    }

    setIsLoading(true);
    try {
      await mudarSenhaComToken(token, novaSenha);
      setSuccessMessage(
        'Senha alterada com sucesso! Redirecionando para o login...',
      );
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.mensagem || 'Não foi possível alterar a senha.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading && !successMessage) {
      return <ActivityIndicator size="large" color="#762075" />;
    }

    if (error) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.linkText}>Solicitar novo link</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (successMessage) {
      return <Text style={styles.successText}>{successMessage}</Text>;
    }

    if (isTokenValid) {
      return (
        <>
          <View style={styles.formContainer}>
            <View>
              <Text style={styles.label}>Nova Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
              />
            </View>
            <View>
              <Text style={styles.label}>Confirmar Nova Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Salvando...' : 'SALVAR NOVA SENHA'}
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Redefinir Senha</Text>
        <View style={styles.content}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 40,
  },
  content: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
    gap: 20,
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
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  button: {
    marginTop: 32,
    width: '100%',
    backgroundColor: '#762075',
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 5,
  },
  buttonDisabled: { backgroundColor: '#9CA3AF' },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
  successText: {
    color: '#16A34A',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#762075',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
