import { CodeBlock } from "@/components/code-block";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";


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
                items-start border relative z-30 bg-background
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

            <div className="relative bottom-0 row-span-2 h-full w-full overflow-hidden bg-muted items-center flex py-3
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

const getRandomSpeed = () => ({
    speed: 10 + Math.random() * 15,
});

const FlowingImages = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 50 });
    const [positions, setPositions] = useState(
        images.map((_, index) => ({
            x: (index / images.length) * dimensions.width,
            y: dimensions.height / 2,
            ...getRandomSpeed(),
            phase: Math.random() * Math.PI * 2,
        }))
    );

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            if (!entry.contentRect) return;
            const { width, height } = entry.contentRect;
            setDimensions({ width, height });

            setPositions(
                images.map((_, index) => ({
                    x: (index / images.length) * width,
                    y: height / 2, // Keep images in center vertically
                    ...getRandomSpeed(),
                    phase: Math.random() * Math.PI * 2,
                }))
            );
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const updatePositions = () => {
            setPositions((prev) =>
                prev.map((pos) => {
                    let newX = pos.x + pos.speed * 0.016;

                    if (newX > dimensions.width) newX = -100;

                    return { ...pos, x: newX, y: dimensions.height / 2 };
                })
            );
        };

        const interval = setInterval(updatePositions, 16);
        return () => clearInterval(interval);
    }, [dimensions]);

    return (
        <div ref={containerRef} className="w-full h-[50px] overflow-hidden flex items-center shadow ">
            {images.map((src, i) => (
                <motion.img
                    key={i}
                    src={src}
                    className="absolute w-10 h-10"
                    animate={{ x: positions[i].x }}
                    transition={{ ease: "linear", duration: 0.016 }}
                />
            ))}
        </div>
    );
};
