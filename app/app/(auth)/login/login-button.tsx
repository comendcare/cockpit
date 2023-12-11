"use client";

import LoadingDots from "@/components/icons/loading-dots";
import {signIn} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import {useState, useEffect} from "react";
import {toast} from "sonner";
import {
    FaGithub,
    FaGoogle
} from "react-icons/fa6";

export default function LoginButton() {
    const [loading, setLoading] = useState(false);

    // Get error message added by next/auth in URL.
    const searchParams = useSearchParams();
    const error = searchParams?.get("error");

    useEffect(() => {
        const errorMessage = Array.isArray(error) ? error.pop() : error;
        errorMessage && toast.error(errorMessage);
    }, [error]);

    return (
        <div className="flex flex-col">
            <button
                disabled={loading}
                onClick={() => {
                    setLoading(true);
                    signIn("google", {callbackUrl: "/"}).catch(error => console.error("Sign-in error", error));
                }}
                className={`${
                    loading
                        ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
                        : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
                } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
            >
                {loading ? (
                    <LoadingDots color="#A8A29E"/>
                ) : (
                    <>
                        <FaGoogle className="h-4 w-4 text-black dark:text-white" />
                        <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                            Login with Google
                        </p>
                    </>
                )}
            </button>
            <button
                disabled={loading}
                onClick={() => {
                    setLoading(true);
                    signIn("github").catch(error => console.error("Sign-in error", error));
                }}
                className={`${
                    loading
                        ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
                        : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
                } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
            >
                {loading ? (
                    <LoadingDots color="#A8A29E"/>
                ) : (
                    <>
                        <FaGithub className="h-4 w-4 text-black dark:text-white" />
                        <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                            Login with GitHub
                        </p>
                    </>
                )}
            </button>
        </div>
    );
}
