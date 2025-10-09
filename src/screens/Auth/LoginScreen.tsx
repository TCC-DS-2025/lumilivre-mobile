import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { login as apiLogin } from '../../services/authService';

import Logo from '../../assets/images/icons/logo.svg';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!usuario || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    console.log('Login com:', { usuario, senha });
  };

  const handleLogin = async () => { 
    if (!usuario || !senha) {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
        return;
    }
    
    setIsLoading(true);
    try {
        const responseData = await apiLogin({ user: usuario, senha: senha });
        
        // por enquanto
        Alert.alert('Login bem-sucedido!', `Token: ${responseData.token.substring(0, 30)}...`);
        
        // TODO: Implementar AuthContext para salvar o usuário e navegar para a Home.
        
    } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.response?.data || 'Usuário ou senha inválidos.';
        Alert.alert('Erro no Login', errorMessage);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-dark-background p-4">
      <View className="w-full max-w-sm">
        <View className="items-center mb-5">
          <Logo width={150} height={150} />
          <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
            LumiLivre
          </Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-lumi-label mb-1 ml-3">
              Matrícula ou Email
            </Text>
            <TextInput
              className="w-full p-4 bg-white dark:bg-dark-card rounded-md text-gray-800 dark:text-gray-100 text-base"
              placeholder="Digite seu usuário"
              placeholderTextColor="#9CA3AF"
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-lumi-label mb-1 ml-3">
              Senha
            </Text>
            <TextInput
              className="w-full p-4 bg-white dark:bg-dark-card rounded-md text-gray-800 dark:text-gray-100 text-base"
              placeholder="Digite sua senha"
              placeholderTextColor="#9CA3AF"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          className="mt-6 w-full bg-lumi-primary py-4 rounded-md shadow-md"
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-bold text-lg">
            {isLoading ? 'Entrando...' : 'ENTRAR'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4">
          <Text className="text-center text-gray-500 dark:text-gray-400 underline">
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}