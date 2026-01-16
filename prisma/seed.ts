import { PrismaClient, RentalStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed...");

  //Users
  await prisma.users.createMany({
    data: [
      { name: "Paulo", email: "paulo@gmail.com" },
      { name: "Emylly", email: "emylly@gmail.com" },
      { name: "Maikon", email: "maikon@gmail.com" },
    ]
  });

  //Cars
  await prisma.cars.createMany({
    data: [
      { placa: "ABC1A12", disponivel: true },
      { placa: "DEF3D34", disponivel: false },
      { placa: "GHI5G56", disponivel: true },
    ]
  });

  //Rental
  const twoDaysLater = new Date();
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);

  await prisma.rentals.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user_id: 1,
      car_id: 2,
      endDate: twoDaysLater,
      status: RentalStatus.Andamento,
    },
  });

  console.log("Seed realizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
