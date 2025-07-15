import { db, unwrapResultAsResponse } from '../../client/db.ts';

export async function handler (request: Request): Promise<Response> {
  const params = new URLSearchParams(request.url.slice(request.url.indexOf('?')));
  const id = params.has('id') ? params.get('id') : null;
  const artistId = params.has('artistId') ? params.get('artistId') : null;
  const { query, args } = id
    ? { query: 'SELECT * FROM albums WHERE id = ?', args: [id] }
    : artistId
      ? { query: 'SELECT * FROM albums WHERE artistId = ?', args:  [artistId] }
      : { query: 'SELECT * FROM albums', args: [] }
  const result = await db.query(query, args);
  const response = unwrapResultAsResponse(result);
  const { body, status } = response;

  return new Response(body, {
    status,
    headers: new Headers({
      'Cache-Control': 'max-age=604800',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  });
}