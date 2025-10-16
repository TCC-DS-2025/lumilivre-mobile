import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useAuth } from '../../contexts/AuthContext'; // retirar

export default function ProfileScreen() {
  const { logout } = useAuth(); // retirar

  const handleLogout = async () => {
    // retirar
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Perfil</Text>

      {/* retirar */}
      <TouchableOpacity style={styles.buttonlogout} onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  buttonlogout: {
    borderWidth: 2,
    backgroundColor: '#EF4444',
  },
});
