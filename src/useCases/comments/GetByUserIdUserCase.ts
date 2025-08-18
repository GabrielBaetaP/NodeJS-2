import { Comment } from "@prisma/client";
import { CommentsRepository } from "../../repositories/CommentsRepository.ts";

interface GetCommentsByUserRequest {
  userId: string;
}

interface GetCommentsByUserResponse {
  comments: Comment[];
}

export class GetCommentsByUserUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    userId,
  }: GetCommentsByUserRequest): Promise<GetCommentsByUserResponse> {
    const comments = await this.commentsRepository.findByUser(userId);
    return { comments };
  }
}
