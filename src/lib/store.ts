import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RoutingId, WindowId } from "@/data/trip";

export type BriefAnswers = Record<string, string>;

type TripState = {
  windowId: WindowId;
  routing: RoutingId;
  istanbulStay: string;
  romaniaStay: string;
  brief: BriefAnswers;
  packing: string[];
  booked: string[];
  doors: string[];
  picnic: string[];
  setWindow: (id: WindowId) => void;
  setRouting: (id: RoutingId) => void;
  setIstanbulStay: (id: string) => void;
  setRomaniaStay: (id: string) => void;
  setBrief: (id: string, value: string) => void;
  togglePacked: (item: string) => void;
  toggleBooked: (id: string) => void;
  toggleDoor: (id: string) => void;
  togglePicnic: (id: string) => void;
};

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      windowId: "sep",
      routing: "sofia",
      istanbulStay: "apt",
      romaniaStay: "house",
      brief: {},
      packing: [],
      booked: [],
      doors: [],
      picnic: [],
      setWindow: (windowId) => set({ windowId }),
      setRouting: (routing) => set({ routing }),
      setIstanbulStay: (istanbulStay) => set({ istanbulStay }),
      setRomaniaStay: (romaniaStay) => set({ romaniaStay }),
      setBrief: (id, value) =>
        set((s) => ({ brief: { ...s.brief, [id]: value } })),
      togglePacked: (item) =>
        set((s) => ({
          packing: s.packing.includes(item)
            ? s.packing.filter((p) => p !== item)
            : [...s.packing, item],
        })),
      toggleBooked: (id) =>
        set((s) => ({
          booked: s.booked.includes(id)
            ? s.booked.filter((x) => x !== id)
            : [...s.booked, id],
        })),
      toggleDoor: (id) =>
        set((s) => ({
          doors: s.doors.includes(id)
            ? s.doors.filter((x) => x !== id)
            : [...s.doors, id],
        })),
      togglePicnic: (id) =>
        set((s) => ({
          picnic: s.picnic.includes(id)
            ? s.picnic.filter((x) => x !== id)
            : [...s.picnic, id],
        })),
    }),
    { name: "bromania-mmxxvii" },
  ),
);
