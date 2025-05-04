'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PrivacyPage = () => {
  return (
    <section className="relative overflow-hidden w-full py-20 md:py-32">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source
            src="https://videos.pexels.com/video-files/856405/856405-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern z-0"></div>
      <div className="absolute top-20 -left-10 w-60 h-60 bg-mystery-700/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-mystery-500/10 rounded-full filter blur-3xl"></div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10 ">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold text-center text-shadow-md text-gradient mb-8"
        >
          Your Privacy, Our Priority
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12"
        >
          Mystery Message is built to keep your identity safe and your conversations private. Here’s how we ensure total anonymity and security while you connect freely.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              icon: <ShieldCheck className="w-8 h-8 text-mystery-400" />,
              title: 'End-to-End Encryption',
              desc: 'Your messages are encrypted from sender to receiver — no one (not even us) can read them.',
            },
            {
              icon: <UserX className="w-8 h-8 text-mystery-400" />,
              title: 'No Identity Tracking',
              desc: 'We never ask for your personal details. No names, no phone numbers, just custom usernames.',
            },
            {
              icon: <EyeOff className="w-8 h-8 text-mystery-400" />,
              title: 'Disappearing Messages',
              desc: 'Your messages auto-delete after a set time, leaving no trace behind.',
            },
            {
              icon: <Lock className="w-8 h-8 text-mystery-400" />,
              title: 'Secure by Design',
              desc: 'Our servers are fortified with modern security protocols, keeping intrusions out.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 * idx }}
              className="p-6 border border-mystery-700/30 rounded-2xl bg-mystery-900/30 backdrop-blur-sm shadow-xl hover:shadow-mystery-700/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">{item.icon}<h3 className="text-xl font-semibold text-white">{item.title}</h3></div>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 flex justify-center"
        >
          <Link href="/">
            <Button size="lg" className="bg-mystery-600 hover:bg-mystery-700 text-white font-medium gap-2 px-6 py-6 rounded-xl group transition-all duration-300 shadow-lg shadow-mystery-600/20 hover:shadow-mystery-600/40">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPage;
