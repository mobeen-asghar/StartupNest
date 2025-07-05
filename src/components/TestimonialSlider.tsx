import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechFlow",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "StartupNest helped me validate my idea and build a solid roadmap. We launched in 6 weeks and raised $2M in seed funding!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, DataSync",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The AI-powered insights were game-changing. I discovered market opportunities I never would have found on my own.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Co-founder, GreenTech",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The roadmap builder is intuitive and powerful. It helped us stay organized and hit all our milestones on time.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "CEO, FinanceAI",
    image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "StartupNest's market analysis tools saved us months of research. We launched with confidence and found product-market fit quickly.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Founder, EduTech",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The platform's collaborative features made it easy to work with my co-founders. We built our MVP in record time.",
    rating: 5
  },
  {
    id: 6,
    name: "James Wilson",
    role: "CEO, HealthApp",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The validation tools helped us pivot early and avoid costly mistakes. We're now a profitable SaaS company.",
    rating: 5
  },
  {
    id: 7,
    name: "Anna Martinez",
    role: "Founder, E-commerce Plus",
    image: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "StartupNest's templates and frameworks accelerated our development process. We scaled from 0 to 10K users in 3 months.",
    rating: 5
  },
  {
    id: 8,
    name: "Robert Brown",
    role: "Co-founder, IoT Solutions",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The expert mentor network provided invaluable guidance. We avoided common pitfalls and built a sustainable business model.",
    rating: 5
  },
  {
    id: 9,
    name: "Maria Garcia",
    role: "CEO, Social Impact",
    image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "The platform's comprehensive approach to startup planning is unmatched. We secured our first major client within weeks of launch.",
    rating: 5
  },
  {
    id: 10,
    name: "Alex Johnson",
    role: "Founder, AI Startup",
    image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150",
    content: "StartupNest's AI recommendations were spot-on. We fine-tuned our product based on their insights and achieved 95% customer satisfaction.",
    rating: 5
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4">
            What Our <span className="gradient-text">Entrepreneurs</span> Say
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs who trust StartupNest with their startup journey.
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={prevTestimonial}
              className="hidden md:flex items-center justify-center w-12 h-12 glassmorphism rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {getVisibleTestimonials().map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.id}-${currentIndex}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glassmorphism p-6 rounded-2xl hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <p className="text-blue-100 mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-white font-semibold">{testimonial.name}</h4>
                          <p className="text-blue-300 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={nextTestimonial}
              className="hidden md:flex items-center justify-center w-12 h-12 glassmorphism rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile navigation */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="flex items-center justify-center w-12 h-12 glassmorphism rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="flex items-center justify-center w-12 h-12 glassmorphism rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-teal-400 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;