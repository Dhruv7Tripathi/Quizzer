"use client"
import { useState } from 'react';
import Navbar from '@/components/landing-page/navbar';
import Footer from '@/components/landing-page/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { faqItems } from '@/contants';
import Link from 'next/link';

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-950">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <main className="flex flex-col items-center justify-center w-full max-w-4xl text-center py-20">
          <div className="py-12">
            <div className="bg-black backdrop-blur-sm rounded-full px-4 inline-flex items-center mb-12">
              <span className="text-white text-sm mr-1">Welcome to Our Platform</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Transform your ideas into</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent">beautiful digital experiences</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
              Transform your ideas into reality with our comprehensive suite of development tools and resources.
            </p>
            <Link href='/quizzes'>
              <button
                className={`bg-gradient-to-r from-green-400 to-green-700 hover:from-green-400 hover:to-green-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 ${isHovered ? 'shadow-lg shadow-green-500/50' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started
              </button>
            </Link>
          </div>
        </main>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-700 px-3 py-1 text-sm text-white">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">Simple as 1-2-3</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Creating the perfect quiz has never been easier with our streamlined process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-3xl font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-white">Enter Your Topic</h3>
                <p className="text-gray-300">Simply type in the subject you want to create a quiz about.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-3xl font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-white">Customize Options</h3>
                <p className="text-gray-300">Select difficulty level, question types, and other preferences.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-3xl font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-bold text-white">Generate & Share</h3>
                <p className="text-gray-300">Get your quiz instantly and share it with students or friends.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-black/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Got questions? We&apos;ve got answers. Here are some of the most common queries about our quiz platform.
              </p>
            </div>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-700">
                  <AccordionTrigger className="text-lg font-semibold text-white py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};