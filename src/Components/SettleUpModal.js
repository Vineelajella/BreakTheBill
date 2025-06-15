import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, CreditCard, Smartphone } from 'lucide-react';

const SettleUpModal = ({ isOpen, onClose, groupMembers }) => {
  const [formData, setFormData] = useState({
    payer: '',
    receiver: '',
    amount: '',
    paymentMethod: 'manual'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Settlement recorded:', formData);
    setIsSubmitting(false);
    onClose();
  };

  const payerMember = groupMembers?.find(m => m.id.toString() === formData.payer);
  const receiverMember = groupMembers?.find(m => m.id.toString() === formData.receiver);

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
            className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center mr-3">
                  <DollarSign className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-xl font-semibold text-white">Settle Up</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Payer
                  </label>
                  <select
                    value={formData.payer}
                    onChange={(e) => setFormData(prev => ({ ...prev, payer: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                    required
                  >
                    <option value="">Select payer</option>
                    {groupMembers?.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Receiver
                  </label>
                  <select
                    value={formData.receiver}
                    onChange={(e) => setFormData(prev => ({ ...prev, receiver: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                    required
                  >
                    <option value="">Select receiver</option>
                    {groupMembers?.filter(m => m.id.toString() !== formData.payer).map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
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
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <motion.div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.paymentMethod === 'manual'
                        ? 'border-[#00FF84] bg-[#00FF84]/10'
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'manual' }))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-[#00FF84] mr-3" />
                      <div>
                        <div className="text-white font-medium">Manual Payment</div>
                        <div className="text-gray-400 text-sm">Record payment made outside the app</div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.paymentMethod === 'razorpay'
                        ? 'border-[#00FF84] bg-[#00FF84]/10'
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'razorpay' }))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <Smartphone className="w-5 h-5 text-[#00FF84] mr-3" />
                      <div>
                        <div className="text-white font-medium">Pay with Razorpay</div>
                        <div className="text-gray-400 text-sm">Instant payment via UPI/Cards</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Summary */}
              {payerMember && receiverMember && formData.amount && (
                <div className="bg-[#00FF84]/10 border border-[#00FF84]/30 rounded-xl p-4">
                  <h4 className="text-[#00FF84] font-medium mb-2">Settlement Summary</h4>
                  <p className="text-white">
                    <span className="font-semibold">{payerMember.name}</span> will pay{' '}
                    <span className="font-semibold text-[#00FF84]">₹{formData.amount}</span> to{' '}
                    <span className="font-semibold">{receiverMember.name}</span>
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={!formData.payer || !formData.receiver || !formData.amount || isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      {formData.paymentMethod === 'razorpay' ? 'Pay Now' : 'Record Payment'}
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

export default SettleUpModal;