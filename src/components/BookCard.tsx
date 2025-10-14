import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { LivroMobile } from '../services/livroService';

interface BookCardProps {
  livro: LivroMobile;
}

const placeholderImage = require('../assets/images/icons/logo-foreground.png');

export default function BookCard({ livro }: BookCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={livro.imagem ? { uri: livro.imagem } : placeholderImage}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>
        {livro.titulo}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        {livro.autor}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 16,
  },
  image: {
    width: 140,
    height: 210,
    borderRadius: 8,
    backgroundColor: '#E5E7EB', 
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#1F2937',
  },
  author: {
    fontSize: 12,
    color: '#6B7280',
  },
});
