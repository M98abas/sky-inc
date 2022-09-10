import * as express from "express";
import SuperAdminController from "../../controller/v1/actions/superAdmin.controller";
import superAdminMiddleware from "../../middleware/superAdmin.middleware";

const routes = express.Router();

// get routes
routes.get("/", superAdminMiddleware, SuperAdminController.get);

// Register routes
routes.post("/register", SuperAdminController.register);

// Login routes
routes.post("/login", SuperAdminController.login);
routes.post("/update/:id", SuperAdminController.update);
routes.post("/delete/:id", SuperAdminController.delete);
routes.post("/active/:id", SuperAdminController.activate);
// routes.post("/:id/delete", SuperAdminController.activate);

export default routes;
