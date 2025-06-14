// src/Components/AuthLayout.jsx
import React from 'react';

const AuthLayout = ({ welcomeContent, formContent }) => {
  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-[#04110F] to-[#0C0F0E] text-white p-10 flex-col justify-center">
        {welcomeContent}
      </div>


      {/* Right */}
      <div className="flex-1 relative bg-[#0C0F0E] flex items-center justify-center px-4 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#00ffff22,transparent_60%)] opacity-50 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#1de9b633,transparent_60%)] opacity-40 pointer-events-none z-0" />
        <div className="w-full max-w-md z-10">{formContent}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
