import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // ログアウト後にホームページにリダイレクト
  };

  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="logo">PaGE</Link>
        <nav>
          <Link to="/blog">Blog</Link>
          <Link to="/new-post">New Post</Link>
        </nav>
        <div className="auth-section">
          {isAuthenticated && user ? (
            <>
              <span className="welcome-message">
                ようこそ、
                <Link to={`/blog/authors/${user.id}`} className="user-name-link">
                  {user.name}
                </Link>
                 さん
              </span>
              <button onClick={handleLogout} className="logout-button">ログアウト</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">ログイン</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
