import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository.ts";
import { UserAlreadyExists } from "../../../errors/UserAlreadyExists .ts";
import { RegisterUseCase } from '../../../useCases/users/RegisterUserUseCase.ts';


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        photo: z.string(),
        password: z.string().min(6),
    });

    const {
        name,
        email,
        photo,
        password,
    } = registerBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({
            name,
            email,
            photo,
            password,
        })
    } catch (error) {
        if (error instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: error.message })
        }
        throw new Error
    }

    return reply.status(201).send('Usuário criado com sucesso');
};