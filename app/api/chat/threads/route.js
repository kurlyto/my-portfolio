import { NextResponse } from "next/server";
import { createThread } from "@/app/lib/chat/db";

export async function POST() {
  const thread = createThread();
  return NextResponse.json({ threadId: thread.id });
}
