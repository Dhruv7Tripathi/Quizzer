"use client"

import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle, MinusCircle, Loader2 } from "lucide-react";

interface Question {
  text: string;
  isTrue: boolean;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questions: Question[];
}

export default function CreateQuiz() {
  const { register, control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      questions: [{ text: '', isTrue: true }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      console.log("Form data", data);
      await axios.post('/api/quiz', data);
      reset();
      alert('Quiz created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating quiz');
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
              Fill in the details below to create your quiz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  {...register('title', { required: true })}
                  placeholder="Enter quiz title"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description', { required: true })}
                  placeholder="Enter quiz description"
                  className="w-full min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    {...register('category', { required: true })}
                    placeholder="Enter quiz category"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    onValueChange={(value) => {
                      const event = { target: { value } };
                      register('difficulty').onChange(event);
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
                    onClick={() => append({ text: '', isTrue: true })}
                    className="flex items-center gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Card key={field.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-2">
                            <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
                            <Input
                              id={`question-${index}`}
                              {...register(`questions.${index}.text` as const, { required: true })}
                              placeholder="Enter your question"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`answer-${index}`}>Answer</Label>
                            <Select
                              onValueChange={(value) => {
                                const event = { target: { value: value === 'true' } };
                                register(`questions.${index}.isTrue`).onChange(event);
                              }}
                              defaultValue="true"
                            >
                              <SelectTrigger id={`answer-${index}`} className="w-[120px]">
                                <SelectValue placeholder="Select answer" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">True</SelectItem>
                                <SelectItem value="false">False</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                            className="mt-8"
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Quiz...
                  </>
                ) : (
                  'Create Quiz'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}