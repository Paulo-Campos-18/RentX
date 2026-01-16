const TYPES = {
    CarRepository: Symbol.for("ICarRepository"),
    RentalRepository: Symbol.for("IRentalRepository"),
    UserRepository: Symbol.for("IUserRepository"),
    Date_fns: Symbol.for("IDateHelper"),
    CreateRentalUseCase:Symbol.for("CreateRentalUseCase")
};

export { TYPES };