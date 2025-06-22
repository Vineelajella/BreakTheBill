// Enhanced Add Expense Modal with all required functionality

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Receipt, Upload, Plus, Minus, DollarSign, Percent, Calculator } from 'lucide-react';

const AddExpenseModal = ({ isOpen, onClose, groupMembers, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    paidBy: groupMembers?.[0]?.id.toString() || '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: '',
    splitType: 'equal',
    participants: groupMembers?.map(m => ({ 
      ...m, 
      selected: true, 
      amount: 0, 
      percentage: 0,
      bonus: 0,
      excluded: false 
    })) || []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  const categories = ['Food', 'Transport', 'Accommodation', 'Entertainment', 'Shopping', 'Bills', 'Other', ...customCategories];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Prepare submission data
    const submissionData = {
      ...formData,
      receipt: receipt,
      participants: formData.participants.filter(p => p.selected && !p.excluded)
    };
    
    onSubmit(submissionData);
    
    // Reset form
    resetForm();
    setIsSubmitting(false);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('Please enter an expense title');
      return false;
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return false;
    }
    
    const selectedParticipants = formData.participants.filter(p => p.selected && !p.excluded);
    if (selectedParticipants.length === 0) {
      alert('Please select at least one participant');
      return false;
    }
    
    if (formData.splitType === 'custom') {
      const totalCustomAmount = selectedParticipants.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
      if (Math.abs(totalCustomAmount - parseFloat(formData.amount)) > 0.01) {
        alert('Custom amounts must equal the total expense amount');
        return false;
      }
    }
    
    if (formData.splitType === 'percentage') {
      const totalPercentage = selectedParticipants.reduce((sum, p) => sum + (parseFloat(p.percentage) || 0), 0);
      if (Math.abs(totalPercentage - 100) > 0.01) {
        alert('Percentages must total 100%');
        return false;
      }
    }
    
    return true;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      paidBy: groupMembers?.[0]?.id.toString() || '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      description: '',
      splitType: 'equal',
      participants: groupMembers?.map(m => ({ 
        ...m, 
        selected: true, 
        amount: 0, 
        percentage: 0,
        bonus: 0,
        excluded: false 
      })) || []
    });
    setReceipt(null);
    setReceiptPreview(null);
    setNewCategory('');
    setShowNewCategory(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
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

  const handleExcludeToggle = (memberId) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.map(p => 
        p.id === memberId ? { ...p, excluded: !p.excluded, selected: p.excluded ? true : false } : p
      )
    }));
  };

  const handleParticipantAmountChange = (memberId, field, value) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.map(p => 
        p.id === memberId ? { ...p, [field]: parseFloat(value) || 0 } : p
      )
    }));
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setReceipt(file);
      const reader = new FileReader();
      reader.onload = (e) => setReceiptPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeReceipt = () => {
    setReceipt(null);
    setReceiptPreview(null);
  };

  const addCustomCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCustomCategories(prev => [...prev, newCategory.trim()]);
      setFormData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  const selectedParticipants = formData.participants.filter(p => p.selected && !p.excluded);
  const amountPerPerson = formData.amount && selectedParticipants.length > 0 
    ? Math.round((parseFloat(formData.amount) / selectedParticipants.length) * 100) / 100 
    : 0;

  const calculateEqualSplit = () => {
    if (formData.amount && selectedParticipants.length > 0) {
      const equalAmount = parseFloat(formData.amount) / selectedParticipants.length;
      setFormData(prev => ({
        ...prev,
        participants: prev.participants.map(p => 
          p.selected && !p.excluded ? { ...p, amount: equalAmount, percentage: 100 / selectedParticipants.length } : p
        )
      }));
    }
  };

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
            className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900/95 backdrop-blur-sm">
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
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
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
                  <div className="flex gap-2">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewCategory(!showNewCategory)}
                      className="px-3 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {showNewCategory && (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category name"
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] text-sm"
                      />
                      <button
                        type="button"
                        onClick={addCustomCategory}
                        className="px-3 py-2 bg-[#00FF84] text-black rounded-lg hover:bg-[#00C97F] transition-colors text-sm"
                      >
                        Add
                      </button>
                    </div>
                  )}
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
                  Split Type
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { value: 'equal', label: 'Equal Split', icon: Calculator },
                    { value: 'custom', label: 'Custom Amount', icon: DollarSign },
                    { value: 'percentage', label: 'By Percentage', icon: Percent }
                  ].map(({ value, label, icon: Icon }) => (
                    <motion.button
                      key={value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, splitType: value }))}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.splitType === value
                          ? 'border-[#00FF84] bg-[#00FF84]/10'
                          : 'border-gray-600 bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2 text-[#00FF84]" />
                      <div className="text-white text-sm font-medium">{label}</div>
                    </motion.button>
                  ))}
                </div>

                {formData.splitType === 'equal' && (
                  <div className="bg-[#00FF84]/10 border border-[#00FF84]/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#00FF84] font-medium">Equal split among {selectedParticipants.length} people</span>
                      <span className="text-[#00FF84] font-bold">₹{amountPerPerson} each</span>
                    </div>
                  </div>
                )}

                {(formData.splitType === 'custom' || formData.splitType === 'percentage') && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={calculateEqualSplit}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      Auto-fill equal amounts
                    </button>
                  </div>
                )}
              </div>

              {/* Participants */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Shared With ({selectedParticipants.length} people)
                </label>
                <div className="space-y-3">
                  {formData.participants.map(participant => (
                    <motion.div
                      key={participant.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        participant.excluded
                          ? 'border-red-500/30 bg-red-500/10 opacity-60'
                          : participant.selected
                          ? 'border-[#00FF84] bg-[#00FF84]/10'
                          : 'border-gray-600 bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold mr-3">
                            {participant.avatar}
                          </div>
                          <div>
                            <span className="text-white font-medium">{participant.name}</span>
                            {participant.excluded && (
                              <span className="ml-2 text-xs text-red-400">(Excluded)</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center text-sm text-gray-300">
                            <input
                              type="checkbox"
                              checked={participant.excluded}
                              onChange={() => handleExcludeToggle(participant.id)}
                              className="mr-2"
                            />
                            Exclude
                          </label>
                          <label className="flex items-center text-sm text-gray-300">
                            <input
                              type="checkbox"
                              checked={participant.selected && !participant.excluded}
                              onChange={() => handleParticipantToggle(participant.id)}
                              disabled={participant.excluded}
                              className="mr-2"
                            />
                            Include
                          </label>
                        </div>
                      </div>

                      {participant.selected && !participant.excluded && (
                        <div className="grid grid-cols-2 gap-3">
                          {formData.splitType === 'custom' && (
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Custom Amount</label>
                              <input
                                type="number"
                                value={participant.amount || ''}
                                onChange={(e) => handleParticipantAmountChange(participant.id, 'amount', e.target.value)}
                                placeholder="0.00"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] text-sm"
                                min="0"
                                step="0.01"
                              />
                            </div>
                          )}
                          
                          {formData.splitType === 'percentage' && (
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Percentage</label>
                              <input
                                type="number"
                                value={participant.percentage || ''}
                                onChange={(e) => handleParticipantAmountChange(participant.id, 'percentage', e.target.value)}
                                placeholder="0"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] text-sm"
                                min="0"
                                max="100"
                                step="0.1"
                              />
                            </div>
                          )}
                          
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Bonus Amount</label>
                            <input
                              type="number"
                              value={participant.bonus || ''}
                              onChange={(e) => handleParticipantAmountChange(participant.id, 'bonus', e.target.value)}
                              placeholder="0.00"
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] text-sm"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                      )}

                      {participant.selected && !participant.excluded && formData.amount && (
                        <div className="mt-3 text-xs text-[#00FF84]">
                          {formData.splitType === 'equal' && `₹${amountPerPerson} + ₹${participant.bonus || 0} bonus`}
                          {formData.splitType === 'custom' && `₹${participant.amount || 0} + ₹${participant.bonus || 0} bonus`}
                          {formData.splitType === 'percentage' && `${participant.percentage || 0}% (₹${((participant.percentage || 0) * parseFloat(formData.amount) / 100).toFixed(2)}) + ₹${participant.bonus || 0} bonus`}
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
                {!receiptPreview ? (
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-[#00FF84] transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptUpload}
                      className="hidden"
                      id="receipt-upload"
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Click to upload receipt image</p>
                      <p className="text-gray-500 text-xs mt-1">JPG, PNG up to 10MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={receiptPreview}
                      alt="Receipt preview"
                      className="w-full max-w-md mx-auto rounded-xl border border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={removeReceipt}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-700">
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