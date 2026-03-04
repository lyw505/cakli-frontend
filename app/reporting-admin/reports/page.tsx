"use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileText,
    FileJson,
    CalendarIcon,
    Search,
    ChevronDown
} from "lucide-react"
<<<<<<< HEAD
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
=======
import Link from "next/link"
>>>>>>> reporting-admin

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const reportData = [
    { id: "RPT-001", type: "Travel Report", date: "2024-02-12", area: "Malang Kota", items: 450, status: "Ready" },
    { id: "RPT-002", type: "Revenue Report", date: "2024-02-12", area: "All Areas", items: 1200, status: "Ready" },
    { id: "RPT-003", type: "Driver Performance", date: "2024-02-11", area: "Surabaya", items: 85, status: "Ready" },
    { id: "RPT-004", type: "Cancellation Report", date: "2024-02-11", area: "Batu City", items: 32, status: "Ready" },
    { id: "RPT-005", type: "Travel Report", date: "2024-02-10", area: "Sidoarjo", items: 210, status: "Processing" },
]



export default function ReportsPage() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })

    return (
        <div className="flex flex-col gap-6 p-6">
<<<<<<< HEAD
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Reports</h1>
                    <p className="text-muted-foreground">Generate and export detailed data for management analysis.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <FileSpreadsheet className="h-4 w-4" /> Export Excel
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <FileText className="h-4 w-4" /> Export PDF
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Report Filters</CardTitle>
                    <CardDescription>Narrow down data by date, category, and operational area.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase">Date Range</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>{format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}</>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase">Area</label>
                            <Select defaultValue="all">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Area" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Areas</SelectItem>
                                    <SelectItem value="malang">Malang Kota</SelectItem>
                                    <SelectItem value="surabaya">Surabaya Pusat</SelectItem>
                                    <SelectItem value="batu">Batu City</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase">Report Category</label>
                            <Select defaultValue="travel">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="travel">Travel Reports</SelectItem>
                                    <SelectItem value="revenue">Revenue Reports</SelectItem>
                                    <SelectItem value="driver">Driver Performance</SelectItem>
                                    <SelectItem value="cancellation">Cancellations</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 gap-2">
                                <Filter className="h-4 w-4" /> Apply Filters
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Reports</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="operational">Operational</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Generated Reports Queue</CardTitle>
                                <CardDescription>View status and download previously generated data batches.</CardDescription>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search reports..." className="pl-8 w-[250px]" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Report ID</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Target Area</TableHead>
                                        <TableHead>Date Created</TableHead>
                                        <TableHead>Record Count</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reportData.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell className="font-mono text-xs">{report.id}</TableCell>
                                            <TableCell className="font-medium">{report.type}</TableCell>
                                            <TableCell>{report.area}</TableCell>
                                            <TableCell>{report.date}</TableCell>
                                            <TableCell>{report.items.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                                                    {report.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="h-8 gap-1" disabled={report.status !== "Ready"}>
                                                    <Download className="h-3 w-3" /> Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
=======
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
>>>>>>> reporting-admin
        </div>
    )
}
