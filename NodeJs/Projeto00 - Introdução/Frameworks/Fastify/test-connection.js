import { sql } from "./db.js";

async function testConnection() {
  try {
    const result = await sql`SELECT 1`;
    console.log('Connection successful:', result);
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testConnection();
