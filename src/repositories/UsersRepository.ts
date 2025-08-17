import { Prisma, type Usuario } from '@prisma/client';

export interface UserUpdateInput {
  nome?: string;
  email?: string;
  foto?: string;
  senha?: string;
}

export interface UsersRepository {
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario | null>;
  findById(userId: string): Promise<Usuario | null>;
  findAll(): Promise<Usuario[] | null>;
  update(userId: string, data: UserUpdateInput): Promise<Usuario | null>;
  delete(userId: string): Promise<Usuario | null>;
}