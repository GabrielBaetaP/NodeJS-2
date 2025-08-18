import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { PrismaPostsRepository } from "../../../repositories/prisma/PrismaPostsRepository.ts";
import { DeletePostUseCase } from "../../../useCases/posts/DelePostsUseCase.ts";


export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        postId: z.string().uuid(),
    });

    const { postId } = getParamsSchema.parse(request.params);
    const userId = request.user.sub;

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const post = await prismaPostsRepository.findById(postId);

        if (!post) {
            throw new ResourceNotFoundError();
        }

        if (post.userId !== userId) {
            return reply.status(403).send({ message: "Permissão para deletar este post negada." });
        }

        const deletePostUseCase = new DeletePostUseCase(prismaPostsRepository)
        await deletePostUseCase.execute({ postId })

        return reply.status(204).send({ post });
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw new Error
    }

};