import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../data/blogPosts';
import type { Post } from '../../types/Post';
import './BlogPostPage.css';

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) {
          throw new Error("Post ID is missing");
        }
        const fetchedPost = await getPostById(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError("記事が見つかりませんでした。");
        }
      } catch (err: any) {
        setError(err.message || "記事の読み込み中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div className="loading-message">読み込み中...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="error-message">記事が見つかりませんでした。</div>;

  return (
    <article className="blog-post-container">
      <header className="blog-post-header">
        <h1>{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>{post.date}</time> by <Link to={`/blog/authors/${post.author.id}`}>{post.author.name}</Link>
        </p>
      </header>
      <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};

export default BlogPostPage;