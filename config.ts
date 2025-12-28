export const CONFIG = {
	MODEL: "gpt-5.2",
	VECTOR_STORE_ID:
		Deno.env.get("OPENAI_VECTOR_STORE_ID") ??
		"vs_695129a1f6d881918b55577fe9ca2800",
};
