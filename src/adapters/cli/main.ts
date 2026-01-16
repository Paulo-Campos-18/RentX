import { CreateRentalDTO } from "../../aplication/useCases/createRental/CreateRentalDTO"
import { CreateRentalUseCase } from "../../aplication/useCases/createRental/CreateRentalUseCase"
import { container } from "../../infra/container/index"
import { TYPES } from "../../types"

async function main() {

    try {
        const useCase = container.get<CreateRentalUseCase>(TYPES.CreateRentalUseCase)

        const inputSimulation: CreateRentalDTO = {
            userId: 2,
            carId: 1,
            endDate: new Date("2026/01/18")
        }

        const result = await useCase.execute(inputSimulation);
        console.log("Aluguel criado com sucesso")
        console.log(result)

    } catch (e: any) {
        console.log(e.message)
    }
}

main()