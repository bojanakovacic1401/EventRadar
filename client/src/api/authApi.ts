import { apiRequest } from "./apiClient";
import { AuthResponse, LoginInput, RegisterInput, User } from "../types/auth";

export const authApi = {
    register(input: RegisterInput) {
        return apiRequest<AuthResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(input),
        });
    },

    login(input: LoginInput) {
        return apiRequest<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(input),
        });
    },

    me() {
        return apiRequest<User>("/auth/me", {
            auth: true,
        });
    },
};