import { apiRequest } from "./apiClient";
import {
    EventSearchFilters,
    TicketmasterSearchResponse,
} from "../types/event";

type SearchEventsParams = EventSearchFilters & {
    page: number;
    size: number;
    sort?: string;
};

export const eventsApi = {
    searchEvents(params: SearchEventsParams) {
        const query = new URLSearchParams();

        query.set("city", params.city);
        query.set("countryCode", params.countryCode);
        query.set("page", String(params.page));
        query.set("size", String(params.size));
        query.set("sort", params.sort || "date,asc");

        if (params.keyword.trim()) {
            query.set("keyword", params.keyword.trim());
        }

        if (params.category.trim()) {
            query.set("category", params.category.trim());
        }

        if (params.startDate) {
            query.set("startDate", params.startDate);
        }

        if (params.endDate) {
            query.set("endDate", params.endDate);
        }

        return apiRequest<TicketmasterSearchResponse>(
            `/events/search?${query.toString()}`
        );
    },
};