import { createClient } from '@libsql/client/web';
import type { ResultSet } from '@libsql/client/web';
import { Effect } from 'effect';

type Result = ResultSet | Error;

let client: ReturnType<typeof createClient>;

// TODO: fix this upstream in Greenwood
// https://github.com/AnalogStudiosRI/api/issues/64
if(process.env.DATABASE_URL === undefined || process.env.DATABASE_TOKEN === undefined) {
  console.warn('*** DATABASE_URL and DATABASE_TOKEN must both be defined ***');
} else {
  client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_TOKEN
  });
}

const db = {
  async query(sql: string, args: string[] | []): Promise<Result> {

    return Effect.runPromise(Effect.tryPromise({
      try: () => { return client.execute({ sql, args }) },
      catch: (e: unknown) => {
        console.error({ e });
        return new Error('DB Error');
      }
    }));
  }
}

function unwrapResultAsResponse(result: Result): Response {
  const isError = result instanceof Error;
  const body = isError
    ? result.message
    : JSON.stringify(result.rows);
  const status = isError ? 500 : 200;

  return new Response(body, {
    status,
  })
}

export { db, unwrapResultAsResponse }