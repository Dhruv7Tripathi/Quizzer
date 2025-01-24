import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
;
import prisma from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default async function Results() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/login");
  // }

  // const attempts = await prisma.attempt.findMany({
  //   where: {
  //     userId: session.user.id,
  //   },
  //   include: {
  //     quiz: true,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Quiz Results</h1>
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz Title</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
            {attempts.map((attempt) => (
              <TableRow key={attempt.id}>
                <TableCell className="font-medium">
                  {attempt.quiz.title}
                </TableCell>
                <TableCell>{attempt.score}%</TableCell>
                <TableCell>
                  {format(new Date(attempt.createdAt), "PPp")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
        {/* {attempts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            You haven&apos;t taken any quizzes yet.
          </div>
        )} */}
      </Card>
    </div>
  );
}