import { NextResponse } from "next/server";
import { z } from "zod";

const IncomingSchema = z.object({
  category: z.enum(["stress", "sadness", "anxious", "other"]),
  note: z.string().max(500).optional(),
  consentConfirmed: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = IncomingSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });
    }
    // Mock processing delay
    await new Promise((r) => setTimeout(r, 150));
    // Return a mock reference id (no PII stored server-side)
    const ref = `HR-${Date.now().toString(36)}`;
    return NextResponse.json({ ok: true, ref });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
