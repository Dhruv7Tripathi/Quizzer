// import prisma from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { userId, title, description, category, difficultyLevel, questions } = await request.json();
//     if (!userId || !title || !description || !category || !difficultyLevel || !questions || !Array.isArray(questions)) {
//       return NextResponse.json(
//         { error: "Missing or invalid required fields" },
//         { status: 400 }
//       );
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { id: userId }
//     });
//     if (!existingUser) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 500 }
//       );
//     }

//     for (const [index, question] of questions.entries()) {
//       if (!question.text || !Array.isArray(question.options) || question.options.length !== 4) {
//         return NextResponse.json(
//           { error: `Question ${index + 1} must have text and exactly 4 options` },
//           { status: 400 }
//         );
//       }
//       const validOptions = question.options.every(
//         (option: { text: string; isCorrect: boolean }) => typeof option.text === "string" && typeof option.isCorrect === "boolean"
//       );

//       if (!validOptions) {
//         return NextResponse.json(
//           { error: `Question ${index + 1} has invalid options. Each option must include text and a boolean isCorrect field.` },
//           { status: 400 }
//         );
//       }
//       const correctOptionsCount = question.options.filter((option: { text: string; isCorrect: boolean }) => option.isCorrect).length;
//       if (correctOptionsCount !== 1) {
//         return NextResponse.json(
//           { error: `Question ${index + 1} must have exactly one correct answer` },
//           { status: 400 }
//         );
//       }
//     }
//     const quiz = await prisma.quiz.create({
//       data: {
//         title,
//         description,
//         category,
//         difficultyLevel,
//         published: false,
//         questions: {
//           create: questions.map((question, order) => ({
//             text: question.text,
//             order,
//             options: {
//               create: question.options.map((option: { text: string; isCorrect: boolean }) => ({
//                 text: option.text,
//                 isCorrect: option.isCorrect,
//               })),
//             },
//           })),
//         },
//         user: {
//           connect: {
//             id: userId,
//           },
//         },
//       },
//     });

//     return NextResponse.json({
//       message: "Quiz created successfully",
//       quiz,
//     });
//   } catch (error: unknown) {
//     console.log("Error creating quiz:", error instanceof Error ? error.message : String(error));
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, title, description, category, difficultyLevel, questions } = await request.json();

    if (!userId || !title || !description || !category || !difficultyLevel || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid required fields (userId, title, description, category, difficultyLevel, questions)" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    for (const [index, question] of questions.entries()) {
      if (!question.text || !Array.isArray(question.options) || question.options.length !== 4) {
        return NextResponse.json(
          { error: `Question ${index + 1} must have text and exactly 4 options` },
          { status: 400 }
        );
      }

      const validOptions = question.options.every(
        (option: { text: string; isCorrect: boolean }) => typeof option.text === "string" && typeof option.isCorrect === "boolean"
      );

      if (!validOptions) {
        return NextResponse.json(
          { error: `Question ${index + 1} options must have 'text' (string) and 'isCorrect' (boolean)` },
          { status: 400 }
        );
      }

      const correctOptionsCount = question.options.filter((option: { isCorrect: boolean; }) => option.isCorrect).length;
      if (correctOptionsCount !== 1) {
        return NextResponse.json(
          { error: `Question ${index + 1} must have exactly one correct option` },
          { status: 400 }
        );
      }
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        category,
        difficultyLevel,
        published: true,
        user: { connect: { id: userId } },
        questions: {
          create: questions.map((question, order) => ({
            text: question.text,
            order,
            options: {
              create: question.options.map((option: { text: string; isCorrect: boolean; }) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({ message: "Quiz created successfully", quiz }, { status: 201 });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
