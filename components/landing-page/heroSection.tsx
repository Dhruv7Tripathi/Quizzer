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
    <div className="relative w-[40rem] h-40 mx-auto">
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] blur-sm w-3/4" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-green-300 to-transparent h-[5px] blur-sm w-1/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-green-300 to-transparent h-px w-1/4" />
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
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-950 text-white">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <main className="w-full max-w-4xl text-center py-20">
          <div className="relative ">
            <div className="bg-black/60 backdrop-blur-md rounded-full inline-flex items-center gap-1 px-4 py-2 mb-2 border border-white/10">
              <span className="text-white text-sm">Welcome to Our Platform</span>
              <ChevronRight className="h-4 w-4 text-green-400" />
            </div>
            <SparklesSection />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span>Transform your ideas into</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent">
              beautiful digital experiences
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            Transform your ideas into reality with our comprehensive suite of
            development tools and resources.
          </p>

          <Link href="/quizzes">
            <button
              className={`bg-gradient-to-r from-green-400 to-green-700 text-white font-medium py-3 px-8 rounded-full transition duration-300 ${isHovered ? "shadow-xl shadow-green-500/40 scale-105" : ""
                }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Get Started
            </button>
          </Link>
        </main>

        <section id="how-it-works" className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-green-700 px-3  text-sm text-white">
                <h2>How It Works</h2>
              </div>
              <SparklesSection />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Simple as 1-2-3
              </h2>
              <p className="max-w-[800px] mx-auto text-gray-300 md:text-xl">
                Creating the perfect quiz has never been easier with our
                streamlined process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
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
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="h-16 w-16 flex items-center justify-center bg-green-700 rounded-full text-3xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-black/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Got questions? We&apos;ve got answers. Here are some of the
                most common queries about our quiz platform.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="max-w-3xl mx-auto divide-y divide-gray-700"
            >
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium py-4 text-white">
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
      <FeedbackButton />
    </div>
  );
}
