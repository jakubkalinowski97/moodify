import type { Context } from 'https://edge.netlify.com'
import { connect } from 'https://unpkg.com/@planetscale/database@^1.1'

export default async function handler(req: Request, context: Context): Promise<Response> {
    const connection = connect({
        host: Deno.env.get('PLANETSCAPE_DATABASE_HOST'),
        username: Deno.env.get('PLANETSCAPE_DATABASE_USERNAME'),
        password: Deno.env.get('PLANETSCAPE_DATABASE_PASSWORD'),
    })

    const categories = await connection.execute('SELECT * FROM category;', []);

    const json = JSON.stringify(categories);

    return new Response(json, {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        }
      });
}