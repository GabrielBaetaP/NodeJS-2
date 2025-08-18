import { Prisma, Comment } from "@prisma/client";
import { prisma } from "../../app.ts";
import { CommentsRepository } from "../CommentsRepository.ts";

export class PrismaCommentsRepository implements CommentsRepository {
  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    return prisma.comment.create({ data });
  }

  async findAll(): Promise<Comment[]> {
    return prisma.comment.findMany();
  }

  async findById(id: string): Promise<Comment | null> {
    return prisma.comment.findUnique({ where: { id } });
  }

  async findByUser(userId: string): Promise<Comment[]> {
    return prisma.comment.findMany({ where: { userId } });
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return prisma.comment.findMany({ where: { postId } });
  }

  async update(id: string, data: { content: string }): Promise<Comment> {
    return prisma.comment.update({
      where: { id },
      data: { content: data.content },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.comment.delete({
      where: { id },
    });
  }
}
