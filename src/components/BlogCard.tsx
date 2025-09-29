
import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types/Post';

type BlogCardProps = {
  post: Post;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="blog-card">
      <Link to={post.link} className="blog-card-link-wrapper">
        <img src={post.imageUrl} alt={post.title} className="blog-card-img" />
        <div className="blog-card-content">
          <p className="blog-card-date">{post.date} - {post.author.name}</p>
          <h3 className="blog-card-title">{post.title}</h3>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <div className="blog-card-tags">
            {post.tags.map(tag => (
              <Link to={`/blog/tags/${tag}`} key={tag} className="tag" onClick={(e) => e.stopPropagation()}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </Link>
      <div className="blog-card-footer">
        <Link to={post.link} className="card-link">続きを読む &rarr;</Link>
      </div>
    </div>
  );
};

export default BlogCard;
