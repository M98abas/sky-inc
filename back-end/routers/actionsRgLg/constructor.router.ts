import * as express from "express";
import ConstruactorsController from "../../controller/v1/actions/constructors.controller";
import constructorsMiddleware from "../../middleware/constructors.middleware";
const routes = express.Router();



// get all constructors
routes.get("/", ConstruactorsController.get);

// get all Products 
routes.get("/products", ConstruactorsController.getConstructorProducts);

// get one constructor
routes.get("/:id", ConstruactorsController.getOne);

//register routes
routes.post("/register", ConstruactorsController.register);

//register login
routes.post("/login", ConstruactorsController.login);


// Operation in users
routes.post("/:id/update",constructorsMiddleware,ConstruactorsController.update);
routes.post("/:id/delete", constructorsMiddleware, ConstruactorsController.activate);


export default routes;
