import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaLikesRepository } from "../../../repositories/prisma/PrismaLikesRepository.ts";

export async function getLikesByComment(request: FastifyRequest, reply: FastifyReply) {
  const { commentId } = request.params as { commentId: string };

  const repo = new PrismaLikesRepository();
  const likes = await repo.findByCommentId(commentId);

  return reply.status(200).send(likes);
}
