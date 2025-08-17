import { type Like, Prisma } from '@prisma/client';

export interface LikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>;
  findById(likeId: string): Promise<Like | null>;
  delete(likeId: string): Promise<Like | null>;
  findUserLikeOnPost(userId: string, postId: string): Promise<Like | null>;
  findUserLikeOnComment(userId: string, commentId: string): Promise<Like | null>;
  findManyByPostId(postId: string): Promise<Like[] | null>;
  findManyByCommentId(commentId: string): Promise<Like[] | null>;
}