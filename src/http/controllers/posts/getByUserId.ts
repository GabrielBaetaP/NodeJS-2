import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { PrismaPostsRepository } from "../../../repositories/prisma/PrismaPostsRepository.ts";
import { GetPostByUserIdUseCase } from "../../../useCases/posts/GetByUserIdUserCase.ts";


export async function getByUserId(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      userId: z.string().uuid(),
    });
  
    const { userId } = getParamsSchema.parse(request.params);
  
    try {
        const prismapostsRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetPostByUserIdUseCase(prismapostsRepository)
        const post = await getPostUseCase.execute({ userId })

        return reply.status(200).send( post );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };