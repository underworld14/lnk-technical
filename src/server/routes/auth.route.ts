import express from "express";
import { body } from "express-validator";
import * as authController from "@server/controllers/auth.controller.js";
import authMiddleware from "@server/middlewares/auth.middleware.js";
import throwValidationMiddleware from "@server/middlewares/validation.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, authController.getCurrentProfileController);

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter a valid email address").notEmpty(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .notEmpty(),
  ],
  throwValidationMiddleware,
  authController.registerController
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email address").notEmpty(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .notEmpty(),
  ],
  throwValidationMiddleware,
  authController.loginController
);

router.post("/logout", authMiddleware, authController.logoutController);

export default router;
