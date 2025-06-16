import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Receipt, Calendar, Tag, User } from 'lucide-react';

const ExpenseHeader = ({ expense, group, onBack }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Food': '🍽️',
      'Transport': '🚗',
      'Accommodation': '🏨',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Other': '📝'
    };
    return icons[category] || '📝';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Back Button */}
          <motion.button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-[#00FF84] transition-colors mb-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Back to {group.name}</span>
          </motion.button>

          {/* Main Header Content */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              {/* Category Badge and Title Row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center px-2 py-1 bg-[#00FF84]/20 text-[#00FF84] rounded-full text-xs font-medium">
                    <span className="mr-1">{getCategoryIcon(expense.category)}</span>
                    {expense.category}
                  </div>
                  
                  {/* Amount - moved to same line */}
                  <div className="text-2xl sm:text-3xl font-bold text-[#00FF84]">
                    ₹{expense.amount.toLocaleString()}
                  </div>
                </div>
                
                {/* Paid By Avatar - moved to top right */}
                <motion.div 
                  className="lg:hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold mr-2">
                      {expense.paidBy.avatar}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Paid by</div>
                      <div className="text-sm text-white font-medium">{expense.paidBy.name}</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Title */}
              <motion.h1 
                className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {expense.title}
              </motion.h1>

              {/* Meta Information */}
              <motion.div 
                className="flex flex-wrap items-center gap-3 text-xs text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  Paid by {expense.paidBy.name}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(expense.date)}
                </div>
                <div className="flex items-center">
                  <Receipt className="w-3 h-3 mr-1" />
                  Split among {expense.totalParticipants} people
                </div>
              </motion.div>
            </div>

            {/* Paid By Avatar - Desktop */}
            <motion.div 
              className="hidden lg:block ml-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center">
                <div className="text-right mr-3">
                  <div className="text-xs text-gray-400">Paid by</div>
                  <div className="text-sm text-white font-medium">{expense.paidBy.name}</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold">
                  {expense.paidBy.avatar}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExpenseHeader;