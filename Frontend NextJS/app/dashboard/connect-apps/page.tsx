"use client"; // Ensure this runs only on the client side

import { IntegryJS } from "@integry/sdk";
import React, { useEffect } from "react";
import crypto from "crypto-browserify";
import { Navigation } from "@/components/dashboard/navigation";

const Page = () => {

    useEffect(() => {
        const apiKey = localStorage.getItem('integry-api');
        
        if (!apiKey) {
          window.location.href = '/dashboard/chat';
        }
      }, []);
            
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = JSON.parse(localStorage.getItem("integry-api") || "{}");

            const userId = storedData.userId;
            const appKey = storedData.appKey;
            const appSecret = storedData.apiKey;

            // Ensure you generate the correct hash here
            const hash = crypto
                .createHmac("sha256", appSecret)
                .update(userId)
                .digest("hex");

            const integryInstance = new IntegryJS({
                appKey,
                hash,
                user: { userId },
                options: { title: "Apps", tags: [], debug: false },
                payloads: {},
            });

            console.log(integryInstance.showApps(
                IntegryJS.RenderModes.INLINE,
                "marketplace-container"
            ))
        }
    }, []);

    return (
        <div>
            <div className="flex flex-col lg:flex-row w-full min-h-[screen]">
                <Navigation />
                <main className="flex-1 p-4">

                    <div id="marketplace-container">
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Page;
