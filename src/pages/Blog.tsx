import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, User, ArrowRight, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Medical Science', 'Community Stories', 'Health Tips', 'Donation Process', 'Indian Healthcare', 'Regional Updates', 'Emergency Response', 'Blood Types', 'Nutrition'];

  // Expanded blog data with more Indian healthcare content
  const blogPosts = [
    {
      id: 1,
      title: 'The Science Behind Blood Types: What Every Donor Should Know',
      excerpt: 'Discover the fascinating science behind blood types and why understanding them is crucial for safe blood donation and transfusion.',
      author: 'Dr. Sarah Mitchell',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Medical Science',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Blood Types', 'Medical Science', 'Donation Process'],
      featured: true
    },
    {
      id: 2,
      title: 'Community Heroes: Stories of Life-Saving Blood Donations in Assam',
      excerpt: 'Read inspiring stories from our donor community in Northeast India and discover how everyday heroes are making a life-saving difference.',
      author: 'Community Team',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Community Stories',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Community', 'Donor Stories', 'Heroes', 'Assam'],
      featured: true
    },
    {
      id: 3,
      title: 'Blood Donation in Rural India: Bridging the Healthcare Gap',
      excerpt: 'Exploring the challenges and solutions for blood donation in rural areas of India, with focus on mobile blood collection units.',
      author: 'Dr. Priya Sharma',
      date: '2024-01-08',
      readTime: '10 min read',
      category: 'Indian Healthcare',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Rural Healthcare', 'Mobile Units', 'India']
    },
    {
      id: 4,
      title: '5 Simple Health Tips to Prepare for Your Next Blood Donation',
      excerpt: 'Maximize the impact of your donation by following these easy health tips to ensure you are in top shape.',
      author: 'Health Expert',
      date: '2023-12-15',
      readTime: '5 min read',
      category: 'Health Tips',
      image: 'https://images.unsplash.com/photo-1532938314630-e9439f347c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Health Tips', 'Blood Donation', 'Donor Preparation']
    },
    {
      id: 5,
      title: 'AIIMS Guwahati: Leading Blood Banking Innovation in Northeast India',
      excerpt: 'How AIIMS Guwahati is revolutionizing blood banking services and setting new standards for healthcare in the region.',
      author: 'Dr. Rajesh Kumar',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Regional Updates',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['AIIMS', 'Guwahati', 'Innovation', 'Northeast']
    },
    {
      id: 6,
      title: 'Traditional Medicine Meets Modern Blood Banking in Assam',
      excerpt: 'Exploring how traditional Ayurvedic practices complement modern blood donation and healthcare in Assamese communities.',
      author: 'Dr. Anita Bora',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'Indian Healthcare',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Ayurveda', 'Traditional Medicine', 'Assam', 'Healthcare']
    },
    {
      id: 7,
      title: 'Festival of Giving: How Bihu Celebrations Boost Blood Donations',
      excerpt: 'Learn how Assamese festivals, particularly Bihu, have become platforms for community blood donation drives.',
      author: 'Cultural Reporter',
      date: '2024-01-01',
      readTime: '6 min read',
      category: 'Community Stories',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Bihu', 'Festivals', 'Community', 'Assam']
    },
    {
      id: 8,
      title: 'Tea Garden Workers: The Unsung Heroes of Blood Donation',
      excerpt: 'Stories from tea estates across Assam where workers regularly participate in blood donation drives to support their communities.',
      author: 'Field Correspondent',
      date: '2023-12-28',
      readTime: '8 min read',
      category: 'Community Stories',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Tea Gardens', 'Workers', 'Community', 'Assam']
    },
    {
      id: 9,
      title: 'Digital Revolution in Indian Blood Banks: Apps and Technology',
      excerpt: 'How technology is transforming blood donation in India with mobile apps, online registration, and digital tracking systems.',
      author: 'Tech Analyst',
      date: '2023-12-25',
      readTime: '7 min read',
      category: 'Medical Science',
      image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Technology', 'Digital Health', 'Apps', 'Innovation']
    },
    {
      id: 10,
      title: 'Understanding Thalassemia: A Growing Concern in Northeast India',
      excerpt: 'Exploring the prevalence of thalassemia in Northeast India and the critical role of regular blood transfusions.',
      author: 'Dr. Meera Das',
      date: '2023-12-22',
      readTime: '11 min read',
      category: 'Medical Science',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Thalassemia', 'Northeast India', 'Transfusion', 'Medical']
    },
    {
      id: 11,
      title: 'Emergency Blood Response During Natural Disasters in India',
      excerpt: 'How blood banks across India coordinate emergency responses during floods, earthquakes, and other natural disasters.',
      author: 'Emergency Response Team',
      date: '2023-12-20',
      readTime: '9 min read',
      category: 'Emergency Response',
      image: 'https://images.unsplash.com/photo-1587462723516-4d47a95c7772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Emergency', 'Disaster Response', 'Blood Banks', 'India']
    },
    {
      id: 12,
      title: 'Nutrition Guide for Blood Donors: What to Eat Before and After',
      excerpt: 'Complete nutritional guide for blood donors to maintain optimal health and ensure successful donations.',
      author: 'Nutritionist Dr. Kavya Reddy',
      date: '2023-12-18',
      readTime: '8 min read',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Nutrition', 'Diet', 'Health', 'Blood Donation']
    },
    {
      id: 13,
      title: 'Rare Blood Types in Indian Population: Challenges and Solutions',
      excerpt: 'Understanding the distribution of rare blood types in India and strategies for managing shortages.',
      author: 'Dr. Amit Singh',
      date: '2023-12-15',
      readTime: '10 min read',
      category: 'Blood Types',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Rare Blood Types', 'Genetics', 'Indian Population', 'Blood Banking']
    },
    {
      id: 14,
      title: 'Mobile Blood Collection Units: Reaching Remote Villages',
      excerpt: 'How mobile blood collection units are revolutionizing healthcare access in rural and remote areas of Northeast India.',
      author: 'Mobile Unit Coordinator',
      date: '2023-12-12',
      readTime: '7 min read',
      category: 'Regional Updates',
      image: 'https://images.unsplash.com/photo-1576671481015-b4c8b5d5d6d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Mobile Units', 'Rural Healthcare', 'Northeast India', 'Access']
    },
    {
      id: 15,
      title: 'Student Blood Donation Drives: Engaging Youth in Guwahati',
      excerpt: 'How educational institutions in Guwahati are fostering a culture of blood donation among students.',
      author: 'Student Affairs Team',
      date: '2023-12-10',
      readTime: '6 min read',
      category: 'Community Stories',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Students', 'Youth', 'Guwahati', 'Education']
    }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* SVG grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay pointer-events-none z-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <Navbar />
      {/* Hero/Header Section */}
      <div className="relative w-full px-0 pt-20 pb-12 text-center overflow-hidden">
        {/* Hero Background Image - edge-to-edge */}
        <div className="absolute left-0 top-0 w-screen h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            alt="Blood donation hero background"
            className="w-full h-full object-cover object-center opacity-60"
          />
          {/* Gradient overlay for smooth blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />
                    </div>
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-0">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-pink to-electric-cyan mb-6 md:mb-8 tracking-tight leading-tight">Blood Bank Blog & Stories</h1>
          <p className="hidden md:block text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed md:leading-9 mb-2 md:mb-4"></p>
                  </div>
                </div>
      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 mb-8 px-4 bg-gradient-to-r from-gray-900/80 to-black/80 rounded-xl p-4 border border-white/10 shadow-lg">
                <Input
          type="text"
          placeholder="Search blog posts..."
                  value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 bg-black/60 border border-white/10 text-white placeholder-gray-400"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category ? 'bg-red-500 text-white' : 'bg-black/40 text-gray-300 border border-white/10 hover:bg-red-500/20 hover:text-white'}`}
            >
                      {category}
            </Badge>
          ))}
            </div>
          </div>
      {/* Blog Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-0 pb-16">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg py-16">No blog posts found.</div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl shadow-xl border border-white/10 p-5 md:p-10 flex flex-col gap-4 hover:border-red-500/40 hover:shadow-red-500/10 transition-all duration-300">
              <img src={post.image} alt={post.title} className="w-full h-56 md:h-80 object-cover rounded-xl mb-3 border-2 border-white/10" />
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-semibold">{post.category}</Badge>
                {post.tags.map((tag, i) => (
                  <Badge key={i} className="bg-black/40 text-gray-300 border border-white/10 px-3 py-1 rounded-full text-xs font-medium">{tag}</Badge>
                ))}
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-1">{post.title}</h2>
              <p className="hidden md:block text-gray-300 mb-2 text-lg md:text-xl leading-relaxed italic">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-gray-400 text-sm mt-2">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
              </div>
              <Link to={`/blog/${post.id}`} className="mt-2 text-red-400 hover:underline font-medium self-start">Read More</Link>
            </div>
          ))
          )}
      </div>
    </div>
  );
};

export default Blog;
