import { PrismaClient, RentalStatus as PrismaRentalStatus, Rentals } from "@prisma/client";
import { injectable } from "inversify";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental, RentalStatus } from "../../../domain/entities/Rental";

const prisma = new PrismaClient();

@injectable()
export class PrismaRentalRepository implements IRentalRepository {


    async create(user_id: number, car_id: number, endDate: Date, status: RentalStatus): Promise<Rental> {
        const prismaStatus = toPrismaStatus(status)
        const rental = await prisma.rentals.create({ data: { user_id: user_id, car_id: car_id, endDate: endDate, status: prismaStatus } })
        return toDomainRental(rental)
    }
    async findOnGoingRentalByUserId(userId: number): Promise<Rental | null> {
        const rental = await prisma.rentals.findFirst({ where: { user_id: userId,status:PrismaRentalStatus.Andamento} })
        if (rental === null) return null
        return toDomainRental(rental)
    }
    async findOnGoingRentalByCarId(carId: number): Promise<Rental | null> {
        const rental = await prisma.rentals.findFirst({ where: { car_id: carId,status:PrismaRentalStatus.Andamento } })
        if (rental === null) return null
        return toDomainRental(rental)
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

//Funções auxiliares por conta dos enums diferentes em domain e schema prisma
//Os enum de domain e schema prisma devem ter mesmos nomes
function toPrismaStatus(domainStatus: RentalStatus): PrismaRentalStatus {
    return PrismaRentalStatus[domainStatus]
}
function toDomainStatus(prismaStatus: PrismaRentalStatus): RentalStatus {
    return RentalStatus[prismaStatus]
}
function toDomainRental(prismaRental: Rentals): Rental {
    return new Rental(
        prismaRental.user_id,
        prismaRental.car_id,
        prismaRental.endDate,
        toDomainStatus(prismaRental.status),
        prismaRental.startDate
    )
}
