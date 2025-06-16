import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Share2 } from 'lucide-react';

const ActionButtons = ({ onEdit, onDelete, onShare }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Actions</h2>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Expense
        </motion.button>
        
        <motion.button
          onClick={onShare}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Details
        </motion.button>
        
        <motion.button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Expense
        </motion.button>
      </div>
      
      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-400 text-sm flex items-center">
          <span className="mr-2">⚠️</span>
          Only the expense creator or group admin can edit or delete this expense.
        </p>
      </div>
    </motion.div>
  );
};

export default ActionButtons;