import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Header.css'; // 認証セクションのスタイルを適用するためにインポート

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  const getLinkClass = (path: string) => {
    // ブログページの場合、/blogで始まるパス全てで"ブログ"をアクティブにする
    if (path === '/blog' && location.pathname.startsWith('/blog')) {
      return 'active';
    }
    return location.pathname === path ? 'active' : '';
  };

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <Link to="/" className="logo"><h1>PaGE</h1></Link>        
        <div className="desktop-nav-container">
          <nav id="main-nav" className={`desktop-nav`}>
            <ul>
              <li><Link to="/" className={getLinkClass('/')}>ホーム</Link></li>
              <li><Link to="/blog" className={getLinkClass('/blog')}>ブログ</Link></li>
              <li><Link to="/qanda" className={getLinkClass('/qanda')}>Q&A</Link></li>
            </ul>
          </nav>
        </div>
        
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav-mobile"
        >
          <span className="sr-only">メニューを開閉</span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <nav id="main-nav-mobile" className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <ul>
            <li><Link to="/" className={getLinkClass('/')} onClick={handleMenuLinkClick}>ホーム</Link></li>
            <li><a href="/#activities" onClick={handleMenuLinkClick}>活動内容</a></li>
            <li><a href="/#team" onClick={handleMenuLinkClick}>運営メンバー</a></li>
            <li><Link to="/blog" className={getLinkClass('/blog')} onClick={handleMenuLinkClick}>ブログ</Link></li>
            <li><Link to="/qanda" className={getLinkClass('/qanda')} onClick={handleMenuLinkClick}>Q&A</Link></li>
            <li><a href="#" onClick={handleMenuLinkClick}>その他</a></li>
          </ul>
        </nav>
        <div className={`menu-overlay ${isMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <section>
          <h4>リンク</h4>
          <a href="/blog" className="footer-link">ブログ記事</a>
          <a href="https://x.com/WearePaGE0125" className="footer-link">X (旧Twitter)</a>
          <a href="/qanda" className="footer-link">Q&A</a>
        </section>
        
        <p>&copy; 2025 PaGE. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Layout;