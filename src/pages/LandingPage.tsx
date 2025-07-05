import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Lightbulb,
  BarChart3,
  Zap
} from 'lucide-react';
import Header from '../components/Header';
import TestimonialSlider from '../components/TestimonialSlider';
import Footer from '../components/Footer';

const LandingPage = () => {
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "AI-Powered Ideas",
      description: "Generate and validate startup ideas with our advanced AI algorithms that analyze market trends and opportunities."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Roadmap Builder",
      description: "Create detailed roadmaps with drag-and-drop functionality to plan your startup journey from concept to launch."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Analysis",
      description: "Get comprehensive market insights and competitor analysis to make informed decisions about your startup."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Validation",
      description: "Quickly validate your ideas with our proprietary scoring system and community feedback platform."
    }
  ];

  const benefits = [
    "Reduce time to market by 70%",
    "Access to 10,000+ startup templates",
    "AI-driven market validation",
    "Real-time collaboration tools",
    "Expert mentor network access"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold font-poppins text-white mb-6">
                Launch Your Startup in{' '}
                <span className="gradient-text">Weeks</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your ideas into successful startups with AI-powered insights, 
                comprehensive planning tools, and expert guidance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-teal-500 transition-all duration-300 flex items-center gap-2 hover-scale"
              >
                Start Brainstorming
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 glassmorphism text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                View Pricing
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 text-blue-100"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10,000+ Entrepreneurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                <span>500+ Launches</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and insights needed to turn your ideas into thriving businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glassmorphism p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 hover-scale"
              >
                <div className="gradient-bg p-3 rounded-xl w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-poppins text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
                Why Choose <span className="gradient-text">StartupNest</span>?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of entrepreneurs who have successfully launched their startups with our platform.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-teal-400 flex-shrink-0" />
                    <span className="text-blue-100 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glassmorphism p-8 rounded-2xl">
                <div className="bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-lg">Success Rate</h3>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">87%</div>
                  <p className="text-blue-100">of our users successfully launch</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">10K+</div>
                    <div className="text-blue-100 text-sm">Ideas Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">500+</div>
                    <div className="text-blue-100 text-sm">Startups Launched</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
              Ready to Build Your <span className="gradient-text">Dream Startup</span>?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who are already building the future. Start your journey today.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-teal-500 transition-all duration-300 hover-scale"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;