import { Rental,RentalStatus } from "../entities/Rental"

export interface IRentalRepository {
    create(user_id: number, car_id: number, endDate: Date, status: RentalStatus): Promise<Rental>
    remove(): void
    finishRent(id: number): void
    extendRent(id:number): void
    findOnGoingRentalByUserId(userId:number):Promise<Rental>
}