import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 });
    }
    const quiz = await prisma.quiz.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        difficultyLevel: true,
        questions: {
          select: {
            id: true,
            text: true,
            order: true,
            options: {
              select: { id: true, text: true },
            },
          },
        },
      },
    });
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ quiz }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}