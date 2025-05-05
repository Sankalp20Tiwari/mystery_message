
'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden w-full py-20 md:py-32" id='home'>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://videos.pexels.com/video-files/856405/856405-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern z-0"></div>
      <div className="absolute top-20 -left-10 w-60 h-60 bg-mystery-700/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-mystery-500/10 rounded-full filter blur-3xl"></div>
      
      {/* Floating particles */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={i} 
            className={`absolute rounded-full bg-mystery-${300 + i * 100}/20`}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              scale: [
                Math.random() * 0.5 + 0.5,
                Math.random() * 1 + 1,
                Math.random() * 0.5 + 0.5
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10 + Math.random() * 20,
              ease: "easeInOut"
            }}
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
            }}
          ></motion.div>
        ))}
      </div> */}

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6 px-4 py-2 bg-mystery-900/60 rounded-full backdrop-blur-sm border border-mystery-700/30"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-mystery-400 animate-pulse"></span>
            <span className="text-sm text-gray-300">Experience a new way to connect</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl text-shadow-md"
          >
            Dive into the world of <span className="text-gradient">Anonymous Messages</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-xl text-gray-300 max-w-3xl"
          >
            Express yourself freely on Mystery Message — where your thoughts flow freely while your identity remains a secret.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link href="/sign-in">
            <Button size="lg" className="bg-mystery-600 hover:bg-mystery-700 text-white font-medium gap-2 px-6 py-6 rounded-xl group transition-all duration-300 shadow-lg shadow-mystery-600/20 hover:shadow-mystery-600/40">
              <MessageSquare className="w-5 h-5" />
              Start Messaging
              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            </Link>
            <Link href="/privacy">
            <Button variant="outline" size="lg" className="border-mystery-400/30 text-white hover:bg-mystery-900/60 px-6 py-6 rounded-xl">
              <Shield className="w-5 h-5 mr-2" />
              Learn About Privacy
            </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 p-4 rounded-2xl border border-mystery-700/20 bg-mystery-900/30 backdrop-blur-sm shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Stats */}
              <div className="text-center px-8 py-4 border-b sm:border-b-0 sm:border-r border-mystery-700/20">
                <p className="text-4xl font-bold text-gradient">3M+</p>
                <p className="text-sm text-gray-400">Messages Sent</p>
              </div>
              <div className="text-center px-8 py-4 border-b sm:border-b-0 sm:border-r border-mystery-700/20">
                <p className="text-4xl font-bold text-gradient">500K+</p>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
              <div className="text-center px-8 py-4">
                <p className="text-4xl font-bold text-gradient">100%</p>
                <p className="text-sm text-gray-400">Anonymous</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;