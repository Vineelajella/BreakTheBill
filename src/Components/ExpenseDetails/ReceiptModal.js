import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

const ReceiptModal = ({ isOpen, onClose, receipt, onDownload }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-white">Receipt Viewer</h2>
                <p className="text-sm text-gray-400">{receipt.filename}</p>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handleZoomOut}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ZoomOut className="w-5 h-5" />
                </motion.button>
                
                <span className="text-sm text-gray-400 min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                
                <motion.button
                  onClick={handleZoomIn}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ZoomIn className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={handleRotate}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCw className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={onDownload}
                  className="p-2 text-gray-400 hover:text-[#00FF84] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-5 h-5" />
                </motion.button>
                
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative overflow-auto max-h-[calc(90vh-120px)] bg-gray-900">
              <div className="flex items-center justify-center min-h-full p-4">
                <motion.img
                  src={receipt.url}
                  alt="Receipt"
                  className="max-w-none cursor-move"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transformOrigin: 'center'
                  }}
                  drag
                  dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                  whileDrag={{ cursor: 'grabbing' }}
                  onDoubleClick={resetView}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-700 bg-gray-800/50">
              <div className="text-sm text-gray-400">
                Double-click to reset view • Drag to pan
              </div>
              <div className="flex space-x-3">
                <motion.button
                  onClick={resetView}
                  className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset View
                </motion.button>
                <motion.button
                  onClick={onDownload}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-[#00FF84] to-[#00C97F] text-black font-medium rounded-lg hover:shadow-lg hover:shadow-[#00FF84]/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReceiptModal;