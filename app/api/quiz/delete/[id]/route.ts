// import { NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import prisma from "@/lib/db"
// interface Params {
//   params: Promise<{ id: string }>;
// }
// export async function DELETE(
//   request: NextRequest,
//   { params }: Params
// ) {
//   try {
//     const { id } = await params;

//     const session = await getServerSession()

//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     if (!id) {
//       return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 })
//     }

//     const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//     })

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 })
//     }

//     // Check if the quiz exists and belongs to the user
//     const quiz = await prisma.quiz.findUnique({
//       where: { id },
//     })

//     if (!quiz) {
//       return NextResponse.json({ message: "Quiz not found" }, { status: 404 })
//     }

//     if (quiz.userId !== user.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
//     }

//     // Delete the quiz and all related data
//     await prisma.quiz.delete({
//       where: { id },
//     })

//     return NextResponse.json({ message: "Quiz deleted successfully" })
//   } catch (error) {
//     // Fix the console.error issue by using a string-only approach
//     console.error(`Error deleting quiz: ${error ? (error instanceof Error ? error.message : String(error)) : 'Unknown error'}`)
//     return NextResponse.json({ message: "Failed to delete quiz" }, { status: 500 })
//   }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

interface Params {
  params: Promise<{ id: string }>;
}
export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the quiz exists and belongs to the user
    const quiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    if (quiz.userId !== user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Delete related records first (adjust based on actual related tables)
    await prisma.quizAttempt.deleteMany({
      where: { quizId: id },
    });

    await prisma.question.deleteMany({
      where: { quizId: id },
    });

    // Now delete the quiz
    await prisma.quiz.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error(`Error deleting quiz: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json({ message: "Failed to delete quiz" }, { status: 500 });
  }
}
