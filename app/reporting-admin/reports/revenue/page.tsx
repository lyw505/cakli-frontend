"use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileJson,
    FileText,
    Calendar as CalendarIcon,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    CreditCard,
    DollarSign,
    Wallet,
    AlertCircle,
    TrendingUp,
} from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { toast } from "sonner"

import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock data for different periods
const dataByPeriod = {
    harian: {
        kpis: {
            gross: "Rp 1.520.000",
            net: "Rp 420.000",
            settlement: "Rp 1.050.000",
            promo: "Rp 50.000",
            grossChange: "+5.2% dari kemarin",
            netLabel: "Setelah insentif hari ini",
            settlementLabel: "82% dari order selesai",
            promoLabel: "3.2% dari Pendapatan Kotor"
        },
        revenueTrend: [
            { name: "00:00", gross: 50000, net: 15000 },
            { name: "04:00", gross: 20000, net: 5000 },
            { name: "08:00", gross: 250000, net: 75000 },
            { name: "12:00", gross: 450000, net: 135000 },
            { name: "16:00", gross: 350000, net: 105000 },
            { name: "20:00", gross: 400000, net: 85000 },
        ],
        sources: [
            { name: "Komisi CakliBike", percentage: 70, amount: "Rp 1.06M", color: "bg-primary" },
            { name: "Komisi CakliKirim", percentage: 20, amount: "Rp 304K", color: "bg-blue-500" },
            { name: "Biaya Platform", percentage: 10, amount: "Rp 152K", color: "bg-orange-500" },
        ],
        regional: [
            { area: "Malang Kota", orders: 45, gross: "Rp 650.000", net: "Rp 180.000", promo: "Rp 20K" },
            { area: "Lowokwaru", orders: 32, gross: "Rp 420.000", net: "Rp 120.000", promo: "Rp 15K" },
            { area: "Sukun", orders: 28, gross: "Rp 350.000", net: "Rp 95.000", promo: "Rp 10K" },
            { area: "Batu", orders: 12, gross: "Rp 100.000", net: "Rp 25.000", promo: "Rp 5K" },
        ],
        settlements: {
            pending: "Rp 450.000",
            completed: "Rp 950.000",
            history: [
                { id: "BATCH-9925", date: "2024-02-10", count: "12 Mitra", amount: "Rp 350.000", status: "Berhasil" },
                { id: "BATCH-9924", date: "2024-02-10", count: "8 Mitra", amount: "Rp 210.000", status: "Berhasil" },
            ]
        },
        transactions: [
            { id: "REV-24-001H", date: "2024-02-10", source: "Komisi Order", amount: "Rp 15.000", area: "Malang Kota", status: "Settled", type: "Credit" },
            { id: "REF-24-001H", date: "2024-02-10", source: "Refund Pelanggan", amount: "Rp 12.000", area: "Lowokwaru", status: "Disesuaikan", type: "Debit" },
        ]
    },
    mingguan: {
        kpis: {
            gross: "Rp 45.231.000",
            net: "Rp 12.450.000",
            settlement: "Rp 28.500.000",
            promo: "Rp 4.281.000",
            grossChange: "+20.1% dari minggu lalu",
            netLabel: "Setelah insentif & promo",
            settlementLabel: "78% dari order selesai",
            promoLabel: "9.4% dari Pendapatan Kotor"
        },
        revenueTrend: [
            { name: "Sen", gross: 4000000, net: 1200000 },
            { name: "Sel", gross: 3000000, net: 900000 },
            { name: "Rab", gross: 2000000, net: 600000 },
            { name: "Kam", gross: 2780000, net: 800000 },
            { name: "Jum", gross: 1890000, net: 500000 },
            { name: "Sab", gross: 2390000, net: 750000 },
            { name: "Min", gross: 3490000, net: 1100000 },
        ],
        sources: [
            { name: "Komisi CakliBike", percentage: 65, amount: "Rp 29.4M", color: "bg-primary" },
            { name: "Komisi CakliKirim", percentage: 25, amount: "Rp 11.3M", color: "bg-blue-500" },
            { name: "Biaya Platform", percentage: 10, amount: "Rp 4.5M", color: "bg-orange-500" },
        ],
        regional: [
            { area: "Malang Kota", orders: 1250, gross: "Rp 18.500.000", net: "Rp 5.200.000", promo: "Rp 1.2M" },
            { area: "Lowokwaru", orders: 980, gross: "Rp 12.100.000", net: "Rp 3.800.000", promo: "Rp 800K" },
            { area: "Sukun", orders: 850, gross: "Rp 9.500.000", net: "Rp 2.100.000", promo: "Rp 400K" },
            { area: "Batu", orders: 420, gross: "Rp 5.131.000", net: "Rp 1.350.000", promo: "Rp 1.8M" },
        ],
        settlements: {
            pending: "Rp 4.500.000",
            completed: "Rp 12.850.000",
            history: [
                { id: "BATCH-9921", date: "2024-02-09", count: "45 Mitra", amount: "Rp 3.200.000", status: "Diproses" },
                { id: "BATCH-9920", date: "2024-02-08", count: "120 Mitra", amount: "Rp 9.650.000", status: "Berhasil" },
            ]
        },
        transactions: [
            { id: "REV-2024-001", date: "2024-02-09", source: "Komisi Order", amount: "Rp 450.000", area: "Malang Kota", status: "Settled", type: "Credit" },
            { id: "REV-2024-002", date: "2024-02-09", source: "Biaya Layanan App", amount: "Rp 25.000", area: "Lowokwaru", status: "Settled", type: "Credit" },
            { id: "REV-2024-003", date: "2024-02-08", source: "Insentif Mitra", amount: "Rp 150.000", area: "Sukun", status: "Dibayarkan", type: "Debit" },
        ]
    },
    bulanan: {
        kpis: {
            gross: "Rp 185.420.000",
            net: "Rp 52.800.000",
            settlement: "Rp 124.500.000",
            promo: "Rp 18.250.000",
            grossChange: "+12.5% dari bulan lalu",
            netLabel: "Setelah insentif & promo bulanan",
            settlementLabel: "81% dari order selesai",
            promoLabel: "9.8% dari Pendapatan Kotor"
        },
        revenueTrend: [
            { name: "W1", gross: 42000000, net: 12000000 },
            { name: "W2", gross: 48000000, net: 14000000 },
            { name: "W3", gross: 45000000, net: 13000000 },
            { name: "W4", gross: 50420000, net: 13800000 },
        ],
        sources: [
            { name: "Komisi CakliBike", percentage: 60, amount: "Rp 111.2M", color: "bg-primary" },
            { name: "Komisi CakliKirim", percentage: 30, amount: "Rp 55.6M", color: "bg-blue-500" },
            { name: "Biaya Platform", percentage: 10, amount: "Rp 18.5M", color: "bg-orange-500" },
        ],
        regional: [
            { area: "Malang Kota", orders: 5400, gross: "Rp 78.500.000", net: "Rp 22.200.000", promo: "Rp 5.2M" },
            { area: "Lowokwaru", orders: 4200, gross: "Rp 52.100.000", net: "Rp 14.800.000", promo: "Rp 3.8M" },
            { area: "Sukun", orders: 3800, gross: "Rp 40.500.000", net: "Rp 11.100.000", promo: "Rp 2.4M" },
            { area: "Batu", orders: 1200, gross: "Rp 14.320.000", net: "Rp 4.700.000", promo: "Rp 6.8M" },
        ],
        settlements: {
            pending: "Rp 15.200.000",
            completed: "Rp 109.300.000",
            history: [
                { id: "BATCH-FEB-01", date: "2024-02-05", count: "450 Mitra", amount: "Rp 45.200.000", status: "Berhasil" },
                { id: "BATCH-JAN-04", date: "2024-01-28", count: "442 Mitra", amount: "Rp 42.650.000", status: "Berhasil" },
            ]
        },
        transactions: [
            { id: "REV-FEB-001", date: "2024-02-05", source: "Komisi Bulanan", amount: "Rp 1.450.000", area: "Malang Kota", status: "Settled", type: "Credit" },
            { id: "ADJ-FEB-001", date: "2024-02-04", source: "Koreksi Sistem", amount: "Rp 250.000", area: "Semua Area", status: "Disesuaikan", type: "Debit" },
        ]
    }
}

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
                        <CalendarIcon className="mr-2 h-4 w-4" />
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

export default function RevenueReportPage() {
    const [period, setPeriod] = React.useState<'harian' | 'mingguan' | 'bulanan'>('mingguan');
    const currentData = dataByPeriod[period];

    React.useEffect(() => {
        toast.message("Data Berhasil Dimuat", {
            description: "Laporan keuangan terbaru telah siap ditampilkan.",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kokpit Keuangan</h1>
                    <p className="text-muted-foreground">Panel kendali ekonomi menyeluruh: Pendapatan, Pencairan, dan Penyesuaian.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-secondary/50 p-1.5 rounded-xl border">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`px-6 py-2.5 h-auto rounded-lg transition-all ${period === 'harian' ? 'bg-white dark:bg-slate-950 shadow-sm text-foreground hover:bg-white dark:hover:bg-slate-950' : 'text-muted-foreground hover:bg-transparent hover:text-muted-foreground'}`}
                            onClick={() => setPeriod('harian')}
                        >
                            Harian
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`px-6 py-2.5 h-auto rounded-lg transition-all ${period === 'mingguan' ? 'bg-white dark:bg-slate-950 shadow-sm text-foreground hover:bg-white dark:hover:bg-slate-950' : 'text-muted-foreground hover:bg-transparent hover:text-muted-foreground'}`}
                            onClick={() => setPeriod('mingguan')}
                        >
                            Mingguan
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`px-6 py-2.5 h-auto rounded-lg transition-all ${period === 'bulanan' ? 'bg-white dark:bg-slate-950 shadow-sm text-foreground hover:bg-white dark:hover:bg-slate-950' : 'text-muted-foreground hover:bg-transparent hover:text-muted-foreground'}`}
                            onClick={() => setPeriod('bulanan')}
                        >
                            Bulanan
                        </Button>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
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

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className=" bg-secondary/50 py-7 px-3 rounded-2xl border w-fit h-auto gap-2 items-center">
                    <TabsTrigger
                        value="overview"
                        className="px-8 py-2.5 h-auto rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-foreground transition-all duration-200"
                    >
                        Ringkasan
                    </TabsTrigger>
                    <TabsTrigger
                        value="breakdown"
                        className="px-8 py-2.5 h-auto rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-foreground transition-all duration-200"
                    >
                        Rincian & Layanan
                    </TabsTrigger>
                    <TabsTrigger
                        value="settlement"
                        className="px-8 py-2.5 h-auto rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-foreground transition-all duration-200"
                    >
                        Pencairan Mitra
                    </TabsTrigger>
                    <TabsTrigger
                        value="adjustments"
                        className="px-8 py-2.5 h-auto rounded-xl text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-foreground transition-all duration-200"
                    >
                        Refund & Penyesuaian
                    </TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-4">
                    {/* KPI Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="relative overflow-hidden">
                            <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                                <CardTitle className="text-sm font-medium">Total Pendapatan Kotor</CardTitle>
                                <DollarSign className="h-4 w-4 text-slate-400" />
                            </CardHeader>
                            <CardContent className="pl-10">
                                <div className="text-2xl font-bold">{currentData.kpis.gross}</div>
                                <p className="text-xs text-muted-foreground">{currentData.kpis.grossChange}</p>
                            </CardContent>
                        </Card>
                        <Card className="relative overflow-hidden">
                            <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                                <CardTitle className="text-sm font-medium">Pendapatan Bersih</CardTitle>
                                <TrendingUp className="h-4 w-4 text-slate-400" />
                            </CardHeader>
                            <CardContent className="pl-10">
                                <div className="text-2xl font-bold text-green-600">{currentData.kpis.net}</div>
                                <p className="text-xs text-muted-foreground">{currentData.kpis.netLabel}</p>
                            </CardContent>
                        </Card>
                        <Card className="relative overflow-hidden">
                            <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                                <CardTitle className="text-sm font-medium">Pembayaran ke Mitra</CardTitle>
                                <Wallet className="h-4 w-4 text-slate-400" />
                            </CardHeader>
                            <CardContent className="pl-10">
                                <div className="text-2xl font-bold">{currentData.kpis.settlement}</div>
                                <p className="text-xs text-muted-foreground">{currentData.kpis.settlementLabel}</p>
                            </CardContent>
                        </Card>
                        <Card className="relative overflow-hidden">
                            <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pl-10">
                                <CardTitle className="text-sm font-medium">Bakar Uang Promo</CardTitle>
                                <AlertCircle className="h-4 w-4 text-slate-400" />
                            </CardHeader>
                            <CardContent className="pl-10">
                                <div className="text-2xl font-bold text-red-500">{currentData.kpis.promo}</div>
                                <p className="text-xs text-muted-foreground">{currentData.kpis.promoLabel}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Section Placeholder */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Tren Pendapatan</CardTitle>
                                <CardDescription>Performa {period.charAt(0).toUpperCase() + period.slice(1)} Pendapatan Kotor vs Bersih</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[200px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={currentData.revenueTrend}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis
                                                dataKey="name"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => value >= 1000000 ? `${value / 1000000}M` : `${value / 1000}k`}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                                                formatter={(value: any) => [`Rp ${value.toLocaleString()}`, ""]}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="gross" name="Kotor" stroke="#8884d8" strokeWidth={2} />
                                            <Line type="monotone" dataKey="net" name="Bersih" stroke="#82ca9d" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Sumber Pendapatan</CardTitle>
                                <CardDescription>Distribusi pemasukan berdasarkan kategori</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {currentData.sources.map((source, index) => (
                                        <div className="flex items-center" key={index}>
                                            <div className="w-full space-y-1">
                                                <p className="text-sm font-medium leading-none">{source.name}</p>
                                                <div className="h-2 w-full rounded-full bg-secondary">
                                                    <div className={`h-full rounded-full ${source.color}`} style={{ width: `${source.percentage}%` }} />
                                                </div>
                                                <p className="text-xs text-muted-foreground">{source.percentage}% ({source.amount})</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* BREAKDOWN TAB */}
                <TabsContent value="breakdown" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performa Regional</CardTitle>
                            <CardDescription>Rincian pendapatan per area operasional.</CardDescription>
                        </CardHeader>
                        <div className="px-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Cari wilayah..."
                                    className="pl-8 border-gray-200 focus-visible:border-[#E04D04] focus-visible:ring-0 bg-white"
                                />
                            </div>
                            <DatePickerWithRange />
                        </div>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Wilayah/Kota</TableHead>
                                        <TableHead>Total Order</TableHead>
                                        <TableHead>Pendapatan Kotor</TableHead>
                                        <TableHead>Pendapatan Bersih</TableHead>
                                        <TableHead>Penggunaan Promo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentData.regional.map((region, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{region.area}</TableCell>
                                            <TableCell>{region.orders.toLocaleString()}</TableCell>
                                            <TableCell>{region.gross}</TableCell>
                                            <TableCell>{region.net}</TableCell>
                                            <TableCell className={region.promo.includes('TINGGI') ? "text-red-500" : ""}>{region.promo}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-muted-foreground font-medium">
                            Menampilkan <span className="font-bold text-foreground">1–{currentData.regional.length}</span> dari <span className="font-bold text-foreground">{currentData.regional.length}</span> wilayah
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
                </TabsContent>

                {/* SETTLEMENTS TAB */}
                <TabsContent value="settlement" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Menunggu Pencairan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentData.settlements.pending}</div>
                                <p className="text-xs text-muted-foreground">Akan diproses hari ini</p>
                            </CardContent>
                            <CardFooter>
                                <Button size="sm" className="w-full">Proses Batch</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Telah Dicairkan ({period === 'harian' ? 'Hari Ini' : period === 'mingguan' ? 'Minggu Ini' : 'Bulan Ini'})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{currentData.settlements.completed}</div>
                                <p className="text-xs text-muted-foreground">Berhasil ditransfer</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Riwayat Pencairan</CardTitle>
                            <CardDescription>Riwayat dana yang ditransfer ke mitra.</CardDescription>
                        </CardHeader>
                        <div className="px-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Cari batch..."
                                    className="pl-8 border-gray-200 focus-visible:border-[#E04D04] focus-visible:ring-0 bg-white"
                                />
                            </div>
                            <DatePickerWithRange />
                        </div>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID Batch</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Jlh Mitra</TableHead>
                                        <TableHead>Total Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentData.settlements.history.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-mono">{item.id}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.count}</TableCell>
                                            <TableCell>{item.amount}</TableCell>
                                            <TableCell><Badge className={item.status === 'Berhasil' ? 'bg-[#E04D04] text-white hover:bg-[#E04D04]' : ''} variant={item.status === 'Berhasil' ? undefined : 'outline'}>{item.status}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-muted-foreground font-medium">
                            Menampilkan <span className="font-bold text-foreground">1–{currentData.settlements.history.length}</span> dari <span className="font-bold text-foreground">{currentData.settlements.history.length}</span> batch
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
                </TabsContent>

                {/* ADJUSTMENTS TAB */}
                <TabsContent value="adjustments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Audit Log Keuangan</CardTitle>
                            <CardDescription>Catatan permanen penyesuaian manual, refund, dan koreksi.</CardDescription>
                        </CardHeader>
                        <div className="px-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex flex-1 items-center gap-2">
                                <div className="relative w-full max-w-sm">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari ID Transaksi..."
                                        className="pl-8 border-gray-200 focus-visible:border-[#E04D04] focus-visible:ring-0 bg-white"
                                    />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-[150px] focus:ring-0 focus:ring-offset-0 border-gray-200 bg-white">
                                        <SelectValue placeholder="Tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Tipe</SelectItem>
                                        <SelectItem value="credit">Kredit (Masuk)</SelectItem>
                                        <SelectItem value="debit">Debit (Keluar)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DatePickerWithRange />
                        </div>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID Transaksi</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Tipe</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Area</TableHead>
                                        <TableHead className="text-right">Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentData.transactions.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-mono text-xs">{item.id}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.type === "Credit" ? "outline" : "secondary"}>
                                                    {item.type === "Credit" ? "Kredit" : "Debit"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{item.source}</TableCell>
                                            <TableCell>{item.area}</TableCell>
                                            <TableCell className={`text-right font-medium ${item.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                                                {item.type === "Credit" ? "+" : "-"} {item.amount}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-muted-foreground font-medium">
                            Menampilkan <span className="font-bold text-foreground">1–{currentData.transactions.length}</span> dari <span className="font-bold text-foreground">{currentData.transactions.length}</span> transaksi
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
                </TabsContent>
            </Tabs>
        </div>
    )
}
