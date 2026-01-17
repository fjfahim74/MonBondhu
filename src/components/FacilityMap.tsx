"use client";
import React from "react";
import "leaflet/dist/leaflet.css";
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

type Props = { height?: number };

export default function FacilityMap({ height = 360 }: Props) {
  const [facilities, setFacilities] = React.useState<Facility[]>([]);
  const [userLoc, setUserLoc] = React.useState<LatLng | null>(null);
  const [nearest, setNearest] = React.useState<(Facility & { distanceKm: number })[]>([]);
  const mapRef = React.useRef<LeafletMap | null>(null);

  // Gate initial render to client after first mount to prevent double Leaflet init
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  // Curated hospital links requested by user
  const curatedHospitals = React.useMemo(() => [
    { id: "emc-comilla", nameBn: "ইস্টার্ন মেডিকেল কলেজ এন্ড হাসপাতাল", url: "https://maps.app.goo.gl/rDvuCSy3w3tvQQng6" },
    { id: "mainamati-gen", nameBn: "ময়নামতি ক্যান্টনমেন্ট জেনারেল হসপিটাল", url: "https://maps.app.goo.gl/B5pXDFqckcuHgDD98" },
    { id: "cmh-comilla", nameBn: "সম্মিলিত সামরিক হাসপাতাল (সিএমএইচ),কুমিল্লা", url: "https://maps.app.goo.gl/namGpAqUzY8W7yJN9" },
  ], []);

  // Clean up any prior Leaflet instance left by React 18 strict double-mount (dev mode) before first real mount
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    const el = containerRef.current?.querySelector('.leaflet-container') as any | undefined;
    if (el && el._leaflet_id) {
      // If a stale instance is hanging around, remove inner HTML to force fresh mount
      try { el.innerHTML = ""; delete el._leaflet_id; } catch { }
    }
  }, [mounted]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
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

  // Auto-zoom to user location when available
  React.useEffect(() => {
    if (userLoc && mapRef.current) {
      mapRef.current.flyTo([userLoc.lat, userLoc.lng], 13, { duration: 1.5 });
    }
  }, [userLoc]);

  const center: LatLng = userLoc || (facilities[0] ? { lat: facilities[0].lat, lng: facilities[0].lng } : { lat: 23.8103, lng: 90.4125 });

  return (
    <div className="space-y-3">
      <div ref={containerRef} className="rounded-md border relative" style={{ zIndex: 10, cursor: 'grab' }}>
        {mounted ? (
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={userLoc ? 11 : 6}
            style={{ height, cursor: 'grab' }}
            zoomControl={true}
            dragging={true}
            touchZoom={true}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            boxZoom={true}
            keyboard={true}
            attributionControl={true}
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
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-100">নিকটস্থ সেবা</h3>
        </div>
        <ul className="space-y-2">
          {curatedHospitals.map(h => (
            <li key={h.id} className="group">
              <a
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
                aria-label={`${h.nameBn} গুগল ম্যাপে খুলুন`}
              >
                <svg className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 truncate">
                  {h.nameBn}
                </span>
                <svg className="w-3 h-3 text-neutral-400 dark:text-neutral-600 ml-auto shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
