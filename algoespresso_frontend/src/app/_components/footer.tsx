import AlgoEspressoLogo from "@/components/algoespresso-logo";
import { LinkWithIcon } from "@/components/link-with-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import Link from "next/link";
import React from "react"


const FooterSection = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
    ({ className, ...props }, ref) => {
        return (
            <footer
                className={cn("bg-background text-accent-foreground rounded-xl flex flex-col gap-10", className)}
                ref={ref}
                {...props}
            >

                <div className="flex flex-col lg:flex-row gap-8 justify-between items-start align-top">
                    <div className="flex flex-col gap-8">
                        <div className="container flex flex-row gap-4 items-center">
                            <AlgoEspressoLogo />
                            <h1 className="max-md:hidden text-2xl font-azeretMono lg:font-dotGothic">AlgoEspresso</h1>
                        </div>

                        <div className="lg:text-xl"> Learn DSA the right way!</div>
                        <Link
                            className={cn(buttonVariants({ variant: "outline" }), "w-fit p-5 md:rounded-full")}
                            href={"https://github.com/NathanZlion/AlgoEspresso/"}
                            target="_blank"
                        >
                            <Avatar className="h-5 w-auto">
                                <AvatarImage src="github-mark.svg" alt="Source Code" className="dark:invert" />
                                <AvatarFallback>G</AvatarFallback>
                            </Avatar>
                            <div className="text-base font-azeretMono font-extrabold">Star Repo on Github</div>
                        </Link>
                    </div>

                    <div className="w-full lg:px-10 flex max-md:flex-col justify-between max-md:items-start gap-8">
                        <div className="flex flex-col gap-5">
                            <div className="text-xl lg:text-2xl text-primary/35"> Explore </div>
                            <LinkWithIcon title="Problems" href="/problemset" />
                            <LinkWithIcon title="Lessons" href="/lessons" />
                            <LinkWithIcon title="Visuals" href="/visuals" />
                            <LinkWithIcon title="Blogs" href="https://nathanzlion.github.io/categories/algoespresso/" />
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="text-xl lg:text-2xl text-primary/35"> Let&apos;s Connect </div>
                            <LinkWithIcon title="Email" href="mailto:nathandere1357@gmail.com" />
                            <LinkWithIcon title="Linkedin" href="https://www.linkedin.com/in/nathnael-dereje/" />
                            <LinkWithIcon title="Github" href="https://github.com/NathanZlion/" />
                        </div>
                    </div>
                </div>

                <hr className="h-px my-8 bg-accent-foreground/50 border-0 " />

                <div className="container">
                    <div>
                        Made with ☕ by &nbsp; <LinkWithIcon className="inline hover:underline" title="@Nathanzlion" icon={<></>} href="https://github.com/NathanZlion/" target="_blank" />
                    </div>
                    <div className="text-sm text-pretty font-azeretMono">
                        Copyright ©{new Date().getFullYear()} All Rights Reserved
                    </div>
                </div>

            </footer>
        );
    }
)

FooterSection.displayName = "Footer";

export default FooterSection;