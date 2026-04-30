import { Event } from "../models/Event";

export type CreateEvent = {
	event_title: string;
	event_description: string;
	event_category: string;
	event_date: Date;
	event_location: string,
	event_price: number,
	event_image_url: string | null;
	event_link: string;
}

export interface IEventRepository {
	create(event: CreateEvent): Promise<Event>;
	findById(eventId: number): Promise<Event>;
	findByCategory(eventCategory: string): Promise<Event[]>;
	findByLocation(eventLocation: string): Promise<Event[]>;
	delete(eventId: number): Promise<void>;
	exists(eventId: number): Promise<boolean>;
}