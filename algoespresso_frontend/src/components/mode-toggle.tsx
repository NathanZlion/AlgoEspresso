"use client";


import { useTheme } from "next-themes"
import { forwardRef, useEffect, useState } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Moon, Sun } from "lucide-react"

const modeToggleVariants = cva(
    "select-none fixed shadow-lg flex items-center justify-between bg-gray-200 dark:bg-gray-900 rounded-full cursor-pointer z-50 -rotate-90 p-0 hover:scale-[101%] transition-transform duration-300 ease-in-out shadow-lg",
    {
        variants: {
            isMobile: {
                true: "right-2 w-12 h-12 justify-center bottom-20",
                false: "left-2 w-28 h-10 top-3/4",
            },
        },
    }
)

export interface ModeToggleProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modeToggleVariants> { }

const ModeToggle = forwardRef<HTMLDivElement, ModeToggleProps>(
    ({ className, ...props }, ref) => {
        const { theme, setTheme } = useTheme()
        const [mounted, setMounted] = useState(false)
        const isMobile = useIsMobile()

        useEffect(() => {
            setMounted(true)
        }, [])

        if (!mounted) return null

        const toggleTheme = () => {
            setTheme(theme === "dark" ? "light" : "dark")
        }

        const isLight = theme === "light"

        return (
            <div
                ref={ref}
                key={"mode-toggle"}
                className={cn(className, modeToggleVariants({ isMobile }))}
                onClick={toggleTheme}
                {...props}
            >
                {isMobile ? (
                    // Mobile: Show only icons
                    <div className="flex items-center justify-center w-full">
                        {isLight ? (
                            <Sun className="text-yellow-500" size={24} />
                        ) : (
                            <Moon className="text-blue-400" size={24} />
                        )}
                    </div>
                ) : (
                    // Desktop: Text with shifting overlay
                    <div className="h-full relative flex w-full items-center justify-between font-medium">
                        <span className="w-full text-center">Dark</span>
                        <span className="w-full text-center">Light</span>
                        <div
                            className={cn(
                                "absolute w-1/2 h-full bg-white dark:bg-black rounded-full shadow-md flex items-center justify-center transition-transform duration-500 ease-in-out scale-95",
                                isLight ? "translate-x-full scale-100" : "translate-x-0 scale-100"
                            )}
                        >
                            <span className="text-black dark:text-white">
                                {isLight ? "Light" : "Dark"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
)

ModeToggle.displayName = "ModeToggle"

export { ModeToggle }
