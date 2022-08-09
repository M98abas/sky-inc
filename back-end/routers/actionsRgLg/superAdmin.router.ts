import * as express from "express";
import SuperAdminController from "../../controller/v1/actions/superAdmin.controller";

const routes = express.Router();

// Register routes
routes.post("/register", SuperAdminController.register);

// Login routes
routes.post("/login", SuperAdminController.login);
routes.post("/:id/update", SuperAdminController.update);
// routes.post("/:id/delete", SuperAdminController.activate);

export default routes;
