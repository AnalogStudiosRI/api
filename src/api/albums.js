import mysql from 'mysql2/promise';

export async function handler (request) {
  const params = new URLSearchParams(request.url.slice(request.url.indexOf('?')));
  const id = params.has('id') ? params.get('id') : null;
  const artistId = params.has('artistId') ? params.get('artistId') : null;
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const [rows] = id
    ? await connection.execute('SELECT * FROM albums WHERE id = ?', [id])
    : artistId
      ? await connection.execute('SELECT * FROM albums WHERE artistId = ?', [artistId])
      : await connection.execute('SELECT * FROM albums');

  return new Response(JSON.stringify(rows), {
    headers: new Headers({
      'Cache-Control': 'max-age=604800',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  });
}