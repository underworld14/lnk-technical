import express from "express";

import authRouter from "./auth.route.js";
import mailRouter from "./mail.route.js";

const router = express.Router();

// Example route
router.use("/auth", authRouter);
router.use("/mail", mailRouter);

export default router;
