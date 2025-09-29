import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../main.css'; // Import main CSS for consistent styling
import '../../components/Header.css'; // 認証セクションのスタイルを適用するためにインポート
import './BlogLayout.css'; // Specific styles for the blog layout

const BlogLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="blog-layout">
      <header className="site-header">
        <Link to="/blog" className="logo"><h1>PaGE Blog</h1></Link>
        <div className="desktop-nav-container">
          <nav id="blog-main-nav" className="desktop-nav">
            <ul>
              <li><Link to="/">ホーム</Link></li>
              <li><Link to="/blog">ブログ一覧</Link></li>
            </ul>
          </nav>
        </div>
        <button 
          className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="blog-main-nav-mobile"
        >
          <span className="sr-only">メニューを開閉</span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <nav id="blog-main-nav-mobile" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={handleMenuLinkClick}>ホーム</Link></li>
            <li><Link to="/blog" onClick={handleMenuLinkClick}>ブログ一覧</Link></li>
          </ul>
        </nav>
        <div className={`menu-overlay ${isMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
      </header>
      <main className="blog-main-content">
        <Outlet /> {/* This is where nested routes (BlogList or BlogPostPage) will render */}
      </main>
      <footer className="site-footer">
        <p>&copy; 2025 PaGE Blog. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BlogLayout;
