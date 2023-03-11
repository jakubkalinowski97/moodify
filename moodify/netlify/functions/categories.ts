import { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler: Handler = withPlanetscale(async (_event, context) => {
  const {
    planetscale: { connection },
  } = context;

  const categories = await connection.execute("SELECT * FROM category");

  const data = JSON.stringify(categories);

  return {
    body: data,
    statusCode: 200,
  };
});
