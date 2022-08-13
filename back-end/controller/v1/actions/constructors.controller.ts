import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { validate } from "validate.js";
import Validation from "../../../utils/validation";
import { errRes, getOtp, okRes } from "../../../utils/util.services";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import smsSend from "../../../utils/SMSOtp";
import CONFIG from "../../../config";

// init prismClient
const prisma = new PrismaClient();

export default class ConstruactorsController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getConstructorProducts(
    req: Request,
    res: Response
  ): Promise<object> {
    const email: any = req.headers.email;
    const data: any = await prisma.constructorUser.findUnique({
      where: { email },
      select: {
        email: true,
        phoneNumber: true,
        products: true,
      },
    });
    if (data.length === 0) return errRes(res, "No products found");
    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */

  static async get(req: Request, res: Response): Promise<object> {
    // get all Users
    const data = await prisma.constructorUser.findMany({
      where: { active: true },
    });
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
      const data = await prisma.constructorUser.findMany({
        where: {
          id: parseInt(req.params.id),
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

      // check if the user already exists
      let user: any = await prisma.constructorUser.findUnique({
        where: { email: body.email },
      });
      console.log(user);

      // Check if Excist
      if (user) {
        // Check if there is no data
        return errRes(res, "Email already exists, please try another one.");
      }

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
      user = await prisma.constructorUser.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          profileImg: body.profileImg,
          address: body.address,
          phoneNumber: body.phoneNumber,
          otp,
        },
      });

      // Add the Links to socialMedia Table
      const sLinks: any = body.links;
      if (sLinks.length > 0) {
        sLinks.map(async (url: any) => {
          await prisma.social.create({
            data: {
              title: url[0],
              links: url[1],
              constructorId: user.id,
            },
          });
        });
      }
      /**
       * @param OTP numbers
       * */
      smsSend(`Your OTP is ${otp}`, user.phoneNumber);

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
  static async validateOtp(req: any, res: any): Promise<object> {
    // get OTP && User
    const otp = parseInt(req.body.otp);
    const user = req.user;

    // validate otp
    const notValided = validate(otp, Validation.otp());
    if (notValided) return errRes(res, "Error");

    if (user.otp !== otp) {
      // generate new  otp and save it
      const newOtp = getOtp();

      await prisma.constructorUser.update({
        where: {
          email: user.email,
        },
        data: {
          otp: newOtp,
        },
      });
      smsSend(`Your OTP is ${newOtp}`, user.phoneNumber);
      return errRes(res, "Error Wrong OTP || we send to you new OTP");
    }

    // update to verify
    await prisma.constructorUser.update({
      where: {
        email: user.email,
      },
      data: {
        verified: true,
      },
    });

    return okRes(res, { msg: "All good" });
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
        return errRes(res, { msg: `Please check the data you send.` });

      // Get the user from DB
      let [user]: any = await prisma.constructorUser.findMany({
        where: {
          active: true,
          email: body.email,
        },
      });

      // check f the user exists and active account
      if (!user)
        return errRes(res, "User Not found Or User account Not active");

      // check if OTP is correct
      if (body.otp !== user.otp) errRes(res, "OTP not correct");

      // compare password
      let valide = await bcrypt.compare(body.password, user.password);
      if (!valide)
        return errRes(res, {
          msg: "the password that you entered is wrong, please try again",
        });

      // update data in DB
      user = await prisma.constructorUser.update({
        where: { email: body.email },
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
   * @returns
   */
  static async addServices(req: any, res: any): Promise<object> {
    try {
      // get body
      const body = req.body;
      // check if there is data
      if (!body) return errRes(res, "There is no data");
      // get user
      const user = req.user;
      // create services
      const services = body.services;
      services.map(async (data: any) => {
        await prisma.services.create({
          data: {
            title: data.title,
            description: data.description,
            projectLink: data.projectLink,
            imageUrl: data.imageUrl,
            constructorId: user.id,
          },
        });
      });
      return okRes(res, "Add Services Success");
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
      const id = parseInt(req.params.id);
      // validate data
      const notValide = validate(body, Validation.register(false));
      if (notValide) return errRes(res, { msg: "Data not valid" });
      // update data
      const data: any = await prisma.constructorUser.update({
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
      const id = parseInt(req.params.id);

      // validate data
      const notValide = validate(body, Validation.register(false));
      if (notValide) return errRes(res, { msg: "Data not valid" });
      // update data
      const data: any = await prisma.constructorUser.update({
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
