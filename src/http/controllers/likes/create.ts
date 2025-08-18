import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaLikesRepository } from "../../../repositories/prisma/PrismaLikesRepository.ts";
import { CreateLikesUseCase } from "../../../useCases/likes/RegisterLikeUseCase.ts";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    created_at: z.string().transform((str) => new Date(str)),
    postId: z.string().optional(),
    commentId: z.string().optional(),
  }).refine(data =>
    (data.postId && !data.commentId) || (!data.postId && data.commentId),
    {
      message: "Envie postId OU commentId.",
    }
  );

  const { created_at, postId, commentId } = createBodySchema.parse(request.body);
  const userId = request.user.sub;

  try {
    const prismaLikesRepository = new PrismaLikesRepository();
    const createLikesUseCase = new CreateLikesUseCase(prismaLikesRepository);

    await createLikesUseCase.execute({
      created_at,
      userId,
      ...(postId ? { postId } : {}),
      ...(commentId ? { commentId } : {}),
    });

    return reply.status(201).send("Like criado com sucesso!");
  } catch (error) {
    console.error(error);
    return reply.status(500).send("Erro ao criar o like.");
  }
}
