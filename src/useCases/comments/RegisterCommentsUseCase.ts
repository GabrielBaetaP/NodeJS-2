import { Comment } from "@prisma/client";
import { CommentsRepository } from "../../repositories/CommentsRepository.ts";

interface CreateCommentRequest {
  content: string;
  created_at: Date;
  userId: string;
  postId: string;
}

interface CreateCommentResponse {
  comment: Comment;
}

export class CreateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    content,
    created_at,
    userId,
    postId,
  }: CreateCommentRequest): Promise<CreateCommentResponse> {
    const comment = await this.commentsRepository.create({
      content,
      created_at,
      userId,
      postId,
    });

    return { comment };
  }
}
