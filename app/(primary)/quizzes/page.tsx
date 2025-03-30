"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, BookOpen, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficultyLevel: string;
  createdAt: string;
  questionsCount: number;
}

export default function QuizzesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      fetchQuizzes();
    }
  }, [status, router]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/quiz/publicquiz");
      setQuizzes(response.data.quizzes || []);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to fetch quizzes");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      setDeleteLoading(quizId);
      await axios.delete(`/api/quiz/delete/${quizId}`);
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to delete quiz");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">All Quizzes</h1>
            <p className="text-muted-foreground mt-1">Manage and take your created quizzes</p>
          </div>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link href="/createquiz" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Quiz
            </Link>
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6 flex items-center">
            <span className="font-medium">{error}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => setError("")}
            >
              Dismiss
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading your quizzes...</p>
            </div>
          </div>
        ) : quizzes.length === 0 ? (
          <Card className="border-dashed bg-muted/40">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No quizzes found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                You haven&apos;t created any quizzes yet. Start by creating your first quiz to test your knowledge.
              </p>
              <Button asChild size="lg">
                <Link href="/createquiz" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Quiz
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className={getDifficultyColor(quiz.difficultyLevel)}>
                      {quiz.difficultyLevel}
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      {quiz.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-2 line-clamp-1">{quiz.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium">{quiz.questionsCount} questions</span>
                    <span className="mx-2">•</span>
                    <span>Created {new Date(quiz.createdAt).toLocaleDateString()}</span>
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

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;{quiz.title}&quot;? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteQuiz(quiz.id)}
                            disabled={deleteLoading === quiz.id}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {deleteLoading === quiz.id ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}