'use client'

import AlgoEspressoLogo from '@/components/algoespresso-logo';
import { UserButton } from '@clerk/nextjs';

export default function SignedinNavBar() {
    return (
        <nav className="flex flex-row p-2 justify-between border-0 border-b-2 border-b-foreground/15 gap-4 items-center px-5 lg:px-20">
            <AlgoEspressoLogo />
            <UserButton />
        </nav>
    )
}