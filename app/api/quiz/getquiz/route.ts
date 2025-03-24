import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    const reqBoy = await req.json();
    const { id } = reqBoy;
    if (!id) {
      return NextResponse.json({ message: 'Internal Server error' }, { status: 404 })
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
    return NextResponse.json(quiz);
  } catch (error) {
    console.log(error)
    return NextResponse.error();
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