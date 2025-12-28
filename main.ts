import { agent } from "./agent.ts";
import { getStatementByTimeOfDay } from "./gratitude-statements.ts";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const query = url.searchParams.get("q");

  if (!query?.length) {
    return new Response(getStatementByTimeOfDay(), {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const response = await agent.respond(query);
    return new Response(response, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error processing query:", error);
    return new Response("Ups, da ist etwas schiefgelaufen. Versuch es nochmal!", {
      status: 500,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
});
