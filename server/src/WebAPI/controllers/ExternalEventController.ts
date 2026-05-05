import { Request, Response } from "express";
import { ExternalEventService } from "../../Services/ExternalEventService";

export class ExternalEventController {
    public constructor(private externalEventService: ExternalEventService) { }

    public getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const city = req.query.city as string;

            if (!city) {
                res.status(400).json({ message: "City is required" });
                return;
            }

            const events = await this.externalEventService.fetchEvents(city);

            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to fetch events" });
        }
    };
}