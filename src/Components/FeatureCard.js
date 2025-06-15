import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, step }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
    >
      {step && (
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#00FF84] to-[#1DBE6A] rounded-full flex items-center justify-center text-black font-bold text-lg opacity-80">
          {step}
        </div>
      )}
      <motion.div 
        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl hover:border-[#00FF84] transition-all duration-300 h-full"
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 10px 40px rgba(0, 255, 132, 0.1)",
          y: -10
        }}
      >
        <motion.div 
          className="w-16 h-16 bg-gradient-to-r from-[#00FF84] to-[#1DBE6A] rounded-full flex items-center justify-center mb-6"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-8 h-8 text-black" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-4 group-hover:text-[#00FF84] transition-colors">
          {title}
        </h3>
        <p className="text-[#CCCCCC] leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
