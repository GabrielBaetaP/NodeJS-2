import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository.ts";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { GetUserUseCase } from "../../../useCases/users/GetUserUseCase.ts";


export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      userId: z.string().uuid(),
    });
  
    const { userId } = getParamsSchema.parse(request.params);
  
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
        const user = await getUserUseCase.execute({ userId })

        return reply.status(200).send( user );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };