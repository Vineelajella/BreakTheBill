import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Travel Enthusiast",
      quote: "This app saved our trip to Manali! No more awkward money conversations.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Arjun Patel",
      role: "College Student",
      quote: "Perfect for our hostel expenses. Finally, no more 'who paid what' confusion!",
      rating: 5,
      avatar: "AP"
    },
    {
      name: "Sneha Reddy",
      role: "Working Professional",
      quote: "Our office lunch group loves this app. Clean, simple, and gets the job done.",
      rating: 5,
      avatar: "SR"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF84]/5 via-transparent to-[#1DBE6A]/5"></div>

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="text-[#00FF84]">Users Say</span>
          </h2>
          <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">
            Join thousands of happy users who have simplified their group expenses
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-8 -left-8 opacity-20">
            <Quote className="w-16 h-16 text-[#00FF84]" />
          </div>
          <div className="absolute -bottom-8 -right-8 opacity-20 rotate-180">
            <Quote className="w-16 h-16 text-[#00FF84]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-6">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#00FF84] fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00FF84] to-[#00C97F] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#00FF84]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
