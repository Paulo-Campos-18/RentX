export interface IRentalRepository {
    create(): void
    remove(): void
    finishRent(id: number): void
    extendRent(id:number): void
}