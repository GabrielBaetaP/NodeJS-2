import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { PrismaLikesRepository } from "../../../repositories/prisma/PrismaLikesRepository.ts";
import { GetlikeUseCase } from "../../../useCases/likes/GetAllLikesUseCase.ts";


export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const getLikeUseCase = new GetlikeUseCase(prismaLikesRepository)
        const Like = await getLikeUseCase.execute()   

        return reply.status(200).send( Like );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };