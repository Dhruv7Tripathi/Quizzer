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
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section with Refined Design */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-blue-100">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-6 leading-tight">
              Master Knowledge Through Interactive Quizzes
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
              Create, share, and take quizzes on any topic. Perfect for students, teachers,
              and lifelong learners who want to test their knowledge and learn in an engaging way.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 gap-2 shadow-lg hover:shadow-xl"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Browse Quizzes
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section with Enhanced Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
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
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 p-3 mb-4 shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Numbers */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "1M+", label: "Active Users" },
              { number: "5M+", label: "Quizzes Created" },
              { number: "50M+", label: "Questions Answered" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl font-bold mb-2 text-white">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section with Hover Effects */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Explore Quiz Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-6 w-6 text-blue-600" />,
                title: "Academic",
                description: "School and university subjects"
              },
              {
                icon: <Target className="h-6 w-6 text-green-600" />,
                title: "Professional",
                description: "Career and skill development"
              },
              {
                icon: <Zap className="h-6 w-6 text-purple-600" />,
                title: "Trivia",
                description: "Fun and entertaining topics"
              }
            ].map((category, index) => (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-100 p-3 shadow-md">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-pattern"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Ready to start quizzing?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of users who are already learning and sharing knowledge through our platform.
            </p>
            <div className="flex justify-center items-center gap-4">
              <Link href={"/createquiz"}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 gap-2 shadow-lg hover:shadow-xl"
                >
                  Create Your First Quiz <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Free to get started</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}