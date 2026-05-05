import app from "./app";
import { env } from "./src/config/env";

app.listen(env.PORT, () => {
    console.log(`BeoLife server running on http://localhost:${env.PORT}`);
});