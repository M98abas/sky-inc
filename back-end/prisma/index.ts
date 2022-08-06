import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import adminRouter from "../routers/actionsRgLg/admin.router";
import superAdminRouter from "../routers/actionsRgLg/superAdmin.router";
import usersRoutes from "../routers/actionsRgLg/users.router";

const prisma = new PrismaClient();
// const express = require("express");

async function main() {
  const app: any = express();
  const port: any = 4000;

  // Add cors middleware
  app.use(cors());

  // Add express.JSON to recognize the incoming
  //request object as JSON object
  app.use(express.json());

  // superAdmin Router
  app.use("/super", superAdminRouter);

  // admin Router
  app.use("/admin", adminRouter);

  // user Router
  app.use("/user", usersRoutes);

  // Listen => Port
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
