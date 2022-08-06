import * as express from "express";
import AdminController from "../../controller/v1/actions/admin.controller";
import superAdminMiddleware from "../../middleware/superAdmin.middleware";
const routes = express.Router();

//register routes
routes.post("/register", superAdminMiddleware, AdminController.register);

//register login
routes.post("/login", AdminController.login);

export default routes;
