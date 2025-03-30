import AlgoEspressoLogo from "@/components/algoespresso-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { MagicButton } from "@/components/ui/magic-button";
import { SignUpButton } from "@clerk/nextjs";
import { IconBook2, IconCodeAsterisk, IconCube3dSphere, IconMenu2, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type NavItem = {
    name: string;
    link: string;
    icon?: JSX.Element;
};

const navItems: NavItem[] = [
    { name: "Learn", link: "/learn", icon: <IconBook2 /> },
    { name: "Problems", link: "/problems", icon: <IconCodeAsterisk /> },
    { name: "Visuals Library", link: "/visuals", icon: <IconCube3dSphere /> }
];

export default function LandingPageNavBar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="top-0 left-0 w-full bg-background/80 shadow-md z-50 flex flex-row p-2 justify-between border-b-2 border-b-foreground/15 max-md:fixed">
            {/* Logo & Mobile Menu Button */}
            <div className="flex flex-row gap-4 items-center ps-5 lg:ps-20 w-fit">
                <button className="md:hidden" onClick={() => setOpen(true)}>
                    <IconMenu2 size={24} />
                </button>
                <AlgoEspressoLogo />
                <h1 className="text-lg max-md:hidden"> AlgoEspresso </h1>
            </div>

            {/* Desktop Nav */}
            <div className="max-md:hidden flex flex-row justify-start items-center px-5 w-full space-x-8">
                {navItems.map(({ name, link, icon }) => (
                    <Link key={name} className="flex gap-2" href={link}>
                        {icon} <span>{name}</span>
                    </Link>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-row justify-between items-center pe-5 lg:pe-20 gap-5 font-azeretMono">
                <SignUpButton mode="modal" signInForceRedirectUrl={"/"}>
                    <MagicButton className="max-md:hidden font-azeretMono">Get Started</MagicButton>
                </SignUpButton>
                <Button variant="link" className="p-0">
                    <Link href="https://github.com/NathanZlion/AlgoEspresso/" target="_blank">
                        <Avatar>
                            <AvatarImage src="github-mark.svg" alt="Source Code" className="dark:invert" sizes="30" />
                            <AvatarFallback>Github</AvatarFallback>
                        </Avatar>
                    </Link>
                </Button>
            </div>

            {/* Floating Nav for scroll visibility */}
            <FloatingNav className="max-md:hidden" navItems={
                [
                    {
                        link: "#",
                        name: "",
                        icon: <AlgoEspressoLogo />
                    },
                    ...navItems
                ]
            } />

            {/* Mobile Sidebar */}
            <MobileNavbarSidebar open={open} setOpen={setOpen} />
        </nav>
    );
}



const MobileNavbarSidebar = ({ open, setOpen }: { open: boolean; setOpen: (state: boolean) => void; }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpen]);

    return (
        <motion.div
            ref={sidebarRef}
            initial={{ x: "-100%" }}
            animate={{ x: open ? "0%" : "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 bg-background shadow-lg p-6 z-50 md:hidden"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_event, info) => {
                if (info.point.x < -50) {
                    setOpen(false);
                }
            }}
        >
            <Button
                className="absolute top-4 right-4"
                onClick={() => setOpen(false)}
                variant={"outline"}
            >
                <IconX size={24} />
            </Button>
            <div className="flex flex-col gap-6 mt-10">
                {navItems.map(({ name, link, icon }) => (
                    <Link key={name} href={link} className="flex gap-3 items-center text-lg font-medium" onClick={() => setOpen(false)}>
                        {icon} {name}
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};