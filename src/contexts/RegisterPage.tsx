import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

// Viteの環境変数からAPIのベースURLを取得するか、デフォルト値を設定
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    password: '',
    bio: '',
    avatarUrl: '',
    xUrl: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || '登録に失敗しました。');
      }

      setSuccessMessage('登録に成功しました。ログインページに移動します...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'エラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>新規登録</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="form-group">
            <label htmlFor="id">ユーザーID (必須)</label>
            <input
              id="id"
              name="id"
              type="text"
              value={formData.id}
              onChange={handleChange}
              required
              pattern="^[a-zA-Z0-9_]+$"
              title="ユーザーIDは半角英数字とアンダースコア(_)のみ使用できます。"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">表示名 (必須)</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード (必須)</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">自己紹介</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="avatarUrl">アバターURL</label>
            <input
              id="avatarUrl"
              name="avatarUrl"
              type="url"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="https://example.com/avatar.png"
            />
          </div>
          <div className="form-group">
            <label htmlFor="xUrl">X (旧Twitter) のURL</label>
            <input
              id="xUrl"
              name="xUrl"
              type="url"
              value={formData.xUrl}
              onChange={handleChange}
              placeholder="https://x.com/username"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? '登録中...' : '登録する'}
          </button>
        </form>
        <div className="login-link">
          <p>
            すでにアカウントをお持ちですか？ <Link to="/login">ログイン</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
