import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
// const port = 5000

app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  // const a = 10

  res.send("Hello World!");
});

export default app;
