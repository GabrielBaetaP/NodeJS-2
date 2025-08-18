import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { PrismaCommentsRepository } from "../../../repositories/prisma/PrismaCommentsRepository.ts";

export async function updateComment(request: FastifyRequest, reply: FastifyReply) {
  const { commentId } = request.params as { commentId: string };
  const userId = request.user.sub;

  const schema = z.object({
    content: z.string(),
  });

  const { content } = schema.parse(request.body);

  const repo = new PrismaCommentsRepository();
  const comment = await repo.findById(commentId);

  if (!comment) {
    return reply.status(404).send({ message: "Comentário não encontrado." });
  }

  if (comment.userId !== userId) {
    return reply.status(403).send({ message: "Você não tem permissão para atualizar este comentário." });
  }

  const updated = await repo.update(commentId, { content });

  return reply.status(200).send(updated);
}
