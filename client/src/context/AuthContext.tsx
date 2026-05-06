import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { authApi } from "../api/authApi";
import { LoginInput, RegisterInput, User } from "../types/auth";

type AuthContextValue = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    register: (input: RegisterInput) => Promise<void>;
    login: (input: LoginInput) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("EventRadar_token")
    );
    const [isLoading, setIsLoading] = useState(true);

    async function refreshUser() {
        const savedToken = localStorage.getItem("EventRadar_token");

        if (!savedToken) {
            setUser(null);
            setToken(null);
            setIsLoading(false);
            return;
        }

        try {
            const currentUser = await authApi.me();
            setUser(currentUser);
            setToken(savedToken);
        } catch {
            localStorage.removeItem("EventRadar_token");
            setUser(null);
            setToken(null);
        } finally {
            setIsLoading(false);
        }
    }

    async function register(input: RegisterInput) {
        const result = await authApi.register(input);

        localStorage.setItem("EventRadar_token", result.token);
        setToken(result.token);
        setUser(result.user);
    }

    async function login(input: LoginInput) {
        const result = await authApi.login(input);

        localStorage.setItem("EventRadar_token", result.token);
        setToken(result.token);
        setUser(result.user);
    }

    function logout() {
        localStorage.removeItem("EventRadar_token");
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        refreshUser();
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            token,
            isAuthenticated: Boolean(user && token),
            isLoading,
            register,
            login,
            logout,
            refreshUser,
        }),
        [user, token, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider.");
    }

    return context;
}