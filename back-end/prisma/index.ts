import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import adminRouter from "../routers/actionsRgLg/admin.router";
const prisma = new PrismaClient();
// const express = require("express");

async function main() {
  const app: any = express();
  const port: any = 4000;
  app.use(cors());
  app.use(express.json());

  app.get("/", (req: any, res: any) => {
    res.send("You requested Me");
  });

  app.use("/admin", adminRouter);
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
