import { Event } from "../Domain/models/Event";
import { CreateEvent, IEventRepository } from "../Domain/repositories/IEventRepository";
import { EventRepository } from "../Database/repositories/EventRepository";
/**
 * 
export interface IEventRepository {
	create(event: CreateEvent): Promise<Event>;
	findAll(): Promise<Event[]>;
	findById(eventId: number): Promise<Event | null>;
	findByCategory(eventCategory: string): Promise<Event[]>;
	findByLocation(eventLocation: string): Promise<Event[]>;
	delete(eventId: number): Promise<void>;
	exists(eventId: number): Promise<boolean>;
}*/

export class EventService {
    public constructor(private EventRepository: IEventRepository) { }

	public async makeEvent(event: CreateEvent): Promise<Event> {
		if (!event) {
			throw new Error("Title, category and date are required to create an event.");
		}

		return this.EventRepository.create(event);
	}

	
    
}