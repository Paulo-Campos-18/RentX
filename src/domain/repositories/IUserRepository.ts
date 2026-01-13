import { User } from "../entities/User";

export interface IUserRepository{
    create(name:string,email:string):Promise<User>
    findById(id:number):Promise<User>
    removeById(id:number):Promise<User>
}