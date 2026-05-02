import { User } from "../models/User";

export type CreateUserInput = {
	userId: number;
	name: string;
	lastname: string;
	username: string;
	email: string;
	avatar_url?: string | null;
	password_hash: string;
};


export interface IUserRepository {
	create(user: CreateUserInput): Promise<User>;
	findById(userId: number): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByUsername(username: string): Promise<User | null>;
	delete(userId: number): Promise<void>;
	exists(userId: number): Promise<boolean>;
	existsByEmailOrUsername(email: string, username: string): Promise<boolean>;
}