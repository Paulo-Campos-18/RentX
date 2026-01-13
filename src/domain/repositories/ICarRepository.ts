import {Cars} from "../entities/Icars"

export interface ICarRepository{
    create():void
    remove(id:number):Cars
    findByLicensePlate():Cars
    findById(id:number):Promise<Cars>
    listByAvailable(disponivel:boolean):Cars[]
}