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

export default function OperationAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#E65100]">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden bg-white rounded-tl-[28px] rounded-bl-[28px]">
                <header className="flex h-14 shrink-0 items-center gap-2 border-b border-gray-100 px-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Operation Admin</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="flex-1 overflow-auto p-6 bg-[#F5F6FA]">
                    {children}
                </main>
            </div>
        </div>
    )
}
