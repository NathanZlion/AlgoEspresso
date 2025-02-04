'use client'

import { Avatar } from "@/components/ui/avatar";
import { BackgroundBeams } from "@/components/ui/background-beam";
import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { MagicButton } from "@/components/ui/magic-button";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

// import Image from "next/image";

export default function Home() {
  return (
    <div className="font-dotGothic">
      <nav className="flex flex-row p-2 justify-between border-0 border-b-2 border-b-foreground/15">
        <div className="container flex flex-row gap-4 items-center ps-5 lg:ps-20">
          <Avatar>
            <AvatarImage src="https://ik.imagekit.io/algoespresso/algo_espressologo.png?updatedAt=1738682084835" alt="A" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>

          <h1 className="text-lg hidden lg:block"> AlgoEspresso </h1>
        </div>

        {/* option */}
        <div className="flex flex-row justify-between items-center pe-5 lg:pe-20 gap-5">

          <MagicButton className="font-azeretMono" onClick={() => { console.log("Clicked") }}>
            Get Started
          </MagicButton>

          <Button variant={"link"} className="p-0">
            <Link href={"https://github.com/NathanZlion/AlgoEspresso/"} target="_blank">
              <Avatar>
                <AvatarImage src="github-mark.svg" alt="Source Code" className="dark:invert" sizes="30" />
                <AvatarFallback>Github</AvatarFallback>
              </Avatar>
            </Link>
          </Button>
        </div>

        <FloatingNav navItems={[
          {
            name: "AlgoEspresso",
            icon: <Avatar>
              <AvatarImage src="/logo.png" alt="A" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>,
            link: "/"
          },
          {
            name: "",
            icon: <MagicButton className="font-azeretMono" onClick={() => { console.log("Clicked") }}>
              Get Started
            </MagicButton>,
            link: "/"
          }
        ]} />

      </nav>
      <main>


        {/* Main Section */}
        <section className="p-10 lg:p-28 text-2xl lg:text-7xl grid grid-cols-1 lg:grid-cols-2 justify-start items-center min-h-screen/80 border">
          <div className="flex flex-col gap-9 items-center">
            <BackgroundBeams />

            <div className="container">
              <h1>Don't Just Code</h1>
              <div>
                <span>Learn </span>
                <span className="italic text-primary">To Solve</span>
              </div>
              <div>Problems</div>
            </div>

            <div className="container">
              <span className="text-base">Your step by steap roadmap to landing your dream tech job.</span>
            </div>
            <MagicButton className="font-azeretMono w-fit" roundness={"sm"} onClick={() => { console.log("Clicked") }}>
              Get Started
            </MagicButton>
          </div>

          <Image
            src="/headingimage.jpg"
            alt="Algo Espresso"
            width={0}
            height={0}
            sizes="100%"
            className="w-full h-auto rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.5) 100%)", // Smooth transition
              objectFit: 'cover',
              opacity: 0.9,
            }}
          />

          <div className="flex items-center animate-bounce">
            <Image src="/scroll.png" alt="scroll down" className="dark:invert" width={50} height={25} />
            <span className="font-azeretMono font-medium text-sm">Scroll Down</span>
          </div>

        </section>

        {/* Second Section */}
        <section className="border">
          hi there
        </section>

      </main>
    </div>
  );
}
