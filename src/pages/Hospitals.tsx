import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Clock, Star, Navigation, Heart, Users, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import ImageLoader from '../components/ImageLoader';

const Hospitals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [loadingCards, setLoadingCards] = useState(true);

  const hospitalTypes = ['All', 'General', 'Emergency', 'Specialized', 'Children', 'Trauma Center', 'Government', 'Private'];

  const hospitals = [
    {
      id: 1,
      name: 'Gauhati Medical College and Hospital (GMCH)',
      type: 'Government',
      address: 'Bhangagarh, Guwahati, Assam 781032',
      phone: '+91 361 267 1204',
      distance: '2.1 km',
      rating: 4.2,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Emergency Care', 'Surgery', 'Blood Bank', 'Cardiology', 'Neurology'],
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 850,
      availableBeds: 145,
      bloodUnitsAvailable: {
        'A+': 45,
        'O+': 38,
        'B+': 32,
        'AB+': 18,
        'A-': 25,
        'O-': 42,
        'B-': 19,
        'AB-': 12
      }
    },
    {
      id: 2,
      name: 'Apollo Hospitals Guwahati',
      type: 'Private',
      address: 'Nayantara Road, Guwahati, Assam 781028',
      phone: '+91 361 398 0000',
      distance: '3.5 km',
      rating: 4.8,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Cardiac Sciences', 'Oncology', 'Neurology', 'Orthopedics', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 150,
      availableBeds: 28,
      bloodUnitsAvailable: {
        'A+': 35,
        'O+': 28,
        'B+': 24,
        'AB+': 15,
        'A-': 22,
        'O-': 31,
        'B-': 16,
        'AB-': 9
      }
    },
    {
      id: 3,
      name: 'Nemcare Hospital',
      type: 'Private',
      address: 'Bhangagarh, Guwahati, Assam 781005',
      phone: '+91 361 248 2000',
      distance: '1.8 km',
      rating: 4.6,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Emergency Medicine', 'Critical Care', 'Surgery', 'Blood Transfusion'],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 120,
      availableBeds: 34,
      bloodUnitsAvailable: {
        'A+': 28,
        'O+': 35,
        'B+': 21,
        'AB+': 12,
        'A-': 18,
        'O-': 29,
        'B-': 14,
        'AB-': 8
      }
    },
    {
      id: 4,
      name: 'Down Town Hospital',
      type: 'Private',
      address: 'Guwahati Medical College Road, Guwahati, Assam 781014',
      phone: '+91 361 233 4444',
      distance: '2.7 km',
      rating: 4.7,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Multi-specialty', 'Emergency Care', 'ICU', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 200,
      availableBeds: 45,
      bloodUnitsAvailable: {
        'A+': 32,
        'O+': 26,
        'B+': 18,
        'AB+': 10,
        'A-': 20,
        'O-': 28,
        'B-': 12,
        'AB-': 7
      }
    },
    {
      id: 5,
      name: 'AIIMS Guwahati',
      type: 'Government',
      address: 'Changsari, Kamrup, Assam 781101',
      phone: '+91 361 297 2001',
      distance: '25.3 km',
      rating: 4.5,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Super Specialty', 'Research', 'Medical Education', 'Trauma Care'],
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 750,
      availableBeds: 89,
      bloodUnitsAvailable: {
        'A+': 55,
        'O+': 48,
        'B+': 38,
        'AB+': 22,
        'A-': 35,
        'O-': 52,
        'B-': 28,
        'AB-': 18
      }
    },
    {
      id: 6,
      name: 'Hayat Hospital',
      type: 'Private',
      address: 'Zoo Road, Guwahati, Assam 781024',
      phone: '+91 361 246 0104',
      distance: '4.2 km',
      rating: 4.4,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 100,
      availableBeds: 23,
      bloodUnitsAvailable: {
        'A+': 18,
        'O+': 22,
        'B+': 15,
        'AB+': 8,
        'A-': 12,
        'O-': 25,
        'B-': 10,
        'AB-': 6
      }
    },
    {
      id: 7,
      name: 'Excelcare Hospital',
      type: 'Private',
      address: 'GS Road, Guwahati, Assam 781005',
      phone: '+91 361 246 8888',
      distance: '3.1 km',
      rating: 4.3,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Cardiology', 'Orthopedics', 'Gastroenterology', 'Blood Transfusion'],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 80,
      availableBeds: 18,
      bloodUnitsAvailable: {
        'A+': 15,
        'O+': 19,
        'B+': 12,
        'AB+': 6,
        'A-': 9,
        'O-': 21,
        'B-': 8,
        'AB-': 4
      }
    },
    {
      id: 8,
      name: 'Sanjeevani Hospital',
      type: 'Private',
      address: 'Ulubari, Guwahati, Assam 781007',
      phone: '+91 361 254 0909',
      distance: '5.8 km',
      rating: 4.1,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['General Medicine', 'Surgery', 'Emergency Care', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 60,
      availableBeds: 14,
      bloodUnitsAvailable: {
        'A+': 12,
        'O+': 16,
        'B+': 9,
        'AB+': 5,
        'A-': 7,
        'O-': 18,
        'B-': 6,
        'AB-': 3
      }
    },
    {
      id: 9,
      name: 'Dispur Hospitals',
      type: 'Private',
      address: 'Dispur, Guwahati, Assam 781006',
      phone: '+91 361 226 4200',
      distance: '6.5 km',
      rating: 4.2,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Multi-specialty', 'Maternity', 'Pediatrics', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 90,
      availableBeds: 21,
      bloodUnitsAvailable: {
        'A+': 14,
        'O+': 18,
        'B+': 11,
        'AB+': 7,
        'A-': 8,
        'O-': 20,
        'B-': 7,
        'AB-': 4
      }
    },
    {
      id: 10,
      name: 'Northeast Heart Centre',
      type: 'Specialized',
      address: 'Six Mile, Guwahati, Assam 781022',
      phone: '+91 361 239 8888',
      distance: '8.2 km',
      rating: 4.6,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Cardiology', 'Cardiac Surgery', 'Emergency Cardiac Care', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 75,
      availableBeds: 16,
      bloodUnitsAvailable: {
        'A+': 20,
        'O+': 24,
        'B+': 16,
        'AB+': 9,
        'A-': 12,
        'O-': 22,
        'B-': 9,
        'AB-': 5
      }
    },
    {
      id: 11,
      name: 'Guwahati Neurological Research Centre',
      type: 'Specialized',
      address: 'Nabagraha Road, Guwahati, Assam 781009',
      phone: '+91 361 254 3456',
      distance: '7.1 km',
      rating: 4.5,
      emergencyServices: true,
      bloodBank: false,
      operatingHours: '24/7',
      specialties: ['Neurology', 'Neurosurgery', 'Stroke Care', 'Brain Surgery'],
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 65,
      availableBeds: 12,
      bloodUnitsAvailable: {}
    },
    {
      id: 12,
      name: 'Pratiksha Hospital',
      type: 'Private',
      address: 'Khanapara, Guwahati, Assam 781022',
      phone: '+91 361 270 5555',
      distance: '12.3 km',
      rating: 4.0,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['General Medicine', 'Surgery', 'Orthopedics', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 70,
      availableBeds: 15,
      bloodUnitsAvailable: {
        'A+': 16,
        'O+': 20,
        'B+': 13,
        'AB+': 6,
        'A-': 9,
        'O-': 17,
        'B-': 8,
        'AB-': 3
      }
    },
    {
      id: 13,
      name: 'Regional Institute of Medical Sciences (RIMS)',
      type: 'Government',
      address: 'Imphal, Manipur 795004',
      phone: '+91 385 245 2401',
      distance: '215 km',
      rating: 4.1,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Medical Education', 'Research', 'Multi-specialty', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 500,
      availableBeds: 78,
      bloodUnitsAvailable: {
        'A+': 32,
        'O+': 28,
        'B+': 24,
        'AB+': 14,
        'A-': 18,
        'O-': 30,
        'B-': 15,
        'AB-': 8
      }
    },
    {
      id: 14,
      name: 'Silchar Medical College and Hospital',
      type: 'Government',
      address: 'Ghungoor, Silchar, Assam 788014',
      phone: '+91 384 222 4567',
      distance: '320 km',
      rating: 3.9,
      emergencyServices: true,
      bloodBank: true,
      operatingHours: '24/7',
      specialties: ['Medical Education', 'General Medicine', 'Surgery', 'Blood Bank'],
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      totalBeds: 400,
      availableBeds: 62,
      bloodUnitsAvailable: {
        'A+': 28,
        'O+': 24,
        'B+': 20,
        'AB+': 12,
        'A-': 15,
        'O-': 26,
        'B-': 12,
        'AB-': 7
      }
    }
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesType = selectedType === 'All' || hospital.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getBloodAvailabilityColor = (count: number) => {
    if (count >= 20) return 'text-green-400';
    if (count >= 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  useEffect(() => {
    // Simulate loading for better UI
    const timer = setTimeout(() => setLoadingCards(false), 900);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedType]);

  return (
    <div className="min-h-screen bg-black">
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
      <div className="relative w-full px-0 pt-12 pb-10 flex items-center justify-center text-center overflow-hidden min-h-[180px] md:min-h-[220px]">
        {/* Hero Background Image - edge-to-edge */}
        <div className="absolute left-0 top-0 w-screen h-full z-0">
          <img
            src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1920&q=80"
            alt="Hospitals hero background"
            className="w-full h-full object-cover object-center opacity-60"
          />
          {/* Gradient overlay for smooth blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-0 flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-pink to-electric-cyan tracking-tight leading-tight mt-0 md:mt-16">Find Hospitals & Blood Banks</h1>
        </div>
      </div>
      
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="glass-card p-6 rounded-2xl mb-8 animate-slide-up bg-gray-900/40 border-white/10">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neon-pink" />
                <Input
                  placeholder="Search hospitals, locations, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-electric-cyan/20 focus:border-electric-cyan text-white bg-gray-900/50"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {hospitalTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type 
                      ? "bg-gradient-to-r from-neon-pink to-electric-cyan text-white border-0" 
                      : "border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10 hover:text-white"
                    }
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Hospital Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loadingCards
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="glass-card rounded-2xl overflow-hidden bg-gray-900/40 border-white/10 animate-pulse min-h-[320px]">
                    <div className="h-48 bg-gray-800/40 w-full" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-700/40 rounded w-2/3 mb-2" />
                      <div className="h-4 bg-gray-700/30 rounded w-1/2 mb-2" />
                      <div className="h-4 bg-gray-700/30 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-700/20 rounded w-1/4 mb-2" />
                      <div className="h-10 bg-gray-700/20 rounded w-full" />
                    </div>
                  </div>
                ))
              : filteredHospitals.map((hospital, index) => (
                  <div
                    key={hospital.id}
                    className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in bg-gray-900/40 border-white/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48">
                      <ImageLoader
                        src={hospital.image}
                        alt={hospital.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-neon-pink text-white">
                          {hospital.type}
                        </Badge>
                        {hospital.emergencyServices && (
                          <Badge className="bg-red-500 text-white">
                            <Zap className="w-3 h-3 mr-1" />
                            Emergency
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                          <span className="text-white font-medium">{hospital.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {hospital.name}
                          </h3>
                          <div className="flex items-center text-gray-300 mb-1">
                            <MapPin className="w-4 h-4 mr-2 text-neon-pink" />
                            {hospital.address}
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Navigation className="w-4 h-4 mr-2 text-electric-cyan" />
                            {hospital.distance} away
                          </div>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hospital.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="border-electric-cyan/30 text-electric-cyan"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Hospital Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="glass p-3 rounded-lg text-center bg-gray-800/30">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-neon-pink mr-1" />
                            <span className="text-neon-pink font-bold">{hospital.availableBeds}</span>
                          </div>
                          <div className="text-gray-400 text-sm">Available Beds</div>
                        </div>
                        <div className="glass p-3 rounded-lg text-center bg-gray-800/30">
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4 text-electric-cyan mr-1" />
                            <span className="text-electric-cyan font-bold">{hospital.operatingHours}</span>
                          </div>
                          <div className="text-gray-400 text-sm">Operating Hours</div>
                        </div>
                      </div>

                      {/* Blood Availability */}
                      {hospital.bloodBank && (
                        <div className="mb-6">
                          <h4 className="text-white font-medium mb-3 flex items-center">
                            <Heart className="w-4 h-4 mr-2 text-neon-pink" fill="currentColor" />
                            Blood Availability
                          </h4>
                          <div className="grid grid-cols-4 gap-2">
                            {Object.entries(hospital.bloodUnitsAvailable).map(([type, count]) => (
                              <div key={type} className="glass p-2 rounded text-center bg-gray-800/30">
                                <div className="text-white font-bold">{type}</div>
                                <div className={`text-sm font-medium ${getBloodAvailabilityColor(count)}`}>
                                  {count} units
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact Actions */}
                      <div className="flex space-x-3">
                        <Button
                          className="flex-1 bg-gradient-to-r from-neon-pink to-electric-cyan text-white"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Hospital
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {/* Empty State */}
          {filteredHospitals.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-neon-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-neon-pink" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No hospitals found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
