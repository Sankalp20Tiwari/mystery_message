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

const Home = () => {
  return (
    <>
    <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>
        <section>
           <h1 className='text-3xl md:text-5xl font-bold'>Dive into the world of Anonymous Messages</h1>
           <p className='mt-4 text-center text-xl'>Explore Mystery Message - where your identity remains a secret</p>
        </section>
        <Carousel plugins={[Autoplay({ delay: 1000 , stopOnInteraction: false})]} className="w-full max-w-xs" >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader className='text-center p-3 text-xl'>{message.title}</CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{message.content}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
    </main>
    <footer className='flex flex-col items-center justify-center py-4'>
        <p className='text-sm'>© 2025 Mystery Message. All rights reserved.</p>
    </footer>
    </>
  )
}

export default Home
