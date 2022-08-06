import { Request, Response } from "express";
import { errRes, getOtp, okRes } from "../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../utils/validation";
import bcrypt from "bcrypt";
import CONFIG from "../../config";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class AdminController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async register(req: Request, res: Response): Promise<object> {
    try {
      // get body
      const body: any = req.body;

      // Body validation
      const notValide = validate(body, Validation.register());
      if (notValide)
        return errRes(res, { msg: "Please check the data you send." });

      // check if the password is less than 8 characters
      if (body.password.length <= 7)
        return errRes(res, { msg: "Password is to short!!!!" });
      // create Salt
      const salt: any = await bcrypt.genSalt(12);
      // Encrypt Password
      const password: any = await bcrypt.hash(body.password, salt);
      body.password = password;

      // get OTP
      const otp = getOtp();
      // check if the user already exists
      let user: any = await prisma.admin.findUnique({
        where: { email: body.email },
      });
      if (user) {
        return errRes(res, {
          msg: "Email already exists, please try another one.",
        });
      } else {
        user = await prisma.admin.create({
          data: {
            name: body.name,
            email: body.email,
            password: body.password,
            phoneNumber: body.phoneNumber,
            otp,
            permission: body.permission,
          },
        });
      }

      /**
       * TODO: Send to SMS gateway OTP message
       * @param OTP numbers
       * */

      // make up registerToken
      let token = jwt.sign({ email: body.email }, CONFIG.jwtUserSecret);

      // Return Response if Done
      return okRes(res, {
        token,
      });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }

  static async validattionOtp(req: any, res: any) {
    try {
      // get body
      const body = req.body;
      // validate body
      const notValidate = validate(body, Validation.otp());
      if (notValidate) return errRes(res, "There is no Data");
      // get user
      let user: any = req.user;
      // compare Between otp entered and stored
      if (body.otp !== user.otp) {
        // Regenerate & save OTP
        user = await prisma.admin.update({
          where: { email: user.email },
          data: {
            otp: getOtp(),
            verified: false,
          },
        });

        return errRes(res, "OTP is not correct");
      }
      user = await prisma.admin.update({
        where: { email: user.email },
        data: {
          verified: true,
        },
      });
      return okRes(res, { msg: "User Verified successfully" });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async login(req: Request, res: Response): Promise<object> {
    try {
      // get body
      const body = req.body;

      // validate body
      const notValide = validate(body, Validation.login());
      if (notValide) return errRes(res, "Please check the data you send.");

      // Get the user from DB
      const user: any = await prisma.admin.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) return errRes(res, "User Not found");

      // compare password
      let valide = await bcrypt.compare(body.password, user.password);
      if (!valide)
        return errRes(
          res,
          "the password that you entered is wrong, please try again"
        );

      // create the Token
      let token = jwt.sign({ email: body.email }, CONFIG.jwtUserSecret);
      return okRes(res, { token, verified: user.verified });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }
}
