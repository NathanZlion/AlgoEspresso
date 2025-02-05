import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority"
import { ExternalLinkIcon } from "lucide-react";
import React from "react";

const linkWithIconVariants = cva(
    "container flex gap-3",
    {
        variants: {
            iconPosition: {
                leading: "flex-row-reverse",
                trailing: "flex-row"
            }
        },
        defaultVariants: {
            iconPosition: "trailing"
        }
    }
)

export interface LinkWithIconProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkWithIconVariants> {
    icon?: JSX.Element;
}

const LinkWithIcon = React.forwardRef<HTMLAnchorElement, LinkWithIconProps>(
    ({ className, title, icon, iconPosition, ...props }, ref) => {
        return (
            <a
                className={cn(linkWithIconVariants({ iconPosition }), className)}
                ref={ref}
                {...props}
            >
                <span className="text-base lg:text-md">{title}</span>
                {icon || <ExternalLinkIcon />}
            </a>
        )
    }
)


export { LinkWithIcon }