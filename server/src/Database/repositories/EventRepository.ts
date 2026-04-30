import { Pool } from "mysql2/promise";
import { Event } from "../../Domain/models/Event";
import { CreateEvent, IEventRepository } from "../../Domain/repositories/IEventRepository";

export class EventRepository implements IEventRepository {
    public constructor(private db: Pool) { }

    public async create(event: CreateEvent): Promise<Event> {
        const [result]: any = await this.db.query(
            `
            INSERT INTO events (event_title, event_description, event_category, event_date, event_location, event_price, event_image_url, event_link)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [event.event_title, event.event_description, event.event_category, event.event_date, event.event_location, event.event_price, event.event_image_url, event.event_link]
        )
        return new Event(result.insertId,
            event.event_title,
            event.event_description,
            event.event_category,
            event.event_date,
            event.event_location,
            event.event_price,
            event.event_image_url,
            event.event_link);
    }

    public async findAll(): Promise<Event[]> {
        const [rows]: any = await this.db.query(
            `
            SELECT event_id, event_title, event_description, event_category, event_date, event_location, event_price, event_image_url, event_link
            FROM events
            `,
            []
        );
        return rows.map(
            (row: any) => new Event(row.event_id,
                row.event_title,
                row.event_description,
                row.event_category,
                row.event_date,
                row.event_location,
                row.event_price,
                row.event_image_url,
                row.event_link)
        );
    }

    public async findById(eventId: number): Promise<Event | null> {
        const [rows]: any = await this.db.query(
            `
            SELECT id
            FROM events
            WHERE id = ?
            `,
            [eventId]
        );
        return rows.map(
            (row: any) => new Event(row.id, row.eventId)
        );
    }

    public async findByCategory(eventCategory: string): Promise<Event[]> {
        const [rows]: any = await this.db.query(
            `
            SELECT event_category
            FROM events
            WHERE event_category = ?
            `,
            [eventCategory]
        );
        return rows.map(
            (row: any) => new Event(row.id, row.eventCategory)
        );
    }

    public async findByLocation(eventLocation: string): Promise<Event[]> {
        const [rows]: any = await this.db.query(
            `
            SELECT event_location
            FROM events
            WHERE event_location = ?
            `,
            [eventLocation]
        );
        return rows.map(
            (row: any) => new Event(row.id, row.eventLocation)
        );
    }

    public async delete(eventId: number): Promise<void> {
        await this.db.query(
            `
            DELETE FROM events
            WHERE id = ?
            `,
            [eventId]
        );
    }

    public async exists(eventId: number): Promise<boolean> {
        const [rows]: any = await this.db.query(
            `
            SELECT id
            FROM events
            WHERE id = ?
            LIMIT 1
            `,
            [eventId]
        );
        return rows.Length > 0;
    }
    
}
