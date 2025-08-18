import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaCommentsRepository } from "../../../repositories/prisma/PrismaCommentsRepository.ts";

export async function getCommentsByUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params as { userId: string };

  const repo = new PrismaCommentsRepository();
  const comments = await repo.findByUser(userId);

  return reply.status(200).send(comments);
}
