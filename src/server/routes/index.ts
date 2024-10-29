import express from "express";

import authRouter from "./auth.route.js";

const router = express.Router();

// Example route
router.use("/auth", authRouter);

export default router;
