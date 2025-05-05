'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mystery-500/50 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMCBMNDAgNDAgTTQwIDAgTDAgNDAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2U9InJnYmEoMTM1LCA5NCwgMjQzLCAwLjEpIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')]"></div>
      <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-1/2 h-24 bg-mystery-500/10 blur-3xl"></div>
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="inline-block p-3 rounded-2xl bg-mystery-900/60 backdrop-blur-sm border border-mystery-700/30 mb-4">
              <Mail className="w-8 h-8 text-mystery-400" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Get In Touch</h2>
            
            <p className="text-xl text-gray-300">
              Have questions or suggestions? Reach out to us and our team will get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-mystery-900/60 backdrop-blur-sm border border-mystery-700/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-mystery-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email us at</p>
                  <p className="text-white font-medium">support@mysterymessage.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-mystery-900/60 backdrop-blur-sm border border-mystery-700/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-mystery-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Live chat</p>
                  <p className="text-white font-medium">Available 24/7 for premium users</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-mystery-900/40 backdrop-blur-sm border border-mystery-700/30 rounded-2xl p-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-300 block">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 bg-mystery-800/70 border border-mystery-600/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-mystery-500/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-300 block">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 bg-mystery-800/70 border border-mystery-600/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-mystery-500/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-gray-300 block">Your Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full p-3 bg-mystery-800/70 border border-mystery-600/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-mystery-500/50 resize-none"
                  ></textarea>
                </div>
                
                <Button 
                  type="button"
                  className="w-full py-6 bg-mystery-600 hover:bg-mystery-700 text-white rounded-lg flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                
                <p className="text-center text-xs text-gray-400">
                  By submitting, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;