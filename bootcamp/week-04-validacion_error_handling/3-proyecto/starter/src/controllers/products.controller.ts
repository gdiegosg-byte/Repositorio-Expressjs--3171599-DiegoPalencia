import { Request, Response, NextFunction } from "express";
import { productsService } from "../services/products.service";
import {
  createItemSchema,
  updateItemSchema,
  idParamSchema,
} from "../schemas/product.schema";
import { ApiSuccessResponse } from "../types";

/**
 * GET /api/v1/items
 * Lista productos con paginación vía query params page y limit.
 */
async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(String(req.query.limit ?? "10"), 10) || 10, 1),
      100
    );

    const { data, meta } = productsService.listProducts(page, limit);

    const response: ApiSuccessResponse<typeof data> = {
      success: true,
      data,
      meta,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/v1/items/:id
 */
async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return res.status(400).json({
        success: false,
        message: "Parámetro id inválido",
        issues: parsedParams.error.issues,
      });
    }

    const product = productsService.getProductById(parsedParams.data.id);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/v1/items
 */
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedBody = createItemSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        issues: parsedBody.error.issues,
      });
    }

    const newProduct = productsService.createProduct(parsedBody.data);
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/v1/items/:id
 */
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return res.status(400).json({
        success: false,
        message: "Parámetro id inválido",
        issues: parsedParams.error.issues,
      });
    }

    const parsedBody = updateItemSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        issues: parsedBody.error.issues,
      });
    }

    const updated = productsService.updateProduct(
      parsedParams.data.id,
      parsedBody.data
    );
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/v1/items/:id
 */
async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return res.status(400).json({
        success: false,
        message: "Parámetro id inválido",
        issues: parsedParams.error.issues,
      });
    }

    productsService.deleteProduct(parsedParams.data.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export const productsController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
