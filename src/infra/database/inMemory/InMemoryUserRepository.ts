import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
    private _users: User[] = [];
    private _currentId: number = 1;

    create(name: string, email: string): Promise<User> {
        const newUser = new User(this._currentId, name, email);
        this._currentId++;
        this._users.push(newUser);
        return Promise.resolve(newUser)
    }
    findById(id: number): Promise<User | null> {
        const user = this._users.find(u => u.id === id)
        if (user === undefined) return Promise.resolve(null);
        return Promise.resolve(user);
    }
    removeById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

}