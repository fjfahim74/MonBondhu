import { z } from "zod";

export const FacilitySchema = z.object({
  id: z.string(),
  nameBn: z.string(),
  type: z.enum(["community-clinic", "union-health", "upazila-complex", "district-hospital", "ngo-center", "pharmacy"]),
  division: z.string(),
  district: z.string(),
  upazila: z.string(),
  union: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
});

export type Facility = z.infer<typeof FacilitySchema>;

// Small mock dataset (demo). Replace with real source when available.
export const FACILITIES: Facility[] = [
  {
    id: "fac-1",
    nameBn: "কমিউনিটি ক্লিনিক, গাজীপুর সদর",
    type: "community-clinic",
    division: "Dhaka",
    district: "Gazipur",
    upazila: "Sreepur",
    union: "Gazipur Sadar Union",
    lat: 24.199, lng: 90.480,
  },
  {
    id: "fac-2",
    nameBn: "উপজেলা স্বাস্থ্য কমপ্লেক্স, উখিয়া",
    type: "upazila-complex",
    division: "Chittagong",
    district: "Cox's Bazar",
    upazila: "Ukhiya",
    union: "",
    lat: 21.283, lng: 92.150,
  },
  {
    id: "fac-3",
    nameBn: "জেলা হাসপাতাল, নওগাঁ",
    type: "district-hospital",
    division: "Rajshahi",
    district: "Naogaon",
    upazila: "Naogaon Sadar",
    union: "",
    lat: 24.804, lng: 88.943,
  },
];
