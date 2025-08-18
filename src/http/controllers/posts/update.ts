import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaPostsRepository } from "../../../repositories/prisma/PrismaPostsRepository.ts";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError.ts";
import { UpdatePostUseCase } from "../../../useCases/posts/UpdateUserUseCase.ts";


export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        postId: z.string().uuid(),
    });

    const updateBodySchema = z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    });
    
    const userId = request.user.sub;
    const { postId } = updateParamsSchema.parse(request.params);
    const { title, content } = updateBodySchema.parse(request.body);

    try {
        const prismapostsRepository = new PrismaPostsRepository();
        const post = await prismapostsRepository.findById(postId);

        if (!post) {
            throw new ResourceNotFoundError();
        }

        if (post.userId !== userId) {
            return reply.status(403).send({ message: "Permissão para atualizar este post foi negada." });
        }

        const dataToUpdate: { title?: string; content?: string } = {};

        if (title !== undefined) {
            dataToUpdate.title = title;
        }
        if (content !== undefined) {
            dataToUpdate.content = content;
        }
        

        const updatePostUseCase = new UpdatePostUseCase(prismapostsRepository);
        await updatePostUseCase.execute({
            postId, 
            data: dataToUpdate 
        });

        return reply.status(200).send({ message: "Post atualizado com sucesso." });

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        throw new Error();
    }
};