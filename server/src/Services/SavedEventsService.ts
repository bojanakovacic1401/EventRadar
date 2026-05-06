import {
    CreateSavedEvent,
    ISavedEventsRepository,
} from "../Domain/repositories/ISavedEventsRepository";
import { SavedEvents } from "../Domain/models/SavedEvents";
import { HttpError } from "../middleware/errorMiddleware";

export type SaveTicketmasterEventInput = {
    externalId: string;
    title: string;
    category?: string | null;
    date?: string | null;
    time?: string | null;
    venue?: string | null;
    city?: string | null;
    country?: string | null;
    imageUrl?: string | null;
    ticketUrl?: string | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    currency?: string | null;
};

export class SavedEventsService {
    public constructor(private savedEventsRepository: ISavedEventsRepository) { }

    public async saveEvent(
        userId: number,
        input: SaveTicketmasterEventInput
    ): Promise<SavedEvents> {
        if (!userId) {
            throw new HttpError(401, "You must be logged in.");
        }

        if (!input.externalId || !input.title) {
            throw new HttpError(400, "Event externalId and title are required.");
        }

        const alreadySaved = await this.savedEventsRepository.exists(
            userId,
            input.externalId
        );

        if (alreadySaved) {
            throw new HttpError(409, "Event is already saved.");
        }

        const eventToSave: CreateSavedEvent = {
            user_id: userId,
            event_external_id: input.externalId,
            event_title: input.title,
            event_category: input.category || null,
            event_date: input.date || null,
            event_time: input.time || null,
            event_venue: input.venue || null,
            event_city: input.city || null,
            event_country: input.country || null,
            event_image_url: input.imageUrl || null,
            event_link: input.ticketUrl || null,
            event_price_min: input.minPrice ?? null,
            event_price_max: input.maxPrice ?? null,
            event_currency: input.currency || null,
        };

        return this.savedEventsRepository.create(eventToSave);
    }

    public async getSavedEventsByUser(userId: number): Promise<SavedEvents[]> {
        if (!userId) {
            throw new HttpError(401, "You must be logged in.");
        }

        return this.savedEventsRepository.findByUserId(userId);
    }

    public async removeSavedEvent(
        userId: number,
        eventExternalId: string
    ): Promise<void> {
        if (!userId) {
            throw new HttpError(401, "You must be logged in.");
        }

        if (!eventExternalId) {
            throw new HttpError(400, "Event external ID is required.");
        }

        await this.savedEventsRepository.delete(userId, eventExternalId);
    }
}