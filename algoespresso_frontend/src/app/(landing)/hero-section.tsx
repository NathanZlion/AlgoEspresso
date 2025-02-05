import { BackgroundBeams } from "@/components/ui/background-beam"
import { MagicButton } from "@/components/ui/magic-button"
import Image from "next/image"

export default function HeroSection() {
    return (
        <section className="p-10 lg:py-28 lg:px-16 text-2xl lg:text-7xl grid grid-cols-1 lg:grid-cols-2 items-center border h-screen max-h-[90vh] gap-3 relative">
            <div className="flex flex-col gap-9 items-center lg:items-start justify-between h-2/3 lg:h-fit">
                <BackgroundBeams />
                <div className="w-full text-center lg:text-start">
                    <h1>Don&apos;t Just Code</h1>
                    <div>
                        <span>Learn </span>
                        <span className="italic text-primary stroke-secondary stroke-1 fill-transparent">To Solve</span>
                    </div>
                    <div>Problems</div>
                </div>

                <div className="text-lg text-justify">
                    <span>Your step by step roadmap to landing your dream tech job.
                        Join <span className="font-azeretMono text-pretty text-primary"> AlgoEspresso </span> now and start learning for Free.</span>
                </div>
                <MagicButton className="font-azeretMono w-fit" roundness={"xl"} onClick={() => { console.log("Clicked") }}>
                    Get Started
                </MagicButton>


            </div>

            <div className=" rounded-full p-0 m-0 h-full min-h-5 relative overflow-hidden hidden lg:block" >
                <Image
                    src="/headingimage.jpg"
                    alt="Algo Espresso"
                    width={0}
                    height={0}
                    sizes="100%"
                    fill
                    className="object-contain object-left-top absolute rounded-lg inset-0 h-full w-full"
                    style={{
                        background: "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.5) 100%)",
                        objectFit: 'cover',
                        opacity: 0.9,
                    }}
                />
            </div>


            <div className="flex items-center animate-bounce absolute bottom-0 left-10">
                <Image src="/scroll.png" alt="scroll down" className="dark:invert" width={50} height={25} />
                <span className="font-azeretMono font-medium text-sm hidden lg:block">Scroll Down</span>
            </div>


        </section>)
}