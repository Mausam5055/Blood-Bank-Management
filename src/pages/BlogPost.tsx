
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import { blogPosts } from '../data/blogPosts';
import BlogPostHeader from '../components/blog/BlogPostHeader';
import BlogPostContent from '../components/blog/BlogPostContent';
import BlogPostStyles from '../components/blog/BlogPostStyles';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white hover:from-neon-pink/80 hover:to-electric-cyan/80">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BlogPostStyles />
      
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="w-full max-w-none animate-fade-in">
          <BlogPostHeader post={post} />
          <BlogPostContent post={post} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
