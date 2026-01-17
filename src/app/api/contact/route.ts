import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const message = parsed.error.issues.map(i => i.message).join(', ');
      return NextResponse.json({ ok: false, error: { message } }, { status: 400 });
    }
    return NextResponse.json({ ok: true, data: { received: true } }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: { message: 'Invalid JSON' } }, { status: 400 });
  }
}
