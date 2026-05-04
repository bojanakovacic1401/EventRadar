import { Pool } from "mysql2/promise";
import { SavedEvents } from "../../Domain/models/SavedEvents";
import { ISavedEventsRepository, CreateSavedEvent } from "../../Domain/repositories/ISavedEventsRepository";

export class SavedEventsRepository implements ISavedEventsRepository {
    public constructor(private db: Pool) { }

    public async create(event: CreateSavedEvent): Promise<SavedEvents> {
        const [result]: any = await this.db.query(
            `
      INSERT INTO saved_events
      (user_id, event_external_id, event_title, event_category, event_date, event_location, event_link)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
            [
                event.user_id,
                event.event_external_id,
                event.event_title,
                event.event_category,
                event.event_date,
                event.event_location,
                event.event_link,
            ]
        );

        return new SavedEvents(
            result.insertId,
            event.user_id,
            event.event_external_id,
            event.event_title,
            event.event_category,
            event.event_date,
            event.event_location,
            event.event_link
        );
    }

    public async findByUserId(userId: number): Promise<SavedEvents[]> {
        const [rows]: any = await this.db.query(
            `
            SELECT id, user_id, event_id
            FROM saved_events
            WHERE user_id = ?
            `,
            [userId]
        );
        return rows.map(
            (row: any) => new SavedEvents(row.id, row.user_id, row.event_id)
        );
    }

    public async delete(userId: number, eventExternalId: string): Promise<void> {
        await this.db.query(
            `
      DELETE FROM saved_events
      WHERE user_id = ? AND event_external_id = ?
      `,
            [userId, eventExternalId]
        );
    }

    public async exists(userId: number, eventExternalId: string): Promise<boolean> {
        const [rows]: any = await this.db.query(
            `
      SELECT id FROM saved_events
      WHERE user_id = ? AND event_external_id = ?
      LIMIT 1
      `,
            [userId, eventExternalId]
        );

        return rows.length > 0;
    }
}