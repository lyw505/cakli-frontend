"use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileJson,
    FileText,
    Search,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { toast } from "sonner"

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
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const cancellationData = [
    { id: "ORD-8919", date: "2024-02-09", reason: "Permintaan pengemudi", type: "Dibatalkan Pelanggan", penalty: "Tidak", area: "Malang Kota" },
    { id: "ORD-8850", date: "2024-02-08", reason: "Pengemudi terlalu jauh", type: "Dibatalkan Pelanggan", penalty: "Tidak", area: "Sukun" },
    { id: "ORD-8842", date: "2024-02-08", reason: "Masalah kendaraan", type: "Dibatalkan Pengemudi", penalty: "Ya", area: "Lowokwaru" },
    { id: "ORD-8790", date: "2024-02-07", reason: "Tidak ada respon", type: "Sistem Habis Waktu", penalty: "Tidak", area: "Blimbing" },
    { id: "ORD-8755", date: "2024-02-06", reason: "Berubah pikiran", type: "Dibatalkan Pelanggan", penalty: "Rp 2.000", area: "Malang Kota" },
]

function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 1, 1),
        to: addDays(new Date(2024, 1, 1), 7),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[260px] justify-start text-left font-normal border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <Search className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd MMM yyyy")} - {format(date.to, "dd MMM yyyy")}
                                </>
                            ) : (
                                format(date.from, "dd MMM yyyy")
                            )
                        ) : (
                            <span>Pilih Rentang Tanggal</span>
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
    )
}

export default function CancellationReportPage() {
    React.useEffect(() => {
        toast.message("Data Berhasil Dimuat", {
            description: "Analisis pembatalan terbaru telah siap ditampilkan.",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analisis Pembatalan</h1>
                    <p className="text-muted-foreground">Tinjau pesanan yang dibatalkan dan alasannya.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-[#E04D04] hover:bg-[#c94504] text-white">
                                <Download className="mr-2 h-4 w-4 text-white" />
                                Ekspor Data
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast.success("Data berhasil di export", { position: "bottom-right", style: { background: "#E6F4EA", color: "#137333", border: "1px solid #CEEAD6" } })}>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Buku Besar Bulanan (.xlsx)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Data berhasil di export", { position: "bottom-right", style: { background: "#E6F4EA", color: "#137333", border: "1px solid #CEEAD6" } })}>
                                <FileText className="mr-2 h-4 w-4" />
                                Laporan Pencairan (.pdf)
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
                            placeholder="Cari ID Pesanan..."
                            className="pl-8 border-gray-200 focus-visible:border-[#E04D04] focus-visible:ring-0 bg-white"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <DatePickerWithRange />
                </div>
                <div className="flex items-center gap-2 ml-12">
                    <Select defaultValue="all">
                        <SelectTrigger className="focus:ring-0 focus:ring-offset-0 border-gray-200 bg-white">
                            <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Area</SelectItem>
                            <SelectItem value="malang-kota">Malang Kota</SelectItem>
                            <SelectItem value="lowokwaru">Lowokwaru</SelectItem>
                            <SelectItem value="sukun">Sukun</SelectItem>
                            <SelectItem value="blimbing">Blimbing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                        <CardTitle className="text-sm font-medium">Tingkat Pembatalan</CardTitle>
                        <AlertCircle className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold text-destructive">4.2%</div>
                        <p className="text-xs text-muted-foreground">+0.5% dari minggu lalu</p>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                        <CardTitle className="text-sm font-medium">Pembatalan oleh Pengemudi</CardTitle>
                        <AlertCircle className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold">1.8%</div>
                        <p className="text-xs text-muted-foreground">Alasan utama: Masalah Kendaraan</p>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                        <CardTitle className="text-sm font-medium">Pembatalan oleh Pelanggan</CardTitle>
                        <AlertCircle className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold">2.4%</div>
                        <p className="text-xs text-muted-foreground">Alasan utama: Pengemudi terlalu jauh</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Log Pesanan Dibatalkan</CardTitle>
                    <CardDescription>Log rincian pembatalan pesanan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Pesanan</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Alasan</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Denda</TableHead>
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

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground font-medium">
                    Menampilkan <span className="font-bold text-foreground">1–{cancellationData.length}</span> dari <span className="font-bold text-foreground">{cancellationData.length}</span> data
                </div>
                <Pagination className="justify-center w-auto mx-0">
                    <PaginationContent className="gap-1">
                        <PaginationItem>
                            <PaginationPrevious href="#" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 border border-gray-200 bg-white rounded-md shadow-none transition-all" text="" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive className="h-8 w-8 bg-[#E04D04] border-0 text-white hover:bg-[#E04D04] hover:text-white rounded-md shadow-none">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="h-8 w-8 border-0 bg-transparent text-gray-700 hover:text-foreground hover:bg-transparent rounded-md shadow-none">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="h-8 w-8 border-0 bg-transparent text-gray-700 hover:text-foreground hover:bg-transparent rounded-md shadow-none">
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis className="h-8 w-8 flex items-center justify-center text-gray-400" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="h-8 w-8 border-0 bg-transparent text-gray-700 hover:text-foreground hover:bg-transparent rounded-md shadow-none">
                                12
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 border border-gray-200 bg-white rounded-md shadow-none transition-all" text="" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
