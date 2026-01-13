import { PrismaClient } from "@prisma/client/extension";
import { injectable } from "inversify";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

const prisma = new PrismaClient();

@injectable()
export class PrismaUserRepository implements IUserRepository {
    async create(name: string, email: string): Promise<User> {
        const user = await prisma.user.create({ data: { name: name, email: email } })
        return user
    }
    async findById(id: number): Promise<User> {
        const user = await prisma.User.findUnique({ where: { id: id } })
        return user
    }
    removeById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }


}