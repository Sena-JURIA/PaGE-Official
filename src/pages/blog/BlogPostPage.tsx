
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../data/blogPosts';
import type { Post } from '../../types/Post';
import './BlogPostPage.css';

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      const foundPost = await getPostById(postId);
      setPost(foundPost || null);
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div className="post-not-found">記事が見つかりませんでした。</div>;
  }

  return (
    <div className="blog-post-page">
      <div 
        className="post-hero" 
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      >
        <div className="post-hero-overlay">
          <div className="post-hero-text">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-meta">
              <Link to={`/blog/authors/${post.author.id}`} className="post-author author-link" aria-label={`${post.author.name} の記事一覧へ`}>
                <img className="post-author-avatar" src={post.author.avatarUrl} alt={post.author.name} />
                <span className="post-author-name-text">{post.author.name}</span>
              </Link>
              <span className="post-date">{post.date}</span>
            </p>
            <div className="post-tags">
              {post.tags.map(tag => (
                <Link to={`/blog/tags/${tag}`} key={tag} className="tag">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="post-body">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="author-profile-box">
          <div className="author-avatar">
            <img src={post.author.avatarUrl} alt={`${post.author.name}のアバター`} />
          </div>
          <div className="author-details">
            <h3 className="author-name">{post.author.name}</h3>
            <p className="author-bio">{post.author.bio}</p>
            {post.author.xUrl && (
              <a href={post.author.xUrl} target="_blank" rel="noopener noreferrer" className="author-social-link">
                Xでフォロー
              </a>
            )}
            {' '}
            <Link to={`/blog/authors/${post.author.id}`} className="author-posts-link">
              この人の記事を読む
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPostPage;
