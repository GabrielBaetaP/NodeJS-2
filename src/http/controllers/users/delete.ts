import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository.ts";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { DeleteUserUseCase } from "../../../useCases/users/DeleteUserUseCase.ts";


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      userId: z.string().uuid(),
    });
  
    const { userId } = getParamsSchema.parse(request.params);
    const userIdAuth = request.user.sub;
  
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        
        if (userId !== userId) {
            return reply.status(403).send({ message: "Permissão para atualizar este post foi negada." });
        }

        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)
        const user = await deleteUserUseCase.execute({ userId })

        return reply.status(204).send({ user });
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };