import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/students/student.route";
const app: Application = express();
// const port = 5000

app.use(express.json());
app.use(cors());

// application routes

app.use("/api/v1/students", StudentRoutes);

app.get("/");

export default app;
