import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { title, description, category, difficulty, questions, userId } = req.body;

      const quiz = await prisma.quiz.create({
        data: {
          title,
          description,
          category,
          difficulty,
          userId,
          questions: {
            create: questions.map((q: { text: string; isTrue: boolean }) => ({
              text: q.text,
              isTrue: q.isTrue,
            })),
          },
        },
      });

      res.status(200).json(quiz);
    } else if (req.method === 'PUT') {
      const { id, title, description, category, difficulty, questions } = req.body;

      const quiz = await prisma.quiz.update({
        where: { id },
        data: {
          title,
          description,
          category,
          difficulty,
          questions: {
            deleteMany: {}, // Remove old questions
            create: questions.map((q: { text: string; isTrue: boolean }) => ({
              text: q.text,
              isTrue: q.isTrue,
            })),
          },
        },
      });

      res.status(200).json(quiz);
    } else if (req.method === 'DELETE') {
      const { id } = req.body;

      await prisma.quiz.delete({ where: { id } });
      res.status(200).json({ message: 'Quiz deleted successfully' });
    } else {
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}