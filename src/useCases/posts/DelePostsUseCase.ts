import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";
import { PostsRepository } from "../../repositories/PostRepository.ts";

interface DeletePostUseCaseRequest {
    postId: string
}

interface DeletePostUseCaseResponse {
    post: Post
}

export class DeletePostUseCase {
    constructor(private PostsRepository: PostsRepository) { }

    async execute({ postId }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
        const post = await this.PostsRepository.delete(postId);
        
        if(!post){
            throw new ResourceNotFoundError
        }
        
        return { post };
    }
}