import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"; // Import JwtPayload type
import { secretKey } from "..";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: "Don't have permission",
      });
    }
  } else {
    return res.status(403).json({
      message: "Don't have permission",
    });
  }
};
