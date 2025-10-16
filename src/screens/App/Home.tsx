import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {
  buscarCatalogo,
  type GeneroCatalogo,
} from '../../services/livroService';
import BookCard from '../../components/BookCard';

export default function HomeScreen() {
  const [catalogo, setCatalogo] = useState<GeneroCatalogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const dados = await buscarCatalogo();
        if (dados.length === 0) {
          setError('Nenhum livro encontrado no catálogo no momento.');
        }
        setCatalogo(dados);
      } catch (err) {
        setError('Não foi possível carregar o catálogo.');
      } finally {
        setIsLoading(false);
      }
    };
    carregarDados();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#762075" />
      </View>
    );
  }

  if (error || catalogo.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.center]}>
          <Text style={styles.errorText}>
            {error || 'Nenhum livro no catálogo.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Catálogo</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise por um livro..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {catalogo.map((genero) => (
          <View key={genero.nome} style={styles.carouselSection}>
            <Text style={styles.genreTitle}>{genero.nome}</Text>
            <FlatList
              data={genero.livros}
              renderItem={({ item }) => <BookCard livro={item} />}
              keyExtractor={(item, index) => `${item.titulo}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 24 }}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  carouselSection: {
    marginTop: 24,
  },
  genreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 24,
    marginBottom: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
  },
});
