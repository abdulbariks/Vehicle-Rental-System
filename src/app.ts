import express from "express";
import initDB from "./confing/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/user.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";

const app = express();
app.use(express.json());

initDB();

app.get("/", (req, res) => {
  res.send("Hello Next Level Developers!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vehicles", vehiclesRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});
export default app;
