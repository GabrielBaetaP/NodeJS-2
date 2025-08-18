import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository.ts";
import { GetUserUseCase } from "../../../useCases/users/GetUserUseCase.ts";


export async function profile(request: FastifyRequest, reply: FastifyReply) {

    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
    const { user } = await getUserUseCase.execute({ userId: request.user.sub })

    return reply.status(200).send({
        user:{
            ...user,
            password: undefined
        }
    })
};