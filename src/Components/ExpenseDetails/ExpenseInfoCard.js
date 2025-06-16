import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, XCircle, Gift, Info } from 'lucide-react';

const ExpenseInfoCard = ({ expense }) => {
  const [hoveredParticipant, setHoveredParticipant] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-[#00FF84]" />;
      case 'owes':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'excluded':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'owes':
        return 'Owes';
      case 'excluded':
        return 'Excluded';
      default:
        return 'Unknown';
    }
  };

  const getSplitMethodText = (method) => {
    switch (method) {
      case 'equal':
        return 'Split Equally';
      case 'custom':
        return 'Custom Amount';
      case 'percentage':
        return 'By Percentage';
      default:
        return 'Equal Split';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-[#00FF84]" />
          Expense Details
        </h2>
        <div className="flex items-center px-3 py-1 bg-[#00FF84]/20 text-[#00FF84] rounded-full text-sm">
          {getSplitMethodText(expense.splitMethod)}
        </div>
      </div>

      {/* Split Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Split Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-[#00FF84] font-semibold">₹{expense.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Participants</span>
              <span className="text-white">{expense.totalParticipants} people</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Per Person</span>
              <span className="text-[#00FF84] font-semibold">
                ₹{Math.round(expense.amount / expense.totalParticipants).toLocaleString()}
              </span>
            </div>
            {expense.bonusGiven > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400 flex items-center">
                  <Gift className="w-3 h-3 mr-1" />
                  Bonus Given
                </span>
                <span className="text-yellow-400 font-semibold">₹{expense.bonusGiven}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Payment Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Paid</span>
              <span className="text-[#00FF84]">
                {expense.participants.filter(p => p.status === 'paid').length} person(s)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pending</span>
              <span className="text-yellow-400">
                {expense.participants.filter(p => p.status === 'owes').length} person(s)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Collected</span>
              <span className="text-white font-semibold">
                ₹{expense.participants
                  .filter(p => p.status === 'paid')
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Participants List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Shared With</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {expense.participants.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                participant.status === 'paid'
                  ? 'bg-[#00FF84]/10 border-[#00FF84]/30'
                  : participant.status === 'owes'
                  ? 'bg-yellow-400/10 border-yellow-400/30'
                  : 'bg-gray-800/50 border-gray-600'
              }`}
              onMouseEnter={() => setHoveredParticipant(participant.id)}
              onMouseLeave={() => setHoveredParticipant(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold mr-3">
                    {participant.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium">{participant.name}</div>
                    <div className="flex items-center text-xs">
                      {getStatusIcon(participant.status)}
                      <span className={`ml-1 ${
                        participant.status === 'paid' ? 'text-[#00FF84]' :
                        participant.status === 'owes' ? 'text-yellow-400' :
                        'text-gray-400'
                      }`}>
                        {getStatusText(participant.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    participant.status === 'paid' ? 'text-[#00FF84]' :
                    participant.status === 'owes' ? 'text-yellow-400' :
                    'text-gray-400'
                  }`}>
                    ₹{participant.amount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Hover Tooltip */}
              {hoveredParticipant === participant.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 p-2 bg-gray-900 border border-gray-600 rounded-lg text-xs z-10"
                >
                  <div className="text-gray-300">
                    {participant.status === 'paid' 
                      ? `✅ Paid ₹${participant.amount} on ${new Date().toLocaleDateString()}`
                      : participant.status === 'owes'
                      ? `⏳ Owes ₹${participant.amount} to ${expense.paidBy.name}`
                      : '❌ Excluded from this expense'
                    }
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Excluded Members */}
      {expense.excludedMembers && expense.excludedMembers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <XCircle className="w-5 h-5 mr-2 text-gray-400" />
            Excluded Members
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {expense.excludedMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 bg-gray-800/30 border border-gray-600 rounded-xl opacity-60"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-gray-300 font-bold mr-3">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="text-gray-300 font-medium">{member.name}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Info className="w-3 h-3 mr-1" />
                      {member.reason || 'Excluded'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ExpenseInfoCard;