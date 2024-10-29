import { Request, Response, NextFunction } from "express";
import { AppError } from "@server/utils/error.js";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    status: "error",
    statusCode: status,
    message: message,
  });
};

export default errorHandler;
