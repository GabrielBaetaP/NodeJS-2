import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { PrismaCommentsRepository } from "../../../repositories/prisma/PrismaCommentsRepository.ts";
import { CreateCommentUseCase } from "../../../useCases/comments/RegisterCommentsUseCase.ts";

export async function createComment(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    content: z.string(),
    postId: z.string().uuid(),
    created_at: z.string().transform(str => new Date(str))
  });

  const { content, postId, created_at } = schema.parse(request.body);
  const userId = request.user.sub;

  const repo = new PrismaCommentsRepository();
  const useCase = new CreateCommentUseCase(repo);

  await useCase.execute({ content, postId, userId, created_at });

  return reply.status(201).send({ message: "Comentário criado com sucesso!" });
}
