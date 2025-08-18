import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaCommentsRepository } from "../../../repositories/prisma/PrismaCommentsRepository.ts";

export async function getCommentById(request: FastifyRequest, reply: FastifyReply) {
  const { commentId } = request.params as { commentId: string };

  const repo = new PrismaCommentsRepository();
  const comment = await repo.findById(commentId);

  if (!comment) {
    return reply.status(404).send({ message: "Comentário não encontrado." });
  }

  return reply.status(200).send(comment);
}
