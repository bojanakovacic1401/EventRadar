import { NextFunction, Request, Response } from "express";
import { SavedEventsService } from "../../Services/SavedEventsService";
import { HttpError } from "../../middleware/errorMiddleware";

export class SavedEventsController {
    public constructor(private savedEventsService: SavedEventsService) { }

    public saveEvent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (!req.user) {
                throw new HttpError(401, "You must be logged in.");
            }

            const savedEvent = await this.savedEventsService.saveEvent(
                req.user.id,
                req.body
            );

            res.status(201).json(savedEvent);
        } catch (error) {
            next(error);
        }
    };

    public getMySavedEvents = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (!req.user) {
                throw new HttpError(401, "You must be logged in.");
            }

            const savedEvents = await this.savedEventsService.getSavedEventsByUser(
                req.user.id
            );

            res.status(200).json(savedEvents);
        } catch (error) {
            next(error);
        }
    };

    public removeSavedEvent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (!req.user) {
                throw new HttpError(401, "You must be logged in.");
            }

            const eventExternalId = req.params.eventExternalId;

            if (!eventExternalId || Array.isArray(eventExternalId)) {
                throw new HttpError(400, "Invalid event external ID.");
            }

            await this.savedEventsService.removeSavedEvent(
                req.user.id,
                eventExternalId
            );

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}