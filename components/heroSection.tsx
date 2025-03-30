import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/footer";
import FeedbackButton from "./feedbackbutton";
import Image from "next/image";
import { faqItems } from "@/contants";
export default function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-primary">
                Create, Share & Engage
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-md">
                Transform your content with interactive quizzes. Ideal for educators, marketers, trainers, and content creators to boost engagement and learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/createquiz">Create Your First Quiz</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/quizzes">Explore Quizzes</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-white blur-lg"></div>
                <div className="relative bg-background border rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src="/q.webp"
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

      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers. Here are some of the most common queries about our quiz platform.
            </p>
          </div>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
      <FeedbackButton />
    </div>
  );
}