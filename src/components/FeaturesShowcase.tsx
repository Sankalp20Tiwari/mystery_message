'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Zap, Heart, Users,  Star } from 'lucide-react';
import Image from 'next/image';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
    index: number;
}

const FeatureCard = ({ icon, title, description, image, index } : FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden h-full"
    >
      <div className="h-full flex flex-col lg:flex-row bg-gradient-to-br from-mystery-900/90 to-mystery-800/80 backdrop-blur-sm border border-mystery-700/30">
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="p-3 mb-4 w-16 h-16 rounded-xl bg-mystery-900/60 border border-mystery-600/30 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
        <div className="w-full lg:w-1/2 h-48 lg:h-auto relative overflow-hidden">
          <Image
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-mystery-900/0 via-mystery-900/20 to-mystery-900/80"></div>
        </div>
      </div>
    </motion.div>
  );
};

const featuresData = [
  {
    icon: <Lock className="w-8 h-8 text-mystery-400" />,
    title: "Complete Anonymity",
    description: "Our platform ensures your identity remains completely hidden. Send messages without revealing who you are and express your true thoughts freely.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1470&auto=format&fit=crop"
  },
  {
    icon: <Zap className="w-8 h-8 text-mystery-400" />,
    title: "Instant Delivery",
    description: "Messages are delivered instantly to recipients. Our optimized system ensures your anonymous thoughts reach their destination without delay.",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=1470&auto=format&fit=crop"
  },
  {
    icon: <Users className="w-8 h-8 text-mystery-400" />,
    title: "Global Community",
    description: "Connect with users around the world. Our global community lets you interact with people from different cultures and backgrounds, all while staying anonymous.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1332&auto=format&fit=crop"
  },
  {
    icon: <Heart className="w-8 h-8 text-mystery-400" />,
    title: "Personalized Experience",
    description: "Create your anonymous persona with customizable themes, avatars, and messaging styles that reflect your personality without revealing your identity.",
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1470&auto=format&fit=crop"
  }
];

const FeaturesShowcase = () => {
  return (
    <section id="features-showcase" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(132,94,247,0.08)_0,rgba(0,0,0,0)_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block p-3 rounded-2xl bg-mystery-900/60 backdrop-blur-sm border border-mystery-700/30 mb-4">
            <Star className="w-8 h-8 text-mystery-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Premium Features</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover what makes Mystery Message the leading platform for anonymous communication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;