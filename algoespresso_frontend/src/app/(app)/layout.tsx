'use client'

import { AppSidebar } from "./_components/sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset className="bg-sidebar">
                <header className="flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />

                        {/* would probably add some info here later */}
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 md:m-5 rounded-lg outline-[0.3px] bg-slate-100 dark:bg-muted overflow-auto">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}


