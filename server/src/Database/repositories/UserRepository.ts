import { Pool } from "mysql2/promise";
import { User } from "../../Domain/models/User";
import { CreateUserInput, IUserRepository } from "../../Domain/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
    public constructor(private db: Pool) { }

    public async create(user: CreateUserInput): Promise<User> {
        const [result]: any = await this.db.query(
            `
            INSERT INTO users (name, lastname, username, email, avatar_url, password_hash)
            VALUES( ?, ?, ?, ?, ?, ?)
            `,
            [user.name, user.lastname, user.username, user.email, user.avatar_url, user.password_hash]
        );
        return new User(
            result.insertId,
            user.name,
            user.lastname,
            user.username,
            user.email,
            user.avatar_url ?? null,
            user.password_hash
        );
    }

    public async findById(userId: number): Promise<User | null> {
        const [rows]: any = await this.db.query(
            `SELECT id, name, lastname, username, email, avatar_url, password_hash FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (rows.length == 0) {
            return null;
        }

        const row = rows[0];
        return new User(
            row.id,
            row.name,
            row.lastname,
            row.username,
            row.email,
            row.avatar_url,
            row.password_hash
        );
    }

    public async findByUsername(username: string): Promise<User | null> {
        const [rows]: any = await this.db.query(
            `
            SELECT id, name, lastname, username, email, avatar_url, password_hash FROM users
            WHERE username = ?
            `,
            [username]
        );

        if (rows.length == 0) {
            return null;
        }

        const row = rows[0];
        return new User(
            row.id,
            row.name,
            row.lastname,
            row.username,
            row.email,
            row.avatar_url,
            row.password_hash
        );
    }

    public async findByEmail(email: string): Promise<User | null> {
        const [rows]: any = await this.db.query(
            `
            SELECT id, name, lastname, username, email, avatar_url, password_hash FROM users
            WHERE email = ?
            `,
            [email]
        );

        if (rows.length == 0) {
            return null;
        }

        const row = rows[0];
        return new User(
            row.id,
            row.name,
            row.lastname,
            row.username,
            row.email,
            row.avatar_url,
            row.password_hash
        );
    }


    public async delete(userId: number): Promise<void> {
        await this.db.query(
            `
            DELETE FROM users
            WHERE userId = ?
            `,
            [userId]
        );
    }

    public async exists(userId: number, email: string, username: string) {
        const [rows]: any = await this.db.query(
            `
            SELECT userId, email, username
            FROM users
            WHERE userId = ? AND email = ? AND username = ?
            LIMIT 1
            `,
            [userId, email, username]
        );
        return rows.length > 0;
    }
}