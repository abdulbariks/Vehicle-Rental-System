import { pool } from "../../confing/db";

// Record<string, unkown> = {key: value}
const createBookings = async (payload: Record<string, unknown>) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );

  return result;
};

const getBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};

const updateBooking = async (payload: Record<string, unknown>, id: string) => {
  const { title, completed } = payload;
  const result = await pool.query(
    "UPDATE bookings SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title, completed, id]
  );
  return result;
};

export const bookingsServices = {
  createBookings,
  getBookings,
  updateBooking,
};
