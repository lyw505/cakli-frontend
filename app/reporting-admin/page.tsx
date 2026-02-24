"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Cell,
} from "recharts"
import {
    CalendarIcon,
    Download,
    TrendingUp,
    Users,
    ShoppingCart,
    Wallet,
    Info,
    Ban,
    CheckCircle2,
} from "lucide-react"
import { addDays, format, startOfWeek, endOfWeek, isSameDay } from "date-fns"
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
import { Badge } from "@/components/ui/badge"

const hourlyData = [
    { name: "06:00", orders: 12, revenue: 150000 },
    { name: "08:00", orders: 45, revenue: 560000 },
    { name: "10:00", orders: 30, revenue: 380000 },
    { name: "12:00", orders: 55, revenue: 720000 },
    { name: "14:00", orders: 40, revenue: 510000 },
    { name: "16:00", orders: 65, revenue: 950000 },
    { name: "18:00", orders: 85, revenue: 1200000 },
    { name: "20:00", orders: 42, revenue: 620000 },
    { name: "22:00", orders: 15, revenue: 210000 },
]

const statusData = [
    { name: "Selesai", value: 2350, color: "#10b981" },
    { name: "Dibatalkan", value: 142, color: "#ef4444" },
]

const dailyTrendData = [
    { date: "Feb 01", orders: 120 },
    { date: "Feb 02", orders: 132 },
    { date: "Feb 03", orders: 101 },
    { date: "Feb 04", orders: 134 },
    { date: "Feb 05", orders: 90 },
    { date: "Feb 06", orders: 230 },
    { date: "Feb 07", orders: 210 },
]

const areaData = [
    { name: "Malang Kota", orders: 850 },
    { name: "Surabaya Pusat", orders: 720 },
    { name: "Batu City", orders: 480 },
    { name: "Sidoarjo", orders: 390 },
    { name: "Gresik", orders: 150 },
]

export default function ReportingDashboard() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">Selamat datang, Risma!</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className={cn("grid gap-2")}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-[300px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground border-orange-200"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pilih rentang tanggal</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
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
                    <Button variant="outline" size="icon" title="Export CSV/PDF">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Pesanan</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">2.492</div>
                        <p className="text-xs text-muted-foreground mt-1">Dalam periode terpilih</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Pendapatan</CardTitle>
                        <Wallet className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">Rp 45,2jt</div>
                        <p className="text-xs text-muted-foreground mt-1">Pendapatan kotor</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Driver Aktif</CardTitle>
                        <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">142</div>
                        <p className="text-xs text-green-600 font-medium mt-1">Sedang Online</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tingkat Penyelesaian</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">94,3%</div>
                        <p className="text-xs text-muted-foreground mt-1">Rata-rata keberhasilan pemenuhan</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                {/* Busy Hours Chart (Bar Chart as requested) */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Jam Sibuk Puncak</CardTitle>
                        <CardDescription>Grafik batang menunjukkan jam dengan volume pesanan tertinggi.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hourlyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(224, 77, 4, 0.05)' }}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            borderColor: "#E04D04",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                                        }}
                                    />
                                    <Bar
                                        dataKey="orders"
                                        fill="#E04D04"
                                        radius={[4, 4, 0, 0]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Areas */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Area Teratas berdasarkan Volume</CardTitle>
                        <CardDescription>Area dengan konsentrasi pesanan tertinggi.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={areaData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        width={100}
                                    />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="orders" fill="#E04D04" radius={[0, 4, 4, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                {/* Status Comparison (Bar Chart as requested) */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Perbandingan Status Pesanan</CardTitle>
                        <CardDescription>Pesanan Selesai vs. Dibatalkan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statusData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        width={80}
                                    />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm border-t pt-3">
                                <div className="flex items-center gap-2 font-medium">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>2.350 Selesai</span>
                                </div>
                                <span className="text-muted-foreground">94,3%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 font-medium">
                                    <Ban className="h-4 w-4 text-red-500" />
                                    <span>142 Dibatalkan</span>
                                </div>
                                <span className="text-muted-foreground">5,7%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Trend Line Chart */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Tren Pesanan (Periode Terpilih)</CardTitle>
                        <CardDescription>Grafik garis memvisualisasikan fluktuasi volume pesanan selama beberapa hari.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dailyTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            borderColor: "#E04D04",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#E04D04"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#E04D04", strokeWidth: 2, stroke: "white" }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-lg flex gap-3">
                <Info className="h-5 w-5 text-orange-600 shrink-0" />
                <p className="text-sm text-orange-900 leading-relaxed">
                    <strong>Mode Baca-Saja:</strong> Dashboard ini dioptimalkan untuk analisis data dan pelaporan. Tidak ada data yang dapat diubah dari tampilan ini. Untuk kontrol operasional, silakan beralih ke portal Admin Operasional.
                </p>
            </div>
        </div>
    )
}

