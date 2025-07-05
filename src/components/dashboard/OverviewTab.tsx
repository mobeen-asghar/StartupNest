import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Lightbulb, 
  TrendingUp, 
  Heart, 
  Eye, 
  Star,
  RefreshCw
} from 'lucide-react';
import { startupIdeas } from '../../data/startupIdeas';

const OverviewTab = () => {
  const [ideas, setIdeas] = useState(startupIdeas);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [likedIdeas, setLikedIdeas] = useState<string[]>([]);

  const industries = ['All', 'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce', 'Social Impact'];

  useEffect(() => {
    const saved = localStorage.getItem('likedIdeas');
    if (saved) {
      setLikedIdeas(JSON.parse(saved));
    }
  }, []);

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || idea.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const handleLike = (ideaId: string) => {
    const updated = likedIdeas.includes(ideaId)
      ? likedIdeas.filter(id => id !== ideaId)
      : [...likedIdeas, ideaId];
    
    setLikedIdeas(updated);
    localStorage.setItem('likedIdeas', JSON.stringify(updated));
  };

  const generateNewIdeas = () => {
    // Shuffle the ideas array to show different ones
    const shuffled = [...startupIdeas].sort(() => Math.random() - 0.5);
    setIdeas(shuffled);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-white mb-2">
            AI-Generated <span className="gradient-text">Startup Ideas</span>
          </h1>
          <p className="text-blue-100">
            Discover innovative business opportunities powered by artificial intelligence
          </p>
        </div>
        <button
          onClick={generateNewIdeas}
          className="flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-4 h-4" />
          Generate New Ideas
        </button>
      </div>

      {/* Filters */}
      <div className="glassmorphism p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-blue-300 w-5 h-5" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {industries.map(industry => (
                <option key={industry} value={industry} className="bg-slate-800">
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glassmorphism p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="gradient-bg p-3 rounded-xl">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{filteredIdeas.length}</p>
              <p className="text-blue-100">Ideas Available</p>
            </div>
          </div>
        </div>
        
        <div className="glassmorphism p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="gradient-bg p-3 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{likedIdeas.length}</p>
              <p className="text-blue-100">Liked Ideas</p>
            </div>
          </div>
        </div>
        
        <div className="glassmorphism p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="gradient-bg p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">87%</p>
              <p className="text-blue-100">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea, index) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glassmorphism p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 hover-scale"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm rounded-full">
                  {idea.industry}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-blue-100 text-sm">{idea.rating}</span>
                </div>
              </div>
              <button
                onClick={() => handleLike(idea.id)}
                className={`p-2 rounded-lg transition-colors ${
                  likedIdeas.includes(idea.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-blue-300 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${likedIdeas.includes(idea.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h3 className="text-xl font-bold font-poppins text-white mb-3">
              {idea.title}
            </h3>
            
            <p className="text-blue-100 mb-4 leading-relaxed">
              {idea.description}
            </p>

            <div className="space-y-3">
              <div>
                <p className="text-white font-semibold mb-2">Target Market:</p>
                <p className="text-blue-100 text-sm">{idea.targetMarket}</p>
              </div>
              
              <div>
                <p className="text-white font-semibold mb-2">Revenue Model:</p>
                <p className="text-blue-100 text-sm">{idea.revenueModel}</p>
              </div>
              
              <div>
                <p className="text-white font-semibold mb-2">Key Features:</p>
                <ul className="text-blue-100 text-sm space-y-1">
                  {idea.keyFeatures.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-blue-300" />
                  <span className="text-blue-100 text-sm">{idea.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">{idea.marketPotential}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  idea.difficulty === 'Easy' ? 'bg-green-400' :
                  idea.difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span className="text-blue-100 text-sm">{idea.difficulty}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="w-16 h-16 text-blue-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No ideas found</h3>
          <p className="text-blue-100">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;