'use client'
import React from 'react';
import { MessageSquare } from "lucide-react";
import Link from 'next/link';

const FooterSection = () => {
  return (
    <footer className="py-16 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-mystery-700 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">
              Mystery<span className="text-mystery-400">Message</span>
            </div>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a>
            <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-300">How It Works</a>
            <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300">Testimonials</a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">About</a>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link href="/termsofservice" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
          
          {/* Social Icons - Simplified placeholders */}
          <div className="flex gap-4 mb-10">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-mystery-400 hover:bg-mystery-900/40 transition-all duration-300"
              >
                <span className="text-gray-400 hover:text-mystery-400 text-sm">{social[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Mystery Message. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;