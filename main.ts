import { getStatementByTimeOfDay } from "./gratitude-statements.ts";

Deno.serve((req: Request) => {
	const url = new URL(req.url);
	const query = url.searchParams.get("q");
	console.log("Received query parameter q:", query);

	const quote = getStatementByTimeOfDay();

	return new Response(quote, {
		headers: { "content-type": "text/plain; charset=utf-8" },
	});
});
