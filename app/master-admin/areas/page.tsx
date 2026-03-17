"use client"

import * as React from "react"
import { toast } from "sonner"
import {
    Map as MapIcon,
    Navigation,
    Layers,
    Maximize2,
    Users,
    Truck,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Percent,
    Activity,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    ArrowRight,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    CheckCircle2,
    Clock,
    ChevronRight,
    Info,
    LayoutGrid,
    MapPin
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
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

// --- MOCK DATA ---
const ZONES = [
    { id: "ZN-01", name: "Malang Kota", city: "Malang", hours: "24/7", density: "High", drivers: 45, util: 82, volume: 1240, revenue: 24500000, margin: 18.5, cancel: 2.1, status: "Active" },
    { id: "ZN-02", name: "Surabaya Pusat", city: "Surabaya", hours: "24/7", density: "Critical", drivers: 112, util: 94, volume: 3850, revenue: 78200000, margin: 14.2, cancel: 4.5, status: "Monitoring" },
    { id: "ZN-03", name: "Batu Wisata", city: "Batu", hours: "06:00-22:00", density: "Medium", drivers: 18, util: 65, volume: 450, revenue: 12800000, margin: 22.1, cancel: 1.8, status: "Active" },
    { id: "ZN-04", name: "Sidoarjo Kota", city: "Sidoarjo", hours: "24/7", density: "High", drivers: 34, util: 78, volume: 920, revenue: 19400000, margin: 16.8, cancel: 3.2, status: "Expansion" },
    { id: "ZN-05", name: "Kepanjen Sub", city: "Malang", hours: "08:00-20:00", density: "Low", drivers: 8, util: 42, volume: 120, revenue: 3200000, margin: 8.2, cancel: 5.6, status: "Limited Hours" },
]

function translateStatus(status: string) {
    if (status === "Active") return "Aktif"
    if (status === "Monitoring") return "Pemantauan"
    if (status === "Expansion") return "Ekspansi"
    if (status === "Limited Hours") return "Jam Terbatas"
    return status
}

function translateDensity(density: string) {
    if (density === "High") return "Tinggi"
    if (density === "Critical") return "Kritis"
    if (density === "Medium") return "Sedang"
    if (density === "Low") return "Rendah"
    return density
}

function translateRisk(risk: string) {
    if (risk === "Low") return "RENDAH"
    if (risk === "Medium") return "SEDANG"
    if (risk === "High") return "TINGGI"
    if (risk === "Critical") return "KRITIS"
    return risk
}

export default function AreasPage() {
    const [viewMode, setViewMode] = React.useState("table")
    const [selectedZone, setSelectedZone] = React.useState<typeof ZONES[0] | null>(null)
    const [riskModalOpen, setRiskModalOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")

    const filteredZones = ZONES.filter(z =>
        z.name.toLowerCase().includes(search.toLowerCase()) ||
        z.id.toLowerCase().includes(search.toLowerCase()) ||
        z.city.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <TooltipProvider>
            <div className="flex flex-col gap-6 p-6">
                {/* 1. HEADER SECTION */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Manajemen Area & Zona</h1>
                        <p className="text-muted-foreground text-sm">Kontrol performa, ekspansi, dan stabilitas operasional regional.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-cakli-orange hover:bg-orange-700">
                                    <Plus className="mr-2 h-4 w-4" /> Tambah Zona Baru
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Manajemen Ekspansi: Tambah Zona Baru</DialogTitle>
                                    <DialogDescription>Input parameter ekspansi untuk kalkulasi feasibility.</DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 py-4">
                                    <div className="space-y-4 border-r pr-4">
                                        <div className="grid gap-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pilih Kota</label>
                                            <Select defaultValue="malang">
                                                <SelectTrigger className="h-9">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="malang">Malang</SelectItem>
                                                    <SelectItem value="surabaya">Surabaya</SelectItem>
                                                    <SelectItem value="batu">Batu</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="h-40 bg-slate-100 rounded-md border flex items-center justify-center text-xs text-muted-foreground border-dashed">
                                            [Map Draw Tool Placeholder]
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg space-y-2 border border-blue-100">
                                            <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Proyeksi 30 Hari</p>
                                            <div className="flex justify-between text-xs">
                                                <span>Est. Permintaan</span>
                                                <span className="font-bold">~1.2k pesanan/hari</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span>Saran Driver</span>
                                                <span className="font-bold">45 unit</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span>Skor Risiko</span>
                                                <Badge className="bg-green-500 h-4 text-[9px]">RENDAH</Badge>
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground leading-relaxed">
                                            *Sistem memperkirakan Break-Even Point (BEP) tercapai dalam 14 hari operasi normal.
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => toast.info("Zona berhasil disimpan sebagai draf")}>Simpan sebagai Draf</Button>
                                    <Button className="bg-cakli-orange" onClick={() => toast.success("Ekspansi zona baru berhasil dimulai")}>Mulai Ekspansi</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* 1. GLOBAL SUMMARY CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                    {[
                        { label: "Total Zona", value: "24", sub: "5 Aktif Sekarang", icon: Navigation },
                        { label: "Pemantauan", value: "3", sub: "Butuh Tindakan", icon: AlertCircle },
                        { label: "Pendapatan (7H)", value: "Rp 1.2M", sub: "+12.4%", icon: DollarSign },
                        { label: "Margin Rata-rata", value: "16.8%", sub: "Diatas Target", icon: Percent },
                        { label: "Driver Aktif", value: "482", sub: "92% Online", icon: Users },
                        { label: "Utilisasi Rata-rata %", value: "74%", sub: "Optimal", icon: Activity },
                    ].map((card, i) => (
                        <Card key={i} className="overflow-hidden border-slate-200 transition-all">
                            <div className="flex items-stretch h-full relative">
                                <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                                <div className="flex-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                        <CardTitle className="text-xs font-semibold text-slate-700">{card.label}</CardTitle>
                                        <card.icon className="h-3.5 w-3.5 text-slate-400" />
                                    </CardHeader>
                                    <CardContent className="px-3 pb-3">
                                        <div className="text-xl font-bold text-slate-900">{card.value}</div>
                                        <p className="text-[10px] text-muted-foreground font-medium">{card.sub}</p>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* 2. PERFORMANCE SNAPSHOT + PENDING REQUESTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* Left: 2 rows of 2 performance snapshot cards */}
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Performa Tertinggi", value: "Surabaya Pusat", sub: "Rp 78.2jt Pendapatan", icon: TrendingUp },
                                { label: "Margin Terendah", value: "Kepanjen Sub", sub: "8.2% (Target 15%)", icon: TrendingDown },
                            ].map((card, i) => (
                                <Card key={i} className="overflow-hidden">
                                    <div className="flex items-stretch h-full">
                                        <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                                        <div className="flex-1">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                                <CardTitle className="text-xs font-medium">{card.label}</CardTitle>
                                                <card.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent className="px-3 pb-3">
                                                <div className="text-xl font-bold">{card.value}</div>
                                                <p className="text-[10px] text-muted-foreground">{card.sub}</p>
                                            </CardContent>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Tingkat Batal Tinggi", value: "Surabaya Pusat", sub: "4.5% dari volume total", icon: AlertTriangle },
                                { label: "Pertumbuhan Tercepat", value: "Sidoarjo Kota", sub: "+22% volume pesanan", icon: ArrowUpRight },
                            ].map((card, i) => (
                                <Card key={i} className="overflow-hidden">
                                    <div className="flex items-stretch h-full">
                                        <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                                        <div className="flex-1">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                                <CardTitle className="text-xs font-medium">{card.label}</CardTitle>
                                                <card.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent className="px-3 pb-3">
                                                <div className="text-xl font-bold">{card.value}</div>
                                                <p className="text-[10px] text-muted-foreground">{card.sub}</p>
                                            </CardContent>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Right: Pending Regional Requests (half page) */}
                    <Card className="border-none ring-1 ring-slate-200 h-full flex flex-col">
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <Clock className="size-4 text-cakli-orange" /> Permintaan Regional Tertunda
                            </CardTitle>
                            <CardDescription className="text-xs">Persetujuan perubahan strategis yang diajukan oleh Admin Operasional.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 overflow-y-auto min-h-0">
                            {[
                                { type: "Ekspansi", detail: "Zona Baru: Malang Selatan", requester: "Admin Goldi", risk: "Sedang", sla: "tersisa 14j" },
                                { type: "Penggabungan", detail: "Gabung ZN-12 & ZN-14 (Surabaya)", requester: "System", risk: "Rendah", sla: "tersisa 2h" },
                            ].map((req, i) => (
                                <div key={i} className="flex items-center justify-between px-4 py-3 border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold">{req.type}</span>
                                            <Badge variant="secondary" className={`text-[9px] h-4 ${req.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-slate-100'}`}>{req.risk}</Badge>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground truncate">{req.detail}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-muted-foreground">{req.requester}</span>
                                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <Clock className="size-2.5" /> {req.sla}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-[10px] h-7 gap-1 shrink-0">
                                        Tinjau <ChevronRight className="size-3" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* 3. AREA STRUCTURE VIEW */}
                <Tabs defaultValue="table" className="w-full" onValueChange={setViewMode}>
                    <div className="flex items-center justify-between mb-4">
                        <TabsList className="bg-slate-100 h-9 p-1">
                            <TabsTrigger value="table" className="text-xs gap-1.5 h-7">
                                <LayoutGrid className="size-3.5" /> Tampilan Tabel
                            </TabsTrigger>
                            <TabsTrigger value="map" className="text-xs gap-1.5 h-7">
                                <MapIcon className="size-3.5" /> Tampilan Peta
                            </TabsTrigger>
                        </TabsList>

                        {/* 5. SEARCH & FILTER */}
                        <div className="flex items-center gap-2">
                            <div className="relative group">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-cakli-orange transition-colors" />
                                <Input
                                    placeholder="Cari ID zona, kota..."
                                    className="pl-9 h-9 w-[280px] bg-white border-slate-200 text-xs"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <TabsContent value="table" className="mt-0">
                        <Card className="border-none ring-1 ring-slate-200">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="text-[10px] font-bold uppercase py-4 pl-6">Nama & ID Zona</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-4">Status & Kota</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-4">Demografi</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-4">Status Armada</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-4">Performa (Hari Ini)</TableHead>
                                            <TableHead className="text-[10px) font-bold uppercase py-4">Keuangan</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-4 text-right pr-6">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredZones.map((zone) => (
                                            <TableRow key={zone.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <TableCell className="pl-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm tracking-tight">{zone.name}</span>
                                                        <span className="text-[10px] text-muted-foreground font-mono">{zone.id}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1.5">
                                                        <Badge
                                                            variant="outline"
                                                            className={`text-[9px] w-fit h-4 px-1 ${zone.status === 'Active' ? 'border-green-300 text-green-700 bg-green-50' :
                                                                zone.status === 'Monitoring' ? 'border-red-300 text-red-700 bg-red-50' :
                                                                    'border-blue-300 text-blue-700 bg-blue-50'
                                                                }`}
                                                        >
                                                            {translateStatus(zone.status)}
                                                        </Badge>
                                                        <span className="text-[11px] text-muted-foreground">{zone.city}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-0.5">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[11px] text-muted-foreground">Kepadatan:</span>
                                                            <span className={`text-[11px] font-bold ${zone.density === 'Critical' ? 'text-red-600' :
                                                                zone.density === 'High' ? 'text-orange-600' : 'text-slate-600'
                                                                }`}>{translateDensity(zone.density)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[11px] text-muted-foreground">Jam:</span>
                                                            <span className="text-[11px] font-medium">{zone.hours}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1 w-24">
                                                        <div className="flex justify-between text-[10px]">
                                                            <span>{zone.drivers} driver</span>
                                                            <span className="font-bold">{zone.util}% util</span>
                                                        </div>
                                                        <Progress value={zone.util} className="h-1 bg-slate-100" />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-xs">{zone.volume.toLocaleString()} pesanan</span>
                                                        <span className={`text-[10px] flex items-center gap-0.5 ${zone.cancel > 4 ? 'text-red-600 font-bold' : 'text-muted-foreground'}`}>
                                                            {zone.cancel}% tkt pembatalan
                                                            {zone.cancel > 4 && <AlertTriangle className="size-2.5" />}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-xs">Rp {(zone.revenue / 1000000).toFixed(1)}jt</span>
                                                        <span className="text-[10px] text-cakli-green font-bold">{zone.margin}% margin</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <Button variant="ghost" size="icon" className="size-8" onClick={() => { setSelectedZone(zone); setRiskModalOpen(true) }}>
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>

                            {/* ── PAGINATION ── */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 mt-auto">
                                <p className="text-[10px] text-muted-foreground font-medium">
                                    Menampilkan <span className="text-slate-900 font-bold">1–{filteredZones.length}</span> dari <span className="text-slate-900 font-bold">{ZONES.length}</span> zona
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                                        <ChevronRight className="size-4 rotate-180" />
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3].map((p) => (
                                            <Button key={p} variant={p === 1 ? "default" : "ghost"} size="sm" className={`h-8 w-8 p-0 text-[10px] font-bold ${p === 1 ? "bg-cakli-orange hover:bg-cakli-orange/90 text-white" : ""}`}>
                                                {p}
                                            </Button>
                                        ))}
                                        <span className="text-[10px] px-1 text-muted-foreground">...</span>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[10px] font-bold">
                                            12
                                        </Button>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                        <ChevronRight className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="map" className="mt-0 h-[600px]">
                        <div className="flex h-full gap-4">
                            {/* Interactive Map Placeholder */}
                            <Card className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-200 dark:text-slate-800">
                                    <MapIcon className="size-64 opacity-20" />
                                </div>

                                {/* Map Controls */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-lg border space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-green-500" />
                                            <span className="text-[10px] font-bold">Kesehatan: OK</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-orange-500" />
                                            <span className="text-[10px] font-bold">Stagnan</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 rounded-full bg-red-500" />
                                            <span className="text-[10px] font-bold">Risiko/Rugi</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Animated Dots for Zones */}
                                <div
                                    className="absolute top-1/4 left-1/3 size-4 bg-green-500 rounded-full cursor-pointer hover:scale-125 transition-transform animate-pulse ring-4 ring-green-500/20"
                                    onClick={() => setSelectedZone(ZONES[0])}
                                />
                                <div
                                    className="absolute top-1/2 left-1/2 size-5 bg-orange-500 rounded-full cursor-pointer hover:scale-125 transition-transform animate-pulse ring-4 ring-orange-500/20"
                                    onClick={() => setSelectedZone(ZONES[1])}
                                />
                                <div
                                    className="absolute top-[60%] left-[40%] size-3 bg-red-500 rounded-full cursor-pointer hover:scale-125 transition-transform ring-4 ring-red-500/20"
                                    onClick={() => setSelectedZone(ZONES[4])}
                                />

                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm border-none"><Maximize2 className="size-4" /></Button>
                                    <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm border-none"><Layers className="size-4" /></Button>
                                </div>
                            </Card>

                            {/* Map Side Panel */}
                            <Card className="w-80 border-none ring-1 ring-slate-200">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Wawasan Zona</CardTitle>
                                    <CardDescription className="text-xs">Pilih zona di peta untuk melihat detail.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {selectedZone ? (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div className="p-3 bg-slate-50 rounded-lg border">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{selectedZone.id}</p>
                                                <h3 className="text-lg font-bold">{selectedZone.name}</h3>
                                                <Badge variant="secondary" className="mt-1 text-[9px] h-4">{selectedZone.city}</Badge>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="p-2 border rounded-md">
                                                    <p className="text-[9px] text-muted-foreground uppercase font-bold">Pendapatan</p>
                                                    <p className="text-xs font-bold">Rp {(selectedZone.revenue / 1000000).toFixed(1)}jt</p>
                                                </div>
                                                <div className="p-2 border rounded-md">
                                                    <p className="text-[9px] text-muted-foreground uppercase font-bold">Margin</p>
                                                    <p className={`text-xs font-bold ${selectedZone.margin < 10 ? 'text-red-600' : 'text-green-600'}`}>{selectedZone.margin}%</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px]">
                                                    <span className="text-muted-foreground">Driver Supply Ratio</span>
                                                    <span className="font-bold">Optimal</span>
                                                </div>
                                                <Progress value={75} className="h-1" />
                                            </div>

                                            <div className="pt-4 border-t space-y-2">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Aksi Cepat</p>
                                                <div className="flex flex-col gap-2">
                                                    <Button variant="outline" size="sm" className="w-full text-xs justify-between h-9 px-3">
                                                        Jam Operasional <Clock className="size-3.5" />
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="w-full text-xs justify-between h-9 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
                                                        Berhenti Darurat <Activity className="size-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground gap-4 opacity-50">
                                            <MapPin className="size-12" />
                                            <p className="text-xs">Klik titik di peta untuk melihat metrik zona secara real-time.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>



                {/* 6. RISK CONTROL SYSTEM MODAL */}
                <Dialog open={riskModalOpen} onOpenChange={setRiskModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="size-5 text-red-500" /> Hentikan Zona
                            </DialogTitle>
                            <DialogDescription>
                                Anda akan memodifikasi parameter zona kritis. Harap tinjau estimasi kerugian & risiko sebelum melanjutkan.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="p-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-300">
                                <p className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Activity className="size-3" /> Analisis Dampak Potensial
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] opacity-70">Kehilangan Pendapatan Harian</p>
                                        <p className="text-sm font-bold">~Rp 12.450.000</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] opacity-70">Driver Terdampak</p>
                                        <p className="text-sm font-bold">45 Mitsuzone</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] opacity-70">Pesanan Terdampak</p>
                                        <p className="text-sm font-bold">~120 Perjalanan/Jam</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] opacity-70">Indikator Tingkat Risiko</p>
                                        <Badge className="bg-red-600 h-4 text-[9px]">KRITIS</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[11px] text-muted-foreground leading-relaxed">
                                {`Tindakan ini akan mempengaruhi stabilitas pendapatan mitra di wilayah terkait. Notifikasi push akan dikirimkan ke seluruh driver di zona ${selectedZone?.name} dalam 2 menit.`}
                            </div>
                        </div>
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" onClick={() => setRiskModalOpen(false)}>Kembali</Button>
                            <Button variant="destructive" onClick={() => { setRiskModalOpen(false); toast.success("Perubahan zona berhasil diterapkan") }}>Konfirmasi & Terapkan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </TooltipProvider>
    )
}
