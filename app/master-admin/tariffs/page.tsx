"use client"

import * as React from "react"
import { toast } from "sonner"
import {
    Save,
    History,
    TrendingDown,
    TrendingUp,
    Info,
    ChevronRight,
    Plus,
    AlertTriangle,
    ShieldAlert,
    Clock,
    CalendarIcon,
    Eye,
    RotateCcw,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Percent,
    DollarSign,
    Zap,
    AlertCircle,
    Search,
    Filter,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, parse, isWithinInterval, startOfDay, endOfDay } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { type DateRange } from "react-day-picker"

// ===== DATA =====
const ZONE_DATA = [
    { zone: "Batu (Wisata)", multiplier: "1.2x", effective: "Rp 3.000", margin: "18.2%", volume: "1,240", cancel: "4.8%", override: true, overrideNote: "Override zona wisata: tanjakan tinggi, biaya operasional lebih besar." },
    { zone: "Malang Kota", multiplier: "1.0x", effective: "Rp 2.500", margin: "22.5%", volume: "5,830", cancel: "2.1%", override: false, overrideNote: "" },
    { zone: "Surabaya Pusat", multiplier: "1.0x", effective: "Rp 2.500", margin: "24.1%", volume: "8,420", cancel: "1.9%", override: false, overrideNote: "" },
    { zone: "Kepanjen", multiplier: "1.1x", effective: "Rp 2.750", margin: "16.8%", volume: "780", cancel: "6.3%", override: true, overrideNote: "Override lokal: volume rendah, subsidi tarif untuk akuisisi pasar." },
    { zone: "Lahar Semeru (Zona Khusus)", multiplier: "1.5x", effective: "Rp 3.750", margin: "12.4%", volume: "320", cancel: "8.1%", override: true, overrideNote: "Override khusus: medan ekstrem, biaya driver lebih tinggi." },
]

const VERSION_HISTORY = [
    { v: "v2.4.1", date: "15 Jan 2024", user: "Admin Goldi", change: "Tarif dasar 2.4k -> 2.5k", status: "Aktif" },
    { v: "v2.4.0", date: "01 Des 2023", user: "Admin Aulia", change: "Menambahkan biaya malam", status: "Diarsipkan" },
    { v: "v2.3.9", date: "12 Nov 2023", user: "Admin Goldi", change: "Tarif min 10k -> 12k", status: "Diarsipkan" },
    { v: "v2.3.8", date: "28 Okt 2023", user: "Admin Rafi", change: "Multiplikator Batu 1.0x -> 1.2x", status: "Diarsipkan" },
    { v: "v2.3.7", date: "15 Sep 2023", user: "Admin Aulia", change: "Penyesuaian biaya platform 18% -> 20%", status: "Diarsipkan" },
    { v: "v2.3.6", date: "02 Agu 2023", user: "Admin Goldi", change: "Tarif dasar 2.2k -> 2.4k", status: "Diarsipkan" },
    { v: "v2.3.5", date: "19 Jul 2023", user: "Admin Rafi", change: "Menambahkan zona Kepanjen", status: "Diarsipkan" },
    { v: "v2.3.4", date: "05 Jun 2023", user: "Admin Aulia", change: "Pengali lonjakan maks 1.8x -> 2.0x", status: "Diarsipkan" },
    { v: "v2.3.3", date: "22 Mei 2023", user: "Admin Goldi", change: "Tarif minimum 8k -> 10k", status: "Diarsipkan" },
    { v: "v2.3.2", date: "10 Apr 2023", user: "Admin Rafi", change: "Shift malam 8% -> 10%", status: "Diarsipkan" },
    { v: "v2.3.1", date: "28 Mar 2023", user: "Admin Aulia", change: "Menambahkan zona Lahar Semeru", status: "Diarsipkan" },
    { v: "v2.3.0", date: "15 Feb 2023", user: "Admin Goldi", change: "Revisi struktur tarif baru", status: "Diarsipkan" },
]

const HISTORY_PER_PAGE = 5

function parseIndonesianDate(dateStr: string): Date {
    const months: Record<string, string> = {
        'Jan': 'Jan', 'Feb': 'Feb', 'Mar': 'Mar', 'Apr': 'Apr',
        'Mei': 'May', 'Jun': 'Jun', 'Jul': 'Jul', 'Agu': 'Aug',
        'Sep': 'Sep', 'Okt': 'Oct', 'Nov': 'Nov', 'Des': 'Dec'
    }
    const parts = dateStr.split(' ')
    const englishDate = `${parts[0]} ${months[parts[1]] || parts[1]} ${parts[2]}`
    return parse(englishDate, 'dd MMM yyyy', new Date())
}

export default function TariffManagement() {
    const [reviewStep, setReviewStep] = React.useState(1)
    const [reviewReason, setReviewReason] = React.useState("")
    const [reviewOpen, setReviewOpen] = React.useState(false)
    const [scheduleMode, setScheduleMode] = React.useState("now")
    const [rollbackTarget, setRollbackTarget] = React.useState<string | null>(null)
    const [search, setSearch] = React.useState("")

    // History tab state
    const [historyPage, setHistoryPage] = React.useState(1)
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)

    const filteredHistory = VERSION_HISTORY.filter(row => {
        const rowDate = parseIndonesianDate(row.date)
        if (dateRange?.from && rowDate < startOfDay(dateRange.from)) return false
        if (dateRange?.to && rowDate > endOfDay(dateRange.to)) return false
        return true
    })
    const historyTotalPages = Math.max(1, Math.ceil(filteredHistory.length / HISTORY_PER_PAGE))
    const paginatedHistory = filteredHistory.slice((historyPage - 1) * HISTORY_PER_PAGE, historyPage * HISTORY_PER_PAGE)

    const filteredZones = ZONE_DATA.filter(z =>
        z.zone.toLowerCase().includes(search.toLowerCase())
    )
    const resetReview = () => { setReviewStep(1); setReviewReason("") }

    return (
        <TooltipProvider>
            <div className="flex flex-col gap-4 p-6">
                {/* ===== HEADER + IMPACT SUMMARY ===== */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Manajemen Tarif</h1>
                            <p className="text-sm text-muted-foreground">Sesuaikan harga seluruh sistem dan lihat riwayat konfigurasi.</p>
                        </div>

                        {/* REV 1: Review & Terapkan Perubahan */}
                        <Dialog open={reviewOpen} onOpenChange={(open) => { setReviewOpen(open); if (!open) resetReview() }}>
                            <DialogTrigger asChild>
                                <Button className="bg-orange-600 hover:bg-orange-700">
                                    <Eye className="mr-2 h-4 w-4" /> Review & Terapkan Perubahan
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                                {reviewStep === 1 ? (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>Langkah 1/2 — Ringkasan Perubahan</DialogTitle>
                                            <DialogDescription>Tinjau perubahan tarif sebelum diterapkan.</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-3 my-4">
                                            <div className="rounded-lg border p-3 space-y-2">
                                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sebelum → Sesudah</p>
                                                {[
                                                    { label: "Tarif Dasar/KM", before: "Rp 2.400", after: "Rp 2.500" },
                                                    { label: "Tarif Minimum", before: "Rp 10.000", after: "Rp 12.000" },
                                                    { label: "Shift Malam", before: "10%", after: "15%" },
                                                    { label: "Pengali Lonjakan Maks", before: "2.0x", after: "2.5x" },
                                                ].map(r => (
                                                    <div key={r.label} className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">{r.label}</span>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="line-through text-red-400">{r.before}</span>
                                                            <ArrowRight className="size-3 text-muted-foreground" />
                                                            <span className="font-bold text-green-600">{r.after}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Batal</Button>
                                            </DialogClose>
                                            <Button onClick={() => setReviewStep(2)} className="bg-orange-600 hover:bg-orange-700">
                                                Lanjut ke Konfirmasi <ArrowRight className="ml-1 size-3.5" />
                                            </Button>
                                        </DialogFooter>
                                    </>
                                ) : (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>Langkah 2/2 — Konfirmasi Akhir</DialogTitle>
                                            <DialogDescription>Masukkan alasan perubahan untuk audit trail.</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-3 my-4">
                                            <div>
                                                <Label htmlFor="reason" className="text-xs font-bold">Alasan Perubahan <span className="text-red-500">*</span></Label>
                                                <Textarea
                                                    id="reason"
                                                    placeholder="Contoh: Penyesuaian tarif berdasarkan evaluasi Q4 2023..."
                                                    value={reviewReason}
                                                    onChange={e => setReviewReason(e.target.value)}
                                                    className="mt-1.5 text-xs"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="flex items-start gap-2 p-2.5 rounded-md bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200">
                                                <AlertTriangle className="size-3.5 text-yellow-600 mt-0.5 shrink-0" />
                                                <p className="text-[11px] text-yellow-700">Perubahan ini akan tercatat di audit log dan tidak dapat dibatalkan secara otomatis.</p>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setReviewStep(1)}>
                                                ← Kembali
                                            </Button>
                                            <Button
                                                className="bg-orange-600 hover:bg-orange-700"
                                                disabled={reviewReason.trim().length < 5}
                                                onClick={() => { setReviewOpen(false); resetReview(); toast.success("Perubahan tarif berhasil diterapkan") }}
                                            >
                                                <CheckCircle2 className="mr-1.5 size-3.5" /> Terapkan Perubahan
                                            </Button>
                                        </DialogFooter>
                                    </>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>

                </div>

                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="mb-3">
                        <TabsTrigger value="active">Tarif Aktif</TabsTrigger>
                        <TabsTrigger value="history">Riwayat Versi</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active" className="space-y-4">
                        {/* ROW 1: Pricing + Simulation */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Core Pricing Form */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Harga Layanan Inti</CardTitle>
                                    <CardDescription className="text-xs">Tarif dasar yang diterapkan pada semua perjalanan standar.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    <div className="grid gap-3">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="base-fare" className="text-xs">Tarif Dasar (Per KM)</Label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-semibold">Rp</span>
                                                <Input id="base-fare" defaultValue="2500" type="number" className="h-8 text-xs" />
                                            </div>
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="min-fare" className="text-xs">Tarif Minimum (Buka Pintu)</Label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-semibold">Rp</span>
                                                <Input id="min-fare" defaultValue="12000" type="number" className="h-8 text-xs" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t">
                                        <h4 className="text-xs font-semibold">Biaya Tambahan</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="grid gap-1.5">
                                                <Label htmlFor="night" className="text-xs">Shift Malam (22:00 - 05:00)</Label>
                                                <Input id="night" defaultValue="15%" className="h-8 text-xs" />
                                            </div>
                                            <div className="grid gap-1.5">
                                                <Label htmlFor="surge" className="text-xs">Pengali Lonjakan (Maks)</Label>
                                                <Input id="surge" defaultValue="2.5x" className="h-8 text-xs" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* REV 2 + 12: Simulasi Dampak (expanded + avg trip value) */}
                            <Card className="border-dashed">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Simulasi Dampak</CardTitle>
                                    <CardDescription className="text-xs">Perkiraan dampak perubahan tarif terhadap metrik utama.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Main Impact */}
                                    <div className="flex items-center gap-4 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100">
                                        <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                            <TrendingUp className="size-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-orange-600">+4.5%</h3>
                                            <p className="text-[11px] text-muted-foreground">Perkiraan Kenaikan Pendapatan Kotor</p>
                                        </div>
                                    </div>

                                    {/* REV 12: Average Trip Value */}
                                    <div className="flex justify-between items-center p-2.5 rounded-md border">
                                        <span className="text-xs text-muted-foreground">Nilai Perjalanan Rata-rata</span>
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <span className="text-red-400">Rp 28.200</span>
                                            <ArrowRight className="size-3 text-muted-foreground" />
                                            <span className="font-bold text-green-600">Rp 29.500</span>
                                        </div>
                                    </div>

                                    {/* REV 2: Expanded metrics */}
                                    <div className="space-y-2">
                                        {[
                                            { label: "Dampak ke Pembayaran Driver", value: "+0.8%", color: "text-green-600" },
                                            { label: "Perubahan Take Rate Platform", value: "20% → 20.4%", color: "text-blue-600" },
                                            { label: "Estimasi Perubahan Margin", value: "+2.1%", color: "text-green-600" },
                                            { label: "Zona Paling Terdampak", value: "Batu, Kepanjen, Lahar Semeru", color: "text-black" },
                                            { label: "Estimasi Risiko Batal Meningkat", value: "+1.2%", color: "text-red-500" },
                                        ].map(item => (
                                            <div key={item.label} className="flex justify-between items-center text-xs border-b pb-1.5 last:border-0 last:pb-0">
                                                <span className="text-muted-foreground">{item.label}</span>
                                                <span className={`font-bold ${item.color}`}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* ROW 2: Fee Split + Guardrail */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* REV 5: Fee Split */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-1.5">
                                        Pembagian Biaya & Margin
                                    </CardTitle>
                                    <CardDescription className="text-xs">Pembagian biaya per perjalanan antara platform dan driver.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid gap-3">
                                        <div className="grid gap-1.5">
                                            <Label className="text-xs">Biaya Platform (%)</Label>
                                            <Input defaultValue="20" type="number" className="h-8 text-xs" />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label className="text-xs">Pembayaran Driver (%)</Label>
                                            <Input defaultValue="80" type="number" className="h-8 text-xs" />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label className="text-xs">Margin Bersih per Perjalanan</Label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground text-xs font-semibold">Rp</span>
                                                <Input defaultValue="5650" type="number" className="h-8 text-xs" readOnly />
                                                <Badge variant="secondary" className="text-[10px] h-5 shrink-0">Kalkulasi Otomatis</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* REV 6: Guardrail / Threshold Warning */}
                            <Card className="border-red-200 dark:border-red-900">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-1.5">
                                        Pengaman / Peringatan Batas
                                    </CardTitle>
                                    <CardDescription className="text-xs">Peringatan otomatis jika perubahan melebihi ambang batas aman.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/20">
                                        <AlertTriangle className="size-3.5 text-red-500 mt-0.5 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-bold text-red-800 dark:text-red-300">Perubahan Tarif &gt; 10%</p>
                                            <p className="text-[10px] text-red-600 dark:text-red-400 leading-snug">Kenaikan tarif melebihi threshold 10%. Risiko churn pengguna meningkat.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Estimasi Risiko Churn</span>
                                            <span className="font-bold text-red-500">+3.2% pengguna</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Estimasi Kenaikan Tkt Batal</span>
                                            <span className="font-bold text-red-500">+1.8% pesanan</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Ambang Batas Perubahan</span>
                                            <div className="flex items-center gap-1.5">
                                                <Input defaultValue="10" type="number" className="w-14 h-6 text-[10px] text-center" />
                                                <span className="text-[10px] text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* ROW 2: Scheduling + Propagation (SWAPPED TO BE ABOVE TABLE) */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* REV 7: Effective Date & Scheduling */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-1.5">
                                        Tanggal Efektif & Penjadwalan
                                    </CardTitle>
                                    <CardDescription className="text-xs">Tentukan kapan perubahan tarif mulai berlaku.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="grid gap-1.5 shrink-0 w-40">
                                            <Label className="text-xs">Mode Aktivasi</Label>
                                            <Select value={scheduleMode} onValueChange={setScheduleMode}>
                                                <SelectTrigger className="h-8 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="now">Aktif Sekarang</SelectItem>
                                                    <SelectItem value="schedule">Jadwalkan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {scheduleMode === "now" && (
                                            <div className="flex items-start gap-2 p-2 rounded-md bg-orange-50 dark:bg-orange-950/20 border border-orange-200 flex-1">
                                                <Info className="size-3.5 text-orange-600 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-[10px] font-bold text-orange-900 dark:text-orange-200 uppercase tracking-wider">Catatan Propagasi</p>
                                                    <p className="text-[10px] text-orange-800 dark:text-orange-300 leading-snug">
                                                        Tarif baru berlaku dalam 15-30 menit setelah disimpan. Perubahan dicatat dan diaudit otomatis.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {scheduleMode === "schedule" && (
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="grid gap-1.5">
                                                <Label className="text-xs">Tanggal</Label>
                                                <Input type="date" className="h-8 text-xs" />
                                            </div>
                                            <div className="grid gap-1.5">
                                                <Label className="text-xs">Waktu</Label>
                                                <Input type="time" className="h-8 text-xs" />
                                            </div>
                                        </div>
                                    )}
                                    <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                                        <Eye className="size-3" /> Pratinjau Sebelum Aktif
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* REV 4: Propagasi Tarif */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-1.5">
                                        Status Propagasi
                                    </CardTitle>
                                    <CardDescription className="text-xs">Status sinkronisasi tarif ke seluruh node.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Progress Sinkronisasi</span>
                                            <span className="font-bold">100%</span>
                                        </div>
                                        <Progress value={100} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs">
                                            <CheckCircle2 className="size-3.5 text-green-500" />
                                            <span>Semua node tersinkronisasi</span>
                                            <Badge variant="secondary" className="text-[9px] h-4 ml-auto">5/5 zona</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Clock className="size-3.5" />
                                            <span>Terakhir propagasi: 15 Jan 2024, 14:32 WIB</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 p-2 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200">
                                        <CheckCircle2 className="size-3 text-green-600 mt-0.5 shrink-0" />
                                        <p className="text-[10px] text-green-700">Tidak ada kegagalan sinkronisasi. Semua tarif telah teraplikasi.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* ROW 3: Regional Multipliers (REV 3 + 10 + 11) */}
                        <Card>
                            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm">Penyesuaian Regional (Multiplikator)</CardTitle>
                                    <CardDescription className="text-[11px]">Kompensasi biaya operasional per zona. Zona override ditandai visual berbeda.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative group">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-cakli-orange transition-colors" />
                                        <Input
                                            placeholder="Cari zona..."
                                            className="pl-9 h-9 w-[280px] bg-white border-slate-200 text-xs"
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow>
                                            <TableHead className="text-[10px] font-bold uppercase py-3 pl-5">Zona / Kota</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Pengali</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Tarif Efektif</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Margin</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Volume Pesanan</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Tkt Pembatalan</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3 text-right pr-5">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredZones.map((row) => (
                                            <TableRow
                                                key={row.zone}
                                                className={row.override ? "bg-amber-50/40 border-l-2 border-l-amber-400 group transition-colors hover:bg-amber-50/60" : "hover:bg-slate-50/50 group transition-colors"}
                                            >
                                                <TableCell className="font-medium text-xs py-3 pl-5">
                                                    <div className="flex items-center gap-1.5">
                                                        {row.override && (
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Zap className="size-3 text-amber-500" />
                                                                </TooltipTrigger>
                                                                <TooltipContent side="right" className="max-w-[200px] text-[10px]">
                                                                    {row.overrideNote}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        )}
                                                        {row.zone}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-2">
                                                    <Input className="w-16 h-8 text-xs bg-white" defaultValue={row.multiplier} />
                                                </TableCell>
                                                <TableCell className="font-mono text-xs py-3">{row.effective}</TableCell>
                                                <TableCell className="text-xs font-semibold py-3">{row.margin}</TableCell>
                                                <TableCell className="text-xs py-3">{row.volume}</TableCell>
                                                <TableCell className="text-xs py-3">
                                                    <span className={parseFloat(row.cancel) > 5 ? "text-red-500 font-bold" : "text-slate-600"}>{row.cancel}</span>
                                                </TableCell>
                                                <TableCell className="text-right py-3 pr-5">
                                                    {row.override ? (
                                                        <Badge variant="outline" className="text-[9px] border-amber-400 text-amber-700 bg-amber-50 gap-1 h-5">
                                                            <Zap className="size-2.5" /> Penyesuaian
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="text-[9px] h-5 bg-cakli-orange">Global</Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>

                            {/* ── PAGINATION ── */}
                            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 mt-auto">
                                <p className="text-[10px] text-muted-foreground font-medium">
                                    Menampilkan <span className="text-slate-900 font-bold">1–{filteredZones.length}</span> dari <span className="text-slate-900 font-bold">{ZONE_DATA.length}</span> zona
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

                    {/* REV 8: Riwayat Versi + Rollback */}
                    <TabsContent value="history">
                        <Card>
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm">Log Revisi Tarif</CardTitle>
                                    <CardDescription className="text-xs">Catatan historis perubahan harga sistem. Rollback ke versi sebelumnya jika diperlukan.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm" className={`h-8 text-xs gap-1.5 justify-start font-normal ${!dateRange ? 'text-muted-foreground' : ''}`}>
                                                <CalendarIcon className="size-3.5" />
                                                {dateRange?.from ? (
                                                    dateRange.to ? (
                                                        <>{format(dateRange.from, 'dd MMM yyyy', { locale: localeId })} - {format(dateRange.to, 'dd MMM yyyy', { locale: localeId })}</>
                                                    ) : (
                                                        format(dateRange.from, 'dd MMM yyyy', { locale: localeId })
                                                    )
                                                ) : (
                                                    'Pilih rentang tanggal'
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="end">
                                            <Calendar
                                                mode="range"
                                                defaultMonth={dateRange?.from}
                                                selected={dateRange}
                                                onSelect={(range) => { setDateRange(range); setHistoryPage(1) }}
                                                numberOfMonths={2}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {dateRange && (
                                        <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={() => { setDateRange(undefined); setHistoryPage(1) }}>
                                            <XCircle className="size-3.5 mr-1" /> Reset
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="text-[10px] font-bold uppercase py-3 pl-5">Versi</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Tanggal</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Penulis</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Perubahan</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Status</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3 text-right pr-5">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedHistory.map((row) => (
                                            <TableRow key={row.v} className="hover:bg-slate-50/50 transition-colors">
                                                <TableCell className="font-bold text-xs py-3 pl-5">{row.v}</TableCell>
                                                <TableCell className="text-xs py-3">{row.date}</TableCell>
                                                <TableCell className="text-xs py-3">{row.user}</TableCell>
                                                <TableCell className="text-xs text-muted-foreground py-3">{row.change}</TableCell>
                                                <TableCell className="py-3">
                                                    <Badge variant={row.status === "Aktif" ? "default" : "secondary"} className="text-[10px]">{row.status}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right py-3 pr-5">
                                                    {row.status !== "Aktif" ? (
                                                        <Dialog open={rollbackTarget === row.v} onOpenChange={(open) => setRollbackTarget(open ? row.v : null)}>
                                                            <DialogTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
                                                                    <RotateCcw className="size-3" /> Rollback
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-sm">
                                                                <DialogHeader>
                                                                    <DialogTitle className="text-sm">Rollback ke {row.v}?</DialogTitle>
                                                                    <DialogDescription className="text-xs">
                                                                        Ini akan mengembalikan semua tarif ke versi {row.v} ({row.date}). Perubahan saat ini akan diarsipkan.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="p-2.5 rounded-md bg-yellow-50 border border-yellow-200 text-[11px] text-yellow-700">
                                                                    <strong>Perubahan:</strong> {row.change}
                                                                </div>
                                                                <DialogFooter>
                                                                    <DialogClose asChild>
                                                                        <Button variant="outline" size="sm" className="text-xs">Batal</Button>
                                                                    </DialogClose>
                                                                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs gap-1" onClick={() => { setRollbackTarget(null); toast.success(`Tarif berhasil di-rollback ke ${row.v}`) }}>
                                                                        <RotateCcw className="size-3" /> Konfirmasi Rollback
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    ) : (
                                                        <Badge variant="outline" className="text-[10px]">Versi Aktif</Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>

                            {/* ── PAGINATION ── */}
                            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 mt-auto">
                                <p className="text-[10px] text-muted-foreground font-medium">
                                    Menampilkan <span className="text-slate-900 font-bold">{(historyPage - 1) * HISTORY_PER_PAGE + 1}–{Math.min(historyPage * HISTORY_PER_PAGE, filteredHistory.length)}</span> dari <span className="text-slate-900 font-bold">{filteredHistory.length}</span> revisi
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={historyPage <= 1} onClick={() => setHistoryPage(p => p - 1)}>
                                        <ChevronRight className="size-4 rotate-180" />
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: historyTotalPages }, (_, i) => i + 1).map((p) => (
                                            <Button
                                                key={p}
                                                variant={p === historyPage ? "default" : "ghost"}
                                                size="sm"
                                                className={`h-8 w-8 p-0 text-[10px] font-bold ${p === historyPage ? "bg-cakli-orange hover:bg-cakli-orange/90 text-white" : ""}`}
                                                onClick={() => setHistoryPage(p)}
                                            >
                                                {p}
                                            </Button>
                                        ))}
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={historyPage >= historyTotalPages} onClick={() => setHistoryPage(p => p + 1)}>
                                        <ChevronRight className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>

            </div>
        </TooltipProvider>
    )
}
