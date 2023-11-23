import mysql from 'mysql2/promise';

export async function handler (req) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const [rows] = await connection.execute('SELECT * FROM posts');

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