import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Upload, Edit3, Trash2, CheckCircle } from 'lucide-react';

const AuditTrail = ({ auditTrail }) => {
  const getActionIcon = (action) => {
    switch (action) {
      case 'created':
        return <Plus className="w-4 h-4 text-[#00FF84]" />;
      case 'updated':
        return <Edit3 className="w-4 h-4 text-blue-400" />;
      case 'receipt_uploaded':
        return <Upload className="w-4 h-4 text-purple-400" />;
      case 'deleted':
        return <Trash2 className="w-4 h-4 text-red-400" />;
      case 'settled':
        return <CheckCircle className="w-4 h-4 text-[#00FF84]" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActionText = (action) => {
    switch (action) {
      case 'created':
        return 'Created expense';
      case 'updated':
        return 'Updated expense';
      case 'receipt_uploaded':
        return 'Uploaded receipt';
      case 'deleted':
        return 'Deleted expense';
      case 'settled':
        return 'Marked as settled';
      default:
        return 'Unknown action';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Clock className="w-5 h-5 mr-2 text-[#00FF84]" />
        Activity Timeline
      </h2>

      <div className="space-y-4">
        {auditTrail.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl"
          >
            {/* Timeline Dot */}
            <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              {getActionIcon(entry.action)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold text-xs">
                    {entry.user.avatar}
                  </div>
                  <span className="text-white font-medium">{entry.user.name}</span>
                  <span className="text-gray-400">{getActionText(entry.action)}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(entry.timestamp)}
                </span>
              </div>
              
              {entry.details && (
                <p className="text-sm text-gray-400 mt-1 ml-8">
                  {entry.details}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {auditTrail.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-400">No activity recorded yet</p>
        </div>
      )}
    </motion.div>
  );
};

export default AuditTrail;