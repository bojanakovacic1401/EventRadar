import express from "express";
import cors from "cors";

import { env } from "./src/config/env";
import eventRoutes from "./src/WebAPI/routes/eventRoutes";
import authRoutes from "./src/WebAPI/routes/authRoutes";
import savedEventsRoutes from "./src/WebAPI/routes/savedEventsRoutes";
import { errorHandler, notFoundHandler } from "./src/middleware/errorMiddleware";

const app = express();

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        app: "BeoLife",
    });
});

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/saved-events", savedEventsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;