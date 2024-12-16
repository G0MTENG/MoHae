import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      await validation.run(req);
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array().map((error) => error.msg) });
      return;
    }
    
    next();
  };
};