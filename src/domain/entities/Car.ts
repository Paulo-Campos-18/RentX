export class Car{
    id:number;
    placa:string;
    disponivel:boolean;

    constructor(id:number,placa:string,disponivel:boolean){
        this.id = id;
        this.placa = placa;
        this.disponivel = disponivel
    }
}