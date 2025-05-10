"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { MessageSquare, Menu, X, LogIn, LogOut, UserPlus, User2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as User;
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-mystery-700 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                Mystery<span className="text-mystery-400">Message</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            {!session && !isAuthPage && (
              <>
                <a href="#features" className="text-gray-300 hover:text-mystery-400 transition-colors duration-300">Features</a>
                <a href="#how-it-works" className="text-gray-300 hover:text-mystery-400 transition-colors duration-300">How It Works</a>
                <a href="#testimonials" className="text-gray-300 hover:text-mystery-400 transition-colors duration-300">Testimonials</a>
                <a href="#about" className="text-gray-300 hover:text-mystery-400 transition-colors duration-300">About</a>
                <a href="#faq" className="text-gray-300 hover:text-mystery-400 transition-colors duration-300">FAQ</a>
              </>
            )}
            {session && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white mr-4"
              >
                Welcome, <span className="text-mystery-400 font-semibold">{user?.username || user?.email}</span>
              </motion.span>
            )}
          </motion.nav>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            {!session ? (
              <>
                <Link href="/sign-in" className="hidden md:block">
                  <Button className="bg-mystery-600 hover:bg-mystery-700 text-white flex items-center">
                    <LogIn className="w-4 h-4 mr-2" /> Login
                  </Button>
                </Link>
                <Link href="/sign-up" className="hidden md:block">
                  <Button className="bg-mystery-500 hover:bg-mystery-600 text-white flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" /> Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                  <Link href="/dashboard">
                    <Button className="bg-mystery-600 hover:bg-mystery-700 text-white w-full   items-center justify-center hidden  sm:flex">
                      <User2 className="w-4 h-4 mr-2" /> Dashboard
                    </Button>
                  </Link>
              <Button 
                className="bg-mystery-400 hover:bg-mystery-700 text-white hidden md:flex items-center"
                onClick={() => signOut()}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
              </>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="p-2 text-white md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {session && (
                <div className="py-2 text-mystery-400 font-semibold border-b border-gray-800 mb-2">
                  Welcome, {user?.username || user?.email}
                </div>
              )}
              
              {!session && !isAuthPage && (
                <>
                  <a href="#features" className="text-gray-300 hover:text-mystery-400 py-2 transition-colors duration-300">Features</a>
                  <a href="#how-it-works" className="text-gray-300 hover:text-mystery-400 py-2 transition-colors duration-300">How It Works</a>
                  <a href="#testimonials" className="text-gray-300 hover:text-mystery-400 py-2 transition-colors duration-300">Testimonials</a>
                  <a href="#about" className="text-gray-300 hover:text-mystery-400 py-2 transition-colors duration-300">About</a>
                  <a href="#faq" className="text-gray-300 hover:text-mystery-400 py-2 transition-colors duration-300">FAQ</a>
                </>
              )}
              
              {!session ? (
                <>
                  <Link href="/sign-in">
                    <Button className="bg-mystery-600 hover:bg-mystery-700 text-white w-full mt-2 flex items-center justify-center">
                      <LogIn className="w-4 h-4 mr-2" /> Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-mystery-500 hover:bg-mystery-600 text-white w-full mt-2 flex items-center justify-center">
                      <UserPlus className="w-4 h-4 mr-2" /> Sign Up
                    </Button>
                  </Link>
                </>
              ) : (<div className='flex flex-col gap-2 px-4'>
                  <Link href="/dashboard">
                    <Button className="bg-mystery-600 hover:bg-mystery-700 text-white w-full mt-2 flex items-center justify-center">
                      <User2 className="w-4 h-4 mr-2" /> Dashboard
                    </Button>
                  </Link>
                <Button 
                  className="bg-mystery-600 hover:bg-mystery-700 text-white w-full mt-2 flex items-center justify-center"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
