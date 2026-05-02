import { EventCategories } from "../enums/EventCategories";
import { Event } from "../models/Event";

export type CreateEvent = {
	event_title: string;
	event_description?: string; //? upitnik jer ne moraju da imaju te neke stvari
	event_category: EventCategories;
	event_date: Date;
	event_location?: string;
	event_price?: number;
	event_image_url?: string | null;
	event_link?: string;
}

export interface IEventRepository {
	create(event: CreateEvent): Promise<Event>;
	findAll(): Promise<Event[]>;
	findById(eventId: number): Promise<Event | null>;
	findByCategory(eventCategory: EventCategories): Promise<Event[]>;
	findByLocation(eventLocation: string): Promise<Event[]>;
	delete(eventId: number): Promise<void>;
	exists(eventId: number): Promise<boolean>;
}