import { inject, injectable } from "inversify";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { TYPES } from "../../../types";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { CreateRentalDTO } from "./CreateRentalDTO";
import { CarNotFoundError, CarUnavailableError } from "./errors/CarErrors";
import { UserInRentalError, UserNotFoundError } from "./errors/UserErros";
import { differenceInHours } from "date-fns";
import { TimeLessThan24 } from "./errors/InputError";
import { Rental } from "../../../domain/entities/Rental";

@injectable()
class CreateRentalUseCase{
    
    constructor(
        @inject(TYPES.CarRepository)private carRepository:ICarRepository,
        @inject(TYPES.RentalRepository)private rentalRepository:IRentalRepository,
        @inject(TYPES.UserRepository) private userRepository:IUserRepository
    ){}

    async execute(input:CreateRentalDTO):Promise<Rental>{
        const car = await this.carRepository.findById(input.carId);
        //Verificação para carros
        if(car === null) throw new CarNotFoundError("Não existe carro com o id: " + input.carId);
        if(car.disponivel === false) throw new CarUnavailableError("Carro de id " + input.carId + " está indisponivél. ")
        
        //Verificação para user
        const user = await this.userRepository.findById(input.userId);
        if(user === null) throw new UserNotFoundError("Não existe usuário com o id " + input.userId);

        //Verificação se user está com algum aluguel ativo
        const rentalFromRepo = await this.rentalRepository.findOnGoingRentalByUserId(input.userId);
        if(rentalFromRepo != null) throw new UserInRentalError("Não é possível alugar um carro, usuário de id " + input.userId + " já possuir um aluguel em aberto no momento.")

        //Verificação do tempo de aluguel (dependnete de biblioteca, tenho de injetar)
        const tempoAluguel = differenceInHours(input.endDate,new Date());
        if(tempoAluguel < 24) throw new TimeLessThan24("O aluguel deve ter duração mínima de 24 horas.");

        const rental = await this.rentalRepository.create(input.userId,input.carId,input.endDate);

        return rental;

    }
}