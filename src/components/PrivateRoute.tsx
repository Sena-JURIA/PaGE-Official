import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // AuthContextがトークンを検証中の場合、ローディング表示などを出す
  if (isLoading) {
    return <div>Loading...</div>; // ここはスピナーなどのコンポーネントにするとより良いです
  }

  // 認証されていない場合はログインページにリダイレクト
  // state={{ from: location }} を渡すことで、ログイン後に元のページに戻れるようにします
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 認証されている場合は子コンポーネント（保護対象のページ）をレンダリング
  return children;
};

export default PrivateRoute;
