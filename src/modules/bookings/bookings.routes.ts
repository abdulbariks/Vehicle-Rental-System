import { Router } from "express";
import { bookingsControllers } from "./bookings.controller";
import auth from "../../middleware/auth.middleware";

const router = Router();

router.post("/", bookingsControllers.createBookings);
router.get("/",auth("admin", "customer"), bookingsControllers.getBookings);
router.put("/:bookingId",auth("admin", "customer"), bookingsControllers.updateBooking);

export const bookingsRoutes = router;
