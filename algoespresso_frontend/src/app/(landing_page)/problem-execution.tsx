"use client"

import { CodeBlock } from "@/components/code-block";
import { useRef } from "react";
import Marquee from "@/components/marquee";
import Image from "next/image";


export default function ProblemSolving() {
    const code = `class Solution:
    def longestNiceSubstring(self, s: str) -> str:
        freq = Counter(s)
        index = 0

        while index < len(s):
            if not freq[s[index].lower()] or not freq[s[index].upper()]:
                break
            index += 1

        # current string is nice
        if index == len(s):
            return s
        
        return max(
            self.longestNiceSubstring(s[:index]),
            self.longestNiceSubstring(s[index+1:]),
            key=len
        )
`
    return (
        <section className="relative  h-fit min-h-[90vh]">
            <div className="p-10 lg:py-28 lg:px-16 text-2xl lg:text-7xl grid grid-cols-1 lg:grid-cols-6
                items-start border relative z-30 bg-background/10
                shadow-[50px_50px_500px_rgba(198,185,140,.6)] gap-6
                "
            >

                <div className="container order-2 lg:order-1 lg:col-span-4 ">
                    <CodeBlock filename="main.py" language="python" tabs={[
                        {
                            code: code,
                            language: "python",
                            name: "main.py"
                        },
                    ]} />
                </div>

                <div className="container order-1 lg:order-2 w-full h-full  grid grid-row-6  lg:col-span-2">
                    <div className="w-full row-span-4 flex flex-col justify-evenly">
                        <h1 className="lg:text-3xl text-start"># Code. Submit. Compete. </h1>
                        <h1 className="lg:text-3xl bg-gradient-to-r from-primary to-red-300 text-transparent bg-clip-text text-justify"> Run, Compare runtimes.</h1>
                        <h2 className="lg:text-8xl bg-gradient-to-r from-amber-700 via-red-300 to-primary block text-transparent bg-clip-text">Optimize </h2>
                    </div>

                </div>
            </div>

            <div className="relative bottom-0 row-span-2 h-full w-full overflow-hidden bg-muted items-center flex
                before:absolute before:content-[''] before:inset-y-0 before:left-0 before:w-32 before:z-[1]
                before:bg-gradient-to-r before:from-black before:to-transparent before:pointer-events-none
                after:absolute after:content-[''] after:inset-y-0 after:right-0 after:w-32 after:z-[1]
                after:bg-gradient-to-l after:from-black after:to-transparent after:pointer-events-none p-0 z-0">
                <FlowingImages />
            </div>
        </section>
    );
}


const images = [
    "/python.svg",
    "/go.svg",
    "/java.svg",
    "/nodejs.svg",
    "/cpp.svg",
    "/c_sharp.svg",
    "/swift.svg",
    "/kotlin.svg",
    "/ruby.svg",
    "/elixir.svg",
];

const FlowingImages = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={containerRef} className="w-full h-[50px] overflow-hidden flex items-center shadow ">

            <Marquee
                direction={"right"}
                loop={0}
                delay={13}
                pauseOnClick
                className="w-full h-full"
            >
                {images.map((src, i) => (
                    <div key={`child-${i}`} className="mx-12">
                        <Image src={src} width={40} height={40} alt={"Code Language Icon"} />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};
