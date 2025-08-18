import { Comment } from "@prisma/client";
import { CommentsRepository } from "../../repositories/CommentsRepository.ts";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";

interface GetCommentByIdRequest {
  commentId: string;
}

interface GetCommentByIdResponse {
  comment: Comment;
}

export class GetCommentByIdUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    commentId,
  }: GetCommentByIdRequest): Promise<GetCommentByIdResponse> {
    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    return { comment };
  }
}
