import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-blue-900 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-indigo-900 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-800">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white mb-6 leading-tight">
              Master Knowledge Through Interactive Quizzes
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-medium">
              Create, share, and take quizzes on any topic. Perfect for students, teachers,
              and lifelong learners who want to test their knowledge and learn in an engaging way.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={"/createquiz"}>
                <Button
                  size="lg"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 
                             transition-all duration-300 group px-8 py-3 rounded-xl"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Footer />
    </div>
  );
}