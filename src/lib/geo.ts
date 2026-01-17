export type LatLng = { lat: number; lng: number };

export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371; // km
  const dLat = deg2rad(b.lat - a.lat);
  const dLng = deg2rad(b.lng - a.lng);
  const la1 = deg2rad(a.lat);
  const la2 = deg2rad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function deg2rad(d: number) { return d * Math.PI / 180; }

export function rankNearest<T extends LatLng>(origin: LatLng, points: T[], limit = 10): (T & { distanceKm: number })[] {
  return points
    .map(p => ({ ...p, distanceKm: haversineKm(origin, p) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}
