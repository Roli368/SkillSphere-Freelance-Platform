import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillSphere Backend Running 🚀",
  });
});

// Routes
app.use("/api/v1", routes);

// Error Middleware (Always Last)
app.use(errorMiddleware);

export default app;