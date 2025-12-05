import express, { Request, Response } from "express";

const app = express();
// parser
app.use(express.json());
// app.use(express.urlencoded());

// "/" -> localhost:5000/
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

//users CRUD

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
