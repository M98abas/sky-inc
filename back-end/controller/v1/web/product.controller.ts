import { errRes, okRes } from "../../../utils/util.services";
import { PrismaClient } from "@prisma/client";
import { validate } from "validate.js";
import Validation from "../../../utils/validation";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default class ProductsController {
  /**
   * Get all products
   * @param req
   * @param res
   * @returns
   */
  static async get(req: Request, res: Response): Promise<object> {
    const data = await prisma.products.findMany({
      where: { active: true },
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
  static async getOne(req: Request, res: Response): Promise<object> {
    const data = await prisma.products.findMany({
      where: { active: true, id: parseInt(req.params.id) },
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
  static async addNew(req: any, res: any): Promise<object> {
    // get body
    const body: any = req.body;
    const categoryId = parseInt(req.params.id);

    // get user data
    const user = req.user;

    // validate body
    const notValide = validate(body, Validation.products());
    if (notValide) return errRes(res, `Data not valid : ${notValide}`);

    // if data already exists
    let data: any = await prisma.products.findMany({
      where: {
        title: body.title,
        constructorId: user.id,
      },
    });
    // --- Yes : errRes, --- No : continue
    if (data.length !== 0) return errRes(res, "Duplicate Product");

    // create new products
    data = await prisma.products.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        discount: body.discount,
        constructorId: user.id,
        subCategoryId: categoryId,
      },
    });
    const imageUrl = body.images;
    imageUrl.map(async (imgUrl: any) => {
      await prisma.images.create({
        data: {
          imageUrl: imgUrl,
          productId: data.id,
        },
      });
    });

    return okRes(res, { data });
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async update(req: any, res: any): Promise<object> {
    // get body
    const body: any = req.body;
    const id = parseInt(req.params.id);

    // get user data
    const user = req.user;

    // validate body
    const notValide = validate(body, Validation.products(false));
    if (notValide) return errRes(res, `Data not valid : ${notValide}`);

    // if data already exists
    let data: any = await prisma.products.findMany({
      where: {
        title: body.title,
        constructorId: user.id,
      },
    });
    // --- Yes : errRes, --- No : continue
    if (data.length !== 0) return errRes(res, "Duplicate Product");

    // create new products
    data = await prisma.products.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        discount: body.discount,
        constructorId: user.id,
        active: body.active,
      },
    });
    return okRes(res, { data });
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: any, res: any): Promise<object> {
    // get id
    const id = parseInt(req.params.id);

    // get user data
    const user = req.user;
    // if data already exists
    let data: any = await prisma.products.findUnique({
      where: {
        id,
      },
    });
    // --- Yes : errRes, --- No : continue
    if (data.length !== 0) return errRes(res, "Duplicate Product");

    // create new products
    data = await prisma.products.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
    return okRes(res, { data });
  }
}
