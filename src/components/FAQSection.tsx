'use client'
import React from 'react';
import { motion } from 'framer-motion';
import {  HelpCircle  } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is Mystery Message completely anonymous?",
      answer: "Yes, Mystery Message is designed with privacy at its core. Your identity is never revealed when sending messages, and we don't collect any personally identifiable information."
    },
    {
      question: "How do I start sending anonymous messages?",
      answer: "Simply create an account using an anonymous username, find the person you want to message, and send your thoughts without revealing your identity. It's that easy!"
    },
    {
      question: "Is there a limit to how many messages I can send?",
      answer: "No, there are no limits to the number of messages you can send on our free plan. Premium users get additional features like priority delivery and read receipts."
    },
    {
      question: "Can I customize my anonymous identity?",
      answer: "Yes, you can create a pseudonym and customize your anonymous profile with themes and avatars without revealing your real identity."
    },
    {
      question: "How does Mystery Message ensure my privacy?",
      answer: "We use end-to-end encryption, don't store IP addresses with messages, and our systems are designed to separate message content from user identities."
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-mystery-950/20 to-black"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-mystery-700/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 -left-40 w-80 h-80 bg-mystery-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block p-3 rounded-2xl bg-mystery-900/60 backdrop-blur-sm border border-mystery-700/30 mb-4">
            <HelpCircle className="w-8 h-8 text-mystery-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about Mystery Message.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-mystery-700/30">
                <AccordionTrigger className="text-lg text-left text-white py-5 hover:text-mystery-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            Still have questions? Contact our support team for more information.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;