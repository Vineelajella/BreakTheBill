import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Euro, PoundSterling, IndianRupee } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: DollarSign, delay: 0 },
    { Icon: Euro, delay: 1 },
    { Icon: PoundSterling, delay: 2 },
    { Icon: IndianRupee, delay: 3 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${20 + (index * 20)}%`,
            top: `${30 + (index * 15)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
          }}
        >
          <Icon className="w-8 h-8 text-[#00FF84] opacity-40" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
