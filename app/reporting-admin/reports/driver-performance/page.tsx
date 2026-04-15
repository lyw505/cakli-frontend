"use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileJson,
    FileText,
    Search,
    Star,
    CheckCircle2,
    XCircle,
    TrendingUp,
    Trophy,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const driverData = [
    { id: "DRV-1024", name: "Agus Santoso", area: "Malang Kota", orders: 124, completion: "98%", rating: 4.8, status: "Aktif", cancelRate: "2%" },
    { id: "DRV-1025", name: "Siti Aminah", area: "Lowokwaru", orders: 98, completion: "92%", rating: 4.6, status: "Aktif", cancelRate: "8%" },
    { id: "DRV-1026", name: "Joko Wow", area: "Sukun", orders: 145, completion: "99%", rating: 4.9, status: "Aktif", cancelRate: "1%" },
    { id: "DRV-1027", name: "Rudi Hartono", area: "Blimbing", orders: 82, completion: "88%", rating: 4.2, status: "Peringatan", cancelRate: "12%" },
    { id: "DRV-1028", name: "Hendra P.", area: "Malang Kota", orders: 56, completion: "94%", rating: 4.7, status: "Aktif", cancelRate: "6%" },
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

export default function DriverPerformanceReportPage() {
    React.useEffect(() => {
        toast.message("Data Berhasil Dimuat", {
            description: "Analisis kinerja pengemudi telah siap ditampilkan.",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Wawasan Kinerja Pengemudi</h1>
                    <p className="text-muted-foreground">Analisis metrik pengemudi, penilaian, pembatalan, dan tingkat aktivitas.</p>
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

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                        <CardTitle className="text-sm font-medium">Performa Terbaik</CardTitle>
                        <Trophy className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold">Joko Wow</div>
                        <p className="text-xs text-muted-foreground">145 Pesanan bulan ini</p>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                        <CardTitle className="text-sm font-medium">Rata-rata Penilaian</CardTitle>
                        <Star className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold">4.72</div>
                        <p className="text-xs text-muted-foreground">Berdasarkan 500+ ulasan</p>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                        <CardTitle className="text-sm font-medium">Rata-rata Penyelesaian</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold">94.5%</div>
                        <p className="text-xs text-muted-foreground">Target Operasional: 95%</p>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                        <CardTitle className="text-sm font-medium">Tingkat Pembatalan Tinggi</CardTitle>
                        <XCircle className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold">12 Pengemudi</div>
                        <p className="text-xs text-muted-foreground">{">"} 10% Tingkat Pembatalan</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                <div className="col-span-2 lg:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari Nama atau ID Pengemudi..."
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

            <Card>
                <CardHeader>
                    <CardTitle>Metrik Pengemudi</CardTitle>
                    <CardDescription>Data kinerja untuk periode yang dipilih.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pengemudi</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Pesanan</TableHead>
                                <TableHead>Penyelesaian</TableHead>
                                <TableHead>Tingkat Pembatalan</TableHead>
                                <TableHead>Penilaian</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {driverData.map((driver) => (
                                <TableRow key={driver.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 hidden md:block">
                                                <AvatarImage src={`/avatars/${driver.id}.jpg`} alt={driver.name} />
                                                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{driver.name}</span>
                                                <span className="text-xs text-muted-foreground">{driver.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{driver.area}</TableCell>
                                    <TableCell>{driver.orders}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {parseInt(driver.completion) > 90 ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-orange-500" />
                                            )}
                                            {driver.completion}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-red-500 font-medium">
                                        {driver.cancelRate}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            {driver.rating}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={driver.status === "Aktif" ? "bg-[#E04D04] text-white hover:bg-[#E04D04]" : ""} variant={driver.status === "Aktif" ? undefined : "destructive"}>
                                            {driver.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground font-medium">
                    Menampilkan <span className="font-bold text-foreground">1–{driverData.length}</span> dari <span className="font-bold text-foreground">{driverData.length}</span> pengemudi
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
