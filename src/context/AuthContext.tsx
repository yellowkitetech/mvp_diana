
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (module: string) => boolean;
}

const defaultUser: User = {
  id: '1',
  name: 'João Oliveira',
  email: 'joao.oliveira@secom.gov.br',
  role: 'admin',
  avatar: '/placeholder.svg',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento do usuário de uma API ou localStorage
    const loadUser = async () => {
      try {
        // Aqui você carregaria o usuário de uma API real
        // Por enquanto, vamos usar um usuário padrão para demonstração
        setUser(defaultUser);
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simular login em uma API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usuário de exemplo baseado no email para demonstração
      let mockUser: User;
      
      if (email.includes('agencia')) {
        mockUser = {
          id: '3',
          name: 'Usuário Agência',
          email: email,
          role: 'agency',
          avatar: '/placeholder.svg',
          agencyId: '1' // ID da agência fictícia
        };
      } else if (email.includes('analista')) {
        mockUser = {
          id: '2',
          name: 'Analista SECOM',
          email: email,
          role: 'analyst',
          avatar: '/placeholder.svg'
        };
      } else {
        mockUser = {
          id: '1',
          name: 'Administrador SECOM',
          email: email,
          role: 'admin',
          avatar: '/placeholder.svg'
        };
      }
      
      setUser(mockUser);
      
      // Em um app real, você armazenaria tokens no localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Função para verificar permissões baseadas na função do usuário
  const hasPermission = (module: string): boolean => {
    if (!user) return false;

    switch (user.role) {
      case 'admin':
        // Administrador SECOM tem acesso total
        return true;
      
      case 'analyst':
        // Analista SECOM tem acesso total, exceto a financeiro e planejamento
        return !['financeiro', 'planejamento'].includes(module);
      
      case 'agency':
        // Agência tem acesso limitado
        return ['dashboard', 'processos', 'comunicacoes', 'criacao'].includes(module);
      
      default:
        return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
