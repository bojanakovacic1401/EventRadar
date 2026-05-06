import { useEffect, useState } from "react";
import { savedEventsApi } from "../api/savedEventsApi";
import EventCard from "../components/EventCard";
import { SavedEvent, TicketmasterEventDto } from "../types/event";

export default function SavedEventsPage() {
    const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function loadSavedEvents() {
        try {
            setIsLoading(true);
            setError("");

            const result = await savedEventsApi.getMySavedEvents();
            setSavedEvents(result);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to load saved events."
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemove(eventExternalId: string) {
        try {
            setError("");
            setMessage("");

            await savedEventsApi.removeSavedEvent(eventExternalId);
            setSavedEvents((current) =>
                current.filter((event) => event.event_external_id !== eventExternalId)
            );
            setMessage("Event removed.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to remove event.");
        }
    }

    useEffect(() => {
        loadSavedEvents();
    }, []);

    return (
        <section className="page">
            <div className="section-heading saved-heading">
                <div>
                    <p className="eyebrow">Personal list</p>
                    <h1>Saved events</h1>
                    <p>Events you saved from Ticketmaster search results.</p>
                </div>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-error">{error}</div>}

            {isLoading ? (
                <div className="grid-placeholder">
                    <div className="loader-card">Loading saved events...</div>
                </div>
            ) : savedEvents.length === 0 ? (
                <div className="empty-state">
                    <h3>No saved events yet</h3>
                    <p>Go to Events and save something you like.</p>
                </div>
            ) : (
                <div className="events-grid">
                    {savedEvents.map((savedEvent) => (
                        <EventCard
                            key={savedEvent.id}
                            mode="saved"
                            savedEvent={savedEvent}
                            event={mapSavedEventToTicketmasterEvent(savedEvent)}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function mapSavedEventToTicketmasterEvent(
    savedEvent: SavedEvent
): TicketmasterEventDto {
    return {
        externalId: savedEvent.event_external_id,
        title: savedEvent.event_title,
        description: null,
        category: savedEvent.event_category,
        date: savedEvent.event_date,
        time: savedEvent.event_time,
        venue: savedEvent.event_venue,
        city: savedEvent.event_city,
        country: savedEvent.event_country,
        imageUrl: savedEvent.event_image_url,
        ticketUrl: savedEvent.event_link,
        minPrice: savedEvent.event_price_min,
        maxPrice: savedEvent.event_price_max,
        currency: savedEvent.event_currency,
    };
}