import React from "react";
import { Loading } from "lucide-react";
export default function Loading() {
    return (
        <div className="flex h-screen w-full-sidebar ">
            <Loading className="animate-spin" />
        </div>
    );
}
