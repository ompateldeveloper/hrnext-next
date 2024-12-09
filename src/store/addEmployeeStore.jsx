import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create the store with persistence
const useAddEmpNoDetailsStore = create(
    persist(
        (set) => ({
            empNo:"",
            empSeries:"",
            updateEmpNoDetails: (newDetails) => set((state) => ({ ...state, ...newDetails })),
            clearEmpNoDetails:()=>set((state)=>({empNo:"",empSeries:""}))
        }),
        {
            name: "empNoDetails",
            getStorage: () => localStorage,
        }
    )
);

export { useAddEmpNoDetailsStore };