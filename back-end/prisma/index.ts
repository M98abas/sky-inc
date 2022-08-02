import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app: any = express();
const port: any = 4000;

async function main() {
  app.use(cors());
  app.get("/", (req: any, res: any) => {
    res.send("You requested Me");
  });

  app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
