import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/UsersRepository.ts";
import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError.ts";

interface AuthenticateUseCaseRequest {
    email: string,
    password: string,
}

interface AuthenticateUseCaseResponse {
    user: User
}


export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email)
    
        if (!user) {
            throw new InvalidCredentialsError();
        }
    
        const doesPasswordCompare = await compare(password, user.password)

        if(!doesPasswordCompare) {
            throw new InvalidCredentialsError();
        }

        return { user };
       
    }
}
