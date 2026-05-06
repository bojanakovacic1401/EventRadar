import { User } from "../models/User";

export type CreateUserInput = {
	name: string;
	lastname: string;
	username: string;
	email: string;
	avatar_url?: string | null;
	password_hash: string;
	role?: string;
};


export interface IUserRepository {
	create(user: CreateUserInput): Promise<User>;
	findById(id: number): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	existsByEmailOrUsername(email: string, username: string): Promise<boolean>;
}