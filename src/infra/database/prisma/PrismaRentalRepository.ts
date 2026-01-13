import { PrismaClient } from "@prisma/client/extension";
import { injectable } from "inversify";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental,RentalStatus } from "../../../domain/entities/Rental";

const prisma = new PrismaClient();

@injectable()
export class PrismaRentalRepository implements IRentalRepository{
    async create(user_id: number, car_id: number, endDate: Date, status: RentalStatus): Promise<Rental> {
        const rental = await prisma.rental.create({ data: { user_id: user_id, car_id: car_id, endDate: endDate, status: status } })
        return rental
    }
    async findOnGoingRentalByUserId(userId:number):Promise<Rental>{
        const rental = await prisma.findUnique({where:{user_id:userId}})
        return rental
    }
    remove(): void {
        throw new Error("Method not implemented.");
    }
    finishRent(id: number): void {
        throw new Error("Method not implemented.");
    }
    extendRent(id: number): void {
        throw new Error("Method not implemented.");
    }
    
}