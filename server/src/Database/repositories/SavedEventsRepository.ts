import { Pool } from "mysql2/promise";
import { SavedEvents } from "../../Domain/models/SavedEvents";
import { ISavedEventsRepository } from "../../Domain/repositories/ISavedEventsRepository";

export class SavedEventsRepository implements ISavedEventsRepository {
    public constructor(private db: Pool) { }

    public async create(userId: number, eventId: number): Promise<SavedEvents> {
        const [result]: any = await this.db.query(
            `
            INSERT INTO saved_events (user_id, event_id)
            VALUES(?, ?)
            `,
            [userId, eventId]
        );

        return new SavedEvents(result.insertId, userId, eventId);
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

    public async delete(userId: number, eventId:number): Promise<void> {
        await this.db.query(
            `
            DELETE FROM saved_events
            WHERE user_id = ? AND event_id = ?
            `,
            [userId, eventId]
        );
    }

    public async exists(userId: number, eventId: number): Promise<boolean> {
        const [rows]: any = await this.db.query(
            `
            SELECT id
            FROM saved_events
            WHERE user_id = ? AND event_id = ?
            LIMIT 1
            `,
            [userId, eventId]
        );
        return rows.length > 0;
    }
}
