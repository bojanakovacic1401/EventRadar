import { Pool } from "mysql2/promise";
import { SavedEvents } from "../../Domain/models/SavedEvents";
import {
    CreateSavedEvent,
    ISavedEventsRepository,
} from "../../Domain/repositories/ISavedEventsRepository";

export class SavedEventsRepository implements ISavedEventsRepository {
    public constructor(private db: Pool) { }

    public async create(event: CreateSavedEvent): Promise<SavedEvents> {
        const [result]: any = await this.db.query(
            `
      INSERT INTO saved_events
      (
        user_id,
        event_external_id,
        event_title,
        event_category,
        event_date,
        event_time,
        event_venue,
        event_city,
        event_country,
        event_image_url,
        event_link,
        event_price_min,
        event_price_max,
        event_currency
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [
                event.user_id,
                event.event_external_id,
                event.event_title,
                event.event_category || null,
                event.event_date || null,
                event.event_time || null,
                event.event_venue || null,
                event.event_city || null,
                event.event_country || null,
                event.event_image_url || null,
                event.event_link || null,
                event.event_price_min ?? null,
                event.event_price_max ?? null,
                event.event_currency || null,
            ]
        );

        return new SavedEvents(
            result.insertId,
            event.user_id,
            event.event_external_id,
            event.event_title,
            event.event_category || null,
            event.event_date || null,
            event.event_time || null,
            event.event_venue || null,
            event.event_city || null,
            event.event_country || null,
            event.event_image_url || null,
            event.event_link || null,
            event.event_price_min ?? null,
            event.event_price_max ?? null,
            event.event_currency || null
        );
    }

    public async findByUserId(userId: number): Promise<SavedEvents[]> {
        const [rows]: any = await this.db.query(
            `
      SELECT
        id,
        user_id,
        event_external_id,
        event_title,
        event_category,
        event_date,
        event_time,
        event_venue,
        event_city,
        event_country,
        event_image_url,
        event_link,
        event_price_min,
        event_price_max,
        event_currency
      FROM saved_events
      WHERE user_id = ?
      ORDER BY
        event_date IS NULL,
        event_date ASC,
        created_at DESC
      `,
            [userId]
        );

        return rows.map((row: any) => this.mapRowToSavedEvent(row));
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
      SELECT id
      FROM saved_events
      WHERE user_id = ? AND event_external_id = ?
      LIMIT 1
      `,
            [userId, eventExternalId]
        );

        return rows.length > 0;
    }

    private mapRowToSavedEvent(row: any): SavedEvents {
        return new SavedEvents(
            row.id,
            row.user_id,
            row.event_external_id,
            row.event_title,
            row.event_category,
            row.event_date,
            row.event_time,
            row.event_venue,
            row.event_city,
            row.event_country,
            row.event_image_url,
            row.event_link,
            row.event_price_min === null ? null : Number(row.event_price_min),
            row.event_price_max === null ? null : Number(row.event_price_max),
            row.event_currency
        );
    }
}