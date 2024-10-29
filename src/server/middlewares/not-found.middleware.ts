import { Request, Response, NextFunction } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: "Resource not found",
  });
};

export default notFoundHandler;
