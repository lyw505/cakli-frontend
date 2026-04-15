"use client"

import * as React from "react"
import {
    Download,
    Filter,
    Search,
    FileSpreadsheet,
    FileJson,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const reportData = [
    { id: "REP-001", type: "Order Report", period: "Jan 2024", status: "Ready", size: "1.2 MB", date: "2024-02-01" },
    { id: "REP-002", type: "Revenue Report", period: "Jan 2024", status: "Ready", size: "850 KB", date: "2024-02-01" },
    { id: "REP-003", type: "Driver Performance", period: "Jan 2024", status: "Processing", size: "Pending", date: "2024-02-05" },
    { id: "REP-004", type: "Cancellation Analysis", period: "Jan 2024", status: "Ready", size: "540 KB", date: "2024-02-02" },
]



import { toast } from "sonner"

export default function ReportsPage() {
    React.useEffect(() => {
        toast.message("Dashboard Laporan Dimuat", {
            description: "Silakan pilih kategori laporan yang ingin Anda tinjau.",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
                <p className="text-muted-foreground">Select a specific report category to view detailed analytics.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/reporting-admin/history" className="block group">
                    <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-accent/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="size-5 text-primary" />
                                Order History
                            </CardTitle>
                            <CardDescription>
                                Complete audit log of all orders with status and details.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/reporting-admin/reports/revenue" className="block group">
                    <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-accent/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="size-5 text-green-600" />
                                Revenue Report
                            </CardTitle>
                            <CardDescription>
                                Financial breakdown, income sources, and transaction logs.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/reporting-admin/reports/driver-performance" className="block group">
                    <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-accent/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="size-5 text-blue-600" />
                                Driver Performance
                            </CardTitle>
                            <CardDescription>
                                Driver metrics, ratings, completion rates, and earnings.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>

                <Link href="/reporting-admin/reports/cancellation" className="block group">
                    <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-accent/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="size-5 text-red-600" />
                                Cancellation Analysis
                            </CardTitle>
                            <CardDescription>
                                Analysis of cancelled orders, reasons, and penalties.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </div>
    )
}

function FileText(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
        </svg>
    )
}
