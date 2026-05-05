import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { HttpError } from "./errorMiddleware";

type TokenPayload = {
    id: number;
    email: string;
    username: string;
    role: string;
};

export function authenticate(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new HttpError(401, "You must be logged in.");
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;

        req.user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            role: decoded.role,
        };

        next();
    } catch {
        throw new HttpError(401, "Invalid or expired token.");
    }
}