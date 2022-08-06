import * as express from "express";
import AdminController from "../../controller/v1/admin.controller";
import adminMiddlewareRegister from "../../middleware/admin.middleware";
const routes = express.Router();

//register routes
routes.post("/register", AdminController.register);

//register login
routes.post("/login", adminMiddlewareRegister, AdminController.login);

// OTP routes
routes.post("/otp", adminMiddlewareRegister, AdminController.validattionOtp);

export default routes;
