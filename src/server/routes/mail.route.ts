import express from "express";
import { body } from "express-validator";
import * as mailController from "@server/controllers/mail.controller.js";
import authMiddleware from "@server/middlewares/auth.middleware.js";
import throwValidationMiddleware from "@server/middlewares/validation.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, mailController.getMailingsController);

router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .notEmpty(),
    body("date").isISO8601().notEmpty(),
    body("description").notEmpty(),
  ],
  throwValidationMiddleware,
  authMiddleware,
  mailController.createMailingController
);

router.get("/:id", authMiddleware, mailController.getMailingController);

router.patch(
  "/:id",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("date").isISO8601(),
    body("description"),
  ],
  throwValidationMiddleware,
  authMiddleware,
  mailController.updateMailingController
);

router.delete("/:id", authMiddleware, mailController.deleteMailingController);

router.post("/:id/send", authMiddleware, mailController.sendMailController);

export default router;
