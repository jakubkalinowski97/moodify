import { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";
import { getPresignedUrl } from "../utils/getPresignedUrl";

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
  const categoryId = queryStringParameters?.["categoryId"];
  const search = queryStringParameters?.["search"] || '';

  console.log(type, categoryId, search);

  const sounds = await connection.execute(
      "SELECT * FROM audio WHERE type = ? AND category_id = ? AND name LIKE ? ORDER BY name",
      [type, categoryId, `%${search}%`]
     );
    
  
  const data = sounds.rows.map((row: any) => {
    return {
      ...row,
      audio_url: getPresignedUrl(row.audio_url)
    }
  });

  const parsedData = JSON.stringify(data);

  return {
    statusCode: 200,
    body: parsedData
  }
});