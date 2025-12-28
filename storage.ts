const kv = await Deno.openKv();

const CONVERSATION_KEY = ["janda", "conversation_id"];

export async function getConversationId(): Promise<string | null> {
  const entry = await kv.get<string>(CONVERSATION_KEY);
  return entry.value;
}

export async function setConversationId(id: string): Promise<void> {
  await kv.set(CONVERSATION_KEY, id);
}
