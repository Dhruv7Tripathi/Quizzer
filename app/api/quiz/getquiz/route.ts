import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 });
    }

    // Fetch quiz from database
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

    // If no quiz is found, return 404
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ quiz }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function GET(
//   request: NextRequest
// ) {
//   try {
//     // Get the ID from the searchParams instead of params
//     const searchParams = request.nextUrl.searchParams;
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
//     }

//     const quiz = await prisma.quiz.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         title: true,
//         description: true,
//         category: true,
//         difficultyLevel: true,
//         questions: {
//           select: {
//             id: true,
//             text: true,
//             order: true,
//             options: {
//               select: { id: true, text: true },
//             },
//           },
//           orderBy: { order: "asc" },
//         },
//       },
//     });

//     if (!quiz) {
//       return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
//     }

//     return NextResponse.json({ quiz });
//   } catch (error) {
//     console.error("Error fetching quiz:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }