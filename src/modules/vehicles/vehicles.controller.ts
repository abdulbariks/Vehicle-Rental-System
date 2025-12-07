import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicles(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getVehicles();

if (!result.rows || result.rows.length === 0) {
  return res.status(200).json({
    success: true,
    message: "No vehicles found",
    data: [],
  });
}

res.status(200).json({
  success: true,
  message: "Vehicles retrieved successfully",
  data: result.rows,
});
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getSingleVehicle(req.params.vehicleId!);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

  res.status(200).json({
  success: true,
  message: "Vehicle retrieved successfully",
  data:result.rows[0],
});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch Vehicle" });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.updateVehicle(
      req.body,
      req.params.vehicleId!
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

     res.status(200).json({
  success: true,
  message: "Vehicle updated successfully",
  data:result.rows[0],
});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update Vehicle" });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.deleteVehicle(req.params.vehicleId!);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json({ success: true, message: "Vehicle deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete Vehicle" });
  }
};

export const vehiclesControllers = {
  createVehicles,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
