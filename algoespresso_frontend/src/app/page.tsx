import { ModeToggle } from "@/components/mode-toggle";
import LandingPage from "./_components/page";
// import {
// SignedIn,
//   SignedOut
// } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Home() {
  // const router = useRouter();

  return (
    <div className="font-dotGothic">
      <main>
        {/* <SignedIn>
          {(() => {
            useEffect(() => {
              router.replace('/app');
            }, []);
            return null;
          })()}
        </SignedIn> */}

        <ModeToggle />
        {/* <SignedOut> */}
        <LandingPage />
        {/* </SignedOut> */}
      </main>
    </div>
  );
}
