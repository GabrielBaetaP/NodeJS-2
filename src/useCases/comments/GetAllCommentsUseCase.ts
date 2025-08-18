import { Comment } from "@prisma/client";
import { CommentsRepository } from "../../repositories/CommentsRepository.ts";

interface GetAllCommentsResponse {
  comments: Comment[];
}

export class GetAllCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(): Promise<GetAllCommentsResponse> {
    const comments = await this.commentsRepository.findAll();
    return { comments };
  }
}
