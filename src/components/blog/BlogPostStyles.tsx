
import React from 'react';

const BlogPostStyles = () => {
  return (
    <style>
      {`
        .article-content {
          color: #FFFFFF;
          line-height: 1.8;
        }
        
        .article-content .lead-paragraph {
          font-size: 1.25rem;
          font-weight: 400;
          margin-bottom: 2rem;
          color: #5EEAD4;
        }
        
        .article-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 2.5rem 0 1rem 0;
          color: #FF6B81;
          border-bottom: 2px solid #FF6B81;
          padding-bottom: 0.5rem;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2rem 0 1rem 0;
          color: #5EEAD4;
        }
        
        .article-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.5rem 0 0.5rem 0;
          color: #FF6B81;
        }
        
        .article-content p {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
          color: #E5E5E5;
        }
        
        .article-content ul, .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        
        .article-content li {
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
          color: #E5E5E5;
        }
        
        .article-content strong {
          color: #FF6B81;
          font-weight: 600;
        }
        
        .article-content blockquote {
          border-left: 4px solid #5EEAD4;
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          background: rgba(94, 234, 212, 0.05);
          border-radius: 0.5rem;
          font-style: italic;
          backdrop-filter: blur(10px);
        }
        
        .article-content blockquote p {
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
          color: #5EEAD4;
        }
        
        .article-content cite {
          font-size: 0.9rem;
          color: #CCCCCC;
          font-style: normal;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        
        .benefit-item {
          background: rgba(94, 234, 212, 0.05);
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(94, 234, 212, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .article-content .conclusion {
          font-size: 1.25rem;
          font-weight: 500;
          color: #5EEAD4;
          background: rgba(94, 234, 212, 0.05);
          padding: 1.5rem;
          border-radius: 0.75rem;
          border-left: 4px solid #5EEAD4;
          margin-top: 2rem;
          backdrop-filter: blur(10px);
        }
        
        @media (max-width: 768px) {
          .article-content h2 {
            font-size: 1.5rem;
          }
          
          .article-content h3 {
            font-size: 1.25rem;
          }
          
          .article-content p, .article-content li {
            font-size: 1rem;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          
          .article-content blockquote {
            padding: 1rem 1.5rem;
          }
          
          .article-content .conclusion {
            padding: 1rem;
          }
        }
      `}
    </style>
  );
};

export default BlogPostStyles;
