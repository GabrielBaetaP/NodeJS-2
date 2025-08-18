import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { PrismaLikesRepository } from "../../../repositories/prisma/PrismaLikesRepository.ts";
import { DeleteLikeUseCase } from "../../../useCases/likes/DeleteLikesUseCase.ts";



export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        likeId: z.string().uuid(),
    });

    const { likeId } = getParamsSchema.parse(request.params);
    const userId = request.user.sub;

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const like = await prismaLikesRepository.findById(likeId);

        if (!like) {
            throw new ResourceNotFoundError();
        }

        if (like.userId !== userId) {
            return reply.status(403).send({ message: "Permissão para deletar este like negada." });
        }

        const deletelikeUseCase = new DeleteLikeUseCase(prismaLikesRepository)
        await deletelikeUseCase.execute({ likeId })

        return reply.status(204).send({ like });
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw new Error
    }

};