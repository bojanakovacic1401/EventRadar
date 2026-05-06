import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [name, setName] = useState("Name");
    const [lastname, setLastname] = useState("Lastname");
    const [username, setUsername] = useState(`username${Date.now().toString().slice(-4)}`);
    const [email, setEmail] = useState(`username${Date.now().toString().slice(-4)}@test.com`);
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            setError("");
            setIsSubmitting(true);

            await register({
                name,
                lastname,
                username,
                email,
                password,
            });

            navigate("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to register.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">Create account</p>
                <h1>Register</h1>
                <p className="auth-subtitle">
                    Create an account to save events and build your personal event list.
                </p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="two-col">
                        <label>
                            <span>Name</span>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </label>

                        <label>
                            <span>Lastname</span>
                            <input
                                value={lastname}
                                onChange={(event) => setLastname(event.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <label>
                        <span>Username</span>
                        <input
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </label>

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
                        {isSubmitting ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </section>
    );
}