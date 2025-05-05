'use client'
import React from 'react';
import { motion } from "framer-motion";
import { MessageSquare, Users, Star } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="w-10 h-10 text-mystery-400" />,
    title: "Stay Anonymous",
    description: "Your identity is always hidden, making every message a mystery. Express yourself without fear of judgment.",
  },
  {
    icon: <Users className="w-10 h-10 text-mystery-400" />,
    title: "Connect with Others",
    description: "Share your thoughts, feelings, or secrets without revealing your identity. Build connections based on genuine expression.",
  },
  {
    icon: <Star className="w-10 h-10 text-mystery-400" />,
    title: "Unlimited Fun",
    description: "Send and receive messages anonymously for endless fun and surprises. Discover thoughts you never knew existed.",
  },
];

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
  }

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden group"
    >
      <div className="absolute inset-0 bg-feature-card bg-opacity-50 backdrop-blur-sm border border-mystery-500/10"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mystery-400 to-mystery-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
      
      <div className="relative p-8 flex flex-col items-center text-center h-full">
        <div className="p-4 rounded-full bg-mystery-900/60 backdrop-blur-sm mb-6 animate-bounce-slow">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        
        <p className="text-gray-300">
          {description}
        </p>
        
        <div className="mt-6 w-10 h-10 rounded-full bg-mystery-800/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-5 h-5 text-mystery-300">→</div>
        </div>
      </div>
    </motion.div>
  );
}

const FeatureSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" id='features'>
      {/* Background elements */}
      <div className="absolute top-0 -right-20 w-72 h-72 bg-mystery-700/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 -left-10 w-80 h-80 bg-mystery-500/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="inline-block text-3xl md:text-4xl font-bold relative">
            Why Choose Mystery Message?
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-mystery-400 to-mystery-600 transform"></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;