import { errRes } from "../utils/util.services";
import * as jwt from "jsonwebtoken";
import CONFIG from "../config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: any, res: any, next: any) => {
  // get token
  const token = req.headers.token;
  if (!token) return errRes(res, { msg: "The data you send is not valid" });

  // verfie token
  try {
    // get payload
    let payload: any;
    payload = jwt.verify(token, CONFIG.jwtUserSecret);

    // Find the user and add to Request
    let user: any = await prisma.admin.findUnique({
      where: { email: payload.email },
    });
    // Add user data to request param
    req.user = user;
    return next();
  } catch (err) {
    return errRes(res, { msg: `The error in ${err}` });
  }
};
