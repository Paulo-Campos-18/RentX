export class CarNotFoundError  extends Error{
    constructor(msg:string){
        super(msg)
        this.name = CarNotFoundError.name
    }
}

export class CarUnavailableError extends Error{
    constructor(msg:string){
        super(msg)
        this.name = CarUnavailableError.name
    }
}