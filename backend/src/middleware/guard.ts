import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export const requireRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 3. Check the Role (Permission Check)
    if (session.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ error: `Forbidden: Requires ${requiredRole} role` });
    }

    next();
  };
};
