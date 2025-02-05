import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react"


const MagicButtonVariants = cva(
    "",
    {
        variants: {
            roundness: {
                default: "rounded-full",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
                full: "rounded-full"
            }
        },
        defaultVariants: {
            roundness: "default",
        }
    }
)

export interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof MagicButtonVariants> { };

const MagicButton = React.forwardRef<HTMLButtonElement, MagicButtonProps>(
    ({ className, children, roundness, ...props }, ref) => {
        return (
            <button
                className={cn(MagicButtonVariants({ roundness, className }),
                    "relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
                )}
                ref={ref}
                {...props}
            >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                <span className={cn(MagicButtonVariants({ roundness, className }),
                    "inline-flex h-full w-full cursor-pointer items-center justify-center  bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl",
                )}>
                    {children}
                </span>
            </button >
        )
    }
)


MagicButton.displayName = "MagicButton"

export { MagicButton }