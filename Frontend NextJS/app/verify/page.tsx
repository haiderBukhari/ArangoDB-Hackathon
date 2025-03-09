'use client'

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { errorToast, successToast } from "@/helpers/toasts";

const Verify = () => {
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const token = searchParams.get('key');
    const router = useRouter();

    useEffect(() => {
        const verifyUser = async () => {
            if (!token) return;

            axios.put(`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/api/users/authenticate`, { token }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(() => {
                setLoading(false);
                successToast('Successfully authenticated');
                // Redirect to dashboard here if you want to
                router.push('/dashboard');
            }).catch(err => {
                setLoading(false);
                errorToast("Error: " + (err.response.data.error || "Something went wrong"));
            });
        };
        verifyUser();
    }, [token]); //eslint-disable-line

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center text-2xl">Loading...</div>;
    }

    return <div className="min-h-screen flex justify-center items-center text-2xl">Verification completed. Redirecting to the Dashboard.</div>;
};

// Wrapping the component in Suspense
const VerifyWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Verify />
  </Suspense>
);

export default VerifyWithSuspense;