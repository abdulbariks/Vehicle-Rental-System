import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBookings(req.body);

    res.status(201).json({
      success: true,
      message: "Todo created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.getBookings();

    res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
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

const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.updateBooking(
      req.body,
      req.params.id!
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const bookingsControllers = {
  createBookings,
  getBookings,
  updateBooking,
};
