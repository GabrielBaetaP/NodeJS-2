import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaLikesRepository } from "../../../repositories/prisma/PrismaLikesRepository.ts";

export async function getLikesByUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params as { userId: string };

  const repo = new PrismaLikesRepository();
  const likes = await repo.findByLikeId(userId);

  return reply.status(200).send(likes);
}
