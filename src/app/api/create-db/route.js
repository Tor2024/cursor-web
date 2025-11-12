import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req) {
  const data = await req.json();
  const { type } = data;
  if (!type) {
    return new Response(JSON.stringify({ error: 'Type required' }), { status: 400 });
  }
  try {
    if (type === 'portfolio') {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS portfolio (
          id SERIAL PRIMARY KEY,
          title_en TEXT,
          title_ru TEXT,
          title_de TEXT,
          content_en TEXT,
          content_ru TEXT,
          content_de TEXT,
          cover TEXT,
          date DATE,
          folder_name TEXT UNIQUE
        )
      `);
    } else if (type === 'news') {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS news (
          id SERIAL PRIMARY KEY,
          title_en TEXT,
          title_ru TEXT,
          title_de TEXT,
          content_en TEXT,
          content_ru TEXT,
          content_de TEXT,
          cover TEXT,
          date DATE,
          folder_name TEXT UNIQUE
        )
      `);
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error creating table:', error);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}
