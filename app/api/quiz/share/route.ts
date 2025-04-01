import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"
import db from "@/lib/db"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { quizId, emails, quizTitle } = await req.json()

    if (!quizId || !emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 })
    }

    const quiz = await db.quiz.findUnique({
      where: {
        id: quizId,
        userId: session.user.id,
      },
    })

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found or you don't have permission to share it" }, { status: 404 })
    }

    const sharePromises = emails.map(async (email) => {
      const user = await db.user.findUnique({
        where: { email },
      })

      return db.quizShare.create({
        data: {
          quizId,
          email,
          userId: user?.id,
          createdBy: session.user.id,
        },
      })
    })

    await Promise.all(sharePromises)


    return NextResponse.json({
      success: true,
      message: "Quiz shared successfully",
    })
  } catch (error) {
    console.error("Error sharing quiz:", error)
    return NextResponse.json({ message: "Failed to share quiz" }, { status: 500 })
  }
}

