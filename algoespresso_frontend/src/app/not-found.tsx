import { Button } from "@/components/ui/button";
import { IconError404, IconHome } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Not Found",
};


export default function NotFound() {
    return (
        <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
            <div className="flex max-sm:flex-col flex-wrap container w-full items-center justify-center gap-5">
                <IconError404 size={100} />
                <p className="text-3xl text-center">
                    Well, this is awkward... 🤔 <br />
                    Looks like this page took a day off, <br />or maybe it never existed.
                    {/* Oops! You seem lost...
                    <br />
                    Maybe take a map next time? 🗺️ 😅 */}
                </p>
            </div>

            Let&apos;s head back before things get weirder...
            <Button variant={"outline"} className="text-xl">
                <Link href="/">
                    <IconHome className="inline" />
                    &nbsp;
                    Home
                </Link>
            </Button>
        </div >
    )
}