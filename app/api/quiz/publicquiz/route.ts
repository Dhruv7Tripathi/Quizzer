import { NextResponse } from "next/server"
import prisma from "@/lib/db"
// import { authOptions } from "@/lib/authoptions"
// import { getServerSession } from "next-auth"

export async function GET() {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session || !session.user) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    // }

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

    // More informative error response
    return NextResponse.json(
      {
        message: "Failed to fetch public quizzes",
        error: process.env.NODE_ENV === 'development'
          ? (error instanceof Error ? error.message : 'Unknown error')
          : undefined
      },
      { status: 500 }
    )
  }
}