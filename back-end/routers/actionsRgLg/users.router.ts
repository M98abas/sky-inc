import * as express from "express";
import UsersController from "../../controller/v1/users.controller";
const routes = express.Router();

routes.get("/", UsersController.get);
routes.post("/register", UsersController.register);
routes.post("/otp", UsersController.validattionOtp);
routes.post("/login", UsersController.login);
routes.post("/:id/update", UsersController.update);
routes.post("/:id/delete", UsersController.activate);

export default routes;
