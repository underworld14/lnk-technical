import express from "express";
import { body } from "express-validator";
import * as authController from "@server/controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .notEmpty(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .notEmpty(),
  ],
  authController.registerController
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .notEmpty(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .notEmpty(),
  ],
  authController.loginController
);

export default router;
