import { SavedEvents } from "../models/SavedEvents";

export type CreateSavedEvent = {
    user_id: number;
    event_external_id: string;
    event_title: string;
    event_category?: string | null;
    event_date?: string | null;
    event_time?: string | null;
    event_venue?: string | null;
    event_city?: string | null;
    event_country?: string | null;
    event_image_url?: string | null;
    event_link?: string | null;
    event_price_min?: number | null;
    event_price_max?: number | null;
    event_currency?: string | null;
};

export interface ISavedEventsRepository {
    create(event: CreateSavedEvent): Promise<SavedEvents>;
    findByUserId(userId: number): Promise<SavedEvents[]>;
    delete(userId: number, eventExternalId: string): Promise<void>;
    exists(userId: number, eventExternalId: string): Promise<boolean>;
}