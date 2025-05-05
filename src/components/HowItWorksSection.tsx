'use client'

import React from 'react';
import { motion } from "framer-motion";
import { Check, Send, Mail } from "lucide-react";

const steps = [
  {
    icon: <Check className="w-8 h-8 text-mystery-400" />,
    title: "Sign Up",
    description: "Create a secure account to send and receive anonymous messages. No personal information required.",
    gradient: "from-purple-400 via-purple-600 to-indigo-500"
  },
  {
    icon: <Send className="w-8 h-8 text-mystery-400" />,
    title: "Send Messages",
    description: "Use the platform to send anonymous messages to anyone, anywhere. Express yourself freely.",
    gradient: "from-indigo-500 via-purple-600 to-purple-400"
  },
  {
    icon: <Mail className="w-8 h-8 text-mystery-400" />,
    title: "Receive Responses",
    description: "Check your inbox for anonymous replies, maintaining complete privacy for all parties.",
    gradient: "from-purple-400 via-indigo-500 to-purple-600"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" id='how-it-works'>
      {/* Background elements */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-mystery-700/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Getting started with Mystery Message is simple and takes just a few moments.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative mb-12 last:mb-0"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Step number with icon */}
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg shadow-mystery-600/20 flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-mystery-400 to-transparent hidden md:block"></div>
                  )}
                </div>
                
                {/* Step content */}
                <div className="bg-mystery-900/40 backdrop-blur-sm border border-mystery-600/20 rounded-xl p-6 md:p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">{`${index + 1}. ${step.title}`}</h3>
                  <p className="text-gray-300 text-lg">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;