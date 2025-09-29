import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

// Viteの環境変数からAPIのベースURLを取得するか、デフォルト値を設定
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // PrivateRouteから渡されたリダイレクト元のパスを取得。なければホームページへ。
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // FastAPIのデフォルトのOAuth2PasswordRequestFormはフォームデータを想定しています
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${apiBaseUrl}/api/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'ログインに失敗しました。');
      }

      const data = await response.json();
      const token = data.access_token;

      if (token) {
        await login(token);
        navigate(from, { replace: true }); // ログイン成功後、元のページにリダイレクト
      } else {
        throw new Error('トークンが取得できませんでした。');
      }
    } catch (err: any) {
      setError(err.message || 'エラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
        <div className="register-link">
            <p>アカウントをお持ちでないですか？ 所属メンバーはDiscordにてお問い合わせください</p>
        </div>
        <div className="back-link">
          <Link to="/">ホームに戻る</Link>
        </div>
        <div className="back-link-brog">
          <Link to="/blog">ブログ一覧に戻る</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;