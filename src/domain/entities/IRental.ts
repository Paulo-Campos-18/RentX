enum RentalStatus{
    Andamento = "Em andamento",
    Terminada= "Terminada"
}

export interface Rental{
    user_id:number;
    car_id:number;
    startDate: Date;
    endDate: Date;
    status:RentalStatus
}