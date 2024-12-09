import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create the store with persistence
const useUserStore = create(
    persist(
        (set) => ({
            fname: "",
            lname: "",
            name:"",
            email: "",
            picture: "",
            username: "",
            language: "",

            updateUserDetails: (newDetails) => set((state) => ({ ...state, ...newDetails })),
        }),
        {
            name: "user-storage",
            getStorage: () => localStorage,
        }
    )
);

export { useUserStore };
