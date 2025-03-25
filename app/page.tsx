import HeroSection from "../components/heroSection";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white bg-black">
      <HeroSection />
    </div>
  );
}

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { CheckCircle2 } from "lucide-react"
// import FeedbackButton from "@/components/feedbackbutton"

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navigation */}
//       <header className="border-b bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center">
//               <Link href="/" className="flex items-center">
//                 <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//                   QuizMaster
//                 </span>
//               </Link>
//             </div>
//             <nav className="hidden md:flex items-center space-x-4">
//               <Link
//                 href="/features"
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 Features
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 About
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 Contact
//               </Link>
//             </nav>
//             <div className="flex items-center space-x-4">
//               <Link
//                 href="/signin"
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 Sign In
//               </Link>
//               <Button asChild>
//                 <Link href="/signup">Get Started</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
// <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
//   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="flex flex-col md:flex-row items-center">
//       <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
//           Create and Share{" "}
//           <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
//             Interactive Quizzes
//           </span>
//         </h1>
//         <p className="text-xl text-muted-foreground mb-8 max-w-md">
//           Engage your audience with beautifully designed quizzes. Perfect for educators, content creators, and
//           businesses.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button size="lg" asChild>
//             <Link href="/signup">Create Your First Quiz</Link>
//           </Button>
//           <Button size="lg" variant="outline" asChild>
//             <Link href="/quizzes">Explore Quizzes</Link>
//           </Button>
//         </div>
//       </div>
//       <div className="md:w-1/2">
//         <div className="relative">
//           <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-purple-600/20 blur-lg"></div>
//           <div className="relative bg-background border rounded-lg shadow-lg overflow-hidden">
//             <img
//               src="/logo.webp"
//               alt="Quiz Platform Screenshot"
//               className="w-full h-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//       {/* Features Section */}
//       {/* <section className="py-20 bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Everything you need to create engaging quizzes and track performance
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <Card key={index} className="border-border/40 bg-background/60 backdrop-blur-sm">
//                 <CardContent className="pt-6">
//                   <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
//                     <feature.icon className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                   <p className="text-muted-foreground">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section> */}



//       {/* <section className="py-20 bg-primary/5">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your First Quiz?</h2>
//             <p className="text-xl text-muted-foreground mb-8">
//               Join thousands of educators, trainers, and content creators who are engaging their audience with
//               interactive quizzes.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Button size="lg" asChild>
//                 <Link href="/signup">Get Started for Free</Link>
//               </Button>
//               <Button size="lg" variant="outline" asChild>
//                 <Link href="/contact">Contact Sales</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section> */}

//       {/* Footer */}
// <footer className="bg-muted py-12 mt-auto">
//   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//       <div>
//         <h3 className="font-semibold text-lg mb-4">QuizMaster</h3>
//         <p className="text-sm text-muted-foreground">
//           Create, share, and analyze interactive quizzes for education and engagement.
//         </p>
//       </div>
//       <div>
//         <h3 className="font-semibold text-lg mb-4">Product</h3>
//         <ul className="space-y-2 text-sm">
//           <li>
//             <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
//               Features
//             </Link>
//           </li>
//           <li>
//             <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
//               Pricing
//             </Link>
//           </li>
//           <li>
//             <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
//               Roadmap
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <div>
//         <h3 className="font-semibold text-lg mb-4">Resources</h3>
//         <ul className="space-y-2 text-sm">
//           <li>
//             <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
//               Blog
//             </Link>
//           </li>
//           <li>
//             <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
//               Help Center
//             </Link>
//           </li>
//           <li>
//             <Link href="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
//               Guides
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <div>
//         <h3 className="font-semibold text-lg mb-4">Company</h3>
//         <ul className="space-y-2 text-sm">
//           <li>
//             <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
//               About Us
//             </Link>
//           </li>
//           <li>
//             <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
//               Careers
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//     <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//       <p className="text-sm text-muted-foreground">
//         © {new Date().getFullYear()} QuizMaster. All rights reserved.
//       </p>
//       <div className="flex space-x-6 mt-4 md:mt-0">
//         <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//           Terms
//         </Link>
//         <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//           Privacy
//         </Link>
//         <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//           Cookies
//         </Link>
//       </div>
//     </div>
//   </div>
// </footer>

//       {/* Feedback Button */}
//       <FeedbackButton />
//     </div>
//   )
// }

