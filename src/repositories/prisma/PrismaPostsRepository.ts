import { prisma } from '../../app.ts';
import { Prisma } from "@prisma/client";
import { PostsRepository } from "../PostRepository.ts";

export class PrismaPostsRepository implements PostsRepository {


    async create(data: Prisma.PostUncheckedCreateInput) {
        const posts = await prisma.post.create({ data });
        return posts;
    }

    async findAllPosts() {
        const post = await prisma.post.findMany();
        return post;
    }

    async delete(id: string) {
        const post = await prisma.post.delete({
            where: {
                id
            }
        })
        return post;
    }

    async findById(id: string) {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })
        return post;
    }

    async update(id: string, data: any) {
        const post = await prisma.post.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
            }
        })
        return post;
    }

    async findByUserId(userId: string) {
        const post = await prisma.post.findMany({
            where: {
                userId
            }
        })
        return post;

    }
}