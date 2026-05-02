import { User } from "../Domain/models/User";
import { UserRepository } from "../Database/repositories/UserRepository";
import { CreateUserInput, IUserRepository } from "../Domain/repositories/IUserRepository";

export class UserService {
	public constructor(private UserRepository: IUserRepository) { }

	public async makeUser(user: CreateUserInput): Promise<User> {
		if (!user.email || !user.username || !user.name || !user.lastname) {
			throw new Error("Email, name, lastname and username are required!")
		}

		const alreadyExsists = await this.UserRepository.exists(user.userId);
		if (alreadyExsists) {
			throw new Error("This user already exists.");
		}

		return this.UserRepository.create(user);
	}

	public async getUserById(userId: number): Promise<User | null> {
		if (!userId) {
			throw new Error("ID is required.");
		}
		const alreadyExsists = await this.UserRepository.exists(user.userId);
		if (!alreadyExsists) {
			throw new Error("This user does not exists.");
		}

		return this.UserRepository.findById(userId);
	}

	public async getUserByEmail(email: string): Promise<User | null> {
		if (!email) {
			throw new Error("Email is required.");
		}

		return this.UserRepository.findByEmail(email);
	}

	public async getUserByUsername(username: string): Promise<User | null> {
		if (!username) {
			throw new Error("Username is required.");
		}

		return this.UserRepository.findByUsername(username);
	}

	public async removeUser(userId: number): Promise<void> {
		if (!userId) {
			throw new Error("ID is required!");
		}

		const alreadyExsists = await this.UserRepository.exists(userId);
		if (!alreadyExsists) {
			throw new Error("This user is already deleted.");
		}

		return this.UserRepository.delete(userId);
	}
}