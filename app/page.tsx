// import HeroSection from "../components/heroSection";
// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col bg-white text-black">
//       <HeroSection />
//     </div>
//   );
// }
// pages/index.tsx
"use client"
import type { NextPage } from 'next';
import { useState } from 'react';
import Navbar from '@/components/fixnav';
import Footer from '@/components/footer'; // Import the Footer component
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { faqItems } from '@/contants';

const Home: NextPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-950">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <main className="flex flex-col items-center justify-center w-full max-w-4xl text-center py-20">
          <div className="py-12">
            <div className="bg-purple-900/20 backdrop-blur-sm rounded-full py-2 px-6 inline-flex items-center mb-12">
              <span className="text-gray-300 text-sm mr-1">Welcome to Our Platform</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Transform your ideas into</span>
              <br />
              <span className="bg-gradient-to-r from-orange-200 to-orange-400 bg-clip-text text-transparent">beautiful digital experiences</span>
            </h1>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
              Transform your ideas into reality with our comprehensive suite of development tools and resources.
            </p>

            <button
              className={`bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-200 hover:to-orange-400 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 ${isHovered ? 'shadow-lg shadow-orange-500/50' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Get Started
            </button>
          </div>
        </main>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-400 px-3 py-1 text-sm text-white">
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-3xl font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-white">Enter Your Topic</h3>
                <p className="text-gray-300">Simply type in the subject you want to create a quiz about.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-3xl font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-white">Customize Options</h3>
                <p className="text-gray-300">Select difficulty level, question types, and other preferences.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-3xl font-bold text-white">
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
                Got questions? We've got answers. Here are some of the most common queries about our quiz platform.
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

export default Home;
// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { CheckCircle, ChevronRight, Brain, Users, BarChart3, Zap, Award, Star } from "lucide-react"

// export default function LandingPage() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
//           <div className="flex gap-6 md:gap-10">
//             <Link href="/" className="flex items-center space-x-2">
//               <Brain className="h-6 w-6 text-purple-600" />
//               <span className="inline-block font-bold">Quizzer</span>
//             </Link>
//             <nav className="hidden gap-6 md:flex">
//               <Link
//                 href="#features"
//                 className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Features
//               </Link>
//               <Link
//                 href="#how-it-works"
//                 className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 How It Works
//               </Link>
//               <Link
//                 href="#testimonials"
//                 className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Testimonials
//               </Link>
//               <Link
//                 href="#pricing"
//                 className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Pricing
//               </Link>
//             </nav>
//           </div>
//           <div className="flex flex-1 items-center justify-end space-x-4">
//             <nav className="flex items-center space-x-2">
//               <Link
//                 href="/login"
//                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 Login
//               </Link>
//               <Button asChild>
//                 <Link href="/signup">Sign Up Free</Link>
//               </Button>
//             </nav>
//           </div>
//         </div>
//       </header>
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-purple-50 to-white">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                     Create Engaging Quizzes in Minutes
//                   </h1>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                     Quizzer helps educators, trainers, and content creators build interactive quizzes that engage and
//                     educate your audience.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
//                     Get Started Free
//                     <ChevronRight className="ml-2 h-4 w-4" />
//                   </Button>
//                   <Button size="lg" variant="outline">
//                     Watch Demo
//                   </Button>
//                 </div>
//                 <div className="flex items-center space-x-4 text-sm">
//                   <div className="flex items-center">
//                     <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
//                     <span>No credit card required</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
//                     <span>Free plan available</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center justify-center">
//                 <div className="relative w-full max-w-[600px] overflow-hidden rounded-lg border bg-background shadow-xl">
//                   <Image
//                     src="/placeholder.svg?height=600&width=800"
//                     width={800}
//                     height={600}
//                     alt="Quizzer dashboard preview"
//                     className="w-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12">
//               <div className="flex flex-col items-center justify-center space-y-2 text-center">
//                 <div className="text-3xl font-bold sm:text-4xl">10k+</div>
//                 <div className="text-sm font-medium text-muted-foreground">Active Users</div>
//               </div>
//               <div className="flex flex-col items-center justify-center space-y-2 text-center">
//                 <div className="text-3xl font-bold sm:text-4xl">50k+</div>
//                 <div className="text-sm font-medium text-muted-foreground">Quizzes Created</div>
//               </div>
//               <div className="flex flex-col items-center justify-center space-y-2 text-center">
//                 <div className="text-3xl font-bold sm:text-4xl">1M+</div>
//                 <div className="text-sm font-medium text-muted-foreground">Quiz Completions</div>
//               </div>
//               <div className="flex flex-col items-center justify-center space-y-2 text-center">
//                 <div className="text-3xl font-bold sm:text-4xl">98%</div>
//                 <div className="text-sm font-medium text-muted-foreground">Satisfaction Rate</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600">Features</div>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
//                   Everything You Need to Create Amazing Quizzes
//                 </h2>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl">
//                   Quizzer provides all the tools you need to create, share, and analyze quizzes that engage your
//                   audience.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
//               <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
//                   <Zap className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-bold">Quick Creation</h3>
//                 <p className="text-muted-foreground">
//                   Build professional quizzes in minutes with our intuitive drag-and-drop editor.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
//                   <Users className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-bold">Audience Engagement</h3>
//                 <p className="text-muted-foreground">
//                   Interactive elements and gamification features keep participants engaged.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
//                   <BarChart3 className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-bold">Detailed Analytics</h3>
//                 <p className="text-muted-foreground">
//                   Get insights into participant performance with comprehensive reports.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
//                   <Award className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-bold">Customizable Templates</h3>
//                 <p className="text-muted-foreground">
//                   Choose from dozens of professionally designed templates for any occasion.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
//                   <Brain className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-bold">AI-Powered Questions</h3>
//                 <p className="text-muted-foreground">
//                   Generate quiz questions automatically with our advanced AI technology.
//                 </p>
//               </div>
//               <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
//                   <CheckCircle className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-bold">Instant Feedback</h3>
//                 <p className="text-muted-foreground">Provide immediate feedback to participants to enhance learning.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600">
//                   How It Works
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Create, Share, Analyze</h2>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl">
//                   Our simple three-step process makes quiz creation effortless.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
//               <div className="flex flex-col items-center space-y-4 text-center">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
//                   1
//                 </div>
//                 <h3 className="text-xl font-bold">Create Your Quiz</h3>
//                 <p className="text-muted-foreground">
//                   Choose a template or start from scratch. Add questions, images, videos, and customize the design.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-4 text-center">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
//                   2
//                 </div>
//                 <h3 className="text-xl font-bold">Share With Your Audience</h3>
//                 <p className="text-muted-foreground">
//                   Distribute your quiz via link, embed on your website, or share on social media.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-4 text-center">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
//                   3
//                 </div>
//                 <h3 className="text-xl font-bold">Analyze Results</h3>
//                 <p className="text-muted-foreground">
//                   Review detailed analytics to understand participant performance and engagement.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600">
//                   Testimonials
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Loved by Educators and Trainers</h2>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl">
//                   See what our users have to say about their experience with Quizzer.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
//               <div className="flex flex-col space-y-4 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex items-center space-x-2">
//                   <div className="flex space-x-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-muted-foreground">
//                   "Quizzer has transformed how I engage with my students. The interactive features and detailed
//                   analytics have made a huge difference in my classroom."
//                 </p>
//                 <div className="flex items-center space-x-4">
//                   <div className="rounded-full bg-gray-100 p-1">
//                     <div className="h-10 w-10 rounded-full bg-gray-200" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Sarah Johnson</p>
//                     <p className="text-xs text-muted-foreground">High School Teacher</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col space-y-4 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex items-center space-x-2">
//                   <div className="flex space-x-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-muted-foreground">
//                   "As a corporate trainer, I need tools that are professional and efficient. Quizzer delivers on both
//                   fronts, making my job easier and more effective."
//                 </p>
//                 <div className="flex items-center space-x-4">
//                   <div className="rounded-full bg-gray-100 p-1">
//                     <div className="h-10 w-10 rounded-full bg-gray-200" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Michael Chen</p>
//                     <p className="text-xs text-muted-foreground">Corporate Trainer</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col space-y-4 rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="flex items-center space-x-2">
//                   <div className="flex space-x-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-muted-foreground">
//                   "I've tried many quiz platforms, but Quizzer stands out for its ease of use and powerful features. My
//                   audience engagement has increased significantly."
//                 </p>
//                 <div className="flex items-center space-x-4">
//                   <div className="rounded-full bg-gray-100 p-1">
//                     <div className="h-10 w-10 rounded-full bg-gray-200" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Emily Rodriguez</p>
//                     <p className="text-xs text-muted-foreground">Content Creator</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Pricing Section */}
//         <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600">Pricing</div>
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
//                 <p className="max-w-[700px] text-muted-foreground md:text-xl">
//                   Choose the plan that's right for you and start creating engaging quizzes today.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
//               <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="space-y-2">
//                   <h3 className="text-2xl font-bold">Free</h3>
//                   <p className="text-muted-foreground">Perfect for getting started</p>
//                 </div>
//                 <div className="mt-4 flex items-baseline text-3xl font-bold">
//                   $0
//                   <span className="ml-1 text-sm font-medium text-muted-foreground">/month</span>
//                 </div>
//                 <ul className="mt-6 space-y-3">
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>3 quizzes</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Basic templates</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>100 responses per month</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Basic analytics</span>
//                   </li>
//                 </ul>
//                 <Button className="mt-6" variant="outline">
//                   Get Started
//                 </Button>
//               </div>
//               <div className="flex flex-col rounded-lg border bg-purple-50 p-6 shadow-sm">
//                 <div className="space-y-2">
//                   <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-600">
//                     Popular
//                   </div>
//                   <h3 className="text-2xl font-bold">Pro</h3>
//                   <p className="text-muted-foreground">For individuals and small teams</p>
//                 </div>
//                 <div className="mt-4 flex items-baseline text-3xl font-bold">
//                   $19
//                   <span className="ml-1 text-sm font-medium text-muted-foreground">/month</span>
//                 </div>
//                 <ul className="mt-6 space-y-3">
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Unlimited quizzes</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>All templates</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>1,000 responses per month</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Advanced analytics</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Custom branding</span>
//                   </li>
//                 </ul>
//                 <Button className="mt-6 bg-purple-600 hover:bg-purple-700">Get Started</Button>
//               </div>
//               <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
//                 <div className="space-y-2">
//                   <h3 className="text-2xl font-bold">Enterprise</h3>
//                   <p className="text-muted-foreground">For organizations and large teams</p>
//                 </div>
//                 <div className="mt-4 flex items-baseline text-3xl font-bold">
//                   $49
//                   <span className="ml-1 text-sm font-medium text-muted-foreground">/month</span>
//                 </div>
//                 <ul className="mt-6 space-y-3">
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Everything in Pro</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Unlimited responses</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Team collaboration</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>Priority support</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                     <span>API access</span>
//                   </li>
//                 </ul>
//                 <Button className="mt-6" variant="outline">
//                   Contact Sales
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
//                   Ready to Create Engaging Quizzes?
//                 </h2>
//                 <p className="mx-auto max-w-[700px] md:text-xl">
//                   Join thousands of educators, trainers, and content creators who are using Quizzer to engage their
//                   audience.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
//                   Get Started Free
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                 </Button>
//                 <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-700">
//                   Schedule a Demo
//                 </Button>
//               </div>
//               <p className="text-sm text-purple-100">No credit card required to start</p>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="w-full border-t bg-white py-6">
//         <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
//           <div className="flex items-center gap-2">
//             <Brain className="h-6 w-6 text-purple-600" />
//             <span className="text-lg font-bold">Quizzer</span>
//           </div>
//           <p className="text-center text-sm text-muted-foreground md:text-left">
//             &copy; {new Date().getFullYear()} Quizzer. All rights reserved.
//           </p>
//           <div className="flex gap-4">
//             <Link href="#" className="text-sm text-muted-foreground hover:underline">
//               Terms
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:underline">
//               Privacy
//             </Link>
//             <Link href="#" className="text-sm text-muted-foreground hover:underline">
//               Contact
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
