import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, ZoomIn, Download, Calendar } from 'lucide-react';

const ReceiptSection = ({ receipt, onView, onDownload }) => {
  const formatUploadDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Receipt className="w-5 h-5 mr-2 text-[#00FF84]" />
          Receipt
        </h2>
        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="w-4 h-4 mr-1" />
          Uploaded {formatUploadDate(receipt.uploadedAt)}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Receipt Preview */}
        <div className="relative group">
          <motion.div
            className="relative overflow-hidden rounded-xl border border-gray-600 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={onView}
          >
            <img
              src={receipt.url}
              alt="Receipt"
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-[#00FF84] p-3 rounded-full">
                <ZoomIn className="w-6 h-6 text-black" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Receipt Info */}
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">File Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Filename</span>
                <span className="text-white font-mono text-sm">{receipt.filename}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Uploaded</span>
                <span className="text-white">{formatUploadDate(receipt.uploadedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-[#00FF84] flex items-center">
                  <div className="w-2 h-2 bg-[#00FF84] rounded-full mr-2"></div>
                  Available
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <motion.button
              onClick={onView}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ZoomIn className="w-4 h-4 mr-2" />
              View Full Size
            </motion.button>
            
            <motion.button
              onClick={onDownload}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReceiptSection;