import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      const message = parsed.error.issues.map(i => i.message).join(', ');
      return NextResponse.json({ ok: false, error: { message } }, { status: 400 });
    }
    // Mock auth: always succeed; normally you'd verify password & issue a token/cookie.
    return NextResponse.json({ ok: true, data: { user: { email: parsed.data.email } } }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: { message: 'Invalid JSON' } }, { status: 400 });
  }
}
