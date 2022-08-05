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
    // get body
    const body: any = req.body;

    // Body validation
    const notValide = validate(body, Validation.admin());
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
    // make up registerToken
    let token = jwt.sign({ email: body.email }, CONFIG.jwtUserSecret);

    // Return Response if Done
    return okRes(res, {
      token,
    });
  }

  static async validattionOtp(req: any, res: any) {
    const body = req.body;
    const token = req.Headers.token;
    const data = jwt.verify(token, CONFIG.jwtUserSecret);
    console.log(data);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async login(req: Request, res: Response): Promise<object> {
    // get body
    const body = req.body;

    // validate body
    const notValide = validate(body, Validation.login());
    if (notValide)
      return errRes(res, { msg: "Please check the data you send." });

    // Get the user from DB
    const user: any = await prisma.admin.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) return errRes(res, { msg: "User Not found" });

    // compare password
    let valide = await bcrypt.compare(body.password, user.password);
    if (!valide)
      return errRes(res, {
        msg: "the password that you entered is wrong, please try again",
      });

    // create the Token
    let token = jwt.sign({ email: body.email }, CONFIG.jwtUserLoginSecret);
    return okRes(res, { token });
  }
}
