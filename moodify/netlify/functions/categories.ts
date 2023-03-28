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

  const categories = await connection.execute(
      "SELECT * FROM category ORDER BY name",
      []
     );
    
  
    const data = categories.rows.map((row: any) => {
    return {
        ...row,
        poster_url: getPresignedUrl(row.poster_url)
    }
    });

  const parsedData = JSON.stringify(data);

  return {
    statusCode: 200,
    body: parsedData
  }
});