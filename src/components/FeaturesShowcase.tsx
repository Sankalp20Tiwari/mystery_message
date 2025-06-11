import React from 'react';
import { motion } from 'framer-motion';
import {  Star } from 'lucide-react';
import Image from 'next/image';

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ image, title, description, index }: FeatureCardProps) => {
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="group rounded-2xl border border-mystery-700/40 p-6 hover:border-mystery-500/60 transition-all duration-300 backdrop-blur-md bg-mystery-800/30 relative overflow-hidden"
        style={{
          boxShadow:
            '0 4px 20px rgba(0, 0, 0, 0.25), inset 0 0 30px rgba(255, 255, 255, 0.05)', // Softer shadow + inner glow
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', // Soft glassy gradient
          border: '2px solid mystery-700/40',
        }}
      >
 
        <div className="absolute inset-0 rounded-2xl pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:to-white/0 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500" />

        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          <div className="p-3 rounded-xl bg-mystery-800/60 border border-mystery-700 flex items-center justify-center shadow-inner shadow-black/30 backdrop-blur-sm">

            <Image src={image || ''} alt={title} width={100} height={100} className="w-12 h-12" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </motion.div>
  );
};

const featuresData = [
  {
    image: '/anonymous.png',
    title: "Anonymity",
    description: "Your identity always stays private.",
  },
  {
    image:'/quick.png',
    title: "Fast Delivery",
    description: "Messages are delivered instantly.",
  },
  {
    image:'/targeting.png',
    title: "Global Reach",
    description: "Connect with anyone worldwide.",
  },
  {
    image: '/character.png',
    title: "Custom Profiles",
    description: "Express yourself anonymously.",
  },
  {
    image:'/cross-platform.png',
    title: "Cross-platform",
    description: "Available on all devices.",
  },
  {
    image: "/chat.png",
    title: "Rich Messaging",
    description: "Send images, text & more.",
  },
  {
    image: '/website-layout.png',
    title: "Minimal Design",
    description: "Clean and distraction-free UI.",
  },
  {
    image: '/cyber-security.png',
    title: "Secure",
    description: "End-to-end encrypted messages.",
  },
];

const FeaturesShowcase = () => {
  return (
    <section id="features-showcase" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(132,94,247,0.06)_0,rgba(0,0,0,0)_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-mystery-900/60 backdrop-blur-sm border border-mystery-700/30 mb-4">
            <Star className="w-8 h-8 text-mystery-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Premium Features</h2>
          <p className="text-lg text-gray-400">
            Experience powerful tools designed for secure, anonymous communication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
