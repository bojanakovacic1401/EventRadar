import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventsApi } from "../api/eventsApi";
import { savedEventsApi } from "../api/savedEventsApi";
import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";
import { useAuth } from "../context/AuthContext";
import {
    EventSearchFilters,
    SavedEvent,
    TicketmasterEventDto,
} from "../types/event";

const initialFilters: EventSearchFilters = {
    city: "London",
    countryCode: "GB",
    keyword: "",
    category: "music",
    startDate: "",
    endDate: "",
};

export default function HomePage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [filters, setFilters] = useState<EventSearchFilters>(initialFilters);
    const [events, setEvents] = useState<TicketmasterEventDto[]>([]);
    const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function loadEvents(nextFilters = filters, nextPage = page) {
        try {
            setIsLoading(true);
            setError("");
            setMessage("");

            const result = await eventsApi.searchEvents({
                ...nextFilters,
                page: nextPage,
                size: 12,
                sort: "date,asc",
            });

            setEvents(result.events);
            setPage(result.page);
            setTotalPages(Math.max(result.totalPages, 1));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to load events.");
        } finally {
            setIsLoading(false);
        }
    }

    async function loadSavedEvents() {
        if (!isAuthenticated) {
            setSavedEvents([]);
            return;
        }

        try {
            const result = await savedEventsApi.getMySavedEvents();
            setSavedEvents(result);
        } catch {
            setSavedEvents([]);
        }
    }

    function handleSearch(nextFilters: EventSearchFilters) {
        setFilters(nextFilters);
        setPage(0);
        loadEvents(nextFilters, 0);
    }

    async function handleSave(event: TicketmasterEventDto) {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            setError("");
            setMessage("");

            await savedEventsApi.saveEvent(event);
            setMessage("Event saved successfully.");
            await loadSavedEvents();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to save event.");
        }
    }

    function goToPreviousPage() {
        const nextPage = Math.max(page - 1, 0);
        setPage(nextPage);
        loadEvents(filters, nextPage);
    }

    function goToNextPage() {
        const nextPage = page + 1;
        setPage(nextPage);
        loadEvents(filters, nextPage);
    }

    useEffect(() => {
        loadEvents(initialFilters, 0);
    }, []);

    useEffect(() => {
        loadSavedEvents();
    }, [isAuthenticated]);

    const savedIds = new Set(savedEvents.map((event) => event.event_external_id));

    return (
        <section className="page">
            <div className="hero">
                <div>
                    <p className="eyebrow">Discover events</p>
                    <h1>Find what is happening in your city.</h1>
                    <p>
                        Explore concerts, festivals, sports, theatre and more using real
                        Ticketmaster event data.
                    </p>
                </div>
            </div>

            <EventFilters
                filters={filters}
                onSearch={handleSearch}
                isLoading={isLoading}
            />

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-error">{error}</div>}

            <div className="section-heading">
                <div>
                    <h2>Events</h2>
                    <p>
                        Showing results for {filters.city}, {filters.countryCode}
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="grid-placeholder">
                    <div className="loader-card">Loading events...</div>
                </div>
            ) : events.length === 0 ? (
                <div className="empty-state">
                    <h3>No events found</h3>
                    <p>Try changing the city, category or date range.</p>
                </div>
            ) : (
                <>
                    <div className="events-grid">
                        {events.map((event) => (
                            <div key={event.externalId} className="event-card-wrap">
                                <EventCard event={event} onSave={handleSave} />
                                {savedIds.has(event.externalId) && (
                                    <span className="saved-label">Saved</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button
                            className="btn btn-ghost"
                            onClick={goToPreviousPage}
                            disabled={page === 0 || isLoading}
                        >
                            Previous
                        </button>

                        <span>
                            Page {page + 1} of {totalPages}
                        </span>

                        <button
                            className="btn btn-ghost"
                            onClick={goToNextPage}
                            disabled={page + 1 >= totalPages || isLoading}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}