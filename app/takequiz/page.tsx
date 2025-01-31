// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";
// ;
// import prisma from "@/lib/db";
// import { Card } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { format } from "date-fns";

// export default async function Results() {
//   // const session = await getServerSession(authOptions);

//   // if (!session) {
//   //   redirect("/login");
//   // }

//   // const attempts = await prisma.attempt.findMany({
//   //   where: {
//   //     userId: session.user.id,
//   //   },
//   //   include: {
//   //     quiz: true,
//   //   },
//   //   orderBy: {
//   //     createdAt: "desc",
//   //   },
//   // });

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">My Quiz Results</h1>
//       <Card className="p-6">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Quiz Title</TableHead>
//               <TableHead>Score</TableHead>
//               <TableHead>Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           {/* <TableBody>
//             {attempts.map((attempt) => (
//               <TableRow key={attempt.id}>
//                 <TableCell className="font-medium">
//                   {attempt.quiz.title}
//                 </TableCell>
//                 <TableCell>{attempt.score}%</TableCell>
//                 <TableCell>
//                   {format(new Date(attempt.createdAt), "PPp")}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody> */}
//         </Table>
//         {/* {attempts.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             You haven&apos;t taken any quizzes yet.
//           </div>
//         )} */}
//       </Card>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficultyLevel: string;
  questions: Question[];
}

export default function TakeQuiz({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quiz/${params.id}`);
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        alert("Error loading quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.id]);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    if (Object.keys(answers).length !== quiz.questions.length) {
      alert("Please answer all questions before submitting");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(`/api/quiz/${quiz.id}/submit`, {
        answers: Object.entries(answers).map(([questionId, optionId]) => ({
          questionId,
          optionId
        }))
      });

      setScore(response.data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting quiz");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Quiz not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{quiz.title}</CardTitle>
            <CardDescription className="text-center">
              {quiz.description}
              <div className="mt-2">
                <span className="font-semibold">Category:</span> {quiz.category} |{" "}
                <span className="font-semibold">Difficulty:</span> {quiz.difficultyLevel}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {score !== null ? (
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Quiz Complete!</h3>
                <p className="text-lg">
                  Your score: {score}/{quiz.questions.length} ({((score / quiz.questions.length) * 100).toFixed(1)}%)
                </p>
                <Button onClick={() => router.push("/quizzes")}>
                  Back to Quizzes
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">
                          Question {index + 1}: {question.text}
                        </h3>
                        <RadioGroup
                          onValueChange={(value) => handleAnswer(question.id, value)}
                          value={answers[question.id]}
                        >
                          <div className="space-y-2">
                            {question.options.map((option) => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.id} id={option.id} />
                                <Label htmlFor={option.id}>{option.text}</Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Quiz"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}