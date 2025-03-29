"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PlusCircle, MinusCircle, Loader2, CheckCircle2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Option {
  text: string
  isCorrect: boolean
}

interface Question {
  text: string
  options: Option[]
}

interface FormData {
  title: string
  description: string
  category: string
  difficultyLevel: string
  questions: Question[]
}

export default function CreateQuiz() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      questions: [
        {
          text: "",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
      difficultyLevel: "Easy",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  const onSubmit = async (data: FormData) => {
    const isValid = data.questions.every(question =>
      question.options.filter(option => option.isCorrect).length === 1
    )
    if (!isValid) {
      setError("Each question must have exactly one correct option")
      return
    }
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("/api/quiz", {
        userId: session?.user?.id,
        title: data.title,
        description: data.description,
        category: data.category,
        difficultyLevel: data.difficultyLevel,
        questions: data.questions,
      })

      if (response.data.quiz) {
        router.push(`/quizzes`)
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(error.response?.data?.message || "Failed to create quiz");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCorrectOptionChange = (questionIndex: number, optionIndex: number) => {
    // For the current question, set only the clicked option to be correct
    const questionOptions = getValues(`questions.${questionIndex}.options`);
    const updatedOptions = questionOptions.map((option, index) => ({
      ...option,
      isCorrect: index === optionIndex
    }));

    setValue(`questions.${questionIndex}.options`, updatedOptions);
  }

  const appendQuestion = () => {
    append({
      text: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    })
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create New Quiz</CardTitle>
            <CardDescription className="text-center">Create a quiz with multiple-choice questions</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-6">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter quiz title"
                  className="w-full"
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  placeholder="Enter quiz description"
                  className="w-full min-h-[100px]"
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    {...register("category", { required: "Category is required" })}
                    placeholder="Enter quiz category"
                  />
                  {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficultyLevel">Difficulty Level</Label>
                  <Select
                    onValueChange={(value) => {
                      const event = { target: { value } }
                      register("difficultyLevel").onChange(event)
                    }}
                    defaultValue="Easy"
                  >
                    <SelectTrigger id="difficultyLevel">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Questions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={appendQuestion}
                    className="flex items-center gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                {fields.map((field, questionIndex) => {
                  // Get current options for this question
                  const questionOptions = getValues(`questions.${questionIndex}.options`) || [];

                  return (
                    <Card key={field.id}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <Label htmlFor={`question-${questionIndex}`}>Question {questionIndex + 1}</Label>
                              <Input
                                id={`question-${questionIndex}`}
                                {...register(`questions.${questionIndex}.text`, {
                                  required: "Question text is required",
                                })}
                                placeholder="Enter your question"
                              />
                              {errors.questions?.[questionIndex]?.text && (
                                <p className="text-sm text-destructive">{errors.questions[questionIndex]?.text?.message}</p>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => remove(questionIndex)}
                              disabled={fields.length === 1}
                              className="mt-8"
                            >
                              <MinusCircle className="h-4 w-4" />
                              <span className="sr-only">Remove question</span>
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {[0, 1, 2, 3].map((optionIndex) => {
                              // Check if this option is correct
                              const isCorrect = questionOptions[optionIndex]?.isCorrect || false;

                              return (
                                <div key={optionIndex} className="space-y-2">
                                  <Label htmlFor={`option-${questionIndex}-${optionIndex}`}>
                                    Option {optionIndex + 1}
                                  </Label>
                                  <div className="flex items-center space-x-2">
                                    <Input
                                      id={`option-${questionIndex}-${optionIndex}`}
                                      {...register(`questions.${questionIndex}.options.${optionIndex}.text`, {
                                        required: "Option text is required",
                                      })}
                                      placeholder={`Enter option ${optionIndex + 1}`}
                                      className={cn(
                                        "flex-1",
                                        isCorrect && "border-2 border-green-500"
                                      )}
                                    />
                                    <Button
                                      type="button"
                                      variant={isCorrect ? "default" : "outline"}
                                      size="icon"
                                      onClick={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                                      className="w-10 h-10"
                                    >
                                      <CheckCircle2 className={cn(
                                        "h-5 w-5",
                                        isCorrect ? "text-white" : "text-muted-foreground"
                                      )} />
                                    </Button>
                                  </div>
                                  {errors.questions?.[questionIndex]?.options?.[optionIndex]?.text && (
                                    <p className="text-sm text-destructive">
                                      {errors.questions[questionIndex]?.options?.[optionIndex]?.text?.message}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Quiz...
                  </>
                ) : (
                  "Create Quiz"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}