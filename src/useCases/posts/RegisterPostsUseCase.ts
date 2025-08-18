import { Post } from '@prisma/client';
import { PostsRepository } from '../../repositories/PostRepository.ts';

interface CreatePostsUseCaseRequest {
    title: string,
    content: string,
    created_at: Date,
    userId: string
}

interface CreatePostsUseCaseResponse {
    posts: Post
}

export class CreatePostUseCase {
    constructor(private PostRepository: PostsRepository) {}

    async execute({ title, content, created_at, userId }: CreatePostsUseCaseRequest): Promise<CreatePostsUseCaseResponse> {
        const posts = await this.PostRepository.create({ title, content, created_at, userId })

        return { posts };
    }
}
