import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { PrismaPostsRepository } from "../../../repositories/prisma/PrismaPostsRepository.ts";
import { GetPostUseCase } from "../../../useCases/posts/GetPostsUseCase.ts";


export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      postId: z.string().uuid(),
    });
  
    const { postId } = getParamsSchema.parse(request.params);
  
    try {
        const prismapostsRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetPostUseCase(prismapostsRepository)
        const post = await getPostUseCase.execute({ postId })

        return reply.status(200).send( post );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };