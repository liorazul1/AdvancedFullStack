import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import api from '../services/api';

type User = {
  _id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // בעת טעינת האפליקציה בודק אם קיים Token ומנסה לשחזר את המשתמש המחובר
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api
        .get('/auth/me')
        .then((res) => setUser(res.data.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // שומר את ה-Token ואת פרטי המשתמש לאחר התחברות או הרשמה מוצלחת
  const login = (userData: User, token: string) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  // מוחק את ה-Token ומאפס את המשתמש המחובר
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook שמחזיר את נתוני ההתחברות מתוך ה-Context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};