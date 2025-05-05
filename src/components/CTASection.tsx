'use client'
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-mystery-900 via-mystery-900 to-mystery-800"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-mystery-400 via-mystery-500 to-mystery-600"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMCBMNDAgNDAgTTQwIDAgTDAgNDAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2U9InJnYmEoMTM1LCA5NCwgMjQzLCAwLjEpIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-mystery-800/70 to-mystery-900/90 backdrop-blur-lg border border-mystery-500/20 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Mystery Today!</h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-3xl">
                Ready to send your first anonymous message? It&apos;s quick, easy, and completely free to get started.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md items-center justify-center">
                <Link href="/sign-in">
                <Button className="flex-1 bg-mystery-600 hover:bg-mystery-700 text-white font-medium gap-2 px-6 py-6 rounded-xl group transition-all duration-300 shadow-lg shadow-mystery-600/20 hover:shadow-mystery-600/40">
                  <MessageSquare className="w-5 h-5" />
                  Start Messaging
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                </Link>
              </div>
              
              <p className="mt-6 text-sm text-gray-400">
                No credit card required. No personal information needed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;