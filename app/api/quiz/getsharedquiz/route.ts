// import { type NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/authoptions"
// import  db  from "@/lib/db"

// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)
//     const url = new URL(req.url)
//     const quizId = url.searchParams.get("id")
//     const isSharedLink = url.searchParams.get("shared") === "true"

//     if (!quizId) {
//       return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 })
//     }

//     const quiz = await db.quiz.findUnique({
//       where: { id: quizId },
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
//           orderBy: {
//             order: "asc",
//           },
//         },
//       },
//     })

//     if (!quiz) {
//       return NextResponse.json({ message: "Quiz not found" }, { status: 404 })
//     }

//     // Access control logic
//     // If this is a shared link, allow access
//     if (isSharedLink) {
//       // Allow access via shared link
//     }
//     // If user is logged in, check if they have access
//     else if (session?.user) {
//       // If quiz is published or created by the current user, allow access
//       if (quiz.published || quiz.userId === session.user.id) {
//         // Allow access
//       } else {
//         // Check if quiz was shared with this user
//         const sharedQuiz = await db.quizShare.findFirst({
//           where: {
//             quizId,
//             OR: [{ email: session.user.email }, { userId: session.user.id }],
//           },
//         })

//         if (!sharedQuiz) {
//           // Not shared with this user
//           return NextResponse.json({ message: "You don't have permission to access this quiz" }, { status: 403 })
//         }
//       }
//     } else {
//       // User not logged in and not using a shared link
//       return NextResponse.json({ message: "Authentication required" }, { status: 401 })
//     }

//     // If we get here, the user has access to the quiz
//     // Don't return correct answers to prevent cheating
//     return NextResponse.json({ quiz })
//   } catch (error) {
//     console.error("Error fetching quiz:", error)
//     return NextResponse.json({ message: "Failed to fetch quiz" }, { status: 500 })
//   }
// }
import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authoptions"
import db from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const url = new URL(req.url)
    const quizId = url.searchParams.get("id")
    const isSharedLink = url.searchParams.get("shared") === "true"

    if (!quizId) {
      return NextResponse.json({ message: "Quiz ID is required" }, { status: 400 })
    }

    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: {
              select: {
                id: true,
                text: true,
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    })

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 })
    }

    let hasAccess = false;

    if (isSharedLink && quiz.published) {
      hasAccess = true;
    }
    else if (session?.user) {
      if (quiz.published || quiz.userId === session.user.id) {
        hasAccess = true;
      } else {
        const whereCondition: { quizId: string; OR: any[] } = {
          quizId,
          OR: []
        };

        if (session.user.email) {
          whereCondition.OR.push({ email: session.user.email });
        }

        whereCondition.OR.push({ userId: session.user.id });

        const sharedQuiz = await db.quizShare.findFirst({
          where: whereCondition
        });

        if (sharedQuiz) {
          hasAccess = true;
        }
      }
    }

    if (!hasAccess) {
      return NextResponse.json(
        { message: session ? "You don't have permission to access this quiz" : "Authentication required" },
        { status: session ? 403 : 401 }
      );
    }
    return NextResponse.json({ quiz })
  } catch (error) {
    console.error("Error fetching quiz:", error)
    return NextResponse.json({ message: "Failed to fetch quiz" }, { status: 500 })
  }
}