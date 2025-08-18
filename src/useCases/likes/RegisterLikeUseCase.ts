import { Like } from '@prisma/client';
import { LikesRepository } from '../../repositories/LikesRepository.ts';

interface CreateLikeUseCaseRequest {
  created_at: Date;
  userId: string;
  postId?: string;
  commentId?: string;
}

interface CreateLikeUseCaseResponse {
  like: Like;
}

export class CreateLikesUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    created_at,
    userId,
    postId,
    commentId,
  }: CreateLikeUseCaseRequest): Promise<CreateLikeUseCaseResponse> {
    const like = await this.likesRepository.create({
      created_at,
      userId,
      postId: postId ?? null,
      commentId: commentId ?? null,
    });

    return { like };
  }
}
