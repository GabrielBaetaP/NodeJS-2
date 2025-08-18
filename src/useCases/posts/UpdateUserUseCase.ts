import { compare, hash } from "bcryptjs";
import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";
import { PostsRepository, PostUpdateInput } from "../../repositories/PostRepository.ts";

interface UpdatePostUseCaseRequest {
    postId: string;
    data: PostUpdateInput;
}

interface UpdatePostUseCaseResponse {
    post: Post
}

export class UpdatePostUseCase {
    constructor(private postsRepository: PostsRepository) { }

    async execute({ postId, data }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
        const post = await this.postsRepository.findById(postId);
        
        if(!post){
            throw new ResourceNotFoundError
        }

        const postUpdated = await this.postsRepository.update(postId, data);
    
        if(!postUpdated){
            throw new ResourceNotFoundError();
        }

        return { post: postUpdated };
    }
}