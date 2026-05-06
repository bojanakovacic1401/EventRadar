import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SavedEventsPage from "./pages/SavedEventsPage";

export default function App() {
    return (
        <div className="app-shell">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/saved"
                        element={
                            <ProtectedRoute>
                                <SavedEventsPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    )
}