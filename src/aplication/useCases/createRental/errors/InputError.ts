export class TimeLessThan24 extends Error{
    constructor(msg:string){
        super(msg)
        this.name = TimeLessThan24.name
    }
}