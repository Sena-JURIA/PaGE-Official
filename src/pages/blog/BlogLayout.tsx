import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import '../../main.css'; // Import main CSS for consistent styling
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

  return (
    <div className="blog-layout">
      <header className="site-header">
          <a href="/blog"><h1>PaGE Blog</h1></a>
          <button 
            className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="blog-main-nav"
          >
            <span className="sr-only">メニューを開閉</span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
          <nav id="blog-main-nav" className="desktop-nav">
            <ul>
              <li><a href="/">ホーム</a></li>
              <li><a href="/blog">ブログトップ</a></li>
            </ul>
          </nav>
          <nav id="blog-main-nav-mobile" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
            <ul>
              <li><a href="/">ホーム</a></li>
              <li><a href="/blog">ブログトップ</a></li>
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
