import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Check } from 'lucide-react';

const CreateGroupModal = ({ isOpen, onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({ name: groupName.trim() });
    setGroupName('');
    setIsSubmitting(false);
  };
  ///fghj

  const handleClose = () => {
    if (!isSubmitting) {
      setGroupName('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
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
                  <Users className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-xl font-semibold text-white">Create New Group</h2>
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
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Goa Trip 2025, Flatmates, Office Lunch"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF84] focus:ring-1 focus:ring-[#00FF84] transition-all duration-200"
                  disabled={isSubmitting}
                  autoFocus
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {groupName.length}/50 characters
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-[#00FF84] mb-2">What happens next?</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• You'll be the group owner</li>
                  <li>• Get a unique invite code to share</li>
                  <li>• Start adding expenses immediately</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
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
                  disabled={!groupName.trim() || isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Create Group
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

export default CreateGroupModal;