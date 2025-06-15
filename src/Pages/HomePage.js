import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
import HeroSection from '../Components/HeroSection';
import HowItWorksSection from '../Components/HowItWorksSection';
import WhyChooseSection from '../Components/WhyChooseSection';
import TestimonialsSection from '../Components/TestimonialsSection';
import Footer from '../Components/Footer';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
      <HeroSection />
      <HowItWorksSection y={y} />
      <WhyChooseSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
