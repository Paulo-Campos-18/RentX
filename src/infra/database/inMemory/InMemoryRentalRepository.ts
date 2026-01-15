import { RentalStatus, Rental } from "../../../domain/entities/Rental";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";

export class InMemoryRentalRepository implements IRentalRepository {
    private rentals: Rental[] = [];

    create(user_id: number, car_id: number, endDate: Date, status?: RentalStatus): Promise<Rental> {
        if (status != undefined) {
            const rental = new Rental(user_id, car_id, endDate, status)
            this.rentals.push(rental)
            return Promise.resolve(rental)
        }
        const rental = new Rental(user_id, car_id, endDate)
        this.rentals.push(rental)
        return Promise.resolve(rental)
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
    findOnGoingRentalByUserId(userId: number): Promise<Rental | null> {
        const rental = this.rentals.find(r => r.status === RentalStatus.Andamento && r.user_id === userId)
        if (rental === undefined) return Promise.resolve(null);
        return Promise.resolve(rental);
    }
    findOnGoingRentalByCarId(carId: number): Promise<Rental | null> {
        const rental = this.rentals.find(r => r.status === RentalStatus.Andamento && r.car_id === carId)
        if (rental === undefined) return Promise.resolve(null);
        return Promise.resolve(rental);
    }

}