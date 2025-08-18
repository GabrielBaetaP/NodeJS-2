import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaCommentsRepository } from "../../../repositories/prisma/PrismaCommentsRepository.ts";

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const { commentId } = request.params as { commentId: string };
  const userId = request.user.sub;

  const repo = new PrismaCommentsRepository();
  const comment = await repo.findById(commentId);

  if (!comment) {
    return reply.status(404).send({ message: "Comentário não encontrado." });
  }

  if (comment.userId !== userId) {
    return reply.status(403).send({ message: "Você não tem permissão para deletar este comentário." });
  }

  await repo.delete(commentId);
  return reply.status(204).send();
}
