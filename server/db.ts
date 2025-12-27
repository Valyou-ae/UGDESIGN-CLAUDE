import pg from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";
import { logger } from './logger';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Connection pool for session store and direct queries
// Sized for production concurrent user load
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_POOL_MAX || '50'),  // Increased to 50 for 1000+ concurrent users
  min: parseInt(process.env.DB_POOL_MIN || '5'),   // Keep 5 minimum connections warm
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
  ssl: { rejectUnauthorized: false },
});

// Handle pool errors
pool.on("error", (err) => {
  logger.error("Unexpected error on idle database client", err, { source: 'database' });
});

// Create Drizzle ORM instance using the pool
export const db = drizzle(pool, { schema });
