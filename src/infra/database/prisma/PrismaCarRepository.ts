import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Car } from "../../../domain/entities/Car";

const prisma = new PrismaClient()

@injectable()
export class PrismaCarRepository implements ICarRepository {


    async findById(id: number): Promise<Car | null> {
        const car = await  prisma.cars.findUnique({where:{id:id}})
        return car
    }
    async create(placa:string,disponivel:boolean): Promise<Car> {
        const car = await prisma.cars.create({data:{placa:placa,disponivel:disponivel}})
        return car
    }
    remove(): Car {
        throw new Error("Method not implemented.");
    }
    async findByLicensePlate(placa:string): Promise<Car | null> {
       const car = await prisma.cars.findUnique({where:{placa:placa}})
        return car
    }
    listByAvailable(disponivel: boolean): Car[] {
        throw new Error("Method not implemented.");
    }





}
