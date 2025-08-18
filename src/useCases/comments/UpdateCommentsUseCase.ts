import { Comment } from "@prisma/client";
import { CommentsRepository } from "../../repositories/CommentsRepository.ts";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";

interface UpdateCommentRequest {
  commentId: string;
  userId: string;
  content: string;
}

interface UpdateCommentResponse {
  comment: Comment;
}

export class UpdateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    commentId,
    userId,
    content,
  }: UpdateCommentRequest): Promise<UpdateCommentResponse> {
    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    if (comment.userId !== userId) {
      throw new Error("Você não tem permissão para atualizar este comentário.");
    }

    const updated = await this.commentsRepository.update(commentId, { content });

    return { comment: updated };
  }
}
