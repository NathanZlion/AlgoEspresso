import AlgoEspressoLogo from "@/components/algoespresso-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { MagicButton } from "@/components/ui/magic-button";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex flex-row p-2 justify-between border-0 border-b-2 border-b-foreground/15">
            <div className="container flex flex-row gap-4 items-center ps-5 lg:ps-20">
                <AlgoEspressoLogo />
                <h1 className="text-lg hidden lg:block"> AlgoEspresso </h1>
            </div>

            {/* option */}
            <div className="flex flex-row justify-between items-center pe-5 lg:pe-20 gap-5">

                <MagicButton className="font-azeretMono" onClick={() => { console.log("Clicked") }}>
                    Get Started
                </MagicButton>

                <Button variant={"link"} className="p-0">
                    <Link href={"https://github.com/NathanZlion/AlgoEspresso/"} target="_blank">
                        <Avatar>
                            <AvatarImage src="github-mark.svg" alt="Source Code" className="dark:invert" sizes="30" />
                            <AvatarFallback>Github</AvatarFallback>
                        </Avatar>
                    </Link>
                </Button>
            </div>


            {/* floating nav bar which becomes visible when the top nav disappears on scroll down */}
            <FloatingNav navItems={[
                {
                    name: "AlgoEspresso",
                    icon: <AlgoEspressoLogo />,
                    link: "/"
                },
                {
                    name: "",
                    icon: <MagicButton className="font-azeretMono" onClick={() => { console.log("Clicked") }}>
                        Get Started
                    </MagicButton>,
                    link: "/"
                }
            ]} />

        </nav>
    );
}