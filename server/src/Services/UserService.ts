import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { User, PublicUser } from "../Domain/models/User";
import { IUserRepository } from "../Domain/repositories/IUserRepository";
import { env } from "../config/env";
import { HttpError } from "../middleware/errorMiddleware";

export type RegisterInput = {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    avatar_url?: string | null;
};

export type LoginInput = {
    email: string;
    password: string;
};

export type AuthResponse = {
    user: PublicUser;
    token: string;
};

export class UserService {
    public constructor(private userRepository: IUserRepository) { }

    public async register(input: RegisterInput): Promise<AuthResponse> {
        const name = input.name?.trim();
        const lastname = input.lastname?.trim();
        const username = input.username?.trim();
        const email = input.email?.trim().toLowerCase();
        const password = input.password;

        if (!name || !lastname || !username || !email || !password) {
            throw new HttpError(400, "Name, lastname, username, email and password are required.");
        }

        if (username.length < 3) {
            throw new HttpError(400, "Username must have at least 3 characters.");
        }

        if (password.length < 6) {
            throw new HttpError(400, "Password must have at least 6 characters.");
        }

        const alreadyExists = await this.userRepository.existsByEmailOrUsername(
            email,
            username
        );

        if (alreadyExists) {
            throw new HttpError(409, "Email or username is already taken.");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.userRepository.create({
            name,
            lastname,
            username,
            email,
            avatar_url: input.avatar_url || null,
            password_hash: passwordHash,
            role: "user",
        });

        return {
            user: this.toPublicUser(user),
            token: this.signToken(user),
        };
    }

    public async login(input: LoginInput): Promise<AuthResponse> {
        const email = input.email?.trim().toLowerCase();
        const password = input.password;

        if (!email || !password) {
            throw new HttpError(400, "Email and password are required.");
        }

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new HttpError(401, "Invalid email or password.");
        }

        const passwordMatches = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatches) {
            throw new HttpError(401, "Invalid email or password.");
        }

        return {
            user: this.toPublicUser(user),
            token: this.signToken(user),
        };
    }

    public async getMe(userId: number): Promise<PublicUser> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new HttpError(404, "User not found.");
        }

        return this.toPublicUser(user);
    }

    private toPublicUser(user: User): PublicUser {
        return {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            avatar_url: user.avatar_url,
            role: user.role,
        };
    }

    private signToken(user: User): string {
        const options: SignOptions = {
            expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
        };

        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            env.JWT_SECRET,
            options
        );
    }
}