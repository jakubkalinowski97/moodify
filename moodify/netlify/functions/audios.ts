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

  let sounds;

  if(type === 'all') {
    sounds = await connection.execute(
      "SELECT audio.id, audio.name, audio.isVisible, category.name as category, subcategory.name as subcategory, audio.audio_url FROM audio INNER JOIN category ON audio.category_id = category.id LEFT JOIN subcategory ON subcategory.subcategory_id = audio.subcategory_id ORDER BY audio.name"
    )
  } else {
    sounds = await connection.execute(
      "SELECT * FROM audio WHERE type = ? AND category_id = ? AND name LIKE ? AND isVisible = true ORDER BY name",
      [type, categoryId, `%${search}%`]
    );
  }
  
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