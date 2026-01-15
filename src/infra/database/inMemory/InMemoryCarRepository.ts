import { injectable } from "inversify";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Car } from "../../../domain/entities/Car";


export class InMemoryCarRepository implements ICarRepository {
    private _cars: Car[] = [];
    private _currnetId: number = 1;

    create(placa: string, disponivel: boolean): Promise<Car> {
        const newCar = new Car(this._currnetId, placa, disponivel);
        this._currnetId++;
        this._cars.push(newCar);
        return Promise.resolve(newCar);
    }
    remove(id: number): Car {
        throw new Error("Method not implemented.");
    }
    findByLicensePlate(placa: string): Promise<Car | null> {
        const car = this._cars.find(c => c.placa === placa)
        if (car === undefined) return Promise.resolve(null);
        return Promise.resolve(car);
    }
    findById(id: number): Promise<Car | null> {
        const car = this._cars.find(c => c.id === id)
        if (car === undefined) return Promise.resolve(null);
        return Promise.resolve(car);
    }
    listByAvailable(disponivel: boolean): Car[] {
        throw new Error("Method not implemented.");
    }


}