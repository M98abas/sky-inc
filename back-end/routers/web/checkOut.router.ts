import * as express from "express";
import CheckOutController from "../../controller/v1/web/checkOut.constroller";

const routes = express.Router();

routes.post("/", CheckOutController.initCheckOutPayment);
routes.post("/fiinish", CheckOutController.checkOut);

export default routes;
