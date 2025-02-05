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
                className={cn("bg-accent/45 rounded-xl flex flex-col gap-10", className)}
                ref={ref}
                {...props}
            >
                <div className="container flex flex-row gap-4 items-center">
                    <AlgoEspressoLogo />
                    <h1 className="text-2xl font-azeretMono lg:font-dotGothic">AlgoEspresso</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 justify-between items-start align-top">
                    <div className="flex flex-col gap-8">
                        <div className="lg:text-xl"> Learn DSA the right way!</div>
                        {/* <embed src="https://github-readme-stats.vercel.app/api/pin/?username=NathanZlion&repo=AlgoEspresso&theme=tokyonight&show_owner=true" type="" className="w-full" /> */}
                        <Link
                            className={cn(buttonVariants({ variant: "outline" }), "w-fit p-5 rounded-full")}
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

                    <div className="w-full lg:px-10 flex flex-row justify-evenly">
                        <div className="flex flex-col gap-5">
                            <div className="lg:text-xl text-primary/35"> Explore </div>
                            <LinkWithIcon title="Wiki" href="" />
                            <LinkWithIcon title="Blogs" href="" />
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="lg:text-xl text-primary/35"> Let&apos;s Connect </div>
                            <LinkWithIcon title="Email" href="mailto:nathandere1357@gmail.com" />
                            <LinkWithIcon title="Linkedin" href="https://www.linkedin.com/in/nathnael-dereje/" />
                            <LinkWithIcon title="Github" href="https://github.com/NathanZlion/" />
                        </div>
                    </div>
                </div>

                <hr className="h-px my-8 bg-accent-foreground/50 border-0 " />

                <div className="container">
                    <div> Made with ❤ by &nbsp;
                        <LinkWithIcon
                            className="inline hover:underline"
                            title="@Nathanzlion"
                            icon={<></>}
                            href="https://github.com/NathanZlion/" />
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