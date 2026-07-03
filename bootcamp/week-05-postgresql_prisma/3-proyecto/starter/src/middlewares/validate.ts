// src/middlewares/validate.ts — Valida body/params/query contra un esquema Zod

import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export function validate(schema: AnyZodObject) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (parsed.body) req.body = parsed.body;
    if (parsed.params) req.params = parsed.params;
    if (parsed.query) req.query = parsed.query;

    next();
  };
}
