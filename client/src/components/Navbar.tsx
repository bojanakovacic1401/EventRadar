import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <header className="navbar">
            <Link to="/" className="brand">
                <span className="brand-mark">E</span>
                <span>EventRadar</span>
            </Link>

            <nav className="nav-links">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                    Events
                </NavLink>

                {isAuthenticated && (
                    <NavLink
                        to="/saved"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Saved
                    </NavLink>
                )}
            </nav>

            <div className="nav-actions">
                {isAuthenticated ? (
                    <>
                        <span className="user-pill">{user?.username}</span>
                        <button className="btn btn-ghost" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="btn btn-ghost" to="/login">
                            Login
                        </Link>
                        <Link className="btn btn-primary" to="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}