import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Bell, 
  BarChart3, 
  Smartphone, 
  Shield, 
  Brain 
} from 'lucide-react';
import FeatureGrid from './FeatureGrid';

const WhyChooseSection = () => {
  const features = [
    { icon: Sparkles, title: "Clean & Minimal UI", desc: "Futuristic design that's intuitive for all age groups" },
    { icon: Bell, title: "Real-Time Notifications", desc: "Stay updated with instant push notifications for all activities" },
    { icon: BarChart3, title: "Smart Expense Visualization", desc: "Beautiful charts and insights to understand spending patterns" },
    { icon: Smartphone, title: "Mobile Ready", desc: "Fully responsive design optimized for all devices" },
    { icon: Shield, title: "Private & Secure", desc: "Bank-level encryption keeps your financial data safe" },
    { icon: Brain, title: "Intelligent Debt Resolution", desc: "AI-powered algorithms minimize the number of transactions needed" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0D0D0D] via-gray-900/20 to-[#0D0D0D] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF84]/5 to-[#1DBE6A]/5 opacity-30"></div>
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-[#00FF84]">Break The Bill</span>
          </h2>
          <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">
            Built with cutting-edge technology for modern users who value simplicity and efficiency
          </p>
        </motion.div>
        
        <FeatureGrid features={features} />
      </motion.div>
    </section>
  );
};

export default WhyChooseSection;
