import api from './api';

export interface LivroMobile {
  imagem: string | null;
  titulo: string;
  autor: string;
}

export interface GeneroCatalogo {
  nome: string;
  livros: LivroMobile[];
}

export const buscarCatalogo = async (): Promise<GeneroCatalogo[]> => {
  try {
    const response = await api.get<GeneroCatalogo[]>('/livros/catalogo-mobile');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o catálogo:', error);
    throw error;
  }
};
