import { createContext, useContext, useState, ReactNode } from 'react';
import * as authApi from '../api/auth';
import { saveToken, deleteToken } from '../services/TokenService';

type User = {
  email: string;
  token: string;
  username : string;
  fullName : string;
};

type AuthContextType = {
  user:  User | null;
  login: (username: string, password: string) => Promise<void>; //() => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    
    const response = await authApi.login(username, password);

    const user: User = {
      email: response.email,
      token: response.token,
      username: response.username,
      fullName: response.fullname, // map to camelCase
    };

    setUser(user);
    saveToken(response?.token)
  };

  const logout = () => {
    setUser(null);
    deleteToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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