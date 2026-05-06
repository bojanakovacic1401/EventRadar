export type TicketmasterEventDto = {
    externalId: string;
    title: string;
    description: string | null;
    category: string | null;
    date: string | null;
    time: string | null;
    venue: string | null;
    city: string | null;
    country: string | null;
    imageUrl: string | null;
    ticketUrl: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    currency: string | null;
};

export type TicketmasterSearchResponse = {
    events: TicketmasterEventDto[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};

export type EventSearchFilters = {
    city: string;
    countryCode: string;
    keyword: string;
    category: string;
    startDate: string;
    endDate: string;
};

export type SavedEvent = {
    id: number;
    user_id: number;
    event_external_id: string;
    event_title: string;
    event_category: string | null;
    event_date: string | null;
    event_time: string | null;
    event_venue: string | null;
    event_city: string | null;
    event_country: string | null;
    event_image_url: string | null;
    event_link: string | null;
    event_price_min: number | null;
    event_price_max: number | null;
    event_currency: string | null;
};