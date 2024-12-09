import { cookies } from "next/headers";
export const useAdmin = async () => {
    const cookie = cookies();
    const admin = (await cookie).getAll().find((cookie) => cookie.name === "admin")?.value === "true" ? true : false;
    return admin;
};
