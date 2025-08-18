import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/PrismaUsersRepository.ts";
import { AuthenticateUseCase } from "../../../useCases/users/AuthenticateUseCase.ts";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
  
    const {
      email,
      password,
    } = authenticateBodySchema.parse(request.body);
  
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

        const { user } = await authenticateUseCase.execute({
            email,
            password,
        })

        const token = await reply.jwtSign({}, {
          sign:{
            sub: user.id
          }
        })


        return reply
        .status(200)
        .send({ token });

    } catch (error) {
        throw new Error
    }

  };