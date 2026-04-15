"use client"

import * as React from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Line,
    LineChart,
} from "recharts"
import {
    TrendingUp,
    TrendingDown,
    Map,
    ArrowUpRight,
    ArrowDownRight,
    AlertCircle,
    Download,
    Filter,
    FileSpreadsheet,
    FileText,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { toast } from "sonner"

const analyticsData = {
    harian: {
        highlights: [
            { title: "Kota Pendapatan Tertinggi", value: "Sidoarjo", detail: "Menyumbang 72% dari total pendapatan kotor harian" },
            { title: "Tingkat Pembatalan Terendah", value: "Batu", detail: "1.2% - Performa operasional luar biasa hari ini" },
            { title: "Pertumbuhan Tercepat", value: "Malang Kota", detail: "+12.5% Pesanan dari kemarin" }
        ],
        comparison: [
            { name: "Malang Kota", revenue: 1200000, orders: 45, cancellation: 2.1 },
            { name: "Sidoarjo", revenue: 2100000, orders: 82, cancellation: 1.5 },
            { name: "Batu", revenue: 850000, orders: 32, cancellation: 0.8 },
            { name: "Lowokwaru", revenue: 1560000, orders: 58, cancellation: 3.2 },
            { name: "Blimbing", revenue: 1100000, orders: 42, cancellation: 2.8 },
        ]
    },
    mingguan: {
        highlights: [
            { title: "Kota Pendapatan Tertinggi", value: "Sidoarjo", detail: "Menyumbang 65% dari total pendapatan kotor mingguan" },
            { title: "Tingkat Pembatalan Terendah", value: "Malang Kota", detail: "1.8% - Skor kepuasan pelanggan tertinggi (4.9/5)" },
            { title: "Pertumbuhan Tercepat", value: "Sukun", detail: "+8.2% WoW Akuisisi Pengguna Baru" }
        ],
        comparison: [
            { name: "Malang Kota", revenue: 8400000, orders: 310, cancellation: 1.8 },
            { name: "Sidoarjo", revenue: 12500000, orders: 480, cancellation: 2.5 },
            { name: "Batu", revenue: 5200000, orders: 190, cancellation: 1.2 },
            { name: "Lowokwaru", revenue: 9800000, orders: 360, cancellation: 3.8 },
            { name: "Blimbing", revenue: 7600000, orders: 280, cancellation: 3.1 },
        ]
    },
    bulanan: {
        highlights: [
            { title: "Kota Pendapatan Tertinggi", value: "Surabaya", detail: "Menyumbang 68% dari total pendapatan kotor" },
            { title: "Tingkat Pembatalan Terendah", value: "Batu", detail: "2.1% - Skor kepuasan pelanggan tertinggi (4.9/5)" },
            { title: "Pertumbuhan Tercepat", value: "Sidoarjo", detail: "+5.8% MoM Akuisisi Pengguna Baru" }
        ],
        comparison: [
            { name: "Malang Kota", revenue: 32000000, orders: 1200, cancellation: 4.2 },
            { name: "Sidoarjo", revenue: 45000000, orders: 1850, cancellation: 3.5 },
            { name: "Batu", revenue: 18000000, orders: 750, cancellation: 2.1 },
            { name: "Lowokwaru", revenue: 38000000, orders: 1420, cancellation: 5.8 },
            { name: "Blimbing", revenue: 26000000, orders: 980, cancellation: 4.9 },
        ]
    },
    tahunan: {
        highlights: [
            { title: "Kota Pendapatan Tertinggi", value: "Surabaya", detail: "Menyumbang 62% dari total pendapatan tahun ini" },
            { title: "Tingkat Pembatalan Terendah", value: "Sidoarjo", detail: "3.2% - Konsistensi performa terbaik sepanjang tahun" },
            { title: "Pertumbuhan Tercepat", value: "Malang Kota", detail: "+24% YoY Ekspansi Layanan" }
        ],
        comparison: [
            { name: "Malang Kota", revenue: 384000000, orders: 14500, cancellation: 3.8 },
            { name: "Sidoarjo", revenue: 520000000, orders: 21000, cancellation: 3.2 },
            { name: "Batu", revenue: 210000000, orders: 8800, cancellation: 4.1 },
            { name: "Lowokwaru", revenue: 440000000, orders: 16200, cancellation: 6.2 },
            { name: "Blimbing", revenue: 310000000, orders: 11500, cancellation: 5.5 },
        ]
    }
}

export default function AnalyticsPage() {
    const [period, setPeriod] = React.useState<keyof typeof analyticsData>("harian")
    const currentData = analyticsData[period];

    React.useEffect(() => {
        toast.message("Analitik Berhasil Dimuat", {
            description: "Wawasan lintas area terbaru telah siap dianalisis.",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analitik Lintas Area</h1>
                    <p className="text-muted-foreground">Metrik performa komparatif di seluruh wilayah operasional.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Tabs value={period} onValueChange={(v: any) => setPeriod(v)}>
                        <TabsList>
                            <TabsTrigger value="harian">Harian</TabsTrigger>
                            <TabsTrigger value="mingguan">Mingguan</TabsTrigger>
                            <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
                            <TabsTrigger value="tahunan">Tahunan</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0 border-gray-200 bg-white">
                            <SelectValue placeholder="Filter Wilayah" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Wilayah</SelectItem>
                            <SelectItem value="active">Hanya Aktif</SelectItem>
                            <SelectItem value="growth">Pertumbuhan Tinggi</SelectItem>
                        </SelectContent>
                    </Select>
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

            {/* Key Comparison Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="pb-2 pl-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                            Kota Pendapatan Tertinggi
                            <ArrowUpRight className="h-4 w-4 text-slate-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold flex items-center gap-2">
                            {currentData.highlights[0].value}
                        </div>
                        <p className="text-xs text-muted-foreground">{currentData.highlights[0].detail}</p>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="pb-2 pl-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                            Tingkat Pembatalan Terendah
                            <TrendingDown className="h-4 w-4 text-slate-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold flex items-center gap-2">
                            {currentData.highlights[1].value}
                        </div>
                        <p className="text-xs text-muted-foreground">{currentData.highlights[1].detail}</p>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden">
                    <div className="absolute left-4 top-4 bottom-4 w-1 bg-[#E04D04] rounded-full" />
                    <CardHeader className="pb-2 pl-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                            Pertumbuhan Tercepat
                            <TrendingUp className="h-4 w-4 text-slate-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-10">
                        <div className="text-2xl font-bold flex items-center gap-2">
                            {currentData.highlights[2].value}
                        </div>
                        <p className="text-xs text-muted-foreground">{currentData.highlights[2].detail}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Revenue vs Orders Comparison */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pendapatan vs Volume Pesanan</CardTitle>
                        <CardDescription>Korelasi antara volume perjalanan dan pendapatan kotor per kota.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={currentData.comparison}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="revenue" name="Pendapatan" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                    <Bar yAxisId="right" dataKey="orders" name="Pesanan" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Cancel Rate Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Analisis Tingkat Pembatalan</CardTitle>
                        <CardDescription>Persentase perjalanan yang dibatalkan oleh pengemudi atau pengguna.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={currentData.comparison} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis dataKey="name" type="category" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="cancellation" name="Tingkat Pembatalan %" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Expansion Strategy */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Map className="size-5 text-blue-600" />
                        <CardTitle>Wawasan Strategi Ekspansi</CardTitle>
                    </div>
                    <CardDescription>Rekomendasi berbasis AI untuk zona operasional berikutnya berdasarkan data saat ini.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <ArrowUpRight className="size-4 text-green-500" /> Target Utama: Gresik
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            Limpahan permintaan tinggi dari Surabaya Barat. Estimasi 15% penguasaan pasar dalam 3 bulan pertama karena pola komuter zona industri.
                        </p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <AlertCircle className="size-4 text-orange-500" /> Butuh Optimasi: Surabaya Timur
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            Tingkat pembatalan saat ini (6.8%) menunjukkan kekurangan pengemudi. Merekomendasikan peningkatan insentif pengemudi di Zona Timur sebesar 5% untuk mengimbangi permintaan.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
