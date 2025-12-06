import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBookings(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created",
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
  const { userId, role } = req.user as { userId: number; role: string };

  const result = await bookingsServices.getBookings(userId, role);

  // Handle empty result
  if (!result || result.length === 0) {
    return res.status(200).json({
      success: true,
      message:
        role === "admin"
          ? "No bookings found."
          : "You don't have any bookings yet.",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message:
      role === "admin"
        ? "All bookings retrieved successfully."
        : "Your bookings retrieved successfully.",
    data: result,
  });
} catch (err: any) {
  return res.status(500).json({
    success: false,
    message: "Failed to retrieve bookings.",
    error: err.message,
  });
}}

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { userId, role } = req.user as { userId: number; role: string };
    const bookingId = req.params.bookingId!;
   
    const result = await bookingsServices.updateBooking(
      bookingId,
      role,
      userId,
      status
    );
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : status === "returned"
          ? "Booking marked as returned"
          : "Booking auto-returned by system",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update booking",
    });
  }
};



export const bookingsControllers = {
  createBookings,
  getBookings,
  updateBooking,
};
