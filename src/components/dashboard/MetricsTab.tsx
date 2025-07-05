import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MetricsTab = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock data for charts
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Active Users',
        data: [80, 150, 250, 400, 180, 280],
        borderColor: 'rgb(45, 212, 191)',
        backgroundColor: 'rgba(45, 212, 191, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const ideaViewsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Idea Views',
        data: [1200, 1900, 3000, 2500],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(45, 212, 191, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  const industryDistribution = {
    labels: ['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Other'],
    datasets: [
      {
        data: [35, 20, 15, 12, 10, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(45, 212, 191, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(191, 219, 254)',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(191, 219, 254)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgb(191, 219, 254)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(191, 219, 254)',
          padding: 20,
        },
      },
    },
  };

  const metrics = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Idea Views',
      value: '18,392',
      change: '+8.2%',
      trend: 'up',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Liked Ideas',
      value: '1,247',
      change: '+15.3%',
      trend: 'up',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Success Rate',
      value: '87%',
      change: '+2.1%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-white mb-2">
            Analytics & <span className="gradient-text">Metrics</span>
          </h1>
          <p className="text-blue-100">
            Track your startup's performance and user engagement
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d" className="bg-slate-800">Last 7 days</option>
            <option value="30d" className="bg-slate-800">Last 30 days</option>
            <option value="90d" className="bg-slate-800">Last 90 days</option>
            <option value="1y" className="bg-slate-800">Last year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 glassmorphism text-white rounded-lg hover:bg-white/20 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glassmorphism p-6 rounded-2xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${metric.color} p-3 rounded-xl`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
            <p className="text-blue-100 text-sm">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">User Growth</h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-300" />
              <span className="text-blue-100 text-sm">Last 6 months</span>
            </div>
          </div>
          <div className="h-64">
            <Line data={userGrowthData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Idea Views Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Weekly Idea Views</h3>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-300" />
              <span className="text-blue-100 text-sm">This month</span>
            </div>
          </div>
          <div className="h-64">
            <Bar data={ideaViewsData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Industry Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6">Industry Distribution</h3>
          <div className="h-64">
            <Doughnut data={industryDistribution} options={doughnutOptions} />
          </div>
        </motion.div>

        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6">Performance Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Conversion Rate</p>
                <p className="text-blue-100 text-sm">Ideas to Startups</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">23.5%</p>
                <p className="text-green-400 text-sm">+5.2%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Avg. Session Time</p>
                <p className="text-blue-100 text-sm">Per user visit</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">8m 42s</p>
                <p className="text-green-400 text-sm">+1.3%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">User Retention</p>
                <p className="text-blue-100 text-sm">30-day retention</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">68%</p>
                <p className="text-green-400 text-sm">+3.1%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-semibold">Revenue Growth</p>
                <p className="text-blue-100 text-sm">Monthly recurring</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">$12.4K</p>
                <p className="text-green-400 text-sm">+18.7%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Analytics Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glassmorphism p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Top Performing Ideas</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-blue-100 hover:bg-white/20 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 text-blue-100 font-semibold">Idea Title</th>
                <th className="text-left py-3 px-4 text-blue-100 font-semibold">Industry</th>
                <th className="text-left py-3 px-4 text-blue-100 font-semibold">Views</th>
                <th className="text-left py-3 px-4 text-blue-100 font-semibold">Likes</th>
                <th className="text-left py-3 px-4 text-blue-100 font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'AI-Powered Personal Finance Coach', industry: 'Finance', views: 2847, likes: 234, rating: 4.8 },
                { title: 'Virtual Reality Fitness Platform', industry: 'Healthcare', views: 2156, likes: 189, rating: 4.6 },
                { title: 'Sustainable Food Delivery Network', industry: 'Social Impact', views: 1923, likes: 167, rating: 4.7 },
                { title: 'AI-Powered Code Review Assistant', industry: 'Technology', views: 1834, likes: 201, rating: 4.9 },
                { title: 'Mental Health Chatbot for Students', industry: 'Healthcare', views: 1672, likes: 143, rating: 4.5 }
              ].map((idea, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white">{idea.title}</td>
                  <td className="py-3 px-4 text-blue-100">{idea.industry}</td>
                  <td className="py-3 px-4 text-blue-100">{idea.views.toLocaleString()}</td>
                  <td className="py-3 px-4 text-blue-100">{idea.likes}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white">{idea.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MetricsTab;