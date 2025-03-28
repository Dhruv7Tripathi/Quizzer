"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, BookOpen, Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficultyLevel: string
  published: boolean
  createdAt: string
  questionsCount: number
  userId: string
  user: {
    name: string
    image: string
  }
}

export default function ExplorePage() {
  const { status } = useSession()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/quiz/public")
      setQuizzes(response.data.quizzes || [])
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch quizzes")
    } finally {
      setLoading(false)
    }
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

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(quizzes.map((quiz) => quiz.category)))]

  // Filter and sort quizzes
  let filteredQuizzes = quizzes.filter(
    (quiz) =>
      (quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || quiz.category === categoryFilter) &&
      (difficultyFilter === "all" || quiz.difficultyLevel === difficultyFilter),
  )

  filteredQuizzes = filteredQuizzes.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "a-z":
        return a.title.localeCompare(b.title)
      case "z-a":
        return b.title.localeCompare(a.title)
      case "most-questions":
        return b.questionsCount - a.questionsCount
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Explore Quizzes</h1>
            <p className="text-muted-foreground mt-1">Discover and take quizzes from the community</p>
          </div>
          <Button asChild>
            <Link href="/quizzes">My Quizzes</Link>
          </Button>
        </div>

        {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-6">{error}</div>}

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes by title, description or category..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[180px]">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => setSortBy("newest")}
                    className={sortBy === "newest" ? "bg-muted" : ""}
                  >
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("oldest")}
                    className={sortBy === "oldest" ? "bg-muted" : ""}
                  >
                    Oldest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("a-z")} className={sortBy === "a-z" ? "bg-muted" : ""}>
                    A-Z
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("z-a")} className={sortBy === "z-a" ? "bg-muted" : ""}>
                    Z-A
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("most-questions")}
                    className={sortBy === "most-questions" ? "bg-muted" : ""}
                  >
                    Most Questions
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-3 mb-4">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-4">
                {searchTerm || categoryFilter !== "all" || difficultyFilter !== "all"
                  ? "No quizzes match your search criteria. Try adjusting your filters."
                  : "There are no public quizzes available yet. Be the first to create and publish a quiz!"}
              </p>
              <Button asChild>
                <Link href="/createquiz">Create New Quiz</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="overflow-hidden flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className={getDifficultyColor(quiz.difficultyLevel)}>
                      {quiz.difficultyLevel}
                    </Badge>
                    <Badge variant="outline">{quiz.category}</Badge>
                  </div>
                  <CardTitle className="text-xl mt-2 line-clamp-1">{quiz.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{quiz.questionsCount} questions</span>
                    <span className="mx-2">•</span>
                    <span>By {quiz.user.name}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full" asChild>
                    <Link href={`/takequiz/${quiz.id}`}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Take Quiz
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

