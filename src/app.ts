import express, { Request, Response } from "express";
import initDB from "./confing/db";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
// parser
app.use(express.json());
// app.use(express.urlencoded());

// initializing DB
initDB();

// "/" -> localhost:5000/
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

//auth routes
app.use("/api/v1/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
