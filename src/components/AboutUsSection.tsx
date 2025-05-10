'use client'
import React from 'react';
import { motion } from "framer-motion";
import { Rocket, Award, Heart, Shield } from "lucide-react";


const AboutUsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" id='about'>
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-mystery-700/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-mystery-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side: Animation/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-mystery-500 to-mystery-700 flex items-center justify-center animate-pulse-glow">
                <div className="absolute inset-0 rounded-full backdrop-blur-lg bg-mystery-900/20 border border-mystery-500/30"></div>
                <div className="relative z-10 p-10">
                  <div className="text-5xl font-bold text-center text-white">Mystery Message</div>
                </div>
              </div>
              
              {/* Orbiting elements */}
              {[
                { icon: <Rocket className="w-8 h-8 text-mystery-300" />, delay: 0 },
                { icon: <Award className="w-8 h-8 text-mystery-300" />, delay: 2 },
                { icon: <Heart className="w-8 h-8 text-mystery-300" />, delay: 4 },
                { icon: <Shield className="w-8 h-8 text-mystery-300" />, delay: 6 }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="absolute p-3 bg-mystery-900/80 backdrop-blur-sm border border-mystery-500/30 rounded-xl animate-float"
                  style={{
                    top: `${25 + index * 25}%`,
                    left: `${index % 2 ? 85 : -5}%`,
                    animationDelay: `${item.delay}s`
                  }}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right side: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">About Us</h2>
            
            <div className="space-y-6 text-lg">
              <p className="text-white">
                <span className="font-bold text-mystery-400">Mystery Message</span> was created with the goal of bringing fun, excitement, and intrigue to communication. Our platform allows people to share their thoughts, ideas, and emotions without the fear of judgment or exposure.
              </p>
              
              <p className="text-gray-300">
                Whether you are sending a funny message or sharing a deep secret, Mystery Message is the place where your identity stays hidden and your words can be heard. We believe in the power of anonymous expression and its ability to foster genuine connections.
              </p>
              
              <div className="pt-4 border-t border-mystery-700/30">
                <h3 className="text-xl font-bold mb-3 text-white">Our Mission</h3>
                <p className="text-gray-300">
                  To provide a safe, secure space where people can express themselves freely, connect authentically, and explore communication without the constraints of identity.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;