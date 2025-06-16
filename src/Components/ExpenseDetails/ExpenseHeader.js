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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          {/* Back Button */}
          <motion.button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-[#00FF84] transition-colors mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to {group.name}
          </motion.button>

          {/* Main Header Content */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              {/* Category Badge */}
              <div className="flex items-center mb-3">
                <div className="flex items-center px-3 py-1 bg-[#00FF84]/20 text-[#00FF84] rounded-full text-sm font-medium">
                  <span className="mr-2">{getCategoryIcon(expense.category)}</span>
                  {expense.category}
                </div>
              </div>

              {/* Title */}
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {expense.title}
              </motion.h1>

              {/* Amount */}
              <motion.div 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00FF84] mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                ₹{expense.amount.toLocaleString()}
              </motion.div>

              {/* Meta Information */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 text-sm text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Paid by {expense.paidBy.name}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(expense.date)}
                </div>
                <div className="flex items-center">
                  <Receipt className="w-4 h-4 mr-1" />
                  Split among {expense.totalParticipants} people
                </div>
              </motion.div>
            </div>

            {/* Paid By Avatar */}
            <motion.div 
              className="mt-6 lg:mt-0 lg:ml-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold text-xl mb-2">
                  {expense.paidBy.avatar}
                </div>
                <span className="text-sm text-gray-400">Paid by</span>
                <span className="text-white font-medium">{expense.paidBy.name}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExpenseHeader;