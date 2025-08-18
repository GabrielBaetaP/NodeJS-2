import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";
import { PostsRepository } from "../../repositories/PostRepository.ts";

interface GetPostUseCaseRequest {
    postId: string
}

interface GetPostUseCaseResponse {
    post: Post
}

export class GetPostUseCase {
    constructor(private postsRepository: PostsRepository) { }

    async execute({ postId }: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
        const post = await this.postsRepository.findById(postId);
        
        if(!post){
            throw new ResourceNotFoundError
        }
        
        return { post };
    }
}