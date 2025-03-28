import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  try {
    // Get all published quizzes
    const quizzes = await prisma.quiz.findMany({
      where: {
        published: true,
      },
      orderBy: { createdAt: "desc" },
      include: {
        questions: {
          select: { id: true },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    // Transform the data to include question count
    const transformedQuizzes = quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      difficultyLevel: quiz.difficultyLevel,
      published: quiz.published,
      createdAt: quiz.createdAt,
      questionsCount: quiz.questions.length,
      userId: quiz.userId,
      user: quiz.user
        ? {
          name: quiz.user.name,
          image: quiz.user.image,
        }
        : null,
    }))

    return NextResponse.json({ quizzes: transformedQuizzes })
  } catch (error) {
    console.error("Error fetching public quizzes:", error)
    return NextResponse.json({ message: "Failed to fetch public quizzes" }, { status: 500 })
  }
}

