"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Settings2,
    Map,
    ShieldCheck,
    ClipboardList,
    Command,
    TrendingDown,
    TrendingUp,
    BarChart3,
    UserCheck,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

const data = {
    user: {
        name: "Master Admin",
        email: "superadmin@cakli.com",
        avatar: "/avatars/master.jpg",
    },
    navMain: [
        {
            title: "Dasbor Global",
            url: "/master-admin",
            icon: <LayoutDashboard className="size-4" />,
        },
        {
            title: "Manajemen Tarif",
            url: "/master-admin/tariffs",
            icon: <TrendingUp className="size-4" />,
        },
        {
            title: "Area & Zona",
            url: "/master-admin/areas",
            icon: <Map className="size-4" />,
        },
        {
            title: "Akses Admin",
            url: "/master-admin/roles",
            icon: <ShieldCheck className="size-4" />,
        },
        {
            title: "Log Audit",
            url: "/master-admin/audit",
            icon: <ClipboardList className="size-4" />,
        },
        {
            title: "Kebijakan Mitra",
            url: "/master-admin/partners",
            icon: <UserCheck className="size-4" />,
        },
    ],
}

export function MasterSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Cakli Master</span>
                                    <span className="truncate text-xs">Kebijakan & Kontrol</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
