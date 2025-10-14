import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface User {
  id: number;
  email: string;
  role: string;
  token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean; // convidado
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => Promise<void>;
  loginAsGuest: () => void; // convidado
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false); // convidado
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedUser = await AsyncStorage.getItem('@LumiLivre:user');
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          api.defaults.headers.common['Authorization'] =
            `Bearer ${parsedUser.token}`;
        }
      } catch (error) {
        console.error('Falha ao carregar dados do usuário', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStorageData();
  }, []);

  const login = async (userData: User) => {
    setUser(userData);
    setIsGuest(false); // convidado
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    await AsyncStorage.setItem('@LumiLivre:user', JSON.stringify(userData));
  };

  const loginAsGuest = () => { // convidado
    setUser(null); 
    setIsGuest(true);
  };

  const logout = async () => {
    setUser(null);
    setIsGuest(false);
    delete api.defaults.headers.common['Authorization'];
    await AsyncStorage.removeItem('@LumiLivre:user');
    await AsyncStorage.removeItem('@LumiLivre:credentials');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isGuest, // convidado
        user,
        isLoading,
        login,
        loginAsGuest, // convidado
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
