"use client"

import * as React from "react"
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Car,
    MessageSquareWarning,
    User,
    LogOut,
    Command,
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
        name: "Operation Admin",
        email: "admin@cakli.com",
        avatar: "/avatars/admin.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/operation-admin",
            icon: <LayoutDashboard className="size-4" />,
            items: [],
        },
        {
            title: "Order Management",
            url: "/operation-admin/orders",
            icon: <ShoppingCart className="size-4" />,
            items: [],
        },
        {
            title: "User Management",
            url: "/operation-admin/users",
            icon: <Users className="size-4" />,
            items: [],
        },
        {
            title: "Driver Management",
            url: "/operation-admin/drivers",
            icon: <Car className="size-4" />,
            items: [],
        },
        {
            title: "Complaints & Disputes",
            url: "/operation-admin/complaints",
            icon: <MessageSquareWarning className="size-4" />,
            items: [],
        },
    ],
}

export function OperationSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                                    <span className="truncate font-semibold">Cakli Admin</span>
                                    <span className="truncate text-xs">Operation Panel</span>
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
