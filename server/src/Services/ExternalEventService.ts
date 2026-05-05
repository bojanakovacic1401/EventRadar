import { mapTicketmasterEvent } from "../Services/mappers/ExternalEventMapper";
export class ExternalEventService {
    public async fetchEvents(city: string) {
        try {
            const response = await fetch(
                `https://app.ticketmaster.com/discovery/v2/events.json?city=Belgrade&apikey=${process.env.TICKETMASTER_API_KEY}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }

            const data = await response.json();

            return data._embedded?.events.map(mapTicketmasterEvent) || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}