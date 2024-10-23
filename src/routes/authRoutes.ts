import { logger } from "config";
import { login, register } from "controllers/authController";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { IUser } from "types";

const router = Router();

router.post("/register", register);

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    (error: any, user: IUser, info: any) => {
      if (error) return next(error);
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        logger.info(`User logged in successfully: ${user.email}`);

        return login(req, res);
      });
    }
  )(req, res, next);
});

export default router;
