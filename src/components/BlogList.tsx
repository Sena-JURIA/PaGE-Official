import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../data/blogPosts';
import type { Post } from '../types/Post';
import BlogCard from './BlogCard';
import './Blog.css';

const BlogList: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tagName, authorId } = useParams<{ tagName?: string; authorId?: string }>();

  useEffect(() => {
    const fetchPostsAndTags = async () => {
      try {
        const fetchedPosts = await getPosts();
        setAllPosts(fetchedPosts);
      } catch (err: any) {
        console.error("Failed to fetch posts for blog list:", err);
        setError(err.message || "記事の読み込みに失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndTags();
  }, []);

  useEffect(() => {
    if (!loading) {
      let posts = allPosts;
      if (tagName) {
        posts = posts.filter(p => p.tags.includes(tagName));
      }
      setFilteredPosts(posts);
    }
  }, [tagName, authorId, allPosts, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="blog-list-error">記事一覧を読み込めませんでした: {error}</div>;
  }

  const getTitle = () => {
    if (tagName) return `タグ: ${tagName}`;
    if (authorId) {
      const authorName = allPosts.find(p => p.author.id === authorId)?.author.name;
      return authorName ? `著者: ${authorName}` : '最新ブログ記事';
    }
    return '最新ブログ記事';
  };

  return (
    <section id="blog" className="content-section">
      <div >
        <h2 className="section-title">{getTitle()}</h2>
        {/*
        <div className="tags-cloud">
          <a href="/blog" className={!tagName ? 'active' : ''}>すべての記事</a>
          {allTags.map(tag => (
            <a 
              href={`/blog/tags/${tag}`} 
              key={tag} 
              className={tagName === tag ? 'active' : ''}
            >
              {tag}
            </a>
          ))}
        </div>
        */}
      </div>
      <div className="cards-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <p>この記事はありません。</p>
        )}
      </div>
    </section>
  );
};

export default BlogList;
