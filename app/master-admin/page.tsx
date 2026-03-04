"use client"

import * as React from "react"
import Link from "next/link"
import {
    Area,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import {
    ShieldAlert,
    Globe,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    ArrowRight,
    Activity,
    DollarSign,
    Percent,
    Flag,
    MapPin,
    AlertCircle,
    Zap,
    ChevronsUpDown,
    Check,
    ClipboardList,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Tooltip as UITooltip,
    TooltipContent as UITooltipContent,
    TooltipProvider as UITooltipProvider,
    TooltipTrigger as UITooltipTrigger,
} from "@/components/ui/tooltip"

// --- DATA ---

const ALL_CITIES = [
    { key: "malang", label: "Malang Kota", color: "#E04D04" },
    { key: "surabaya", label: "Surabaya", color: "#3b82f6" },
    { key: "batu", label: "Batu", color: "#22c55e" },
    { key: "sidoarjo", label: "Sidoarjo", color: "#8b5cf6" },
    { key: "kepanjen", label: "Kepanjen", color: "#ec4899" },
    { key: "pasuruan", label: "Pasuruan", color: "#f59e0b" },
]

const monthlyPerformanceData = [
    { name: "Sep", malang: 38500, surabaya: 52000, batu: 14200, sidoarjo: 9800, kepanjen: 4200, pasuruan: 7600 },
    { name: "Okt", malang: 41200, surabaya: 55800, batu: 15600, sidoarjo: 10500, kepanjen: 4800, pasuruan: 8100 },
    { name: "Nov", malang: 39800, surabaya: 58200, batu: 13900, sidoarjo: 11200, kepanjen: 5100, pasuruan: 7900 },
    { name: "Des", malang: 45600, surabaya: 62100, batu: 17800, sidoarjo: 12400, kepanjen: 5600, pasuruan: 9200 },
    { name: "Jan", malang: 42300, surabaya: 59400, batu: 16200, sidoarjo: 11800, kepanjen: 5300, pasuruan: 8700 },
    { name: "Feb", malang: 44800, surabaya: 61500, batu: 18100, sidoarjo: 13100, kepanjen: 5900, pasuruan: 9500 },
]

const ASPECT_LABELS: Record<string, string> = {
    revenue: "Pendapatan (Rp)",
    order_volume: "Volume Pesanan",
    cancel_rate: "Tingkat Pembatalan (%)",
    margin: "Margin per Area (%)",
}

export default function MasterDashboard() {
    const [selectedAreas, setSelectedAreas] = React.useState<string[]>(["malang", "surabaya", "batu"])
    const [selectedAspect, setSelectedAspect] = React.useState("revenue")

    const toggleArea = (key: string) => {
        setSelectedAreas(prev =>
            prev.includes(key) ? prev.filter(a => a !== key) : [...prev, key]
        )
    }

    const selectedCityObjects = ALL_CITIES.filter(c => selectedAreas.includes(c.key))

    return (
        <UITooltipProvider>
            <div className="flex flex-col gap-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kontrol Sistem Global</h1>
                        <p className="text-muted-foreground text-sm">Data terkonsolidasi tingkat tinggi dan perbandingan regional.</p>
                    </div>
                </div>

                {/* ===== BENTO ROW 1: KPI Cards (4 cols) ===== */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <Card className="overflow-hidden">
                        <div className="flex items-stretch h-full">
                            <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                            <div className="flex-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                    <CardTitle className="text-xs font-medium">Total Pendapatan Regional</CardTitle>
                                    <UITooltip>
                                        <UITooltipTrigger asChild>
                                            <Globe className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                        </UITooltipTrigger>
                                        <UITooltipContent side="top" className="text-[10px]">
                                            Nilai total transaksi kotor sebelum pemotongan biaya.
                                        </UITooltipContent>
                                    </UITooltip>
                                </CardHeader>
                                <CardContent className="px-3 pb-3">
                                    <div className="text-xl font-bold">Rp 124.5M</div>
                                    <p className="text-[10px] text-cakli-green font-bold flex items-center">
                                        <TrendingUp className="size-2.5 mr-0.5" /> +8.2% <span className="text-muted-foreground font-normal ml-1">vs bulan lalu</span>
                                    </p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="flex items-stretch h-full">
                            <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                            <div className="flex-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                    <CardTitle className="text-xs font-medium">Tingkat Pertumbuhan Pesanan</CardTitle>
                                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="px-3 pb-3">
                                    <div className="text-xl font-bold text-cakli-green">+14.3%</div>
                                    <p className="text-[10px] text-muted-foreground">Pertumbuhan MoM · Feb vs Jan</p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="flex items-stretch h-full">
                            <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                            <div className="flex-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                    <CardTitle className="text-xs font-medium">Margin Keuntungan Regional</CardTitle>
                                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="px-3 pb-3">
                                    <div className="text-xl font-bold">18.5%</div>
                                    <p className="text-[10px] text-muted-foreground">Rata-rata di 12 zona</p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="flex items-stretch h-full">
                            <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                            <div className="flex-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                    <CardTitle className="text-xs font-medium">Tingkat Uptime Sistem</CardTitle>
                                    <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="px-3 pb-3">
                                    <div className="text-xl font-bold text-cakli-green">99.999%</div>
                                    <p className="text-[10px] text-muted-foreground">Five Nines · ~5,26 mnt/thn</p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ===== BENTO ROW 2: Chart (wide) + Peringatan Konfigurasi (narrow) ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    {/* Chart - takes 8 of 12 cols */}
                    <Card className="lg:col-span-8">
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <CardTitle className="text-sm">Perbandingan Performa Regional</CardTitle>
                                    <CardDescription className="text-[11px]">Data bulanan. Pilih kota & aspek perbandingan.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    {/* City Dropdown (Multi-select Popover) */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 min-w-[140px] justify-between">
                                                {selectedAreas.length === 0 ? "Pilih Kota" : `${selectedAreas.length} Kota Dipilih`}
                                                <ChevronsUpDown className="size-3 text-muted-foreground" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-52 p-2" align="end">
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider px-2 pb-1.5">Pilih Kota</p>
                                            {ALL_CITIES.map(city => (
                                                <label
                                                    key={city.key}
                                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
                                                >
                                                    <Checkbox
                                                        checked={selectedAreas.includes(city.key)}
                                                        onCheckedChange={() => toggleArea(city.key)}
                                                        className="size-3.5"
                                                    />
                                                    <span
                                                        className="size-2 rounded-full shrink-0"
                                                        style={{ backgroundColor: city.color }}
                                                    />
                                                    <span className="text-xs">{city.label}</span>
                                                </label>
                                            ))}
                                        </PopoverContent>
                                    </Popover>

                                    {/* Aspect Filter */}
                                    <Select value={selectedAspect} onValueChange={setSelectedAspect}>
                                        <SelectTrigger className="w-[160px] h-7 text-xs">
                                            <SelectValue placeholder="Aspek" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="revenue">Pendapatan</SelectItem>
                                            <SelectItem value="order_volume">Volume Pesanan</SelectItem>
                                            <SelectItem value="cancel_rate">Tingkat Pembatalan</SelectItem>
                                            <SelectItem value="margin">Margin per Area</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-1 pr-4 pb-3">
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyPerformanceData}>
                                        <defs>
                                            {selectedCityObjects.map(city => (
                                                <linearGradient key={city.key} id={`color-${city.key}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={city.color} stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor={city.color} stopOpacity={0} />
                                                </linearGradient>
                                            ))}
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={11} tickLine={false} axisLine={false} />
                                        <Tooltip />
                                        <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                                        {selectedCityObjects.map(city => (
                                            <Area
                                                key={city.key}
                                                type="monotone"
                                                dataKey={city.key}
                                                name={city.label}
                                                stroke={city.color}
                                                fillOpacity={1}
                                                fill={`url(#color-${city.key})`}
                                            />
                                        ))}
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-[10px] text-muted-foreground text-center">
                                Aspek: <span className="font-bold">{ASPECT_LABELS[selectedAspect]}</span>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Right sidebar: Peringatan + Audit Log stacked */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        {/* Peringatan Konfigurasi */}
                        <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200">
                            <CardHeader className="pb-1 pt-3 px-4">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="size-3.5 text-yellow-600" />
                                    <CardTitle className="text-xs font-bold text-yellow-800">Peringatan Konfigurasi</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-3">
                                <p className="text-[11px] text-yellow-700 leading-relaxed">
                                    Terdeteksi pembaruan zona Surabaya. Harap verifikasi struktur tarif baru sebelum pemrosesan akhir hari.
                                </p>
                                <Button size="sm" variant="link" className="px-0 h-auto text-yellow-800 font-bold mt-1 text-[11px]" asChild>
                                    <Link href="/master-admin/tariffs">Ke Konfigurasi Tarif →</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Indikator Risiko */}
                        <Card className="flex-1 border-red-200 dark:border-red-900">
                            <CardHeader className="pb-2 pt-3 px-4">
                                <CardTitle className="text-xs font-bold flex items-center gap-1.5">
                                    <AlertCircle className="size-3.5 text-red-500" /> Indikator Risiko
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 px-4 pb-3">
                                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/20">
                                    <Flag className="size-3.5 text-red-500 mt-0.5 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-bold text-red-800 dark:text-red-300">Bendera Kecurigaan Fraud</p>
                                        <p className="text-[10px] text-red-600 dark:text-red-400 leading-snug">3 transaksi mencurigakan di Surabaya Pusat (24 jam terakhir).</p>
                                    </div>
                                    <Badge variant="destructive" className="text-[9px] h-4 px-1.5 shrink-0">3</Badge>
                                </div>
                                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                                    <MapPin className="size-3.5 text-orange-500 mt-0.5 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-bold text-orange-800 dark:text-orange-300">Wilayah Sengketa Tinggi</p>
                                        <p className="text-[10px] text-orange-600 dark:text-orange-400 leading-snug">Kepanjen: rasio sengketa 8.2% (ambang 5%).</p>
                                    </div>
                                    <Badge className="bg-orange-600 text-[9px] h-4 px-1.5 shrink-0">8.2%</Badge>
                                </div>
                                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                                    <Zap className="size-3.5 text-yellow-600 mt-0.5 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-bold text-yellow-800 dark:text-yellow-300">Lonjakan Pembatalan Abnormal</p>
                                        <p className="text-[10px] text-yellow-600 dark:text-yellow-400 leading-snug">Pembatalan +42% di Batu (18:00-20:00, cuaca buruk).</p>
                                    </div>
                                    <Badge variant="secondary" className="text-[9px] h-4 px-1.5 shrink-0">+42%</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* ===== BENTO ROW 3: Unit Economics + Kebijakan + Log Audit (3 cols) ===== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Unit Economic Snapshot */}
                    <Card>
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-bold flex items-center gap-1.5">
                                Ringkasan Unit Ekonomi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1.5 px-4 pb-3">
                            {[
                                { label: "Pendapatan per Pesanan", value: "Rp 18.450", trend: "+2.1%" },
                                { label: "Biaya per Pesanan", value: "Rp 12.800", trend: "-0.8%" },
                                { label: "Rata-rata Pembayaran Driver", value: "80%", trend: null },
                                { label: "Tingkat Pengambilan Platform", value: "20%", trend: null },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between text-[11px] border-b pb-1.5 last:border-0 last:pb-0">
                                    <span className="text-muted-foreground">{item.label}</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-bold">{item.value}</span>
                                        {item.trend && (
                                            <Badge variant="secondary" className="text-[9px] h-4 px-1">{item.trend}</Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Kebijakan Kritis */}
                    <Card>
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-bold">Kebijakan Kritis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 px-4 pb-3">
                            <div className="rounded-md border p-2.5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium">Mode Tarif Utama</p>
                                    <p className="text-[10px] text-muted-foreground">Harga Regional Standar</p>
                                </div>
                                <Badge className="text-[10px] h-5">Aktif</Badge>
                            </div>
                            <div className="rounded-md border p-2.5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium">Ekspansi Zona Baru</p>
                                    <p className="text-[10px] text-muted-foreground">Medan, Palembang (Tertunda)</p>
                                </div>
                                <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2" asChild>
                                    <Link href="/master-admin/areas">Detail <ArrowRight className="size-2.5 ml-1" /></Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Log Audit 3 Terbaru */}
                    <Card>
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-bold flex items-center gap-1.5">
                                Log Audit Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 px-4 pb-3">
                            {[
                                { time: "10:32", user: "Admin Rafi", action: "Mengubah tarif zona Surabaya Pusat", type: "Tarif" },
                                { time: "09:15", user: "Admin Dina", action: "Menambah driver baru (ID: DRV-0892)", type: "Driver" },
                                { time: "08:47", user: "System", action: "Backup otomatis database selesai", type: "Sistem" },
                            ].map((log, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-2 rounded-md border">
                                    <span className="text-[10px] text-muted-foreground font-mono shrink-0 pt-0.5">{log.time}</span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-medium leading-snug">{log.action}</p>
                                        <p className="text-[10px] text-muted-foreground">{log.user}</p>
                                    </div>
                                    <Badge variant="secondary" className="text-[9px] h-4 px-1.5 shrink-0">{log.type}</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </UITooltipProvider>
    )
}
