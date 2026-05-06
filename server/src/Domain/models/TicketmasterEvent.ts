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
