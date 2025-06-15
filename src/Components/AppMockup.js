import React from 'react';
import { motion } from 'framer-motion';

const AppMockup = () => {
  return (
    <motion.div
      className="relative max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Phone Frame */}
      <div className="relative">
        <motion.div
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-[#0D0D0D] rounded-[2rem] overflow-hidden">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
              <span>9:41</span>
              <div className="flex space-x-1">
                <div className="w-4 h-2 bg-[#00FF84] rounded-sm"></div>
                <div className="w-4 h-2 bg-[#00FF84] rounded-sm"></div>
                <div className="w-4 h-2 bg-gray-600 rounded-sm"></div>
              </div>
            </div>

            {/* App Content */}
            <div className="px-6 pb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#00FF84]">Break The Bill</h3>
                <div className="w-8 h-8 bg-[#00FF84] rounded-full flex items-center justify-center">
                  <span className="text-black text-sm font-bold">4</span>
                </div>
              </div>

              <div className="space-y-3">
                <motion.div
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <span className="text-white font-medium">Dinner at Zomato</span>
                    <p className="text-gray-400 text-sm">Split among 4 people</p>
                  </div>
                  <span className="text-[#00FF84] font-bold">₹1,240</span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <span className="text-white font-medium">Uber Ride</span>
                    <p className="text-gray-400 text-sm">Split equally</p>
                  </div>
                  <span className="text-[#00FF84] font-bold">₹320</span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <span className="text-white font-medium">Movie Tickets</span>
                    <p className="text-gray-400 text-sm">PVR Cinemas</p>
                  </div>
                  <span className="text-[#00FF84] font-bold">₹800</span>
                </motion.div>
              </div>

              <motion.button
                className="w-full mt-6 bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-semibold py-3 rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Settle Up
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-12 h-12 bg-[#00FF84] rounded-full flex items-center justify-center shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-black font-bold">₹</span>
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -left-2 w-8 h-8 bg-[#1DBE6A] rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default AppMockup;
