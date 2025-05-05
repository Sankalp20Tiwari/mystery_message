'use client'
import React from 'react';
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Mystery Message is so fun! I can share my thoughts without revealing who I am. It's a great way to connect with others anonymously!",
    name: "Sarah",
    role: "User",
    stars: 5,
    image: "/sarah.jpg"
  },
  {
    quote: "I love the surprise of getting anonymous messages! It adds a unique thrill to my day and has helped me make meaningful connections.",
    name: "John",
    role: "User",
    stars: 5,
    image: "/john.jpg"
  },
  {
    quote: "This platform helped me express feelings I was too shy to share otherwise. The anonymity is liberating and the interface is so easy to use!",
    name: "Maya",
    role: "User",
    stars: 5,
    image: "/maya.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" id='testimonials'>
      {/* Background elements */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-mystery-700/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">What Our Users Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what people are saying about their Mystery Message experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-mystery-900/40 backdrop-blur-sm border border-mystery-600/20 rounded-2xl p-6 group hover:border-mystery-500/40 transition-all duration-300"
            >
              {/* Quote Symbol */}
              <div className="text-4xl text-mystery-500 mb-4 opacity-50">&quot;</div>
              
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.stars ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill={i < testimonial.stars ? '#FBBF24' : 'none'}
                  />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-white text-lg mb-6 italic">
                {testimonial.quote}
              </blockquote>
              
              {/* User Info */}
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mystery-400 to-mystery-600 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;