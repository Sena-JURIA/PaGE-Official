import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Author } from '../types/Author';

// Viteの環境変数からAPIのベースURLを取得するか、デフォルト値を設定
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface AuthContextType {
  isAuthenticated: boolean;
  user: Author | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 初期ロード中はtrue

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/users/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // トークンが無効ならログアウト
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
          // エラー時もログアウト
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false); // ユーザー情報の取得が終わったらローディング完了
    };

    fetchUser();
  }, [token]);

  const login = async (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    // useEffectが再実行されてユーザー情報が取得されます
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};