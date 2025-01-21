import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, difficultyLevel, questions, authorId } = body;

    // Validate required fields
    if (!title || !description || !category || !difficultyLevel || !questions || !Array.isArray(questions) || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate questions format
    for (const question of questions) {
      if (!question.text || !Array.isArray(question.options) || question.options.length < 2) {
        return NextResponse.json(
          { error: 'Invalid question format. Each question must have text and at least 2 options' },
          { status: 400 }
        );
      }

      // Ensure there is exactly one correct answer
      const correctOptions = question.options.filter((option: { isCorrect: boolean }) => option.isCorrect);
      if (correctOptions.length !== 1) {
        return NextResponse.json(
          { error: 'Each question must have exactly one correct answer' },
          { status: 400 }
        );
      }
    }

    // Create quiz with nested questions and options
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        category,
        difficultyLevel,
        authorId,
        published: false,
        questions: {
          create: questions.map((question, index) => ({
            text: question.text,
            order: index,
            options: {
              create: question.options.map((option: { text: string; isCorrect: boolean }) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    console.error('Error creating quiz:', error);

    // Ensure proper error handling
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        difficultyLevel: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}
// export async function GET() {
//   try {
//     const quizzes = await prisma.quiz.findMany({
//       where: {
//         published: true,
//       },
//       select: {
//         id: true,
//         title: true,
//         description: true,
//         category: true,
//         difficultyLevel: true,
//         createdAt: true,
//         _count: {
//           select: {
//             questions: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     return NextResponse.json(quizzes);
//   } catch (error) {
//     console.error('Error fetching quizzes:', error);

//     //copilot
//     const errorPayload = {
//       error: 'Failed to fetch quizzes',
//       details: error instanceof Error ? error.message : 'Unknown error occurred',
//     };

//     return NextResponse.json(errorPayload, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
