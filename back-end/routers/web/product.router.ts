import * as express from "express";
// import adminMiddleware from "../../middleware/admin.middleware";
import constructorsMiddleware from "../../middleware/constructors.middleware";
import ProductsController from "../../controller/v1/web/product.controller";

const routes = express.Router();

// Get all Data Routes
routes.get("/", ProductsController.get);

// Get One Category Routes
routes.get("/:id", ProductsController.getOne);

// Update Category Routes
routes.post("/:id/update", constructorsMiddleware, ProductsController.update);

// Delete Category Routes
routes.post("/:id/delete", constructorsMiddleware, ProductsController.delete);

//Post Data Routes
routes.post("/:id", constructorsMiddleware, ProductsController.addNew);

export default routes;
 