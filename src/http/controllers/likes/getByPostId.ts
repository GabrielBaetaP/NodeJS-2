import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaLikesRepository } from "../../../repositories/prisma/PrismaLikesRepository.ts";

export async function getLikesByPost(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = request.params as { postId: string };

  const repo = new PrismaLikesRepository();
  const likes = await repo.findByPostId(postId);

  return reply.status(200).send(likes);
}
