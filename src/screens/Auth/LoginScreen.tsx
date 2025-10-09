import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

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

  return (
    <StyledView className="flex-1 items-center justify-center bg-gray-100 dark:bg-dark-background p-4">
      <StyledView className="w-full max-w-sm">
        <StyledView className="items-center mb-5">
          <Logo width={150} height={150} />
          <StyledText className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
            LumiLivre
          </StyledText>
        </StyledView>

        <StyledView className="space-y-4">
          <StyledView>
            <StyledText className="text-sm font-medium text-lumi-label mb-1 ml-3">
              Matrícula ou Email
            </StyledText>
            <StyledTextInput
              className="w-full p-4 bg-white dark:bg-dark-card rounded-md text-gray-800 dark:text-gray-100 text-base"
              placeholder="Digite seu usuário"
              placeholderTextColor="#9CA3AF"
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
            />
          </StyledView>

          <StyledView>
            <StyledText className="text-sm font-medium text-lumi-label mb-1 ml-3">
              Senha
            </StyledText>
            <StyledTextInput
              className="w-full p-4 bg-white dark:bg-dark-card rounded-md text-gray-800 dark:text-gray-100 text-base"
              placeholder="Digite sua senha"
              placeholderTextColor="#9CA3AF"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </StyledView>
        </StyledView>

        <StyledTouchableOpacity
          className="mt-6 w-full bg-lumi-primary py-4 rounded-md shadow-md"
          onPress={handleLogin}
          disabled={isLoading}
        >
          <StyledText className="text-white text-center font-bold text-lg">
            {isLoading ? 'Entrando...' : 'ENTRAR'}
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity className="mt-4">
          <StyledText className="text-center text-gray-500 dark:text-gray-400 underline">
            Esqueceu sua senha?
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}