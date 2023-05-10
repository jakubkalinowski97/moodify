import { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler: Handler = withPlanetscale(async (event, context) => {
    const {
        planetscale: { connection },
    } = context;

    if (!context.clientContext?.["identity"] && context.clientContext) {
        return {
            statusCode: 401
        }
    }

    const { body } = event;

    if (!body) {
        return {
            statusCode: 400,
            body: "Missing body",
        };
    }

    const { isVisible, id } = JSON.parse(body);

    await connection.execute("UPDATE audio SET isVisible = ? WHERE id = ?", [
        isVisible,
        id,
    ]);

    return {
        statusCode: 201,
    };
});