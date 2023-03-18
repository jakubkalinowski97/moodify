import { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler: Handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;

  if(!context.clientContext?.["identity"]) {
    return {
      statusCode: 401
    }
  } 

  const { queryStringParameters } = event;
  const type = queryStringParameters?.["type"];
  const search = queryStringParameters?.["search"] || '';

  const sounds = await connection.execute(
      "SELECT * FROM audio WHERE type = ? AND name LIKE ? ORDER BY name",
      [type, `%${search}%`]
     );
    
  const data = sounds.rows;

  const parsedData = JSON.stringify(data);

  return {
    statusCode: 200,
    body: parsedData
  }
});