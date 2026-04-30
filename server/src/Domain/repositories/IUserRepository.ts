import { User } from "../models/User";

export type CreateUserInput = {
	name: string;
	lastname: string;
	username: string;
	email: string;
	avatar_url: string | null;
	password_hash: string;
};

/*userId: number ne mora u create jer je auto_increment znaci sam se stvara */

export interface IUserRepository {
	create(user: CreateUserInput): Promise<User>;
	findById(userId: number): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByUsername(username: string): Promise<User | null>;
	delete(userId: number): Promise<void>;
	exists(email: string, username: string): Promise<boolean>;
}