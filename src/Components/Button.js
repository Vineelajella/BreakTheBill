import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  className = ''
}) => {
  const baseClasses = "font-semibold rounded-full transition-all duration-300";
  
  const sizeClasses = {
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-[#00FF84] to-[#1DBE6A] text-black shadow-lg hover:shadow-[#00FF84]/30",
    secondary: "border-2 border-[#00FF84] text-[#00FF84] hover:bg-[#00FF84] hover:text-black backdrop-blur-sm",
    dark: "bg-black text-[#00FF84] hover:bg-gray-900 shadow-lg",
    'outline-dark': "border-2 border-black text-black hover:bg-black hover:text-[#00FF84]"
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <motion.button 
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
