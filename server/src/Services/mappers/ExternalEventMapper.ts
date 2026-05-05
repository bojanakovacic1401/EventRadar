export function mapTicketmasterEvent(event: any) {
    return {
        event_external_id: event.id,
        event_title: event.name,
        event_category: event.classifications?.[0]?.segment?.name || "Other",
        event_date: new Date(event.dates?.start?.dateTime),
        event_location:
        event._embedded?.venues?.[0]?.name || "Unknown",
        event_link: event.url
    };
}