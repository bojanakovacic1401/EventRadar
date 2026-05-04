import { ISavedEventsRepository, CreateSavedEvent } from "../Domain/repositories/ISavedEventsRepository";
import { SavedEvents } from "../Domain/models/SavedEvents";

export class SavedEventsService {
    public constructor(private savedEventsRepository: ISavedEventsRepository) { }

    public async saveEvent(event: CreateSavedEvent): Promise<SavedEvents> {
        if (!event.user_id || !event.event_external_id || !event.event_title) {
            throw new Error("Missing required fields.");
        }

        const alreadyExists = await this.savedEventsRepository.exists(
            event.user_id,
            event.event_external_id
        );

        if (alreadyExists) {
            throw new Error("Event already saved.");
        }

        return this.savedEventsRepository.create(event);
    }

    public async getSavedEventsByUser(userId: number): Promise<SavedEvents[]> {
        if (!userId) {
            throw new Error("User ID is required.");
        }

        return this.savedEventsRepository.findByUserId(userId);
    }

    public async removeSavedEvents(
        userId: number,
        eventExternalId: string
    ): Promise<void> {
        if (!userId || !eventExternalId) {
            throw new Error("User ID and event ID are required.");
        }

        const exists = await this.savedEventsRepository.exists(
            userId,
            eventExternalId
        );

        if (!exists) {
            throw new Error("Event not found.");
        }

        return this.savedEventsRepository.delete(userId, eventExternalId);
    }
}