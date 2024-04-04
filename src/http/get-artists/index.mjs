import { createClient } from '@libsql/client';

export async function handler (req) {
  const params = req.queryStringParameters || {};
  const { id } = params;
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN
  });
  const { rows } = id
    ? await client.execute({ sql: 'SELECT * FROM artists WHERE id = ?', args: [id] })
    : await client.execute('SELECT * FROM artists');

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'max-age=604800',
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(rows)
  };
}