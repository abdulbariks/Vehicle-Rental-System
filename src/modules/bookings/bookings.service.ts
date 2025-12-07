import { pool } from "../../confing/db";

// Record<string, unkown> = {key: value}
const createBookings = async (payload: Record<string, unknown>) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    status = "active",
  } = payload;

  // Validate rental dates
  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format. Use YYYY-MM-DD.");
  }

  if (end <= start) {
    throw new Error("Rent End Date must be greater than Rent Start Date.");
  }

  // Check if vehicle exists & is available
  const vehicleResult = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rowCount === 0) {
    throw new Error("Vehicle not found.");
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available for booking.");
  }

  // Calculate total price
  const diffInMs = end.getTime() - start.getTime();
  const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  const total_price = Number(vehicle.daily_rent_price) * days;

  // Create booking
  const bookingInsert = await pool.query(
    `INSERT INTO bookings 
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  const booking = bookingInsert.rows[0];

  // Update vehicle status
  await pool.query(
    `UPDATE vehicles 
     SET availability_status = 'booked' 
     WHERE id = $1`,
    [vehicle_id]
  );

  // Return booking vehicle info
  return {
    ...booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
   
    },
  };
};



const getBookings = async (userId: number, role: string) => {
  // Validate userId
  if (!userId || isNaN(userId)) {
    throw new Error("Invalid or missing userId.");
  }

  let bookingsQuery;
  let bookings;

  if (role === "admin") {
    // Admin all bookings
    bookingsQuery = await pool.query(`SELECT * FROM bookings ORDER BY id DESC`);
    bookings = bookingsQuery.rows;
  } else {
    // Customer only own bookings
    bookingsQuery = await pool.query(
      `SELECT * FROM bookings WHERE customer_id = $1 ORDER BY id DESC`,
      [userId]
    );
    bookings = bookingsQuery.rows;
  }

  if (bookings.length === 0) return [];

  // Add vehicle info
  const formattedBookings = [];
  for (const booking of bookings) {
    // Fetch vehicle
    const vehicleResult = await pool.query(
      `SELECT vehicle_name, registration_number FROM vehicles WHERE id = $1`,
      [booking.vehicle_id]
    );
    const vehicle = vehicleResult.rows[0];

    const bookingData: Record<string, any> = {
      ...booking,
      vehicle,
    };

    // Include customer info only for admin
    if (role === "admin") {
      const customerResult = await pool.query(
        `SELECT name, email FROM users WHERE id = $1`,
        [booking.customer_id]
      );
      bookingData.customer = customerResult.rows[0];
    }

    formattedBookings.push(bookingData);
  }

  return formattedBookings;
};



const updateBooking = async (
  id: string,
  role: string,
  userId: number,
  status: string
) => {
  // 1. Fetch booking
  const bookingQuery = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
  const booking = bookingQuery.rows[0];

  if (!booking) {
    throw new Error("Booking not found");
  }

  const now = new Date();
  const startDate = new Date(booking.rent_start_date);

  // 2. Customer rules
  if (role === "customer") {
    if (booking.customer_id !== userId) {
      throw new Error("You are not allowed to modify this booking");
    }

    if (status === "cancelled") {
      // Customer can cancel only before start date
      if (startDate <= now) {
        throw new Error("You can only cancel a booking before the start date");
      }

      const cancelResult = await pool.query(
        `UPDATE bookings 
         SET status = 'cancelled' 
         WHERE id = $1 
         RETURNING *`,
        [id]
      );

      return cancelResult.rows[0];
    } else {
      throw new Error("Invalid action for customer");
    }
  }

  // 3. Admin rules
if (role === "admin") {
  if (status === "returned") {
    // Mark booking as returned
    const returnedResult = await pool.query(
      `UPDATE bookings 
       SET status = 'returned' 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    if (returnedResult.rowCount === 0) {
      throw new Error("Booking not found");
    }

    const booking = returnedResult.rows[0];

    // Update vehicle status
    const vehicleResult = await pool.query(
      `UPDATE vehicles 
       SET availability_status = 'available' 
       WHERE id = $1 
       RETURNING availability_status`,
      [booking.vehicle_id]
    );

    // Return booking  vehicle availability_status
    return {
      ...booking,
       vehicle: vehicleResult.rows[0],
    };
  } else {
    throw new Error("Invalid action for admin");
  }
}


  // 4. System Auto-return
  if (status === "auto-return") {
    const returnedResult = await pool.query(
      `UPDATE bookings 
       SET status = 'returned' 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    await pool.query(
      `UPDATE vehicles 
       SET availability_status = 'available' 
       WHERE id = $1`,
      [booking.vehicle_id]
    );

    return returnedResult.rows[0];
  }

  throw new Error("Invalid booking update action or permissions");
};



export const bookingsServices = {
  createBookings,
  getBookings,
  updateBooking,
};
