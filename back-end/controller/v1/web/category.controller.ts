import { Request, Response } from "express";
import { errRes, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/validation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoryController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async get(req: Request, res: Response): Promise<object> {
    try {
      // get all data from DB
      const data = await prisma.category.findMany();
      // Check if there is no Data
      if (data.length === 0) return errRes(res, "There is no data exists");

      // Return Data
      return okRes(res, { data });
    } catch (err) {
      return errRes(res, err);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAllWithSub(req: Request, res: Response): Promise<object> {
    try {
      const id = req.params.id;
      // get all data from DB
      const data = await prisma.category.findMany({
        where: { id: parseInt(id), active: true },
        include: {
          subCategory: {
            select: {
              name: true,
              imgUrl: true,
            },
          },
        },
      });

      // Check if there is no Data
      if (data.length === 0) return errRes(res, "There is no data exists");

      // Return Data
      return okRes(res, { data });
    } catch (err) {
      return errRes(res, err);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: Request, res: Response): Promise<object> {
    try {
      const id = req.params.id;
      // get all data from DB
      const data = await prisma.category.findMany({
        where: { id: parseInt(id), active: true },
      });

      // Check if there is no Data
      if (data.length === 0) return errRes(res, "There is no data exists");

      // Return Data
      return okRes(res, { data });
    } catch (err) {
      return errRes(res, err);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async addNew(req: Request, res: Response): Promise<object> {
    try {
      // Get body
      const body = req.body;

      // Validate data
      const notValide = validate(body, Validation.category());
      console.log(notValide);

      if (notValide) return errRes(res, "The Data is not valid!!");

      // check if there is data in DB similar
      let data = await prisma.category.findUnique({
        where: {
          name: body.name,
        },
      });
      if (data)
        return errRes(res, `The Category ${data.name} is already exists`);
      else {
        // Add Data to DB
        data = await prisma.category.create({
          data: {
            name: body.name,
            description: body.description,
            imgUrl: body.imgUrl,
          },
        });
      }

      // Return OKResponse
      return okRes(res, { msg: "Data Saved successfully" });
    } catch (err) {
      return errRes(res, `${err}`);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async update(req: Request, res: Response): Promise<object> {
    try {
      // Get body
      const body = req.body;
      const id = req.params.id;
      // Validate data
      const notValide = validate(body, Validation.category(false));
      if (notValide) return errRes(res, "The Data is not valid!!");

      // check if there is data in DB similar
      let data = await prisma.category.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!data) return errRes(res, `No Category Found `);
      else {
        // Update Data in DB
        data = await prisma.category.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name: body.name,
            description: body.description,
            imgUrl: body.imgUrl,
            active: body.active,
          },
        });
      }

      // Return OKResponse
      return okRes(res, { msg: "Data Saved successfully" });
    } catch (err) {
      return errRes(res, `Error : ${err}`);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    try {
      // Get id
      const id = req.params.id;
      console.log(id);

      // check if there is data in DB similar => ID
      let data = await prisma.category.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!data) return errRes(res, `No Category Found `);
      else {
        // Update active from True => false
        data = await prisma.category.update({
          where: {
            id: parseInt(id),
          },
          data: {
            active: false,
          },
        });
      }

      // Return OKResponse
      return okRes(res, { msg: "Data Saved successfully" });
    } catch (err) {
      return errRes(res, `Error : ${err}`);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async activate(req: Request, res: Response): Promise<object> {
    try {
      // Get id
      const id = req.params.id;

      // check if there is data in DB similar => ID
      let data = await prisma.category.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!data) return errRes(res, `No Category Found `);
      else {
        // Update active from True => false
        data = await prisma.category.update({
          where: {
            id: parseInt(id),
          },
          data: {
            active: true,
          },
        });
      }

      // Return OKResponse
      return okRes(res, { msg: "Data Saved successfully" });
    } catch (err) {
      return errRes(res, `Error : ${err}`);
    }
  }
}
