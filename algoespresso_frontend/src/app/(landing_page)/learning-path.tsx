import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Constants
const LEFT_ITEMS = ["Interactive Lessons", "Take notes"];
const RIGHT_ITEMS = ["Keep track of your progress", "Set Milestones"];
const ANIMATION_DURATION = 3000;

// Main Component
export default function LearningPathSection() {
    const activeIndex = useCycledIndex(LEFT_ITEMS.length + RIGHT_ITEMS.length, ANIMATION_DURATION);

    return (
        <section className="border -z-50 relative flex flex-col items-start justify-center">
            <MacbookScroll
                key="Landing Page Macbook Scroll"
                title="Great Structured Learning Paths"
                src="/roadmap-screen.webp"
                showGradient={true}
            />

            <AnimatedGridSection activeIndex={activeIndex} />
        </section>
    );
}

// Custom Hook for Auto-Cycling Animation
function useCycledIndex(totalItems: number, intervalDuration: number): number {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalItems);
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [totalItems, intervalDuration]);

    return activeIndex;
}

// Animated Grid Section Component
function AnimatedGridSection({ activeIndex }: { activeIndex: number }) {
    return (
        <motion.section
            className="grid grid-cols-3 w-full items-center min-h-screen relative overflow-hidden bg-background/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatedColumn
                items={LEFT_ITEMS}
                activeIndex={activeIndex}
                startIndex={0}
                gradient="bg-gradient-to-r from-purple-400 to-pink-600"
                alignment="right"
                background="bg-gradient-to-r from-background via-background/90 to-transparent"
            />

            <DotGridAnimation />

            <AnimatedColumn
                items={RIGHT_ITEMS}
                activeIndex={activeIndex}
                startIndex={LEFT_ITEMS.length}
                gradient="bg-gradient-to-r from-purple-400 to-pink-600"
                alignment="left"
                background="bg-gradient-to-r from-transparent via-background/10 to-background"
            />
        </motion.section>
    );
}

// Animated Column Component
function AnimatedColumn({
    items,
    activeIndex,
    startIndex,
    gradient,
    alignment,
    background,
}: {
    items: string[];
    activeIndex: number;
    startIndex: number;
    gradient: string;
    alignment: "left" | "right";
    background: string;
}) {
    return (
        <div className={`relative h-full flex items-center ${alignment === "right" ? "justify-end pr-8" : "justify-start pl-8"} ${background}`}>
            <AnimatePresence mode="wait">
                {items.map((item, index) =>
                    activeIndex === startIndex + index && (
                        <AnimatedText
                            key={item}
                            text={item}
                            gradient={gradient}
                            alignment={alignment}
                        />
                    )
                )}
            </AnimatePresence>
        </div>
    );
}

function AnimatedText({ text, gradient, alignment }: { text: string; gradient: string; alignment: "left" | "right" }) {
    return (
        <motion.div
            initial={{ x: alignment === "right" ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: alignment === "right" ? 100 : -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`absolute ${alignment === "right" ? "right-0 text-right" : "left-0"}`}
        >
            <h2 className={`lg:text-7xl font-bold ${gradient} bg-clip-text text-transparent`}>
                {text}
            </h2>
        </motion.div>
    );
}

// Dot Grid Animation Component
function DotGridAnimation() {
    return (
        <motion.div
            className="h-full w-full hidden lg:flex items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-8">
                {Array.from({ length: 64 }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="w-1 h-1 bg-white/20 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.02,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <FloatingRadialGradient />
        </motion.div>
    );
}

// Floating Radial Gradient Component
function FloatingRadialGradient() {
    return (
        <motion.div
            className="absolute inset-0 bg-gradient-radial from-purple-400/30 to-transparent pointer-events-none"
            animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}