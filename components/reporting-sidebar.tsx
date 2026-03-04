"use client"

import * as React from "react"
import {
    BarChart3,
    FileText,
    History,
    Command,
    Users,
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

// Dummy user data
const data = {
    user: {
        name: "Reporting Admin",
        email: "finance@cakli.com",
        avatar: "/avatars/reporting.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/reporting-admin",
            icon: <BarChart3 className="size-4" />,
        },
        {
            title: "Order History",
            url: "/reporting-admin/history",
            icon: <History className="size-4" />,
        },
        {
            title: "Revenue Report",
            url: "/reporting-admin/reports/revenue",
            icon: <BarChart3 className="size-4" />,
        },
        {
            title: "Driver Performance",
            url: "/reporting-admin/reports/driver-performance",
            icon: <FileText className="size-4" />,
        },
        {
            title: "Cancellation Report",
            url: "/reporting-admin/reports/cancellation",
            icon: <FileText className="size-4" />,
        },
    ],
}

export function ReportingSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                                    <span className="truncate font-semibold">Cakli Reporting</span>
                                    <span className="truncate text-xs">Analysis Panel</span>
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
