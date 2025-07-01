
import React from 'react';
import { BlogPost } from '../../data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent = ({ post }: BlogPostContentProps) => {
  return (
    <div className="bg-black/60 backdrop-blur-lg border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-12 rounded-2xl animate-slide-up">
      <div 
        className="article-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogPostContent;
