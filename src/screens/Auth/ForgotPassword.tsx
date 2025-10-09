import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/AppNavigator';

import Logo from '../../assets/images/icons/logo.svg';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleRequestReset = () => {
    Alert.alert(
      'Solicitação Enviada',
      'Se o e-mail estiver correto, você receberá um link para redefinir sua senha.',
    );
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-dark-background p-4">
      <View className="w-full max-w-sm">
        <View className="items-center mb-5">
          <Logo width={150} height={150} />
        </View>
        <Text className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          Esqueci Minha Senha
        </Text>
        <Text className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Digite seu e-mail para receber o link de redefinição.
        </Text>

        <TextInput
          className="w-full p-4 bg-white dark:bg-dark-card rounded-md text-gray-800 dark:text-gray-100 text-base"
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          className="mt-6 w-full bg-lumi-primary py-4 rounded-md shadow-md"
          onPress={handleRequestReset}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-bold text-lg">
            {isLoading ? 'Enviando...' : 'ENVIAR LINK'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-6" onPress={() => navigation.goBack()}>
          <Text className="text-center text-gray-500 dark:text-gray-400 underline">
            Voltar para o Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
