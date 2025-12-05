import { Router } from "express";
import { bookingsControllers } from "./bookings.controller";

const router = Router();

router.post("/", bookingsControllers.createBookings);
router.get("/", bookingsControllers.getBookings);
router.put("/:bookingId", bookingsControllers.updateBooking);

export const bookingsRoutes = router;
