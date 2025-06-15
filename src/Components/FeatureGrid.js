import React from 'react';
import { motion } from 'framer-motion';

const FeatureGrid = ({ features }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="group"
        >
          <motion.div 
            className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 p-6 rounded-xl hover:border-[#00FF84] transition-all duration-300 h-full"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 40px rgba(0, 255, 132, 0.15)",
              y: -5
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <feature.icon className="w-10 h-10 text-[#00FF84] mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-3 group-hover:text-[#00FF84] transition-colors">
              {feature.title}
            </h3>
            <p className="text-[#CCCCCC] text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureGrid;
