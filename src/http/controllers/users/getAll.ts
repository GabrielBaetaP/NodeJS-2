import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository.ts";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { GetAllUserUseCase } from "../../../useCases/users/GetAllUserUseCase.ts";


export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserUseCase = new GetAllUserUseCase(prismaUsersRepository)
        const user = await getUserUseCase.execute()   

        return reply.status(200).send( user );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };