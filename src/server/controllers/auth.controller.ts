import {
  register,
  login,
  recordAuthActivity,
} from "@server/services/auth.service.js";
import { generateJWTToken } from "@server/utils/security.js";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const registerController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await register(email, password);

  return res.status(201).json({
    status: "success",
    data: user,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await login(email, password);

  const credentials = generateJWTToken({
    userId: user.id,
  });

  await recordAuthActivity(user.id, "LOGIN");

  return res.status(200).json({
    status: "success",
    data: {
      user,
      credentials,
    },
  });
};
