import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";

dotenv.config();

import apiRoutes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

// 404 handler
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
