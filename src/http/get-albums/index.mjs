import mysql from 'mysql2/promise';

export async function handler (req) {
  const params = req.queryStringParameters || {};
  const { id, artistId } = params;
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const [rows] = id
    ? await connection.execute('SELECT * FROM albums WHERE id = ?', [id])
    : artistId
      ? await connection.execute('SELECT * FROM albums WHERE artistId = ?', [artistId])
      : await connection.execute('SELECT * FROM albums');

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