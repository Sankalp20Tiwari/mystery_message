"use client"
import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from '@/messages.json'
import Autoplay from "embla-carousel-autoplay"
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-black'>
        
        {/* Header Section */}
        <section className='text-center text-white'>
          <h1 className='text-4xl md:text-6xl font-bold'>
            Dive into the world of Anonymous Messages
          </h1>
          <p className='mt-4 text-lg md:text-xl text-gray-300'>
            Explore Mystery Message — where your identity remains a secret.
          </p>
        </section>

        {/* Carousel Section (Smaller Size) */}
        {/* <section className="mt-12 w-full flex justify-center">
          <Carousel plugins={[Autoplay({ delay: 1000, stopOnInteraction: false })]} className="relative max-w-xl w-full">
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card className="bg-black text-white">
                      <CardHeader className='text-center p-4 text-xl'>{message.title}</CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6 bg-black">
                        <span className="text-2xl font-semibold">{message.content}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 rounded-full p-2" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 rounded-full p-2" />
          </Carousel>
        </section> */}

        {/* Features Section */}
        <section className='mt-24 text-center text-white'>
          <h2 className='text-3xl font-bold'>Why Choose Mystery Message?</h2>
          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-black border-2  p-6 rounded-lg shadow-lg'>
              <h3 className='text-2xl font-semibold mb-4'>Stay Anonymous</h3>
              <p className='text-lg text-gray-400'>
                Your identity is always hidden, making every message a mystery.
              </p>
            </div>
            <div className='bg-black border-2  p-6 rounded-lg shadow-lg'>
              <h3 className='text-2xl font-semibold mb-4'>Connect with Others</h3>
              <p className='text-lg text-gray-400'>
                Share your thoughts, feelings, or secrets without revealing your identity.
              </p>
            </div>
            <div className='bg-black border-2  p-6 rounded-lg shadow-lg'>
              <h3 className='text-2xl font-semibold mb-4'>Unlimited Fun</h3>
              <p className='text-lg text-gray-400'>
                Send and receive messages anonymously for endless fun and surprises.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className='mt-24 text-center  text-white'>
          <h2 className='text-6xl font-bold'>How It Works</h2>
          <div className='mt-8 text-lg text-gray-400'>
            <p>
              1. <strong>Sign Up:</strong> Create an account to send and receive anonymous messages.
            </p>
            <p>
              2. <strong>Send Messages:</strong> Use the platform to send messages to anyone, anywhere.
            </p>
            <p>
              3. <strong>Receive Responses:</strong> Check your inbox for replies from other users, maintaining your anonymity.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='mt-24 text-center text-white'>
          <h2 className='text-6xl font-bold'>What Our Users Say</h2>
          <div className='mt-8'>
            <blockquote className='italic text-gray-300'>
              "Mystery Message is so fun! I can share my thoughts without revealing who I am. It’s a great way to connect with others anonymously!"
            </blockquote>
            <p className='mt-4 text-gray-400'>– Sarah, User</p>
            <blockquote className='italic text-gray-300 mt-8'>
              "I love the surprise of getting anonymous messages! It adds a unique thrill to my day."
            </blockquote>
            <p className='mt-4 text-gray-400'>– John, User</p>
          </div>
        </section>

        {/* About Us Section */}
        <section className='mt-24 text-center text-white'>
          <h2 className='text-6xl font-bold'>About Us</h2>
          <div className='mt-8 text-lg text-gray-400'>
            <p>
              Mystery Message was created with the goal of bringing fun, excitement, and intrigue to communication. Our platform allows people to share their thoughts, ideas, and emotions without the fear of judgment or exposure.
            </p>
            <p className='mt-4'>
              Whether you're sending a funny message or sharing a deep secret, Mystery Message is the place where your identity stays hidden and your words can be heard.
            </p>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mt-16 text-center text-white">
          <h2 className='text-3xl font-bold'>Join the Mystery Today!</h2>
          <p className='mt-4 text-xl text-gray-300'>
            Ready to send your first anonymous message? It's quick and easy. Start now!
          </p>
          <Link href="/sign-in">
          <button className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-black rounded-full border-2 border-white">
            Start Messaging
          </button>
          </Link>
        </section>
      </main>

      {/* Footer Section */}
      <footer className='bg-black text-center py-6'>
        <p className='text-sm text-gray-400'>© 2025 Mystery Message. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Home





