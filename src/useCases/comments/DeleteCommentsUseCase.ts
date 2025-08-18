import { CommentsRepository } from "../../repositories/CommentsRepository.ts";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";

interface DeleteCommentRequest {
  commentId: string;
  userId: string;
}

export class DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ commentId, userId }: DeleteCommentRequest): Promise<void> {
    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    if (comment.userId !== userId) {
      throw new Error("Você não tem permissão para deletar este comentário.");
    }

    await this.commentsRepository.delete(commentId);
  }
}
