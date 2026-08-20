import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
  streakDays: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string, lifestyleTags?: string[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'review_current_user_v1';

const DEFAULT_DEMO_USER: User = {
  id: 'user-me-01',
  name: '리뷰어_제이콥',
  email: 'jacob@example.com',
  avatar: 'J',
  level: 'Lv.4 프로 기록러',
  streakDays: 19
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_DEMO_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name || (email.split('@')[0] || '사용자'),
      email,
      avatar: (name || email)[0].toUpperCase(),
      level: 'Lv.1 일상 기록러',
      streakDays: 1
    };
    setUser(newUser);
  };

  const signup = (name: string, email: string, _lifestyleTags?: string[]) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      avatar: name.trim()[0].toUpperCase(),
      level: 'Lv.1 신규 챌린저',
      streakDays: 1
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
