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
            [user.name, user.lastname, user.email, user.avatar_url, user.password_hash]
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

    /**findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    delete(userId: number): Promise<void>;
    exists(email: string, username: string): Promise<boolean>;
     */

    public async findById(userId: number): Promise<User | null> {
        const [rows]: any = await this.db.query(
            `SELECT id, name, lastname, username, email, avatar_url, password_hash FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (rows.length == 0) { //zbog Promise<User | null>
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

        if (rows.length == 0) { //zbog Promise<User | null>
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



}