import { prisma } from '../../app';
import { Prisma, Like } from "@prisma/client";
import { LikesRepository } from '../likes-repository';

export class PrismaLikesRepository implements LikesRepository {
  async create(data: Prisma.LikeUncheckedCreateInput): Promise<Like> {
    return prisma.like.create({ data });
  }

  async findAllLikes(): Promise<Like[]> {
    return prisma.like.findMany();
  }

  async delete(id: string): Promise<Like | null> {
    return prisma.like.delete({ where: { id } });
  }

  async findById(id: string): Promise<Like | null> {
    return prisma.like.findUnique({ where: { id } });
  }

  async findByLikeId(userId: string): Promise<Like[]> {
    return prisma.like.findMany({ where: { userId } });
  }

  async findByPostId(postId: string) {
    return prisma.like.findMany({
      where: { postId },
    });
  }
  
  async findByCommentId(commentId: string) {
    return prisma.like.findMany({
      where: { commentId },
    });
  }
  
}
