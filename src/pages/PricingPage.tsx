import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, Star, Zap, Crown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      icon: <Star className="w-8 h-8" />,
      description: 'Perfect for getting started',
      features: [
        '5 startup ideas per month',
        'Basic roadmap templates',
        'Community support',
        'Basic analytics',
        'Email support'
      ],
      limitations: [
        'No AI insights',
        'Limited customization',
        'No PDF export',
        'No priority support'
      ],
      buttonText: 'Get Started Free',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      icon: <Zap className="w-8 h-8" />,
      description: 'For serious entrepreneurs',
      features: [
        '50 startup ideas per month',
        'Advanced AI insights',
        'Custom roadmap builder',
        'PDF export functionality',
        'Priority support',
        'Market analysis tools',
        'Competitor tracking',
        'Advanced analytics'
      ],
      limitations: [
        'Limited team collaboration',
        'No white-label options'
      ],
      buttonText: 'Start Pro Trial',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      icon: <Crown className="w-8 h-8" />,
      description: 'For growing teams',
      features: [
        'Unlimited startup ideas',
        'Full AI suite access',
        'Team collaboration tools',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
        'Advanced security',
        'Custom training',
        'API access',
        'Priority phone support'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Store selection in localStorage
    localStorage.setItem('selectedPlan', planId);
    
    // Show confirmation message
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      alert(`You've selected the ${plan.name} plan! Your selection has been saved.`);
    }
  };

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold font-poppins text-white mb-6">
                Choose Your <span className="gradient-text">Success</span> Plan
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                From idea validation to market launch, we have the perfect plan 
                to accelerate your startup journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative ${
                    plan.popular 
                      ? 'glassmorphism-dark ring-2 ring-blue-500' 
                      : 'glassmorphism'
                  } p-8 rounded-2xl hover:bg-white/15 transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="gradient-bg px-4 py-2 rounded-full text-white text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${
                      plan.popular ? 'gradient-bg' : 'bg-white/10'
                    }`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-poppins text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-blue-100 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-blue-100">/month</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="text-white font-semibold mb-3">Features included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-teal-400 flex-shrink-0" />
                            <span className="text-blue-100">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="text-white font-semibold mb-3">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                              <span className="text-blue-100">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'gradient-bg text-white hover:opacity-90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    } ${selectedPlan === plan.id ? 'ring-2 ring-teal-400' : ''}`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : plan.buttonText}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
                Compare <span className="gradient-text">Features</span>
              </h2>
              <p className="text-xl text-blue-100">
                See what's included in each plan
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full glassmorphism rounded-2xl">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-6 text-white font-semibold">Feature</th>
                    <th className="text-center py-4 px-6 text-white font-semibold">Free</th>
                    <th className="text-center py-4 px-6 text-white font-semibold">Pro</th>
                    <th className="text-center py-4 px-6 text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Startup Ideas', free: '5/month', pro: '50/month', enterprise: 'Unlimited' },
                    { feature: 'AI Insights', free: '✗', pro: '✓', enterprise: '✓' },
                    { feature: 'Roadmap Builder', free: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
                    { feature: 'PDF Export', free: '✗', pro: '✓', enterprise: '✓' },
                    { feature: 'Team Collaboration', free: '✗', pro: 'Limited', enterprise: 'Full' },
                    { feature: 'API Access', free: '✗', pro: '✗', enterprise: '✓' },
                    { feature: 'Support', free: 'Email', pro: 'Priority', enterprise: 'Dedicated' }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="py-4 px-6 text-blue-100">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-blue-100">{row.free}</td>
                      <td className="py-4 px-6 text-center text-blue-100">{row.pro}</td>
                      <td className="py-4 px-6 text-center text-blue-100">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glassmorphism p-6 rounded-2xl"
                >
                  <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                  <p className="text-blue-100">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-6">
                Ready to Launch Your <span className="gradient-text">Next Big Idea</span>?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of entrepreneurs who are already building successful startups.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Start Your Free Trial
              </Link>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;