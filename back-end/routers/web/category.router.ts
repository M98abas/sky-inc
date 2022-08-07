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
routes.post("/:id/update", adminMiddleware, CategoryController.update);

// Delete Category Routes
routes.post("/:id/delete", adminMiddleware, CategoryController.delete);

export default routes;
