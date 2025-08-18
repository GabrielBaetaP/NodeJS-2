import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaCommentsRepository } from "../../../repositories/prisma/PrismaCommentsRepository.ts";

export async function getCommentsByPost(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = request.params as { postId: string };

  const repo = new PrismaCommentsRepository();
  const comments = await repo.findByPost(postId);

  return reply.status(200).send(comments);
}
