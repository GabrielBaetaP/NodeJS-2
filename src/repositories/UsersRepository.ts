import { Prisma, User } from "@prisma/client";

export interface  UserUpdateInput {
    name?: string,
    email?: string,
    photo?: string,
    password?: string,
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findAllUsers(): Promise<User[] | null>
    delete(userId: string): Promise<User | null>
    update(id: string, data: UserUpdateInput): Promise<User | null>
    findById(userId: string): Promise<User | null>
}