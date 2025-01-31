import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, title, description, category, difficultyLevel, questions } = await request.json();
    if (!userId || !title || !description || !category || !difficultyLevel || !questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }
    for (const [index, question] of questions.entries()) {
      if (!question.text || !Array.isArray(question.options) || question.options.length !== 2) {
        return NextResponse.json(
          { error: `Question ${index + 1} must have text and exactly 2 options` },
          { status: 400 }
        );
      }
      const validOptions = question.options.every(
        (option: { text: string; isCorrect: boolean }) => typeof option.text === "string" && typeof option.isCorrect === "boolean"
      );

      if (!validOptions) {
        return NextResponse.json(
          { error: `Question ${index + 1} has invalid options. Each option must include text and a boolean isCorrect field.` },
          { status: 400 }
        );
      }
      const correctOptionsCount = question.options.filter((option: { text: string; isCorrect: boolean }) => option.isCorrect).length;
      if (correctOptionsCount !== 1) {
        return NextResponse.json(
          { error: `Question ${index + 1} must have exactly one correct answer` },
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
          create: questions.map((question, order) => ({
            text: question.text,
            order,
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
            id: userId,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error: unknown) {
    console.error("Error creating quiz:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
