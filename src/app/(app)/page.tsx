'use client'
import React, { useEffect } from 'react';
import { motion, useScroll, useAnimation } from "framer-motion";
import HeroSection from '@/components/HeroSection';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import FeatureSection from '@/components/FeatureSection';
import CTASection from '@/components/CTASection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutUsSection from '@/components/AboutUsSection';

const IndexContent = () => {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();

  useEffect(() => {
    scrollYProgress.onChange((latest) => {
      if (latest > 0.1) {
        controls.start({ 
          y: 0,
          opacity: 1,
          transition: { duration: 0.3 }
        });
      } else {
        controls.start({ 
          y: 100,
          opacity: 0,
          transition: { duration: 0.3 }
        });
      }
    });
  }, [scrollYProgress, controls]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden relative">
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-mystery-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main content */}
      <HeroSection />
      <FeatureSection />
      <FeaturesShowcase />
      <HowItWorksSection />
      <TestimonialsSection />
      <AboutUsSection />
      <FAQSection />
      <ContactSection />
      <CTASection />

      {/* Scroll to top button */}
      <motion.button
        animate={controls}
        initial={{ y: 100, opacity: 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-mystery-600 text-white flex items-center justify-center shadow-lg shadow-mystery-600/20 hover:bg-mystery-700 transition-colors duration-300 z-40"
        aria-label="Scroll to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>
    </div>
  );
};

export default IndexContent;

