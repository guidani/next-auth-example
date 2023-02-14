import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.body;

  await prisma.task.create({
    data: {
      title,
      isDone: false,
    },
  });

  return res.status(201).json({});
}
