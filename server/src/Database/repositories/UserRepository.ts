import { Pool } from "mysql2/promise";
import { CreateUserInput, IUserRepository,} from "../../Domain/repositories/IUserRepository";
import { User } from "../../Domain/models/User";

export class UserRepository implements IUserRepository {
    public constructor(private db: Pool) { }

    public async create(user: CreateUserInput): Promise<User> {
        const [result]: any = await this.db.query(
            `
      INSERT INTO users
      (name, lastname, username, email, avatar_url, password_hash, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
            [
                user.name,
                user.lastname,
                user.username,
                user.email,
                user.avatar_url || null,
                user.password_hash,
                user.role || "user",
            ]
        );

        return new User(
            result.insertId,
            user.name,
            user.lastname,
            user.username,
            user.email,
            user.avatar_url || null,
            user.password_hash,
            user.role || "user"
        );
    }

    public async findById(id: number): Promise<User | null> {
        const [rows]: any = await this.db.query(
            `
      SELECT id, name, lastname, username, email, avatar_url, password_hash, role
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        return this.mapRowToUser(rows[0]);
    }

    public async findByEmail(email: string): Promise<User | null> {
        const [rows]: any = await this.db.query(
            `
      SELECT id, name, lastname, username, email, avatar_url, password_hash, role
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
            [email]
        );

        if (rows.length === 0) {
            return null;
        }

        return this.mapRowToUser(rows[0]);
    }

    public async existsByEmailOrUsername(
        email: string,
        username: string
    ): Promise<boolean> {
        const [rows]: any = await this.db.query(
            `
      SELECT id
      FROM users
      WHERE email = ? OR username = ?
      LIMIT 1
      `,
            [email, username]
        );

        return rows.length > 0;
    }

    private mapRowToUser(row: any): User {
        return new User(
            row.id,
            row.name,
            row.lastname,
            row.username,
            row.email,
            row.avatar_url,
            row.password_hash,
            row.role
        );
    }
}