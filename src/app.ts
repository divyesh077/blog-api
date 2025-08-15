import express from "express";
import v1Router from "./routes/v1";

//Init the application.
const app = express();

//API Routing for v1
app.use("/api/v1", v1Router);

export { app };
