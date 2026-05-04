import { Request, Response } from "express";
import { SavedEventsService } from "../../Services/SavedEventsService";
import { CreateSavedEvent } from "../../Domain/repositories/ISavedEventsRepository";

export class SavedEventsController {
    public constructor(private savedEventsService: SavedEventsService) { }

    public saveEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const savedEvent = await this.savedEventsService.saveEvent(req.body);

            res.status(201).json(savedEvent);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getSavedEventsByUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = Number(req.params.userId);

            const savedEvents = await this.savedEventsService.getSavedEventsByUser(userId);

            res.json(savedEvents);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public removeSavedEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = Number(req.params.userId);
            const eventExternalId = Array.isArray(req.params.eventExternalId)
                ? req.params.eventExternalId[0]
                : req.params.eventExternalId;

            await this.savedEventsService.removeSavedEvents(userId, eventExternalId);

            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}