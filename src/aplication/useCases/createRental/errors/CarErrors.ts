export class CarNotFoundError  extends Error{
    constructor(msg:string){
        super(msg)
    }
}

export class CarUnavailableError extends Error{
    constructor(msg:string){
        super(msg)
    }
}