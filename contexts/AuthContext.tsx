import { createContext, useContext, useState, ReactNode } from 'react';
import * as authApi from '../api/auth';

type User = {
  email: string;
  token: string;
  username : string;
};

type AuthContextType = {
  user:  User | null;
  login: (username: string, password: string) => Promise<void>; //() => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username: string, password: string) => {
    const userData = await authApi.login(username, password);
    setUser(userData);
  };


  const logout = () => setIsLoggedIn(false);

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