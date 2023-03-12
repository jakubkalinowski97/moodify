import { connect } from 'https://unpkg.com/@planetscale/database@^1.1'

export default async function handler() {
    const connection = connect({
        host: Deno.env.get('PLANETSCALE_HOST'),
        username: Deno.env.get('PLANETSCALE_USERNAME'),
        password: Deno.env.get('PLANETSCALE_PASSWORD')
      });
    
      const sounds = await connection.execute("SELECT * FROM audio");
    
      const data = sounds.rows;
    
      const parsedData = JSON.stringify(data);
    
      return new Response(parsedData, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
}