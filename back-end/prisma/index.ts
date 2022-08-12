import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import adminRouter from "../routers/actionsRgLg/admin.router";
import superAdminRouter from "../routers/actionsRgLg/superAdmin.router";
import usersRoutes from "../routers/actionsRgLg/users.router";
import constructorRoutes from "../routers/actionsRgLg/constructor.router";
import categoryRoutes from "../routers/web/category.router";
import subCategoryRoutes from "../routers/web/subcategory.router";
import productsRoutes from "../routers/web/product.router";
import checkOutRoutes from "../routers/web/checkOut.router";

// Init Prisma from prismClient
const prisma = new PrismaClient();

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

  // Category Router
  app.use("/category", categoryRoutes);

  // Sub-Category Router
  app.use("/sub-category", subCategoryRoutes);

  // Product Router
  app.use("/product", productsRoutes);

  // Product Router
  app.use("/checkout", checkOutRoutes);

  // Product Router constructorRoutes
  app.use("/constructor", constructorRoutes);

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
