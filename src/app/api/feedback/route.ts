import { NextResponse } from "next/server";
import { z } from "zod";

const feedbackSchema = z.object({
  message_id: z.string().trim().min(1).max(255),
  rating: z.enum(["up", "down"]),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 }
    );
  }

  const result = feedbackSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "A valid message_id and rating are required" },
      { status: 400 }
    );
  }

  console.info(
    JSON.stringify({
      event: "assistant_feedback",
      message_id: result.data.message_id,
      rating: result.data.rating,
      received_at: new Date().toISOString(),
    })
  );

  return NextResponse.json({ success: true });
}
