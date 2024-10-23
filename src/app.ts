import { connectDB } from "config";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { errorHandler, limiterMiddleware, requestLogger } from "middlewares";
import authRoutes from "routes/authRoutes";

dotenv.config();

const corsOption = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
};

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(limiterMiddleware);
app.use(requestLogger);

app.use("/api/v1/auth", authRoutes);

app.get("/api", (_req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

app.use((_req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found`);
  res.status(404);
  next(error);
});

app.use(errorHandler);

export default app;
