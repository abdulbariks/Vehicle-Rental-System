import { Pool } from "pg";
import config from "./config";

//DB
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});
