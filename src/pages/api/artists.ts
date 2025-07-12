import { db, unwrapResultAsResponse } from '../../client/db.ts';

export async function handler (request: Request): Promise<Response> {
  const params = new URLSearchParams(request.url.slice(request.url.indexOf('?')));
  const id = params.has('id') ? params.get('id') : null;
  const { query, args } = id
    ? { query: 'SELECT * FROM artists WHERE id = ?', args: [id] }
    : { query: 'SELECT * FROM artists', args: [] }
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