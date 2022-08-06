import * as express from "express";
import SuperAdminController from "../../controller/v1/superAdmin.controller";

const routes = express.Router();

routes.post("/register", SuperAdminController.register);
routes.post("/login", SuperAdminController.login);

export default routes;
