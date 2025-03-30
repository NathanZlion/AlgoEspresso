"use client"

import * as React from "react"
import { NavUser } from "@/app/(app)/_components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import AlgoEspressoLogo from "@/components/algoespresso-logo"
import { NavGroup, NavMenuItem } from "@/app/(app)/_components/nav-group"

import { IconHome, IconBook2, IconCodeAsterisk, IconCube3dSphere, IconBrandGithub, IconBug, IconMail, IconSparkles } from "@tabler/icons-react"
import { SignInButton, useUser } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"
import { usePathname } from "next/navigation"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMenuItems: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: <IconHome />,
        },
        {
            title: "Learn",
            url: "/learn",
            icon: <IconBook2 />,
        },
        {
            title: "Problemset",
            url: "/problem",
            icon: <IconCodeAsterisk />,
        },
        {
            title: "Visual Library",
            url: "visuals",
            icon: <IconCube3dSphere />,
            items: [
                {
                    title: "Introduction",
                    url: "#"
                },
                {
                    title: "Linkedlist",
                    url: "#"
                }
            ]
        },
    ] as NavMenuItem[],
    footerItems: [
        {
            title: "Github",
            url: "https://github.com/NathanZlion/AlgoEspresso/",
            icon: <IconBrandGithub />,
            target: "_blank"
        },
        {
            title: "Report a bug",
            url: "https://github.com/NathanZlion/AlgoEspresso/issues/new",
            icon: <IconBug />,
            target: "_blank"
        },
        {
            title: "Feature Request",
            url: "https://github.com/NathanZlion/AlgoEspresso/issues/new",
            icon: <IconSparkles />,
            target: "_blank"
        },
        {
            title: "Contact",
            url: "mailto:nathandere1357@gmail.com",
            icon: <IconMail />,
            target: "_blank"
        }
    ] as NavMenuItem[],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isSignedIn, user, isLoaded } = useUser()
    const pathname = usePathname()


    return (
        <Sidebar collapsible="icon" {...props}>

            <SidebarHeader>
                <div className="flex flex-row gap-2 items-center w-full overflow-hidden">
                    <AlgoEspressoLogo />
                    <h1 className="
                    max-md:hidden
                     text-lg font-dotGothic">AlgoEspresso</h1>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <NavGroup items={data.navMenuItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavGroup items={data.footerItems} />

                {!isLoaded &&
                    <div className="flex items-center space-x-2 p-2">
                        <Skeleton className="h-9 w-9 rounded-xl bg-muted" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-1/2 bg-muted" />
                            <Skeleton className="h-4 bg-muted" />
                        </div>
                        <Skeleton className="h-4 w-4 bg-muted rounded-none" />
                    </div>
                }

                {
                    isSignedIn &&
                    <NavUser
                        user={{
                            name: user.firstName || user.username || "",
                            email: user.primaryEmailAddress?.emailAddress || "",
                            avatar: user.imageUrl
                        }}
                    />
                }

                {isLoaded && !isSignedIn && <SignInButton forceRedirectUrl={pathname} />}

            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}