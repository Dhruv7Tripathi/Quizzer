import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { quizId, answers } = await request.json();

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId
      },
      include: {
        questions: {
          include: {
            options: {
              select: {
                id: true,
                isCorrect: true
              }
            }
          }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    let correctAnswers = 0;

    // Check each answer against correct options
    quiz.questions.forEach((question: { id: string; options: { id: string; isCorrect: boolean }[] }) => {
      const selectedOptionId = answers[question.id];
      const correctOption = question.options.find((opt: { id: string; isCorrect: boolean }) => opt.isCorrect);

      if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    return NextResponse.json({ score });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}