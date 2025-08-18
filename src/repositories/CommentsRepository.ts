import { Comment, Prisma } from "@prisma/client";

export interface CommentsRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
  findAll(): Promise<Comment[]>;
  findById(id: string): Promise<Comment | null>;
  findByUser(userId: string): Promise<Comment[]>;
  findByPost(postId: string): Promise<Comment[]>;
  update(id: string, data: { content: string }): Promise<Comment>;
  delete(id: string): Promise<void>;
}