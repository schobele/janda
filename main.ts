import { agent } from "./agent.ts";

Deno.serve(async (req: Request) => {
	const url = new URL(req.url);

	// Route: /response/{id} - poll for result
	if (url.pathname.startsWith("/response/")) {
		const id = url.pathname.split("/response/")[1];

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const response = await agent.getResponse(id);

			if (response.status === "queued" || response.status === "in_progress") {
				return new Response(url.href, {
					headers: { "content-type": "text/plain; charset=utf-8" },
				});
			}

			if (response.status === "completed" && response.output_text) {
				return new Response(response.output_text, {
					headers: { "content-type": "text/plain; charset=utf-8" },
				});
			}

			throw new Error("Response not completed or missing output text");
		} catch (error) {
			console.error("Error retrieving response:", error);
			return new Response(
				"Ups, da ist etwas schiefgelaufen. Versuch es nochmal!",
				{
					status: 500,
					headers: { "content-type": "text/plain; charset=utf-8" },
				},
			);
		}
	}

	// Route: / - start new request
	let query: string | null = null;

	if (req.method === "GET") {
		query = url.searchParams.get("q");
	} else if (req.method === "POST") {
		const body = await req.json();
		query = body.q;
	} else {
		return new Response("Method not allowed", { status: 405 });
	}

	if (!query) {
		return new Response("Was möchtest du wissen?", { status: 400 });
	}

	console.log("Query received:", query);

	try {
		const { id } = await agent.startRequest(query);
		return new Response(null, {
			status: 302,
			headers: { Location: `/response/${id}` },
		});
	} catch (error) {
		console.error("Error starting request:", error);
		return new Response(
			"Ups, da ist etwas schiefgelaufen. Versuch es nochmal!",
			{
				status: 500,
				headers: { "content-type": "text/plain; charset=utf-8" },
			},
		);
	}
});
