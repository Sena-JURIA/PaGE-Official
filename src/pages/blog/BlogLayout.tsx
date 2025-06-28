import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../main.css'; // Import main CSS for consistent styling
import './BlogLayout.css'; // Specific styles for the blog layout

const BlogLayout: React.FC = () => {
  return (
    <div className="blog-layout">
      <header className="blog-header">
        <div className="blog-header-content">
          <h1>PaGE Blog</h1>
          <nav>
            <ul>
              <li><a href="/">ホーム</a></li>
              <li><a href="/blog">ブログトップ</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="blog-main-content">
        <Outlet /> {/* This is where nested routes (BlogList or BlogPostPage) will render */}
      </main>
      <footer className="blog-footer">
        <p>&copy; 2025 PaGE Blog. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BlogLayout;
