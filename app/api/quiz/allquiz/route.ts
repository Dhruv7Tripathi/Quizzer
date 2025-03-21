import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/db" // Assuming you have a Prisma client setup

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const quizzes = await prisma.quiz.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        difficultyLevel: true,
        createdAt: true,
        questions: {
          select: { id: true },
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
      createdAt: quiz.createdAt,
      questionsCount: quiz.questions.length,
    }))

    return NextResponse.json({ quizzes: transformedQuizzes })
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    return NextResponse.json({ message: "Failed to fetch quizzes" }, { status: 500 })
  }
}
