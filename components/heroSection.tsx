import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/footer";
import FeedbackButton from "./feedbackbutton";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      {/* <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
          <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Master Knowledge Through Interactive Quizzes
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Create, share, and take quizzes on any topic. Perfect for students, teachers,
              and lifelong learners who want to test their knowledge in an engaging way.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/quizzes">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 px-8 py-3 rounded-lg flex items-center gap-2 shadow-md"
                >
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header> */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Create and Share{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Interactive Quizzes
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-md">
                Engage your audience with beautifully designed quizzes. Perfect for educators, content creators, and
                businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Create Your First Quiz</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/quizzes">Explore Quizzes</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-purple-600/20 blur-lg"></div>
                <div className="relative bg-background border rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src="/logo.webp"
                    alt="Quiz Platform Screenshot"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FeedbackButton />
    </div>
  );
}
