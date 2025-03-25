import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/db"

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

    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId: user.id },
      include: {
        quiz: {
          select: {
            title: true,
            category: true,
            difficultyLevel: true,
            questions: {
              select: { id: true },
            },
          },
        },
        answers: {
          select: {
            isCorrect: true,
          },
        },
      },
      orderBy: { completedAt: "desc" },
    })

    const totalAttempts = quizAttempts.length
    const completedQuizzes = quizAttempts.filter((attempt) => attempt.isCompleted).length

    let totalCorrectAnswers = 0
    let totalAnswers = 0

    quizAttempts.forEach((attempt) => {
      const correctAnswers = attempt.answers.filter((answer) => answer.isCorrect).length
      totalCorrectAnswers += correctAnswers
      totalAnswers += attempt.answers.length
    })

    const averageAccuracy = totalAnswers > 0 ? (totalCorrectAnswers / totalAnswers) * 100 : 0

    let highestScore = null
    if (quizAttempts.length > 0) {
      const attemptWithScores = quizAttempts.map((attempt) => {
        const correctAnswers = attempt.answers.filter((answer) => answer.isCorrect).length
        const totalQuestions = attempt.quiz.questions.length
        return {
          score: correctAnswers,
          totalQuestions,
          quizTitle: attempt.quiz.title,
          percentage: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
        }
      })

      highestScore = attemptWithScores.reduce((prev, current) =>
        prev.percentage > current.percentage ? prev : current,
      )
    }

    const categoriesMap = new Map()
    quizAttempts.forEach((attempt) => {
      const category = attempt.quiz.category
      const correctAnswers = attempt.answers.filter((answer) => answer.isCorrect).length
      const totalAnswers = attempt.answers.length

      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, {
          category,
          attempts: 0,
          correctAnswers: 0,
          totalAnswers: 0,
        })
      }

      const categoryData = categoriesMap.get(category)
      categoryData.attempts += 1
      categoryData.correctAnswers += correctAnswers
      categoryData.totalAnswers += totalAnswers
    })

    const byCategory = Array.from(categoriesMap.values())
      .map((category) => ({
        category: category.category,
        attempts: category.attempts,
        averageAccuracy: category.totalAnswers > 0 ? (category.correctAnswers / category.totalAnswers) * 100 : 0,
      }))
      .sort((a, b) => b.averageAccuracy - a.averageAccuracy)

    const recentAttempts = quizAttempts.slice(0, 5).map((attempt) => {
      const correctAnswers = attempt.answers.filter((answer) => answer.isCorrect).length
      return {
        id: attempt.id,
        quizId: attempt.quizId,
        quizTitle: attempt.quiz.title,
        category: attempt.quiz.category,
        difficultyLevel: attempt.quiz.difficultyLevel,
        score: correctAnswers,
        totalQuestions: attempt.quiz.questions.length,
        completedAt: attempt.completedAt,
      }
    })

    return NextResponse.json({
      totalAttempts,
      totalQuizzes: await prisma.quiz.count(),
      averageAccuracy,
      completedQuizzes,
      highestScore: highestScore
        ? {
          score: highestScore.score,
          totalQuestions: highestScore.totalQuestions,
          quizTitle: highestScore.quizTitle,
        }
        : null,
      byCategory,
      recentAttempts,
    })
  } catch (error) {
    console.error("Error fetching user stats:", error)
    return NextResponse.json({ message: "Failed to fetch user statistics" }, { status: 500 })
  }
}

