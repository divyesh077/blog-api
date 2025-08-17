import { Request, Response, NextFunction } from "express";
import { ZodSchema, TypeOf } from "zod";

export const validate =
  <
    P extends ZodSchema<any> | undefined,
    Q extends ZodSchema<any> | undefined,
    B extends ZodSchema<any> | undefined
  >(schemas: {
    params?: P;
    query?: Q;
    body?: B;
  }) =>
  (
    req: Request<
      P extends ZodSchema ? TypeOf<P> : any,
      any,
      B extends ZodSchema ? TypeOf<B> : any,
      Q extends ZodSchema ? TypeOf<Q> : any
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (schemas.params) req.params = schemas.params.parse(req.params);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.body) req.body = schemas.body.parse(req.body);
      return next();
    } catch (error) {
      return next(error);
    }
  };
