import { NextResponse } from "next/server";
import { FACILITIES, FacilitySchema } from "@/lib/facilities";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const upazila = url.searchParams.get('upazila') || undefined;
  const district = url.searchParams.get('district') || undefined;
  const type = url.searchParams.get('type') || undefined;
  let data = FACILITIES.slice();
  if (upazila) data = data.filter(f => f.upazila === upazila);
  if (district) data = data.filter(f => f.district === district);
  if (type) data = data.filter(f => f.type === type);
  return NextResponse.json({ ok: true, items: data });
}
