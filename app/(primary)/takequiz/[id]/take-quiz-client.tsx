// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import axios from "axios"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import { Loader2 } from "lucide-react"

// interface Option {
//   id: string
//   text: string
// }

// interface Question {
//   id: string
//   text: string
//   options: Option[]
// }

// interface Quiz {
//   id: string
//   title: string
//   description: string
//   category: string
//   difficultyLevel: string
//   questions: Question[]
// }

// interface TakeQuizClientProps {
//   quiz: Quiz
// }

// export default function TakeQuizClient({ quiz }: TakeQuizClientProps) {
//   const router = useRouter()
//   const [submitting, setSubmitting] = useState(false)
//   const [answers, setAnswers] = useState<Record<string, string>>({})
//   const [score, setScore] = useState<number | null>(null)

//   const handleAnswer = (questionId: string, optionId: string) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }))
//   }

//   const handleSubmit = async () => {
//     if (!quiz) return
//     if (Object.keys(answers).length !== quiz.questions.length) {
//       alert("Please answer all questions before submitting")
//       return
//     }

//     setSubmitting(true)
//     try {
//       const response = await axios.post(`/api/quiz/submit`, {
//         id: quiz.id,
//         answers: Object.entries(answers).map(([questionId, optionId]) => ({
//           questionId,
//           optionId,
//         })),
//       })

//       setScore(response.data.score)
//     } catch (error) {
//       console.error("Error submitting quiz:", error)
//       alert("Error submitting quiz")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">{quiz.title}</CardTitle>
//             <CardDescription className="text-center">{quiz.description}</CardDescription>
//             <div className="mt-2">
//               <span className="font-semibold">Category:</span> {quiz.category} |{" "}
//               <span className="font-semibold">Difficulty:</span> {quiz.difficultyLevel}
//             </div>
//           </CardHeader>
//           <CardContent>
//             {score !== null ? (
//               <div className="text-center space-y-4">
//                 <h3 className="text-xl font-bold">Quiz Complete!</h3>
//                 <p className="text-lg">
//                   Your score: {score}/{quiz.questions.length} ({((score / quiz.questions.length) * 100).toFixed(1)}%)
//                 </p>
//                 <Button onClick={() => router.push("/profile")}>Back to your profile</Button>
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

//                 <Button onClick={handleSubmit} className="w-full" disabled={submitting}>
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
//   )
// }

