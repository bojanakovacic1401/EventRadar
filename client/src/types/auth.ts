export type User = {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    avatar_url: string | null;
    role: string;
};

export type RegisterInput = {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
};

export type LoginInput = {
    email: string;
    password: string;
};

export type AuthResponse = {
    user: User;
    token: string;
};