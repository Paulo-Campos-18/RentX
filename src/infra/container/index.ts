import { Container } from "inversify";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { TYPES } from "../../types";
import { PrismaRentalRepository } from "../database/prisma/PrismaRentalRepository";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { PrismaCarRepository } from "../database/prisma/PrismaCarRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { PrismaUserRepository } from "../database/prisma/PrimsaUserRepository";
import { IDateHelper } from "../../domain/dateHelpers/IDateHelper";
import { DateHelperDate_fns } from "../libraries/dateHelpers/DateHelperDate-fns";

const container = new Container();

container.bind<IRentalRepository>(TYPES.RentalRepository).to(PrismaRentalRepository)
container.bind<ICarRepository>(TYPES.CarRepository).to(PrismaCarRepository)
container.bind<IUserRepository>(TYPES.UserRepository).to(PrismaUserRepository)
container.bind<IDateHelper>(TYPES.Date_fns).to(DateHelperDate_fns)

export {container};