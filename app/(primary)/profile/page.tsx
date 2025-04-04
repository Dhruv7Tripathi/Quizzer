"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trophy, Target, BookOpen, BarChart3, Calendar, Clock, Trash2, Plus, Share } from "lucide-react"
import Link from "next/link"
import { ShareQuizModal } from "@/components/share-quiz-modal"

interface QuizAttempt {
  id: string
  quizId: string
  quizTitle: string
  category: string
  difficultyLevel: string
  score: number
  totalQuestions: number
  completedAt: string
}

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficultyLevel: string
  createdAt: string
  questionsCount: number
}

interface UserStats {
  totalAttempts: number
  totalQuizzes: number
  averageAccuracy: number
  completedQuizzes: number
  highestScore: {
    score: number
    totalQuestions: number
    quizTitle: string
  } | null
  byCategory: {
    category: string
    attempts: number
    averageAccuracy: number
  }[]
  recentAttempts: QuizAttempt[]
}

export default function ProfilePage() {
  const session = useSession()
  const { data, status } = session || { data: null, status: "loading" }
  const router = useRouter()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
      return
    }

    if (status === "authenticated") {
      fetchUserStats()
      fetchUserQuizzes()
    }
  }, [status, router])

  const fetchUserQuizzes = async () => {
    try {
      const response = await axios.get("/api/quiz/allquiz")
      setQuizzes(response.data.quizzes || [])
    } catch (error) {
      console.error("Failed to fetch quizzes", error)
    }
  }

  const fetchUserStats = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/quiz/user/stats")
      setUserStats(response.data)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to fetch user statistics")
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await axios.delete(`/api/quiz/delete/${quizId}`)
      fetchUserQuizzes()
    } catch (error) {
      console.error("Failed to delete quiz", error)
      setError("Failed to delete quiz")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   })
  // }


  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-6">{error}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={data?.user?.image || ""} alt={data?.user?.name || "User"} />
                <AvatarFallback>{data?.user?.name ? getInitials(data.user.name) : "U"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{data?.user?.name || "User"}</CardTitle>
                <CardDescription>{data?.user?.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quizzes attempted</span>
                    <span className="font-medium">{userStats?.totalAttempts || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quizzes completed</span>
                    <span className="font-medium">{userStats?.completedQuizzes || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Average accuracy</span>
                    <span className="font-medium">
                      {userStats?.averageAccuracy ? userStats.averageAccuracy.toFixed(1) : 0}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Top Categories</h4>
                  <div className="space-y-2">
                    {userStats?.byCategory?.slice(0, 3).map((category) => (
                      <div key={category.category} className="flex justify-between items-center">
                        <Badge variant="outline">{category.category}</Badge>
                        <span className="text-sm font-medium">{category.averageAccuracy.toFixed(1)}%</span>
                      </div>
                    ))}
                    {(!userStats?.byCategory || userStats.byCategory.length === 0) && (
                      <p className="text-sm text-muted-foreground">No categories yet</p>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/quizzes">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View All Quizzes
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Average Accuracy</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">
                      {userStats?.averageAccuracy ? userStats.averageAccuracy.toFixed(1) : 0}%
                    </CardTitle>
                    <Target className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={userStats?.averageAccuracy || 0} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Quizzes Attempted</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">{userStats?.totalAttempts || 0}</CardTitle>
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">{userStats?.completedQuizzes || 0} completed</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Highest Score</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">
                      {userStats?.highestScore
                        ? `${Math.round((userStats.highestScore.score / userStats.highestScore.totalQuestions) * 100)}%`
                        : "N/A"}
                    </CardTitle>
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground truncate">
                    {userStats?.highestScore?.quizTitle || "No quizzes completed yet"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Quiz Attempts</CardTitle>
                    <CardDescription>Your latest quiz activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userStats?.recentAttempts && userStats.recentAttempts.length > 0 ? (
                      <div className="space-y-4">
                        {userStats.recentAttempts.map((attempt) => (
                          <div
                            key={attempt.id}
                            className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                          >
                            <div className="rounded-full bg-primary/10 p-2">
                              <Calendar className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{attempt.quizTitle}</p>
                                <Badge variant="secondary" className={getDifficultyColor(attempt.difficultyLevel)}>
                                  {attempt.difficultyLevel}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{attempt.category}</Badge>
                                </div>
                                <div className="text-sm font-medium">
                                  {attempt.score}/{attempt.totalQuestions} (
                                  {Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No quiz attempts yet</h3>
                        <p className="text-muted-foreground max-w-md mb-4">
                          You haven&apos;t attempted any quizzes yet. Start by taking a quiz to see your performance.
                        </p>
                        <Button asChild>
                          <Link href="/quizzes">Browse Quizzes</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance by Category</CardTitle>
                    <CardDescription>Your accuracy across different quiz categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userStats?.byCategory && userStats.byCategory.length > 0 ? (
                      <div className="space-y-6">
                        {userStats.byCategory.map((category) => (
                          <div key={category.category} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{category.category}</span>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{category.averageAccuracy.toFixed(1)}%</span>
                                <span className="text-muted-foreground ml-2">({category.attempts} attempts)</span>
                              </div>
                            </div>
                            <Progress value={category.averageAccuracy} className="h-2" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Target className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No performance data yet</h3>
                        <p className="text-muted-foreground max-w-md mb-4">
                          Complete some quizzes to see your performance metrics by category.
                        </p>
                        <Button asChild>
                          <Link href="/quizzes">Take a Quiz</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Quizzes</h2>
                <Button asChild>
                  <Link href="/create-quiz">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Quiz
                  </Link>
                </Button>
              </div>

              {quizzes.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No quizzes created yet</h3>
                    <p className="text-muted-foreground max-w-md mb-4">
                      You haven&apos;t created any quizzes yet. Create your first quiz to share with others.
                    </p>
                    <Button asChild>
                      <Link href="/createquiz">Create Your First Quiz</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {quizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDeleteQuiz} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface QuizCardProps {
  quiz: Quiz
  onDelete: (quizId: string) => void
}

function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const difficultyColor = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{quiz.title}</CardTitle>
          <Badge className={difficultyColor[quiz.difficultyLevel.toLowerCase() as keyof typeof difficultyColor]}>
            {quiz.difficultyLevel}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex text-sm text-muted-foreground mb-2">
          <Clock className="mr-1 h-4 w-4" />
          Created on {formatDate(quiz.createdAt)}
        </div>
        <div className="flex items-center gap-2">
          <Badge className=" bg-white  text-black">{quiz.category}</Badge>
          <Badge className=" bg-white  text-black">
            {quiz.questionsCount} {quiz.questionsCount === 1 ? "question" : "questions"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 gap-2">
        <Button variant="default" asChild className="flex-1">
          <Link href={`/takequiz/${quiz.id}`} className="flex items-center justify-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Take Quiz
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsShareModalOpen(true)} title="Share Quiz">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
      <CardFooter className="pt-2 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(quiz.id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
      <ShareQuizModal
        quizId={quiz.id}
        quizTitle={quiz.title}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </Card>
  )
}

