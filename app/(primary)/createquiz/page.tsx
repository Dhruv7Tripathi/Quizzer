"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  options: Option[];
}

interface FormData {
  title: string;
  description: string;
  category: string;
  difficultyLevel: string;
  questions: Question[];
}

export default function CreateQuiz() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      questions: [
        {
          text: "",
          options: [
            { text: "", isCorrect: true },
            { text: "", isCorrect: false }
          ]
        }
      ],
      difficultyLevel: "Easy"
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const validatedQuestions = data.questions.map(question => {
        return {
          text: question.text,
          options: question.options.slice(0, 2)
        };
      });

      const response = await axios.post("/api/quiz", {
        userId: session?.user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        difficultyLevel: data.difficultyLevel,
        questions: validatedQuestions,
      });
      if (response.data.quiz) {
        router.push(`/takequiz/${response.data.quiz.id}`);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      alert(axiosError.response?.data?.message || "Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create New Quiz</CardTitle>
            <CardDescription className="text-center">
              Create a quiz with true/false questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter quiz title"
                  className="w-full"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  placeholder="Enter quiz description"
                  className="w-full min-h-[100px]"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    {...register("category", { required: "Category is required" })}
                    placeholder="Enter quiz category"
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficultyLevel">Difficulty Level</Label>
                  <Select
                    onValueChange={(value) => {
                      const event = { target: { value } };
                      register("difficultyLevel").onChange(event);
                    }}
                    defaultValue="Easy"
                  >
                    <SelectTrigger>
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
                    onClick={() => append({
                      text: "",
                      options: [
                        { text: "", isCorrect: true },
                        { text: "", isCorrect: false }
                      ]
                    })}
                    className="flex items-center gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Label htmlFor={`question-${index}`}>
                              Question {index + 1}
                            </Label>
                            <Input
                              {...register(`questions.${index}.text`, {
                                required: "Question text is required"
                              })}
                              placeholder="Enter your question"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {[0, 1].map((optionIndex) => (
                            <div key={optionIndex} className="space-y-2">
                              <Label>
                                Option {optionIndex + 1} (
                                {optionIndex === 0 ? "True" : "False"})
                              </Label>
                              <Input
                                {...register(
                                  `questions.${index}.options.${optionIndex}.text`,
                                  { required: "Option text is required" }
                                )}
                                placeholder={`Enter option ${optionIndex + 1}`}
                              />
                              <input
                                type="hidden"
                                {...register(
                                  `questions.${index}.options.${optionIndex}.isCorrect`
                                )}
                                value={optionIndex === 0 ? "true" : "false"}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
  );
}