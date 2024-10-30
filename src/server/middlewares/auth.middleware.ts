import { AppError } from "@server/utils/error.js";
import { decodeJWTToken } from "@server/utils/security.js";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Authentication token is missing", 401);
  }

  try {
    const decoded = decodeJWTToken(token);

    if (!decoded || !decoded.userId) {
      throw new AppError("Invalid authentication token", 401);
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    throw new AppError("Invalid authentication token", 401);
  }
};

export default authMiddleware;
