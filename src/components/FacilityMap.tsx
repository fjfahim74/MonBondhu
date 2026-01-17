"use client";
import React from "react";
import type { Map as LeafletMap } from "leaflet";
import { rankNearest, LatLng } from "@/lib/geo";
import { Facility } from "@/lib/facilities";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";

// Bridge to capture map instance once available
const MapRefBridge: React.FC<{ onReady: (map: LeafletMap) => void }> = ({ onReady }) => {
  const map = useMap();
  React.useEffect(() => { onReady(map as LeafletMap); }, [map, onReady]);
  return null;
};

// Import Leaflet CSS on client
import "leaflet/dist/leaflet.css";

type Props = { height?: number };

export const FacilityMap: React.FC<Props> = ({ height = 360 }) => {
  const [facilities, setFacilities] = React.useState<Facility[]>([]);
  const [userLoc, setUserLoc] = React.useState<LatLng | null>(null);
  const [nearest, setNearest] = React.useState<(Facility & { distanceKm: number })[]>([]);
  const mapRef = React.useRef<LeafletMap | null>(null);
  // Curated hospital links requested by user
  const curatedHospitals = React.useMemo(() => [
    { id: "emc-comilla", nameBn: "ইস্টার্ন মেডিকেল কলেজ এন্ড হাসপাতাল", url: "https://maps.app.goo.gl/rDvuCSy3w3tvQQng6" },
    { id: "mainamati-gen", nameBn: "ময়নামতি ক্যান্টনমেন্ট জেনারেল হসপিটাল", url: "https://maps.app.goo.gl/B5pXDFqckcuHgDD98" },
    { id: "cmh-comilla", nameBn: "সম্মিলিত সামরিক হাসপাতাল (সিএমএইচ),কুমিল্লা", url: "https://maps.app.goo.gl/namGpAqUzY8W7yJN9" },
  ], []);
  // Gate initial render to client after first mount to prevent double Leaflet init
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  // Clean up any prior Leaflet instance left by React 18 strict double-mount (dev mode) before first real mount
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current?.querySelector('.leaflet-container') as any | undefined;
    if (el && el._leaflet_id) {
      // If a stale instance is hanging around, remove inner HTML to force fresh mount
      try { el.innerHTML = ""; delete el._leaflet_id; } catch {}
    }
  }, [mounted]);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/facilities").then(r => r.json()).then(json => {
      if (cancelled) return;
      const items = Array.isArray(json?.items) ? json.items as Facility[] : [];
      setFacilities(items);
    }).catch(() => setFacilities([]));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (cancelled) return;
        const pt = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLoc(pt);
      }, () => setUserLoc(null), { enableHighAccuracy: false, timeout: 5000 });
    }
    return () => { cancelled = true; };
  }, []);

  React.useEffect(() => {
    if (userLoc && facilities.length) {
      const ranked = rankNearest(userLoc, facilities, 8);
      setNearest(ranked);
    } else {
      setNearest([]);
    }
  }, [userLoc, facilities]);

  const center: LatLng = userLoc || (facilities[0] ? { lat: facilities[0].lat, lng: facilities[0].lng } : { lat: 23.8103, lng: 90.4125 });

  return (
    <div className="space-y-3">
  <div ref={containerRef} className="rounded-md border overflow-hidden">
        {mounted ? (
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={userLoc ? 11 : 6}
            style={{ height }}
          >
            <MapRefBridge onReady={(m) => { mapRef.current = m; }} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLoc && (
              <CircleMarker center={[userLoc.lat, userLoc.lng]} radius={8} pathOptions={{ color: "#1d4ed8", fillColor: "#60a5fa", fillOpacity: 0.7 }}>
                <Popup>আপনার অবস্থান</Popup>
              </CircleMarker>
            )}
            {facilities.map((f) => (
                <CircleMarker key={f.id} center={[f.lat, f.lng]} radius={6} pathOptions={{ color: "#16a34a", fillColor: "#86efac", fillOpacity: 0.8 }}>
                  <Popup>
                    <div className="text-xs space-y-1">
                      <div className="font-semibold">{f.nameBn}</div>
                      <div>{f.upazila}, {f.district}</div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${f.lat},${f.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        গুগল ম্যাপে দেখুন
                      </a>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
          </MapContainer>
        ) : (
          <div style={{ height }} className="flex items-center justify-center text-xs text-neutral-500">মানচিত্র প্রস্তুত হচ্ছে...</div>
        )}
      </div>
      <div className="rounded-md border p-3 bg-white/60 dark:bg-neutral-900/50">
        <h3 className="font-semibold text-sm mb-2">নিকটস্থ সেবা</h3>
        <ul className="space-y-1 text-xs">
          {curatedHospitals.map(h => (
            <li key={h.id} className="flex justify-between items-center gap-2">
              <a
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate"
                aria-label={`${h.nameBn} গুগল ম্যাপে খুলুন`}
              >
                {h.nameBn}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FacilityMap;
