import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const DescriptionSection = ({ description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <FileText className="w-5 h-5 mr-2 text-[#00FF84]" />
        Description & Notes
      </h2>
      
      <div className="bg-gray-800/50 rounded-xl p-4">
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default DescriptionSection;