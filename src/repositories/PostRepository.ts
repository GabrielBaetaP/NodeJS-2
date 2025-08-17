import { type Post, Prisma } from '@prisma/client';

export interface PostUpdateInput {
  titulo?: string;
  conteudo?: string;
}

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  findById(postId: string): Promise<Post | null>;
  findAll(): Promise<Post[] | null>;
  findManyByUserId(userId: string): Promise<Post[] | null>;
  update(postId: string, data: PostUpdateInput): Promise<Post | null>;
  delete(postId: string): Promise<Post | null>;
}