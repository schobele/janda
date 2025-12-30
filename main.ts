import { agent } from "./agent.ts";

Deno.serve(async (req: Request) => {
	if (req.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	const body = await req.json();
	const query = body.q;
	if (!query) {
		return new Response("Was möchtest du wissen?", { status: 400 });
	}

	console.log("Params received:", query);

	try {
		const response = await agent.respond(query);
		return new Response(response, {
			headers: { "content-type": "text/plain; charset=utf-8" },
		});
	} catch (error) {
		console.error("Error processing query:", error);
		return new Response(
			"Ups, da ist etwas schiefgelaufen. Versuch es nochmal!",
			{
				status: 500,
				headers: { "content-type": "text/plain; charset=utf-8" },
			},
		);
	}
});
