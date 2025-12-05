import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";

const router = Router();

router.post("/", vehiclesControllers.createVehicles);

router.get("/", vehiclesControllers.getVehicles);

router.get("/:id", vehiclesControllers.getSingleVehicle);

router.put("/:id", vehiclesControllers.updateVehicle);

router.delete("/:id", vehiclesControllers.deleteVehicle);

export const vehiclesRoutes = router;
