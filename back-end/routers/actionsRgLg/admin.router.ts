import * as express from "express";
import AdminController from "../../controller/v1/admin.controller";

const routes = express.Router();

routes.post("/register", AdminController.register);
routes.post("/login", AdminController.login);
export default routes;
