import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("ana@test.com");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            setError("");
            setIsSubmitting(true);

            await login({
                email,
                password,
            });

            navigate("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to log in.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">Welcome back</p>
                <h1>Login</h1>
                <p className="auth-subtitle">
                    Log in to save events and manage your personal list.
                </p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </label>

                    <button className="btn btn-primary btn-wide" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="auth-switch">
                    Do not have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </section>
    );
}