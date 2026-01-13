import { PrismaClient } from "@prisma/client/extension";
import { injectable } from "inversify";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Cars } from "../../../domain/entities/Icars";

const prisma = new PrismaClient()

@injectable()
export class PrismaCarRepository implements ICarRepository {


    async findById(id: number): Promise<Cars> {
        const car = await  prisma.Cars.findUnique({where:{id:id}})
        return car
    }
    create(): void {
        throw new Error("Method not implemented.");
    }
    remove(): Cars {
        throw new Error("Method not implemented.");
    }
    findByLicensePlate(): Cars {
        throw new Error("Method not implemented.");
    }
    listByAvailable(disponivel: boolean): Cars[] {
        throw new Error("Method not implemented.");
    }





}
