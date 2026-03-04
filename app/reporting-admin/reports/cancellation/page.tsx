"use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileJson,
    Search,
    AlertCircle,
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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const cancellationData = [
    { id: "ORD-8919", date: "2024-02-09", reason: "Driver requested", type: "Customer Cancelled", penalty: "No", area: "Malang Kota" },
    { id: "ORD-8850", date: "2024-02-08", reason: "Driver too far", type: "Customer Cancelled", penalty: "No", area: "Sukun" },
    { id: "ORD-8842", date: "2024-02-08", reason: "Vehicle issue", type: "Driver Cancelled", penalty: "Yes", area: "Lowokwaru" },
    { id: "ORD-8790", date: "2024-02-07", reason: "No response", type: "System Timeout", penalty: "No", area: "Blimbing" },
    { id: "ORD-8755", date: "2024-02-06", reason: "Changed mind", type: "Customer Cancelled", penalty: "Rp 2.000", area: "Malang Kota" },
]

export default function CancellationReportPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cancellation Analysis</h1>
                    <p className="text-muted-foreground">Review cancelled orders and reasons.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Export Report
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
                                PDF (.pdf)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                <div className="col-span-2 lg:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search Order ID..."
                            className="pl-8"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Input type="date" className="w-full" />
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger>
                            <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            <SelectItem value="malang-kota">Malang Kota</SelectItem>
                            <SelectItem value="lowokwaru">Lowokwaru</SelectItem>
                            <SelectItem value="sukun">Sukun</SelectItem>
                            <SelectItem value="blimbing">Blimbing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-end">
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cancellation Rate</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">4.2%</div>
                        <p className="text-xs text-muted-foreground">+0.5% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Driver Cancellations</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.8%</div>
                        <p className="text-xs text-muted-foreground">Main reason: Vehicle Issue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cust. Cancellations</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2.4%</div>
                        <p className="text-xs text-muted-foreground">Main reason: Driver too far</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cancelled Orders Log</CardTitle>
                    <CardDescription>Detailed log of order cancellations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Penalty</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cancellationData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono">{item.id}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.reason}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {item.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{item.area}</TableCell>
                                    <TableCell className="font-medium text-destructive">{item.penalty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
