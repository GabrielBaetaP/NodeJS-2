import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/UsersRepository.ts";
import { ResourceNotFoundError } from "../../errors/ResourceNotFoundError.ts";


interface GetUserUseCaseResponse {
    user: User[]
}

export class GetAllUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findAllUsers();
        
        if(!user){
            throw new ResourceNotFoundError
        }
        
        return { user };
    }
}