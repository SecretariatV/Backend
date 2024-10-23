import { logger } from "config";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  logger.error(
    `Error: ${error.message} - Route: ${req.originalUrl} - Method: ${req.method} - Status: ${statusCode}`
  );

  if (res.status && typeof res.status === "function") {
    res.status(statusCode).json({
      message: error.message || "Server Error",
      stack: process.env.Node_ENV === "production" ? null : error.stack,
    });
  } else {
    next(error);
  }
};
