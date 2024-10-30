import {
  register,
  login,
  recordAuthActivity,
} from "@server/services/auth.service.js";
import { AppError } from "@server/utils/error.js";
import { generateJWTToken } from "@server/utils/security.js";
import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await register(email, password);

  return res.status(201).json({
    status: "success",
    data: user,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await login(email, password);

  const credentials = generateJWTToken({
    userId: user.id,
  });

  await recordAuthActivity(user.id, "LOGIN");

  res.cookie("token", credentials.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    status: "success",
    data: {
      user,
      credentials,
    },
  });
};

export const logoutController = async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new AppError("Invalid authentication token", 401);
  }

  recordAuthActivity(req.user?.userId, "LOGOUT");

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
