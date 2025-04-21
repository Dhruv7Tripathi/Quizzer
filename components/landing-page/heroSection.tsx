"use client";
import { useState } from "react";
import Navbar from "@/components/landing-page/navbar";
import Footer from "@/components/landing-page/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/contants";
import Link from "next/link";
import FeedbackButton from "../secondry/feedbackbutton";
import { SparklesCore } from "../ui/sparkles";
import { ChevronRight } from "lucide-react";

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const SparklesSection = () => (
    <div className="relative w-30 sm:w-[40rem] h-24 mx-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] blur-sm w-3/4" />
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-3/4" />
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-green-300 to-transparent h-[5px] blur-sm w-1/4" />
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-green-300 to-transparent h-px w-1/4" />
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    </div>
  );

  const steps = [
    {
      step: 1,
      title: "Enter Your Topic",
      desc: "Simply type in the subject you want to create a quiz about.",
    },
    {
      step: 2,
      title: "Customize Options",
      desc: "Select difficulty level, question types, and other preferences.",
    },
    {
      step: 3,
      title: "Generate & Share",
      desc: "Get your quiz instantly and share it with students or friends.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-950 text-white overflow-x-hidden">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <main className="w-full min-h-screen max-w-4xl text-center py-16 sm:py-20 px-4 sm:px-6">
          <div className="relative">
            <div className="bg-black/60 backdrop-blur-md rounded-full inline-flex items-center gap-1 px-4 py-2 mb-2 border border-white/10">
              <span className="text-white text-sm">Welcome to Our Platform</span>
              <ChevronRight className="h-4 w-4 text-green-400" />
            </div>
            <SparklesSection />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
            <span>Transform your ideas into</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent">
              beautiful digital experiences
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12">
            Instantly generate quizzes powered by AI — smart, customizable, and shareable in seconds.
          </p>

          <Link href="/quizzes">
            <button
              className={`w-full sm:w-auto text-sm sm:text-base bg-gradient-to-r from-green-400 to-green-700 text-white font-medium py-3 px-6 sm:px-8 rounded-full transition duration-300 ${isHovered ? "shadow-xl shadow-green-500/40 scale-105" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Get Started
            </button>
          </Link>
        </main>

        <section id="how-it-works" className="w-full py-16 sm:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <div className="px-3 text-sm text-white">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter">
                  How It Works
                </h2>
              </div>
              <SparklesSection />
              <p className="text-sm sm:text-base max-w-[600px] sm:max-w-[800px] mx-auto text-white">
                Creating the perfect quiz has never been easier with our
                streamlined process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center bg-green-700 rounded-full text-2xl sm:text-3xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm sm:text-base text-white">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 sm:py-20 bg-black/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion
              type="single"
              collapsible
              className="max-w-3xl mx-auto divide-y divide-gray-700"
            >
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base sm:text-lg font-medium py-4 text-white">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-gray-300 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
      <Footer />
      <FeedbackButton />
    </div>
  );
}
