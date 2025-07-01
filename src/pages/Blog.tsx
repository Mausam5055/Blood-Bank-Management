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
    <div className="min-h-screen bg-black">
      {/* Minimal Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-pink/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-electric-cyan/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar />
      
      <div className="relative z-10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-pink to-electric-cyan mb-3 leading-tight">
              Explore Our Blog
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto hidden md:block">
              Stay updated with the latest news, stories, and insights from Indian healthcare and blood donation community.
            </p>
          </div>

          {/* Featured Articles */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 text-neon-pink mr-3" />
              <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <div
                  key={`featured-${post.id}`}
                  className="glass-card border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-neon-pink/90 text-white">
                        Featured
                      </Badge>
                      <Badge className="bg-electric-cyan/90 text-white">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>

                    <Link to={`/blog/${post.id}`}>
                      <Button className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white hover:scale-105 transition-all duration-300 w-full">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card border-white/10 p-6 rounded-2xl mb-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-4">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neon-pink" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-electric-cyan/20 focus:border-electric-cyan text-white"
                />
              </div>
              
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger className="glass border-electric-cyan/20 text-white">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Regular Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="glass-card border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-neon-pink/90 text-white">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>

                  <Link to={`/blog/${post.id}`}>
                    <Button className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white hover:scale-105 transition-all duration-300 w-full">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-neon-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-neon-pink" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No Articles Found
                </h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  We couldn't find any articles matching your criteria. 
                  Try adjusting your search or filter settings to discover more content.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                  }}
                  className="bg-gradient-to-r from-neon-pink to-electric-cyan text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
