import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import FloatingIcons from './FloatingIcons';
import AppMockup from './AppMockup';
import Button from './Button';
import { useNavigate } from 'react-router-dom';



const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <AnimatedBackground />
            <FloatingIcons />

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="block text-white">
                            Effortless <span className="text-transparent bg-gradient-to-r from-[#00FF84] to-[#1DBE6A] bg-clip-text">Bill Splitting</span>
                        </span>
                        <span className="block text-white">
                            for Friends, Family
                        </span>
                        <span className="block text-white">
                            and Flatmates
                        </span>

                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl text-[#CCCCCC] mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Split bills fairly, track expenses smartly, and settle instantly with our intelligent expense manager.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Button variant="primary" size="large" onClick={() => navigate('/signup')}>
                            Get Started
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex justify-center lg:justify-end"
                >
                    <AppMockup />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
