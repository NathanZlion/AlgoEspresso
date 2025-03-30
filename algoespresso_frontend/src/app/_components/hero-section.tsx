import { BackgroundBeams } from "@/components/ui/background-beam"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
    return (
        <section className="p-10 lg:py-28 lg:px-16 text-2xl lg:text-7xl grid grid-cols-1 lg:grid-cols-6 items-center min-h-[90vh] h-fit gap-3 relative">
            <div className="flex flex-col col-span-4 gap-9 items-center lg:items-start justify-between h-2/3 lg:h-fit">
                <BackgroundBeams className="border-none outline-none" key={"beam"} />
                <div className="w-full text-center lg:text-start text-4xl lg:text-7xl">
                    <h1>Don&apos;t Just Code</h1>
                    <div>
                        <span>Learn </span>
                        <span className="italic text-primary stroke-secondary stroke-1 fill-transparent">To Solve</span>
                    </div>
                    <div>Problems</div>
                </div>

                <div className="text-xl text-justify">
                    <span>Your step by step roadmap to landing your dream tech job.
                        <br /> Join <span className="font-azeretMono text-pretty text-primary"> AlgoEspresso </span> now and start learning for Free.</span>
                </div>

                <Button variant="outline" className="p-2">
                    <a href="/learn" className="font-azeretMono text-xl lg:text-2xl">Learn Now</a>
                </Button>
            </div>

            <div className="col-span-2 p-0 m-0 aspect-square min-h-5 relative overflow-hidden hidden lg:block zoom-in-150" >
                <Image
                    src="/headingimage.jpg"
                    alt="Algo Espresso"
                    width={0}
                    height={0}
                    sizes="100%"
                    fill
                    className="object-contain object-left-top absolute rounded-[40%] inset-0"
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