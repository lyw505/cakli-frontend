import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ReportingAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        /* Full-screen orange background */
        <div className="flex h-screen overflow-hidden bg-[#E65100]">
            {/* Sidebar renders directly on orange bg */}
            <AppSidebar />

            {/* White content rectangle — radius only on top-left & bottom-left */}
            <div className="flex flex-col flex-1 overflow-hidden bg-white rounded-tl-[28px] rounded-bl-[28px]">
                <header className="flex h-14 shrink-0 items-center gap-2 border-b border-gray-100 px-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Reporting Admin</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Analytics</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="flex-1 overflow-auto p-6 bg-[#FDFAF8]">
                    {children}
                </main>
            </div>
        </div>
    )
}
