import * as express from "express";
import ConstruactorsController from "../../controller/v1/actions/constructors.controller";
import constructorsMiddleware from "../../middleware/constructors.middleware";
const routes = express.Router();

//register routes
routes.post("/register",  ConstruactorsController.register);

//register login
routes.post("/login", ConstruactorsController.login);


// Operation in users
routes.post("/:id/update", constructorsMiddleware, ConstruactorsController.update);
routes.post("/:id/delete", constructorsMiddleware, ConstruactorsController.activate);

export default routes;
