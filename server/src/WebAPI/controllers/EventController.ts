import { Request, Response } from "express";
import { EventService } from "../../Services/EventService";
import { EventCategories } from "../../Domain/enums/EventCategories";

export class EventController {
    public constructor(private eventService: EventService) { }

    public getAllEvents = async (_req: Request, res: Response): Promise<void> => {
        try {
            const events = await this.eventService.findAllEvents();

            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Something went wrong while fetching events.",
            });
        }
    };

    public getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventId = Number(req.params.id);

            const event = await this.eventService.findEventById(eventId);

            res.status(200).json(event);
        } catch (error: any) {
            res.status(404).json({
                message: error.message || "Event not found.",
            });
        }
    };

    public getEventsByCategory = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const category = req.params.category as EventCategories;

            const events = await this.eventService.findEventByCategory(category);

            res.status(200).json(events);
        } catch (error: any) {
            res.status(400).json({
                message: error.message || "Invalid event category.",
            });
        }
    };

    public getEventsByLocation = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const location = req.params.location;

            const events = await this.eventService.findEventByLocation(location);

            res.status(200).json(events);
        } catch (error: any) {
            res.status(400).json({
                message: error.message || "Invalid event location.",
            });
        }
    };

    public createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const createdEvent = await this.eventService.makeEvent(req.body);

            res.status(201).json(createdEvent);
        } catch (error: any) {
            res.status(400).json({
                message: error.message || "Event could not be created.",
            });
        }
    };

    public deleteEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventId = Number(req.params.id);

            await this.eventService.removeEvent(eventId);

            res.status(204).send();
        } catch (error: any) {
            res.status(404).json({
                message: error.message || "Event could not be deleted.",
            });
        }
    };
}