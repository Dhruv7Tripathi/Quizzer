// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";

// interface Option {
//   id: string;
//   text: string;
// }

// interface Question {
//   id: string;
//   text: string;
//   options: Option[];
// }

// interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   difficultyLevel: string;
//   questions: Question[];
// }

// export default function TakeQuiz() {
//   const router = useRouter();
//   const { quizId } = useParams();
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [score, setScore] = useState<number | null>(null);

//   useEffect(() => {
//     if (!quizId) return;
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(`/api/quiz/getquiz`, {
//           params: { id: quizId }
//         });
//         setQuiz(response.data.quiz);
//       } catch (error) {
//         console.error("Error fetching quiz:", error);
//         alert("Error loading quiz");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [quizId]);

//   const handleAnswer = (questionId: string, optionId: string) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: optionId
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!quiz) return;
//     if (Object.keys(answers).length !== quiz.questions.length) {
//       alert("Please answer all questions before submitting");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const response = await axios.post(`/api/quiz/submit`, {
//         answers: Object.entries(answers).map(([questionId, optionId]) => ({
//           questionId,
//           optionId
//         }))
//       });

//       setScore(response.data.score);
//     } catch (error) {
//       console.error("Error submitting quiz:", error);
//       alert("Error submitting quiz");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!quiz) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-lg">Quiz not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">{quiz.title}</CardTitle>
//             <CardDescription className="text-center">
//               {quiz.description}
//               <div className="mt-2">
//                 <span className="font-semibold">Category:</span> {quiz.category} |{" "}
//                 <span className="font-semibold">Difficulty:</span> {quiz.difficultyLevel}
//               </div>
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {score !== null ? (
//               <div className="text-center space-y-4">
//                 <h3 className="text-xl font-bold">Quiz Complete!</h3>
//                 <p className="text-lg">
//                   Your score: {score}/{quiz.questions.length} ({((score / quiz.questions.length) * 100).toFixed(1)}%)
//                 </p>
//                 <Button onClick={() => router.push("/takequiz")}>
//                   Back to Quizzes
//                 </Button>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {quiz.questions.map((question, index) => (
//                   <Card key={question.id}>
//                     <CardContent className="pt-6">
//                       <div className="space-y-4">
//                         <h3 className="font-medium">
//                           Question {index + 1}: {question.text}
//                         </h3>
//                         <RadioGroup
//                           onValueChange={(value) => handleAnswer(question.id, value)}
//                           value={answers[question.id]}
//                         >
//                           <div className="space-y-2">
//                             {question.options.map((option) => (
//                               <div key={option.id} className="flex items-center space-x-2">
//                                 <RadioGroupItem value={option.id} id={option.id} />
//                                 <Label htmlFor={option.id}>{option.text}</Label>
//                               </div>
//                             ))}
//                           </div>
//                         </RadioGroup>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}

//                 <Button
//                   onClick={handleSubmit}
//                   className="w-full"
//                   disabled={submitting}
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     "Submit Quiz"
//                   )}
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function TakeQuiz() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!quizId) return;
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quiz/getquiz`, {
          params: { id: quizId }
        }
        );
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        alert("Error loading quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

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
      const response = await axios.post(`/api/quiz/submit`, {
        id: quizId,
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
                <Button onClick={() => router.push("/takequiz")}>
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