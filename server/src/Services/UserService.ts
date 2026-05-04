import { User } from "../Domain/models/User";
import { UserRepository } from "../Database/repositories/UserRepository";
import { CreateUserInput, IUserRepository } from "../Domain/repositories/IUserRepository";

export class UserService {
	public constructor(private UserRepository: IUserRepository) { }

	public async makeUser(user: CreateUserInput): Promise<User> {
		if (!user.email || !user.username || !user.name || !user.lastname) {
			throw new Error("Email, name, lastname and username are required!")
		}

		const alreadyExsists = await this.UserRepository.exists(user.id);
		if (alreadyExsists) {
			throw new Error("This user already exists.");
		}

		return this.UserRepository.create(user);
	}

	public async getUserById(id: number): Promise<User | null> {
		if (!id) {
			throw new Error("ID is required.");
		}
		const alreadyExsists = await this.UserRepository.exists(id);
		if (!alreadyExsists) {
			throw new Error("This user does not exists.");
		}

		return this.UserRepository.findById(id);
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

	public async removeUser(id: number): Promise<void> {
		if (!id) {
			throw new Error("ID is required!");
		}

		const alreadyExsists = await this.UserRepository.exists(id);
		if (!alreadyExsists) {
			throw new Error("This user is already deleted.");
		}

		return this.UserRepository.delete(id);
	}
}