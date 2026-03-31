import express from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { CreateRentalUseCase } from "../../aplication/useCases/createRental/CreateRentalUseCase";
import { CreateRentalDTO } from "../../aplication/useCases/createRental/CreateRentalDTO";
import { container } from "../../infra/container/index";
import { TYPES } from "../../types";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../../public")));

// ===================== USERS =====================

// List all users
app.get("/api/users", async (_req, res) => {
    try {
        const users = await prisma.users.findMany({ include: { rentals: true } });
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Create user
app.post("/api/users", async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ error: "Nome e email são obrigatórios." });
            return;
        }
        const user = await prisma.users.create({ data: { name, email } });
        res.status(201).json(user);
    } catch (error: any) {
        if (error.code === "P2002") {
            res.status(409).json({ error: "Email já cadastrado." });
            return;
        }
        res.status(500).json({ error: error.message });
    }
});

// ===================== CARS =====================

// List all cars
app.get("/api/cars", async (_req, res) => {
    try {
        const cars = await prisma.cars.findMany({ include: { rentals: true } });
        res.json(cars);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Create car
app.post("/api/cars", async (req, res) => {
    try {
        const { placa, disponivel } = req.body;
        if (!placa) {
            res.status(400).json({ error: "Placa é obrigatória." });
            return;
        }
        const car = await prisma.cars.create({
            data: { placa, disponivel: disponivel !== undefined ? disponivel : true },
        });
        res.status(201).json(car);
    } catch (error: any) {
        if (error.code === "P2002") {
            res.status(409).json({ error: "Placa já cadastrada." });
            return;
        }
        res.status(500).json({ error: error.message });
    }
});

// ===================== RENTALS =====================

// List all rentals
app.get("/api/rentals", async (_req, res) => {
    try {
        const rentals = await prisma.rentals.findMany({
            include: { user: true, car: true },
            orderBy: { id: "desc" },
        });
        res.json(rentals);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Create rental (uses the domain use case)
app.post("/api/rentals", async (req, res) => {
    try {
        const useCase = container.get<CreateRentalUseCase>(TYPES.CreateRentalUseCase);

        const input: CreateRentalDTO = {
            userId: Number(req.body.userId),
            carId: Number(req.body.carId),
            endDate: new Date(req.body.endDate),
        };

        const rental = await useCase.execute(input);
        res.status(201).json(rental);
    } catch (error: any) {
        const statusMap: Record<string, number> = {
            CarNotFoundError: 404,
            CarUnavailableError: 409,
            UserNotFoundError: 404,
            UserInRentalError: 409,
            TimeLessThan24: 400,
        };
        const status = statusMap[error.name] || 500;
        res.status(status).json({ error: error.message, type: error.name });
    }
});

// ===================== START =====================

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚗 RentX Server rodando em http://localhost:${PORT}`);
});
