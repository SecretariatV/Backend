import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cookies } = req;

  if (!cookies || !cookies.token) {
    logger.error("Authorization denied. No token provided.");
    return res.status(401).json({ message: "Authorization denied." });
  }

  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (error) {
    logger.error("Token validation failed: %o", error);
    return res.status(401).json({ message: "Token is not valid." });
  }
};
