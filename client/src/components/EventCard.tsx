import { SavedEvent, TicketmasterEventDto } from "../types/event";

type EventCardProps = {
    event: TicketmasterEventDto;
    savedEvent?: SavedEvent;
    onSave?: (event: TicketmasterEventDto) => void;
    onRemove?: (eventExternalId: string) => void;
    mode?: "search" | "saved";
};

export default function EventCard({
    event,
    savedEvent,
    onSave,
    onRemove,
    mode = "search",
}: EventCardProps) {
    const price = formatPrice(event.minPrice, event.maxPrice, event.currency);
    const dateTime = formatDateTime(event.date, event.time);

    return (
        <article className="event-card">
            <div className="event-image-wrap">
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="event-image" />
                ) : (
                    <div className="event-image-placeholder">EventRadar</div>
                )}

                {event.category && <span className="event-badge">{event.category}</span>}
            </div>

            <div className="event-content">
                <div>
                    <p className="event-date">{dateTime}</p>
                    <h3>{event.title}</h3>

                    <p className="event-location">
                        {[event.venue, event.city, event.country].filter(Boolean).join(", ") ||
                            "Location not available"}
                    </p>

                    {event.description && (
                        <p className="event-description">{event.description}</p>
                    )}
                </div>

                <div className="event-footer">
                    <span className="event-price">{price}</span>

                    <div className="event-actions">
                        {event.ticketUrl && (
                            <a
                                className="btn btn-ghost"
                                href={event.ticketUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Tickets
                            </a>
                        )}

                        {mode === "search" && onSave && (
                            <button className="btn btn-primary" onClick={() => onSave(event)}>
                                Save
                            </button>
                        )}

                        {mode === "saved" && onRemove && (
                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    onRemove(savedEvent?.event_external_id || event.externalId)
                                }
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

function formatDateTime(date: string | null, time: string | null) {
    if (!date && !time) {
        return "Date not available";
    }

    if (!date) {
        return time || "Date not available";
    }

    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return time ? `${formattedDate} · ${time.slice(0, 5)}` : formattedDate;
}

function formatPrice(
    minPrice: number | null,
    maxPrice: number | null,
    currency: string | null
) {
    if (minPrice === null && maxPrice === null) {
        return "Price not available";
    }

    if (minPrice !== null && maxPrice !== null && minPrice !== maxPrice) {
        return `${minPrice} - ${maxPrice} ${currency || ""}`.trim();
    }

    return `${minPrice ?? maxPrice} ${currency || ""}`.trim();
}