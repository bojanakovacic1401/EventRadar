import { Event } from "../Domain/models/Event";
import { CreateEvent, IEventRepository } from "../Domain/repositories/IEventRepository";
import { EventCategories } from "../Domain/enums/EventCategories";

export class EventService {
	public constructor(private EventRepository: IEventRepository) { }

	public async makeEvent(event: CreateEvent): Promise<Event> {
		if (!event.event_title || !event.event_category || !event.event_date) {
			throw new Error("Title, category and date are required to create an event.");
		}

		return this.EventRepository.create(event);
	}

	public async findEventById(eventId: number): Promise<Event | null> {
		if (!eventId) {
			throw new Error("Event ID is required!");
		}

		const EventExists = await this.EventRepository.exists(eventId);

		if (!EventExists) {
			throw new Error("Event does not exist!");
		}
		return this.EventRepository.findById(eventId);
	}

	public async findEventByCategory(eventCategory: EventCategories): Promise<Event[]> {
		if (!eventCategory) {
			throw new Error("Event category is required!");
		}

		return this.EventRepository.findByCategory(eventCategory);
	}

	public async findEventByLocation(eventLocation: string): Promise<Event[]> {
		if (!eventLocation) {
			throw new Error("Event location is required!");
		}

		return this.EventRepository.findByLocation(eventLocation);
	}

	public async removeEvent(eventId: number): Promise<void> {

		if (!eventId) {
			throw new Error("Event ID is required!");
		}

		const EventExists = await this.EventRepository.exists(eventId);

		if (!EventExists) {
			throw new Error("Event is already deleted!");
		}
		return this.EventRepository.delete(eventId);
	}
	
}