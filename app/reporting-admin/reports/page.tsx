"use client"

import * as React from "react"
import {
    Download,
    Filter,
    Search,
    FileSpreadsheet,
    FileJson,
} from "lucide-react"

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

export default function ReportsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Reports</h1>
                    <p className="text-muted-foreground">Download and analyze system-wide data reports.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Export Selected
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Excel (.xlsx)
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileJson className="mr-2 h-4 w-4" />
                                JSON (.json)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2 max-w-sm">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search reports..."
                            className="pl-8"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Report Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="financial">Financial</SelectItem>
                            <SelectItem value="operational">Operational</SelectItem>
                            <SelectItem value="drivers">Drivers</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Generated Reports Library</CardTitle>
                    <CardDescription>Archive of automated and manual reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report Name</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>Created Date</TableHead>
                                <TableHead>File Size</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reportData.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">{report.type}</TableCell>
                                    <TableCell>{report.period}</TableCell>
                                    <TableCell>{report.date}</TableCell>
                                    <TableCell>{report.size}</TableCell>
                                    <TableCell>
                                        <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                                            {report.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" disabled={report.status === "Processing"}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Report Generator UI Preview */}
            <Card className="bg-slate-50 dark:bg-slate-900 border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <FileText className="size-6" />
                    </div>
                    <h3 className="text-lg font-semibold">Generate Custom Report</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                        Need specific data? Create a custom report by selecting your metrics and time frame.
                    </p>
                    <Button variant="outline">Create Custom Request</Button>
                </CardContent>
            </Card>
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
