import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();
// const port = 5000

app.use(express.json());
app.use(cors());

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
  //   Promise.reject();
};

// application routes
app.get("/", test);

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
