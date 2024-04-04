import { createClient } from '@libsql/client/web';

export async function handler (req) {
  const params = req.queryStringParameters || {};
  const { id, artistId } = params;
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN
  });
  const { rows } = id
    ? await client.execute({ sql: 'SELECT * FROM albums WHERE id = ?', args: [id] })
    : artistId
      ? await client.execute({ sql: 'SELECT * FROM albums WHERE artistId = ?', args: [artistId] })
      : await client.execute('SELECT * FROM albums');

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