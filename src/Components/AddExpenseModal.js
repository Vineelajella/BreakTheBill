// add expense modal component

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Receipt, Upload, Plus, Minus, DollarSign } from 'lucide-react';

const AddExpenseModal = ({ isOpen, onClose, groupMembers, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    paidBy: groupMembers?.[0]?.id.toString() || '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: '',
    splitType: 'equal',
    participants: groupMembers?.map(m => ({ ...m, selected: true, amount: 0 })) || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Food', 'Transport', 'Accommodation', 'Entertainment', 'Shopping', 'Other'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      amount: '',
      paidBy: groupMembers?.[0]?.id.toString() || '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      description: '',
      splitType: 'equal',
      participants: groupMembers?.map(m => ({ ...m, selected: true, amount: 0 })) || []
    });
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Reset form on close
      setFormData({
        title: '',
        amount: '',
        paidBy: groupMembers?.[0]?.id.toString() || '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        description: '',
        splitType: 'equal',
        participants: groupMembers?.map(m => ({ ...m, selected: true, amount: 0 })) || []
      });
      onClose();
    }
  };

  const handleParticipantToggle = (memberId) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.map(p => 
        p.id === memberId ? { ...p, selected: !p.selected } : p
      )
    }));
  };

  const selectedParticipants = formData.participants.filter(p => p.selected);
  const amountPerPerson = formData.amount ? Math.round(formData.amount / selectedParticipants.length) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
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
                <h2 className="text-xl font-semibold text-white">Add Expense</h2>
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expense Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Dinner at restaurant"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || '' }))}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                      required
                      min="0"
                      step="0.01"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Paid By
                  </label>
                  <select
                    value={formData.paidBy}
                    onChange={(e) => setFormData(prev => ({ ...prev, paidBy: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    {groupMembers?.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add any additional details..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Split Options */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Split Between ({selectedParticipants.length} people)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {formData.participants.map(participant => (
                    <motion.div
                      key={participant.id}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        participant.selected
                          ? 'border-[#00FF84] bg-[#00FF84]/10'
                          : 'border-gray-600 bg-gray-800/50'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !isSubmitting && handleParticipantToggle(participant.id)}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold text-sm mr-2">
                            {participant.avatar}
                          </div>
                          <span className="text-white text-sm">{participant.name}</span>
                        </div>
                        <div className={`w-4 h-4 rounded border-2 ${
                          participant.selected ? 'bg-[#00FF84] border-[#00FF84]' : 'border-gray-400'
                        }`}>
                          {participant.selected && (
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      {participant.selected && formData.amount && (
                        <div className="mt-2 text-xs text-[#00FF84]">
                          ₹{amountPerPerson} per person
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Receipt Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Receipt (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-[#00FF84] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Click to upload receipt image</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={!formData.title || !formData.amount || selectedParticipants.length === 0 || isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Expense
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;
//dfghj