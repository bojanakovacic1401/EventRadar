import { NextFunction, Request, Response } from "express";
import { UserService } from "../../Services/UserService";
import { HttpError } from "../../middleware/errorMiddleware";

export class AuthController {
    public constructor(private userService: UserService) { }

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.userService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.userService.login(req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            if (!req.user) {
                throw new HttpError(401, "You must be logged in.");
            }

            const result = await this.userService.getMe(req.user.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}