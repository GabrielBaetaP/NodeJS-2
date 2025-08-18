import { Post, Prisma } from '@prisma/client';

export interface PostUpdateInput {
  title?: string,
  content?: string,
}

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  findById(postId: string): Promise<Post | null>;
  findAllPosts(): Promise<Post[] | null>;
  findByUserId(userId: string): Promise<Post[] | null>;
  update(postId: string, data: PostUpdateInput): Promise<Post | null>;
  delete(postId: string): Promise<Post | null>;
}