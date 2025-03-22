import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <header className="relative overflow-hidden">
        {/* Soft Background Glow */}
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
      </header>
      <Footer />
    </div>
  );
}
