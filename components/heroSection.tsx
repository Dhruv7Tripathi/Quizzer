import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/footer";
import FeedbackButton from "./feedbackbutton";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
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
                  <Link href="/createquiz">Create Your First Quiz</Link>
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
