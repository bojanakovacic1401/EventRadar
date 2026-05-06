import { apiRequest } from "./apiClient";
import { SavedEvent, TicketmasterEventDto } from "../types/event";

export const savedEventsApi = {
    getMySavedEvents() {
        return apiRequest<SavedEvent[]>("/saved-events/me", {
            auth: true,
        });
    },

    saveEvent(event: TicketmasterEventDto) {
        return apiRequest<SavedEvent>("/saved-events", {
            method: "POST",
            auth: true,
            body: JSON.stringify(event),
        });
    },

    removeSavedEvent(eventExternalId: string) {
        return apiRequest<void>(
            `/saved-events/${encodeURIComponent(eventExternalId)}`,
            {
                method: "DELETE",
                auth: true,
            }
        );
    },
};