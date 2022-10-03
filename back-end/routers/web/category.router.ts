import * as express from "express";
import CategoryController from "../../controller/v1/web/category.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const routes = express.Router();

// Get all Data Routes
routes.get("/", CategoryController.get);

// All Sub-Categories route
routes.get("/:id/sub-category", CategoryController.getAllWithSub);

// Get One Category Routes
routes.get("/:id", adminMiddleware, CategoryController.getOne);

//Post Data Routes
routes.post("/", adminMiddleware, CategoryController.addNew);

// Update Category Routes
routes.post("/update/:id", adminMiddleware, CategoryController.update);

// Delete Category Routes
routes.post("/delete/:id", adminMiddleware, CategoryController.delete);

// Delete Category Routes
routes.post("/activate/:id", adminMiddleware, CategoryController.activate);

export default routes;
