// app/terms/page.tsx or wherever you route Terms of Service
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TermsOfServicePage = () => {
  return (
    <section className="relative overflow-hidden w-full py-20 md:py-32 text-white">
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

      {/* Background Elements */}
      <div className="absolute top-20 -left-10 w-60 h-60 bg-mystery-700/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-mystery-500/10 rounded-full filter blur-3xl"></div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <FileText className="w-12 h-12 mx-auto text-mystery-400 mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-shadow-md mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Understand the rules and guidelines that shape your experience on Mystery Message. Your privacy and freedom of expression are our top priorities.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-mystery-900/30 backdrop-blur-sm rounded-2xl border border-mystery-700/20 shadow-xl p-8 space-y-8"
        >
          <div>
            <h2 className="text-2xl font-semibold text-mystery-300 mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              By using Mystery Message, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of the terms, please refrain from using our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-mystery-300 mb-2">2. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Do not engage in harassment, hate speech, or illegal activities.</li>
              <li>Respect the privacy and anonymity of other users.</li>
              <li>Use the platform ethically and responsibly.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-mystery-300 mb-2">3. Content Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              We encourage freedom of expression but reserve the right to remove content that violates our policies or harms other users. Suspicious activities may be logged for security purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-mystery-300 mb-2">4. Privacy & Security</h2>
            <p className="text-gray-400 leading-relaxed">
              Your anonymity is our priority. We use encryption and advanced security measures to protect your data. For more details, read our <Link href="/privacy"><span className="underline text-mystery-400 hover:text-mystery-300 transition">Privacy Policy</span></Link>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-mystery-300 mb-2">5. Modifications</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update these Terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/">
              <Button size="lg" className="bg-mystery-600 hover:bg-mystery-700 text-white font-medium gap-2 px-6 py-6 rounded-xl shadow-lg shadow-mystery-600/20 hover:shadow-mystery-600/40 transition-all duration-300 group">
                <CheckCircle className="w-5 h-5" />
                Accept & Return Home
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="outline" size="lg" className="border-mystery-400/30 text-white hover:bg-mystery-900/60 px-6 py-6 rounded-xl gap-2">
                <ShieldCheck className="w-5 h-5" />
                Read Privacy Policy
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfServicePage;
