"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, BookOpen, Calendar, Clock, Trash2, Plus, Share } from "lucide-react"
import Link from "next/link"
import { ShareQuizModal } from "@/components/secondry/share-quiz-modal"

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
    <div className="min-h-screen bg-background py-4 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">{error}</div>}

        {/* User Profile Card */}
        <Card className="mb-4">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-12 w-12 md:h-16 md:w-16">
              <AvatarImage src={data?.user?.image || ""} alt={data?.user?.name || "User"} />
              <AvatarFallback>{data?.user?.name ? getInitials(data.user.name) : "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg md:text-xl truncate">{data?.user?.name || "User"}</CardTitle>
              <CardDescription className="truncate">{data?.user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex flex-col items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-lg font-medium">{userStats?.totalAttempts || 0}</span>
                  <span className="text-xs text-muted-foreground">Attempted</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-lg font-medium">{userStats?.completedQuizzes || 0}</span>
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-muted/30 rounded-md">
                  <span className="text-lg font-medium">
                    {userStats?.averageAccuracy ? userStats.averageAccuracy.toFixed(0) : 0}%
                  </span>
                  <span className="text-xs text-muted-foreground">Accuracy</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Top Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {userStats?.byCategory?.slice(0, 3).map((category) => (
                    <Badge key={category.category} variant="outline" className="flex justify-between items-center gap-2">
                      {category.category}
                      <span className="text-xs">{category.averageAccuracy.toFixed(0)}%</span>
                    </Badge>
                  ))}
                  {(!userStats?.byCategory || userStats.byCategory.length === 0) && (
                    <p className="text-sm text-muted-foreground">No categories yet</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button asChild className="w-40">
                  <Link href="/quizzes">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View All Quizzes
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card className="p-2">
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium">
                {userStats?.averageAccuracy ? userStats.averageAccuracy.toFixed(0) : 0}%
              </span>
              <span className="text-xs text-muted-foreground">Accuracy</span>
            </div>
          </Card>

          <Card className="p-2">
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium">{userStats?.totalAttempts || 0}</span>
              <span className="text-xs text-muted-foreground">Attempted</span>
            </div>
          </Card>

          <Card className="p-2">
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium">
                {userStats?.highestScore
                  ? `${Math.round((userStats.highestScore.score / userStats.highestScore.totalQuestions) * 100)}%`
                  : "0%"}
              </span>
              <span className="text-xs text-muted-foreground">Best</span>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recent Quiz Attempts</CardTitle>
              </CardHeader>
              <CardContent className="px-2 py-0">
                {userStats?.recentAttempts && userStats.recentAttempts.length > 0 ? (
                  <div className="space-y-3">
                    {userStats.recentAttempts.map((attempt) => (
                      <div
                        key={attempt.id}
                        className="flex items-start gap-3 py-3 border-b last:border-0"
                      >
                        <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{attempt.quizTitle}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{attempt.category}</Badge>
                            <Badge variant="secondary" className={`text-xs ${getDifficultyColor(attempt.difficultyLevel)}`}>
                              {attempt.difficultyLevel}
                            </Badge>
                          </div>
                          <div className="text-xs font-medium mt-1">
                            Score: {attempt.score}/{attempt.totalQuestions} (
                            {Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-base font-medium mb-2">No quiz attempts yet</h3>
                    <Button asChild size="sm">
                      <Link href="/quizzes">Browse Quizzes</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mb-24">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">My Quizzes</h2>
            <Button asChild size="sm">
              <Link href="/create-quiz">
                <Plus className="h-4 w-4 mr-1" />
                Create
              </Link>
            </Button>
          </div>

          {quizzes.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="text-base font-medium mb-2">No quizzes created yet</h3>
                <Button asChild size="sm">
                  <Link href="/createquiz">Create Your First Quiz</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDeleteQuiz} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-16"></div>
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
    <Card>
      <CardHeader className="p-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base truncate">{quiz.title}</CardTitle>
          <Badge className={`text-xs ${difficultyColor[quiz.difficultyLevel.toLowerCase() as keyof typeof difficultyColor]}`}>
            {quiz.difficultyLevel}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 text-xs">{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <Clock className="mr-1 h-3 w-3" />
          {formatDate(quiz.createdAt)}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-white text-black text-xs">{quiz.category}</Badge>
          <Badge className="bg-white text-black text-xs">
            {quiz.questionsCount} {quiz.questionsCount === 1 ? "question" : "questions"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between gap-2">
        <Button variant="default" asChild size="sm" className="flex-1">
          <Link href={`/takequiz/${quiz.id}`} className="flex items-center justify-center">
            <BookOpen className="h-4 w-4 mr-1" />
            Take Quiz
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsShareModalOpen(true)}
          title="Share Quiz"
        >
          <Share className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-red-600 hover:text-red-800"
          onClick={() => onDelete(quiz.id)}
          title="Delete Quiz"
        >
          <Trash2 className="h-4 w-4" />
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