import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaPostsRepository } from "../../../repositories/prisma/PrismaPostsRepository.ts";
import { CreatePostUseCase } from "../../../useCases/posts/RegisterPostsUseCase.ts";


export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    created_at: z.string().transform((str) => new Date(str)),
    content: z.string(),
  });

  const {
    title,
    content,
    created_at,
  } = createBodySchema.parse(request.body);

  const userId = request.user.sub;


  try {
    const prismaPostsRepository = new PrismaPostsRepository()
    const createPostsUseCase = new CreatePostUseCase(prismaPostsRepository)
    await createPostsUseCase.execute({
        title,
        content,
        created_at,
        userId,
    })
  } catch (error) {
    throw error
  }

  return reply.status(201).send('Post criado com sucesso!');
};