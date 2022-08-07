import * as express from "express";
import SubCategoryController from "../../controller/v1/web/subcategory.controller";
const routes = express.Router();

// get all data Route
routes.get("/", SubCategoryController.get);

// All Items in SubCategory Route
routes.get("/:id/items", SubCategoryController.allServices)

// Get One data
routes.get("/:id", SubCategoryController.getOne);

// add New One Route
routes.post("/", SubCategoryController.addNew);

// Update Route
routes.post("/:id/update", SubCategoryController.update);

// Delete Route
routes.post("/:id/delete", SubCategoryController.delete);

export default routes;
