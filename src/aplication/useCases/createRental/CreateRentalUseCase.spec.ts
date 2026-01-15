import { Rental } from "../../../domain/entities/Rental";
import { InMemoryCarRepository } from "../../../infra/database/inMemory/InMemoryCarRepository"
import { InMemoryRentalRepository } from "../../../infra/database/inMemory/InMemoryRentalRepository";
import { InMemoryUserRepository } from "../../../infra/database/inMemory/InMemoryUserRepository";
import { CreateRentalDTO } from "./CreateRentalDTO";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { expect, it, vi } from 'vitest'
import { UserInRentalError, UserNotFoundError } from "./errors/UserErros";
import { TimeLessThan24 } from "./errors/InputError";
import { CarNotFoundError, CarUnavailableError } from "./errors/CarErrors";



it("deve retornar um tipo rental, quando receber dados válidos", async () => {
    const carRepository = new InMemoryCarRepository;
    const userRepository = new InMemoryUserRepository;
    const rentalRepository = new InMemoryRentalRepository;

    //garante um horario maior que 24h
    const dataHelperMock = {
        differenceInHours: vi.fn().mockReturnValue(48)
    }

    const input: CreateRentalDTO = {
        userId: 1,
        carId: 1,
        endDate: new Date()
    }


    const useCase = new CreateRentalUseCase(carRepository, rentalRepository, userRepository, dataHelperMock)

    //adicionando valores nos repositorios 
    await carRepository.create("abc", true);
    await userRepository.create("Paulo", "teste@gmail");

    const result = await useCase.execute(input)

    expect(result).toBeInstanceOf(Rental)
})

it("deve lançar o erro UserInRentalError, quando se tentar criar um rental para um user com um rental em andamento", async () => {
    const carRepository = new InMemoryCarRepository;
    const userRepository = new InMemoryUserRepository;
    const rentalRepository = new InMemoryRentalRepository;

    const dataHelperMock = {
        differenceInHours: vi.fn().mockReturnValue(48)
    }

    const input: CreateRentalDTO = {
        userId: 1,
        carId: 1,
        endDate: new Date()
    }


    const useCase = new CreateRentalUseCase(carRepository, rentalRepository, userRepository, dataHelperMock)

    //adicionando valores nos repositorios 
    const car = await carRepository.create("abc", true);
    const user = await userRepository.create("Paulo", "teste@gmail");

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    await rentalRepository.create(user.id, car.id, endDate)

    await expect(useCase.execute(input)).rejects
        .toBeInstanceOf(UserInRentalError)
})

it("deve lançar o erro TimeLessThan24, quando tempo de aluguel for menor que 24h", async () => {
    const carRepository = new InMemoryCarRepository;
    const userRepository = new InMemoryUserRepository;
    const rentalRepository = new InMemoryRentalRepository;

    //garante um horario menor que 24h
    const dataHelperMock = {
        differenceInHours: vi.fn().mockReturnValue(4)
    }

    const input: CreateRentalDTO = {
        userId: 1,
        carId: 1,
        endDate: new Date()
    }


    const useCase = new CreateRentalUseCase(carRepository, rentalRepository, userRepository, dataHelperMock)

    //adicionando valores nos repositorios 
    await carRepository.create("abc", true);
    await userRepository.create("Paulo", "teste@gmail");


    await expect(useCase.execute(input)).rejects
        .toBeInstanceOf(TimeLessThan24)
})

it("deve lançar o erro CarUnavailableError, quando carro está indisponível", async () => {
    const carRepository = new InMemoryCarRepository;
    const userRepository = new InMemoryUserRepository;
    const rentalRepository = new InMemoryRentalRepository;

    //garante um horario maior que 24h
    const dataHelperMock = {
        differenceInHours: vi.fn().mockReturnValue(48)
    }

    const input: CreateRentalDTO = {
        userId: 1,
        carId: 1,
        endDate: new Date()
    }


    const useCase = new CreateRentalUseCase(carRepository, rentalRepository, userRepository, dataHelperMock)

    //adicionando valores nos repositorios 
    await carRepository.create("abc", false);
    await userRepository.create("Paulo", "teste@gmail");


    await expect(useCase.execute(input)).rejects
        .toBeInstanceOf(CarUnavailableError)
})
it("deve lançar o erro CarNotFoundError, quando o carId não for encontrado no bd", async () => {
    const carRepository = new InMemoryCarRepository;
    const userRepository = new InMemoryUserRepository;
    const rentalRepository = new InMemoryRentalRepository;

    //garante um horario maior que 24h
    const dataHelperMock = {
        differenceInHours: vi.fn().mockReturnValue(48)
    }

    const input: CreateRentalDTO = {
        userId: 1,
        carId: 2,
        endDate: new Date()
    }


    const useCase = new CreateRentalUseCase(carRepository, rentalRepository, userRepository, dataHelperMock)

    //adicionando valores nos repositorios 
    await carRepository.create("abc", false);
    await userRepository.create("Paulo", "teste@gmail");


    await expect(useCase.execute(input)).rejects
        .toBeInstanceOf(CarNotFoundError)
})
it("deve lançar o erro UserNotFoundError, quando o userId não for encontrado no bd", async () => {
    const carRepository = new InMemoryCarRepository;
    const userRepository = new InMemoryUserRepository;
    const rentalRepository = new InMemoryRentalRepository;

    //garante um horario maior que 24h
    const dataHelperMock = {
        differenceInHours: vi.fn().mockReturnValue(48)
    }

    const input: CreateRentalDTO = {
        userId: 2,
        carId: 1,
        endDate: new Date()
    }


    const useCase = new CreateRentalUseCase(carRepository, rentalRepository, userRepository, dataHelperMock)

    //adicionando valores nos repositorios 
    carRepository.create("abc", true);
    userRepository.create("Paulo", "teste@gmail");


    await expect(useCase.execute(input)).rejects
        .toBeInstanceOf(UserNotFoundError)
})