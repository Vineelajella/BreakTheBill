import React from 'react';
import { motion } from 'framer-motion';
import { Users, Receipt, CheckCircle } from 'lucide-react';
import FeatureCard from './FeatureCard';

const HowItWorksSection = ({ y }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const steps = [
    {
      icon: Users,
      title: "Create Group",
      description: "Start by joining or creating a group with a unique code. Invite friends instantly.",
      step: "01"
    },
    {
      icon: Receipt,
      title: "Add Bills & Split Fairly",
      description: "Add shared expenses & let our smart algorithm handle fair splits automatically.",
      step: "02"
    },
    {
      icon: CheckCircle,
      title: "View Balances & Settle",
      description: "Get real-time balance insights and settle debts with just one tap.",
      step: "03"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <motion.div 
        className="max-w-6xl mx-auto"
        style={{ y }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="text-[#00FF84]">Works</span>
          </h2>
          <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">
            Get started in three simple steps and never worry about splitting bills again
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <FeatureCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={step.step}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorksSection;
