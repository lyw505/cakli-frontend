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
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

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
    { id: "RPT-001", type: "Laporan Perjalanan", date: "2024-02-12", area: "Kota Malang", items: 450, status: "Ready" },
    { id: "RPT-002", type: "Laporan Pendapatan", date: "2024-02-12", area: "Semua Area", items: 1200, status: "Ready" },
    { id: "RPT-003", type: "Performa Driver", date: "2024-02-11", area: "Surabaya", items: 85, status: "Ready" },
    { id: "RPT-004", type: "Laporan Pembatalan", date: "2024-02-11", area: "Kota Batu", items: 32, status: "Ready" },
    { id: "RPT-005", type: "Laporan Perjalanan", date: "2024-02-10", area: "Sidoarjo", items: 210, status: "Processing" },
]

function translateStatus(status: string) {
    if (status === "Ready") return "Tersedia"
    if (status === "Processing") return "Memproses"
    return status
}

export default function ReportsPage() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Laporan Sistem</h1>
                    <p className="text-muted-foreground">Buat dan ekspor data terperinci untuk analisis manajemen.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <FileSpreadsheet className="h-4 w-4" /> Ekspor Excel
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <FileText className="h-4 w-4" /> Ekspor PDF
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filter Laporan</CardTitle>
                    <CardDescription>Persempit data berdasarkan tanggal, kategori, dan area operasional.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase">Rentang Tanggal</label>
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
                                            <span>Pilih rentang tanggal</span>
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
                                    <SelectItem value="all">Semua Area</SelectItem>
                                    <SelectItem value="malang">Kota Malang</SelectItem>
                                    <SelectItem value="surabaya">Pusat Surabaya</SelectItem>
                                    <SelectItem value="batu">Kota Batu</SelectItem>
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
                                    <SelectItem value="travel">Laporan Perjalanan</SelectItem>
                                    <SelectItem value="revenue">Laporan Pendapatan</SelectItem>
                                    <SelectItem value="driver">Performa Driver</SelectItem>
                                    <SelectItem value="cancellation">Pembatalan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 gap-2">
                                <Filter className="h-4 w-4" /> Terapkan Filter
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">Semua Laporan</TabsTrigger>
                    <TabsTrigger value="financial">Keuangan</TabsTrigger>
                    <TabsTrigger value="operational">Operasional</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Antrean Laporan yang Dibuat</CardTitle>
                                <CardDescription>Lihat status dan unduh batch data yang dibuat sebelumnya.</CardDescription>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Cari laporan..." className="pl-8 w-[250px]" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID Laporan</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Area Target</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead>Jumlah Rekaman</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
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
                                                    {translateStatus(report.status)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="h-8 gap-1" disabled={report.status !== "Ready"}>
                                                    <Download className="h-3 w-3" /> Unduh
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
        </div>
    )
}
