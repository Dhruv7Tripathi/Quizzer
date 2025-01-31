import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Create Prisma client instance
const prisma = new PrismaClient();

// Define GET request handler
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // Adjust type for params
) {
  try {
    const { id } = params; // Destructure the id from params

    // Fetch the quiz from the database using Prisma
    const quiz = await prisma.quiz.findUnique({
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
          orderBy: { order: "asc" },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
