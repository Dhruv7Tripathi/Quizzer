import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Trophy,
  Users,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
            Master Knowledge Through Interactive Quizzes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create, share, and take quizzes on any topic. Perfect for students, teachers,
            and lifelong learners who want to test their knowledge and learn in an engaging way.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Browse Quizzes
            </Button>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to create engaging quizzes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-blue-600" />,
                title: "Smart Learning",
                description: "Adaptive questions that match your skill level"
              },
              {
                icon: <Trophy className="h-8 w-8 text-blue-600" />,
                title: "Track Progress",
                description: "Monitor your improvement with detailed analytics"
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Collaborative",
                description: "Share quizzes and compete with friends"
              },
              {
                icon: <Sparkles className="h-8 w-8 text-blue-600" />,
                title: "Customizable",
                description: "Create quizzes that match your style"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 p-3 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "1M+", label: "Active Users" },
              { number: "5M+", label: "Quizzes Created" },
              { number: "50M+", label: "Questions Answered" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Quiz Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "Academic",
                description: "School and university subjects"
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Professional",
                description: "Career and skill development"
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Trivia",
                description: "Fun and entertaining topics"
              }
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-100 p-3">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start quizzing?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already learning and sharing knowledge through our platform.
          </p>
          <Link href={"/createquiz"}>
            <Button size="lg" className="gap-2">
              Create Your First Quiz <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}