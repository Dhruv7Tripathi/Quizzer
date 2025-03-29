import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

const prisma = new PrismaClient();

interface AnswerSubmission {
  questionId: string;
  optionId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { id, answers } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Quiz ID is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid answers format" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          },
          include: {
            options: {
              select: {
                id: true,
                isCorrect: true,
              },
            },
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    if (answers.length !== quiz.questions.length) {
      return NextResponse.json(
        { error: "Must answer all questions" },
        { status: 400 }
      );
    }

    let correctAnswers = 0;

    answers.forEach((answer: AnswerSubmission) => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      if (question) {
        const selectedOption = question.options.find(o => o.id === answer.optionId);
        if (selectedOption?.isCorrect) {
          correctAnswers++;
        }
      }
    });

    const attempt = await prisma.quizAttempt.create({
      data: {
        quiz: {
          connect: {
            id: quiz.id
          }
        },
        user: {
          connect: {
            id: user.id
          }
        },
        score: correctAnswers,
        totalQuestions: quiz.questions.length,
        answers: {
          create: answers.map((answer: AnswerSubmission) => {
            const question = quiz.questions.find(q => q.id === answer.questionId);
            const selectedOption = question?.options.find(o => o.id === answer.optionId);
            return {
              question: {
                connect: {
                  id: answer.questionId
                }
              },
              selectedOption: {
                connect: {
                  id: answer.optionId
                }
              },
              isCorrect: selectedOption?.isCorrect || false
            };
          }),
        },
      },
      include: {
        answers: true
      }
    });

    return NextResponse.json({
      success: true,
      score: correctAnswers,
      totalQuestions: quiz.questions.length,
      attemptId: attempt.id,
      percentageScore: Math.round((correctAnswers / quiz.questions.length) * 100)
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}