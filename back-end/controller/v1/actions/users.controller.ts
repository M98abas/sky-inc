import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { validate } from "validate.js";
import { errRes, getOtp, okRes } from "../../utils/util.services";
import Validation from "../../utils/validation";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
const prisma = new PrismaClient();

export default class UsersController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */

  static async get(req: Request, res: Response): Promise<object> {
    // get all Users
    const data = await prisma.users.findMany();
    // check if there is data
    if (data.length !== 0) return errRes(res, { msg: "There is no data" });
    return okRes(res, { data });
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: Request, res: Response): Promise<object> {
    try {
      // get all Users
      const data = await prisma.users.findMany({
        where: {
          id: req.params.id,
        },
      });
      // check if there is data
      if (data.length !== 0) return errRes(res, "There is no data");
      return okRes(res, { data });
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
  static async register(req: Request, res: Response): Promise<object> {
    try {
      // get body
      const body: any = req.body;

      // Body validation
      const notValide = validate(body, Validation.register());
      if (notValide) return errRes(res, "Please check the data you send.");

      // check if the password is less than 8 characters
      if (body.password.length <= 7)
        return errRes(res, "Password is to short!!!!");
      // create Salt
      const salt: any = await bcrypt.genSalt(12);
      // Encrypt Password
      const password: any = await bcrypt.hash(body.password, salt);
      body.password = password;

      // get OTP
      const otp = getOtp();
      // check if the user already exists
      let user: any = await prisma.users.findMany({
        where: { active: true, email: body.email },
      });
      // Check if Excist
      if (user.length === 1) {
        return errRes(res, "Email already exists, please try another one.");
        // Check if there is no data
      } else if (user.length === 0) {
        return errRes(
          res,
          "Email not active, contact the administrator to re-activate it, thanks"
        );
      } else {
        user = await prisma.users.create({
          data: {
            name: body.name,
            email: body.email,
            password: body.password,
            address: body.address,
            phoneNumber: body.phoneNumber,
            otp,
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
      if (notValide)
        return errRes(res, { msg: "Please check the data you send." });

      // Get the user from DB
      let user: any = await prisma.users.findMany({
        where: {
          active: true,
          email: body.email,
        },
      });

      // check if OTP is correct
      if (body.otp !== user.otp) errRes(res, "User Not found");

      // check f the user exists and active account
      if (user.length === 1) return errRes(res, "User Not found");
      else if (user.length === 0)
        return errRes(res, "User account Not active ");

      // compare password
      let valide = await bcrypt.compare(body.password, user.password);
      if (!valide)
        return errRes(res, {
          msg: "the password that you entered is wrong, please try again",
        });

      // update data in DB
      user = await prisma.admin.update({
        where: { email: user.email },
        data: {
          verified: true,
        },
      });
      // create the Token
      let token = jwt.sign({ email: body.email }, CONFIG.jwtUserSecret);
      return okRes(res, { token, verified: user.verified });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async update(req: Request, res: Response): Promise<object> {
    try {
      // get body data
      const body = req.body;
      const id = req.params.id;
      // validate data
      const notValide = validate(body, Validation.register(false));
      if (notValide) return errRes(res, { msg: "Data not valid" });
      // update data
      const data: any = await prisma.users.update({
        where: { id },
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          address: body.address,
          phoneNumber: body.phoneNumber,
          active: body.active,
          verified: body.verified,
          otp: getOtp(),
        },
      });
      return errRes(res, { data });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async activate(req: Request, res: Response): Promise<object> {
    try {
      // get body data
      const body = req.body;
      const id = req.params.id;
      // validate data
      const notValide = validate(body, Validation.register(false));
      if (notValide) return errRes(res, { msg: "Data not valid" });
      // update data
      const data: any = await prisma.users.update({
        where: { id },
        data: {
          active: body.active,
          verified: body.verified,
          otp: getOtp(),
        },
      });
      return errRes(res, { data });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }
  // Class End
}
