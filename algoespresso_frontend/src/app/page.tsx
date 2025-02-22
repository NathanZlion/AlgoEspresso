'use client'

import LandingPage from "./(landing_page)/page";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-dotGothic">
      <main>
        <SignedIn>
          {(() => {
            useEffect(() => {
              router.replace('/app');
            }, []);
            return null;
          })()}
        </SignedIn>
        <SignedOut>
          <LandingPage />
        </SignedOut>
      </main>
    </div>
  );
}
