"use client"

import { Button } from "@/components/ui/button";
import { IconError404 } from "@tabler/icons-react";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "AlgoEspresso",
    description: "Best place to learn DSA",
};


export default function NotFound() {
    return (
        <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
            <div className="flex max-sm:flex-col flex-wrap container w-full items-center justify-center gap-5">
                <IconError404 size={100} />
                <p> Page not found </p>

            </div>
            <Button variant={"link"} className="text-lg">
                <a href="/">Go to Home</a>
            </Button>
        </div>
    )
}