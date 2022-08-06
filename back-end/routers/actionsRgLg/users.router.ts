import * as express from "express";
import UsersController from "../../controller/v1/actions/users.controller";
import usersMiddleware from "../../middleware/users.middleware";
import adminMiddleware from "../../middleware/admin.middleware";

const routes = express.Router();

// get all users for (admin, superAdmin)
routes.get("/", adminMiddleware, UsersController.get);

// Registration Users
routes.post("/register", UsersController.register);

// Login
routes.post("/login", UsersController.login);

// Operation in users
routes.post("/:id/update", usersMiddleware, UsersController.update);
routes.post("/:id/delete", usersMiddleware, UsersController.activate);

export default routes;
