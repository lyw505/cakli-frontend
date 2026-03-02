import React from "react"
import { AppSidebar } from "@/components/app-sidebar"

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

                <main className="flex-1 overflow-auto p-6 bg-[#FDFAF8]">
                    {children}
                </main>
            </div>
        </div>
    )
}
