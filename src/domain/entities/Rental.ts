export enum RentalStatus {
    Andamento = "Andamento",
    Terminada = "Terminada"
}

export class Rental {
    user_id: number;
    car_id: number;
    startDate: Date;
    endDate: Date;
    status: RentalStatus

    constructor(user_id: number, car_id: number, endDate: Date, status: RentalStatus, startDate: Date = new Date()) {
        this.user_id = user_id;
        this.car_id = car_id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}