import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req) {
  const url = new URL(req.url);
  const type = url.searchParams.get('type');
  if (!type) {
    return new Response(JSON.stringify({ error: 'Type required' }), { status: 400 });
  }
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = $1
      )
    `, [type]);
    const exists = result.rows[0].exists;
    return new Response(JSON.stringify({ exists }), { status: 200 });
  } catch (error) {
    console.error('Error checking table:', error);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}
