import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const quizId = params.id

    if (!quizId) {
      return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check if the quiz exists and belongs to the user
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    })

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 })
    }

    if (quiz.userId !== user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    // Delete the quiz and all related data (cascade delete should handle this if set up in the schema)
    await prisma.quiz.delete({
      where: { id: quizId },
    })

    return NextResponse.json({ message: "Quiz deleted successfully" })
  } catch (error) {
    console.error("Error deleting quiz:", error)
    return NextResponse.json({ message: "Failed to delete quiz" }, { status: 500 })
  }
}

