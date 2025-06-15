import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { Icon: Github, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Instagram, href: "#" }
  ];

  const companyLinks = ["About Us", "Contact", "Careers"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <motion.h3 
              className="text-2xl font-bold text-[#00FF84] mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Break The Bill
            </motion.h3>
            <p className="text-[#CCCCCC] mb-6 max-w-md leading-relaxed">
              The smart expense manager for groups, flatmates, and travel buddies. 
              Split bills effortlessly and settle up with ease.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-[#CCCCCC] hover:text-[#00FF84] transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <motion.a 
                    href="#" 
                    className="text-[#CCCCCC] hover:text-[#00FF84] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((item, index) => (
                <li key={index}>
                  <motion.a 
                    href="#" 
                    className="text-[#CCCCCC] hover:text-[#00FF84] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#333] pt-8 text-center">
          <p className="text-[#CCCCCC]">
            © 2025 Break The Bill. All rights reserved. Built with ❤️ for better money management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
