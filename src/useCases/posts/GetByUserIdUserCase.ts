import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";
import { PostsRepository } from "../../repositories/PostRepository.ts";

interface GetPostUseCaseRequest {
    userId: string
}

interface GetPostUseCaseResponse {
    post: Post[]
}

export class GetPostByUserIdUseCase {
    constructor(private postsRepository: PostsRepository) { }

    async execute({ userId }: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
        const post = await this.postsRepository.findByUserId(userId);
        
        if(!post){
            throw new ResourceNotFoundError
        }
        
        return { post };
    }
}