import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository.ts";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { UpdateUserUseCase } from "../../../useCases/users/UpdateUserUseCase.ts";
import { UserUpdateInput } from "../../../repositories/UsersRepository.ts";


export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        userId: z.string().uuid(),
    });

    const updateBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        photo: z.string().optional(),
        password: z.string().optional(),
    })
    const { userId } = updateParamsSchema.parse(request.params);
    const { name, email, photo, password } = updateBodySchema.parse(request.body);
    const userIdAuth = request.user.sub;


    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        if (userId !== userIdAuth) {
            return reply.status(403).send({ message: "Permissão para atualizar este usuário foi negada." });
        }

        const dataToUpdate: UserUpdateInput = {};

        if (name !== undefined) {
            dataToUpdate.name = name;
        }
        if (email !== undefined) {
            dataToUpdate.email = email;
        }
        if (photo !== undefined) {
            dataToUpdate.photo = photo;
        }
        if (password !== undefined) {
            dataToUpdate.password = password;
        }

        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)
        const user = await updateUserUseCase.execute({
            userId, 
            data: dataToUpdate 
        })

        return reply.status(200).send({ user });
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: (error as Error).message })
        }
        throw error
    }
};