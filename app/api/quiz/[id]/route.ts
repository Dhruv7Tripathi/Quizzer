// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const quiz = await prisma.quiz.findUnique({
//       where: {
//         id: params.id,
//         published: true,
//       },
//       include: {
//         questions: {
//           include: {
//             options: {
//               select: {
//                 id: true,
//                 text: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!quiz) {
//       return NextResponse.json(
//         { error: 'Quiz not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(quiz);
//   } catch (error) {
//     console.error('Error fetching quiz:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch quiz' },
//       { status: 500 }
//     );
//   }
// }

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: params.id,
      },
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
              select: {
                id: true,
                text: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
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
