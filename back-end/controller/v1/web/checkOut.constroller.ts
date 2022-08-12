import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { errRes, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/validation";
import querystring from "querystringify";
import https from "https";

const prisma = new PrismaClient();

export default class CheckOutController {
  static async initCheckOutPayment(
    req: Request,
    res: Response
  ): Promise<object> {
    try {
      // get body {amount }
      const body = req.body;
      const amount = parseInt(body.amount);
      // validate
      const notValide = validate(amount, Validation.checkOut());
      if (notValide) return errRes(res, "The Data is not valid!!");

      // init the formFunction
      const sessionId = await hyperpaySwitch(amount);
      if (!sessionId) return errRes(res, "Try again later");

      // return the formSession
      return okRes(res, { sessionId });
    } catch (err) {
      return errRes(res, "Something went wrong!@!@!");
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async checkOut(req: any, res: any): Promise<object> {
    // get body amount
    const body: any = req.body;
    // validate body
    const notValide = validate(body, Validation.checkOutItems());
    if (notValide) return errRes(res, "Data not valid");

    // create new product
    const pay = await prisma.usersProducts.create({
      data: {
        productId: parseInt(body.productId),
        totalAmount: parseInt(body.totalAmount),
        usersId: req.users.id,
      },
    });
    //
    return okRes(res, { pay });
  }
}

const hyperpaySwitch = async (amount: any) => {
  const path = "/v1/checkouts";
  const data = querystring.stringify({
    entityId: "8a8294174d0595bb014d05d82e5b01d2",
    amount: `${amount}`,
    currency: "EUR",
    paymentType: "DB",
  });
  const options = {
    port: 443,
    host: "test.oppwa.com",
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": data.length,
      Authorization:
        "Bearer OGE4Mjk0MTc0ZDA1OTViYjAxNGQwNWQ4MjllNzAxZDF8OVRuSlBjMm45aA==",
    },
  };
  return new Promise((resolve, reject) => {
    const postRequest = https.request(options, function (res) {
      const buf: any = [];
      res.on("data", (chunk) => {
        buf.push(Buffer.from(chunk));
      });
      res.on("end", () => {
        const jsonString = Buffer.concat(buf).toString("utf8");
        try {
          resolve(JSON.parse(jsonString));
        } catch (error) {
          reject(error);
        }
      });
    });
    postRequest.on("error", reject);
    postRequest.write(data);
    postRequest.end();
  });
};
