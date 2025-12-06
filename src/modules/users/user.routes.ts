import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/",auth("admin"), userControllers.getUser);
router.put("/:userId", userControllers.updateUser);
router.delete("/:userId",auth("admin"), userControllers.deleteUser);

export const userRoutes = router;
