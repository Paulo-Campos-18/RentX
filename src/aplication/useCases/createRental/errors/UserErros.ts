export class UserNotFoundError extends Error{
    constructor(msg:string){
        super(msg)
    }
}

export class UserInRentalError extends Error{
    constructor(msg:string){
        super(msg)
    }
}