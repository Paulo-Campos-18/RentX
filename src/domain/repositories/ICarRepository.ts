import {Car} from "../entities/Car"

export interface ICarRepository{
    create(placa:string,disponivel:boolean):Promise<Car>
    remove(id:number):Car
    findByLicensePlate(placa:string):Promise<Car>
    findById(id:number):Promise<Car>
    listByAvailable(disponivel:boolean):Car[]
}