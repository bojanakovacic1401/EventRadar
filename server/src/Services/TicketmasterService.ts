import { TicketmasterEventDto, TicketmasterSearchResponse, } from "../Domain/models/TicketmasterEvent";
import { env } from "../config/env";
import { HttpError } from "../middleware/errorMiddleware";

export type TicketmasterSearchFilters = {
    city?: string;
    countryCode?: string;
    keyword?: string;
    category?: string;
    classificationName?: string;
    startDate?: string;
    endDate?: string;
    startDateTime?: string;
    endDateTime?: string;
    page?: number;
    size?: number;
    sort?: string;
}

export class TicketmasterService {
    public async searchEvents(filters: TicketmasterSearchFilters): Promise<TicketmasterSearchResponse> {
        const url = new URL(`${env.TICKETMASTER_BASE_URL}/events.json`);

        const page = Number.isFinite(filters.page) ? Number(filters.page) : 0;
        const size = Number.isFinite(filters.size) ? Number(filters.size) : 20;

        url.searchParams.set("apikey", env.TICKETMASTER_API_KEY);
        url.searchParams.set("city", filters.city || env.TICKETMASTER_DEFAULT_CITY);
        url.searchParams.set("countryCode", filters.countryCode || env.TICKETMASTER_DEFAULT_COUNTRY_CODE);
        url.searchParams.set("page", String(page));
        url.searchParams.set("size", String(Math.min(Math.max(size, 1), 50)));
        url.searchParams.set("sort", filters.sort || "date,asc");

        if (filters.keyword) {
            url.searchParams.set("keyword", filters.keyword);
        }

        const classificationName =
            filters.classificationName || this.mapCategoryToTicketmaster(filters.category);

        if (classificationName) {
            url.searchParams.set("classificationName", classificationName);
        }

        if (filters.startDateTime) {
            url.searchParams.set("startDateTime", filters.startDateTime);
        } else if (filters.startDate) {
            url.searchParams.set("startDateTime", `${filters.startDate}T00:00:00Z`);
        }

        if (filters.endDateTime) {
            url.searchParams.set("endDateTime", filters.endDateTime);
        } else if (filters.endDate) {
            url.searchParams.set("endDateTime", `${filters.endDate}T23:59:59Z`);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            const message = await response.text();

            throw new HttpError(502, `Ticketmaster API error: ${response.status} ${message}`
            );
        }

        const data: any = await response.json();

        const rawEvents = data?._embedded?.events || [];

        return {
            events: rawEvents.map((event: any) => this.normalizeEvent(event)),
            page: data?.page?.number ?? page,
            size: data?.page?.size ?? size,
            totalElements: data?.page?.totalElements ?? rawEvents.length,
            totalPages: data?.page?.totalPages ?? 1,
        };
    }

    private normalizeEvent(event: any): TicketmasterEventDto {
        const venue = event?._embedded?.venues?.[0] || null;
        const classification = event?.classifications?.[0] || null;
        const priceRange = event?.priceRanges?.[0] || null;
        const image = this.pickBestImage(event?.images || []);

        return {
            externalId: event?.id,
            title: event?.name || "Untitled event",
            description: event?.info || event?.pleaseNote || null,
            category: classification?.segment?.name || classification?.genre?.name || classification?.subGenre?.name || null,
            date: event?.dates?.start?.localDate || null,
            time: event?.dates?.start?.localTime || null,
            venue: venue?.name || null,
            city: venue?.city?.name || null,
            country: venue?.country?.name || null,
            imageUrl: image,
            ticketUrl: event?.url || null,
            minPrice: priceRange?.min ?? null,
            maxPrice: priceRange?.max ?? null,
            currency: priceRange?.currency || null,
        };
    }

    private pickBestImage(images: any[]): string | null {
        if (!Array.isArray(images) || images.length === 0) {
            return null;
        }

        const sorted = [...images].sort((a, b) => {
            const widthA = Number(a?.width || 0);
            const widthB = Number(b?.width || 0);

            return widthB - widthA;
        });

        return sorted[0]?.url || null;
    }

    private mapCategoryToTicketmaster(category?: string): string | null {
        if (!category) {
            return null;
        }

        const normalized = category.toLowerCase();

        const map: Record<string, string> = {
            music: "music",
            sport: "sports",
            sports: "sports",
            theatre: "theatre",
            theater: "theatre",
            film: "film",
            art: "arts",
            arts: "arts",
            family: "family",
            festival: "festival",
            workshop: "workshop",
            nightlife: "music",
            education: "miscellaneous",
            food: "miscellaneous",
            standup: "comedy",
            comedy: "comedy",
            other: "miscellaneous",
        };

        return map[normalized] || category;
    }
}