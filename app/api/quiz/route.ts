import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, title, description, category, difficultyLevel, questions } = await request.json();

    if (!userId || !title || !description || !category || !difficultyLevel || !questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    for (const question of questions) {
      if (!question.text || !Array.isArray(question.options) || question.options.length !== 2) {
        return NextResponse.json(
          { error: 'Each question must have exactly 2 options' },
          { status: 400 }
        );
      }

      // Ensure the options are strictly "true" or "false"
      const validOptions = question.options.every((option: { text: string }) =>
        option.text === "true" || option.text === "false"
      );

      if (!validOptions) {
        return NextResponse.json(
          { error: 'Each option must be either "true" or "false"' },
          { status: 400 }
        );
      }

      // Ensure there is exactly one correct option
      const correctOptions = question.options.filter((option: { isCorrect: boolean }) => option.isCorrect);
      if (correctOptions.length !== 1) {
        return NextResponse.json(
          { error: 'Each question must have exactly one correct answer' },
          { status: 400 }
        );
      }
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        category,
        difficultyLevel,
        published: false,
        questions: {
          create: questions.map((question, index) => ({
            text: question.text,
            order: index,
            user: { connect: { id: userId } },
            options: {
              create: question.options.map((option: { text: string; isCorrect: boolean }) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
        user: {
          connect: {
            id: userId
          }
        }
      },
    });

    return NextResponse.json({
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error: unknown) {
    console.error('Error creating quiz:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
