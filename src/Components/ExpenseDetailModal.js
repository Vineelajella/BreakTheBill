import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Receipt, Calendar, Tag, User, Users } from 'lucide-react';

const ExpenseDetailModal = ({ isOpen, onClose, expense }) => {
  if (!expense) return null;

  const amountPerPerson = Math.round(expense.amount / expense.splitBetween);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center mr-3">
                  <Receipt className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-xl font-semibold text-white">Expense Details</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{expense.title}</h3>
                <div className="text-3xl font-bold text-[#00FF84] mb-4">₹{expense.amount}</div>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    {expense.category}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Paid by {expense.paidBy}
                  </div>
                </div>
              </div>

              {/* Description */}
              {expense.description && (
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
                  <p className="text-white">{expense.description}</p>
                </div>
              )}

              {/* Split Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Split Breakdown
                </h4>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-600">
                    <span className="text-gray-300">Total Amount</span>
                    <span className="text-[#00FF84] font-semibold">₹{expense.amount}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-300">Split Between</span>
                    <span className="text-white">{expense.splitBetween} people</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Amount Per Person</span>
                    <span className="text-[#00FF84] font-semibold">₹{amountPerPerson}</span>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Participants</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {expense.participants.map(participant => (
                    <div
                      key={participant.id}
                      className="flex items-center p-3 bg-gray-800/50 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold text-sm mr-3">
                        {participant.avatar}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{participant.name}</div>
                        <div className="text-[#00FF84] text-xs">₹{amountPerPerson}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Receipt */}
              {expense.receipt && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Receipt</h4>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <img 
                      src={expense.receipt} 
                      alt="Receipt" 
                      className="w-full max-w-md mx-auto rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <motion.button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Edit Expense
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExpenseDetailModal;