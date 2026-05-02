import { ISavedEventsRepository } from "../Domain/repositories/ISavedEventsRepository";
import { SavedEvents } from "../Domain/models/SavedEvents";

export class SavedEventsService {
    public constructor(private SavedEventsRepository: ISavedEventsRepository) { }

    public async saveEvent(userId: number, eventId: number): Promise<SavedEvents> {
        if (!userId || !eventId) {
            throw new Error("User ID and event ID are required!");
        }

        const alreadySaved = await this.SavedEventsRepository.exists(userId, eventId);
        if (alreadySaved) {
            throw new Error("Event is already saved!");
        }
        return this.SavedEventsRepository.create(userId, eventId);
    }

    public async getSavedEventsByUser(userId: number): Promise<SavedEvents[]> {
        if (!userId) {
            throw new Error("User ID is required!");
        }
        return this.SavedEventsRepository.findByUserId(userId);
    }

    public async removeSavedEvents(userId: number, eventId: number): Promise<void> {
        if (!userId || !eventId) {
            throw new Error("User ID and event ID are required!");
        }

        const alreadyDeleted = await this.SavedEventsRepository.exists(userId, eventId);

        if (!alreadyDeleted) {
            throw new Error("Event is already deleted!");
        }
        return this.SavedEventsRepository.delete(userId, eventId);
    }

}