import { Like } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";
import { LikesRepository } from "../../repositories/LikesRepository.ts";

interface DeleteLikeUseCaseRequest {
    likeId: string
}

interface DeleteLikeUseCaseResponse {
    like: Like
}

export class DeleteLikeUseCase {
    constructor(private LikesRepository: LikesRepository) { }

    async execute({ likeId }: DeleteLikeUseCaseRequest): Promise<DeleteLikeUseCaseResponse> {
        const like = await this.LikesRepository.delete(likeId);
        
        if(!like){
            throw new ResourceNotFoundError
        }
        
        return { like };
    }
}