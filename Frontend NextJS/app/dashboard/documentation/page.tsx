'use client'

import { Navigation } from "@/components/dashboard/navigation";

export default function NotebookPage() {
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <Navigation />
            <main className="flex-1 p-4 space-y-6 flex justify-center items-center">
                <iframe
                    src="/PharmaGraphX_Hackathon_Project.html"
                    width="100%"
                    height="800px"
                    style={{ border: "none" }}
                ></iframe>
            </main>
        </div>
    );
}
