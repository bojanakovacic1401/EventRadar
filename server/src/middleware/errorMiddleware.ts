import { NextFunction, Request, Response } from "express";

export class HttpError extends Error{
    public constructor(
        public statucCode: number,
        message: string
    ) {
        super(message);
    }
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
    next(new HttpError(404, "Route not found: ${req.method} ${req.originalUrl}"));
}

export function errorHandler(
    error: Error | HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    const statusCode = error instanceof HttpError ? error.statusCode : 500;

    res.status(statusCode).json({
        message: error.message || "Internal server error",
    });
}