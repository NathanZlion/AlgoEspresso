'use client'

import AlgoEspressoLogo from "@/components/algoespresso-logo";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Separator } from "@/components/ui/separator"

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <nav className="flex flex-row p-2 px-5 justify-between border-0 border-b-2 border-b-foreground/15">
                <AlgoEspressoLogo />
                <div className="flex gap-2">
                    <SignedOut>
                        <SignInButton />
                        <Separator orientation="vertical" className="bg-muted-foreground" />
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}
