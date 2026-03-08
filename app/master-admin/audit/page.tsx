"use client"

import * as React from "react"
import {
    ClipboardList,
    Activity,
    Search,
    Filter,
    Download,
    Terminal,
    AlertCircle,
    ShieldAlert,
    ShieldCheck,
    History,
    Calendar as CalendarIcon,
    User,
    Monitor,
    Database,
    Globe,
    Lock,
    Unlock,
    CheckCircle2,
    XCircle,
    Eye,
    ArrowRight,
    Clock,
    Hash,
    Fingerprint,
    HardDrive,
    Trash2,
    Share2,
    RefreshCw,
    Save,
    LayoutGrid,
    ListFilter,
    ArrowUpDown,
    Smartphone,
    Chrome,
    AlertTriangle,
    X,
    ChevronRight,
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { type DateRange } from "react-day-picker"

// ─── DATA ────────────────────────────────────────────────────────────────────

const AUDIT_LOGS = [
    {
        id: "AUD-88219",
        timestamp: "2024-02-23 13:42:05 +07:00",
        actor: { name: "Aulia Rahmawati", role: "Master Admin" },
        source: "Web Console",
        action: "Edit Role",
        module: "Admin Management",
        target: "ADM-006 (Budi Santoso)",
        severity: "High",
        result: "Success",
        correlationId: "CORR-X92-231",
        details: {
            ip: "103.145.22.10",
            device: "MacBook Pro / Chrome 121",
            location: "Jakarta, ID",
            sessionId: "sess_91238491",
            changes: {
                field: "Role",
                before: "Operating Admin",
                after: "Reporting Admin"
            }
        }
    },
    {
        id: "AUD-88218",
        timestamp: "2024-02-23 13:05:12 +07:00",
        actor: { name: "Goldi Pratama", role: "Master Admin" },
        source: "Web Console",
        action: "Approve Expansion",
        module: "Zone Management",
        target: "New Zone: Malang Selatan",
        severity: "Critical",
        result: "Success",
        correlationId: "CORR-X92-110",
        details: {
            ip: "180.242.11.44",
            device: "Windows 11 / Edge 120",
            location: "Surabaya, ID",
            sessionId: "sess_91238488",
            changes: {
                field: "Status",
                before: "Draft",
                after: "Active"
            }
        }
    },
    {
        id: "AUD-88217",
        timestamp: "2024-02-23 12:51:30 +07:00",
        actor: { name: "Risma Fitriani", role: "Reporting Admin" },
        source: "API Client",
        action: "Export Data",
        module: "Analytics",
        target: "Revenue Report Jan-Feb",
        severity: "Medium",
        result: "Success",
        correlationId: "CORR-Z01-001",
        details: {
            ip: "203.77.55.21",
            device: "Python-requests/2.31.0",
            location: "Bandung, ID",
            sessionId: "api_k812hs1",
            changes: null
        }
    },
    {
        id: "AUD-88216",
        timestamp: "2024-02-23 11:30:45 +07:00",
        actor: { name: "System", role: "Internal" },
        source: "Internal Worker",
        action: "Login Attempt",
        module: "Authentication",
        target: "ADM-005 (Dev Internal)",
        severity: "Critical",
        result: "Failed",
        correlationId: "CORR-ERR-401",
        details: {
            ip: "10.0.0.1",
            device: "System Job",
            location: "Internal Server",
            sessionId: "-",
            changes: {
                field: "Failed Logins",
                before: "6",
                after: "7"
            }
        }
    },
    {
        id: "AUD-88215",
        timestamp: "2024-02-23 09:44:22 +07:00",
        actor: { name: "Admin Ops Surabaya", role: "Operating Admin" },
        source: "Mobile App",
        action: "Suspend Driver",
        module: "Driver Management",
        target: "DR-0441 (Joko)",
        severity: "High",
        result: "Success",
        correlationId: "CORR-OPS-112",
        details: {
            ip: "114.5.28.99",
            device: "Android 14 / Cakli Admin App",
            location: "Sidoarjo, ID",
            sessionId: "sess_77123",
            changes: {
                field: "Account Status",
                before: "Active",
                after: "Suspended"
            }
        }
    }
]

const ANOMALIES = [
    { type: "Role Change Surge", icon: AlertTriangle, msg: "5 perubahan role dalam 10 menit (Anomali terdeteksi)", severity: "Critical" },
    { type: "New IP Login", icon: Globe, msg: "Master Admin (Goldi) login dari IP baru: 180.242.11.44", severity: "High" },
    { type: "Security Cascade", icon: ShieldAlert, msg: "3 event Critical berturut-turut pada modul Authentication.", severity: "Critical" }
]

const SUMMARY_24H = [
    { label: "Total Peristiwa", value: "1,248", sub: "+12% vs kemarin", icon: Activity, color: "text-blue-600" },
    { label: "Peristiwa Kritis", value: "3", sub: "Membutuhkan review", icon: ShieldAlert, color: "text-red-600" },
    { label: "Tingkat Keparahan Tinggi", value: "12", sub: "-5% vs kemarin", icon: AlertTriangle, color: "text-orange-600" },
    { label: "Tindakan Gagal", value: "8", sub: "Terdeteksi sistem", icon: XCircle, color: "text-red-500" },
    { label: "Aktivitas Ekspor Log", value: "2", sub: "Oleh Risma & Goldi", icon: Download, color: "text-purple-600" }
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function severityBadge(level: string) {
    if (level === "Critical") return "bg-red-500 text-white font-bold"
    if (level === "High") return "bg-orange-100 text-orange-700 border-orange-200"
    if (level === "Medium") return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-slate-100 text-slate-700 border-slate-200"
}

function translateSeverity(level: string) {
    if (level === "Critical") return "Kritis"
    if (level === "High") return "Tinggi"
    if (level === "Medium") return "Sedang"
    return "Rendah"
}

function resultBadge(result: string) {
    if (result === "Success") return "bg-green-100 text-green-700 border-green-200"
    return "bg-red-100 text-red-700 border-red-200"
}

function translateResult(result: string) {
    if (result === "Success") return "Berhasil"
    return "Gagal"
}

function sourceColor(source: string) {
    if (source === "Web Console") return "text-blue-600"
    if (source === "API Client") return "text-purple-600"
    return "text-slate-500"
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function AuditLog() {
    const [selectedLog, setSelectedLog] = React.useState<typeof AUDIT_LOGS[0] | null>(null)
    const [viewMode, setViewMode] = React.useState<"table" | "timeline">("table")

    // State for filtering
    const [searchQuery, setSearchQuery] = React.useState("")
    const [severityFilter, setSeverityFilter] = React.useState("all")
    const [moduleFilter, setModuleFilter] = React.useState("all")

    // Date range picker state
    const [auditDateRange, setAuditDateRange] = React.useState<DateRange | undefined>(undefined)

    const filteredLogs = AUDIT_LOGS.filter(log => {
        const matchesSearch =
            log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
        const matchesModule = moduleFilter === "all" || log.module === moduleFilter

        // Date range filter
        let matchesDate = true
        const logDate = new Date(log.timestamp.split(' ').slice(0, 2).join('T'))
        if (auditDateRange?.from) {
            const from = new Date(auditDateRange.from)
            from.setHours(0, 0, 0, 0)
            if (logDate < from) matchesDate = false
        }
        if (auditDateRange?.to) {
            const to = new Date(auditDateRange.to)
            to.setHours(23, 59, 59, 999)
            if (logDate > to) matchesDate = false
        }

        return matchesSearch && matchesSeverity && matchesModule && matchesDate
    })

    return (
        <div className="flex flex-col gap-6 p-6 font-sans relative">

            {/* ── HEADER & RISK SCORE ── */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Log Audit</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Catatan permanen seluruh aktivitas administratif dan event sistem.</p>
                </div>
                <Badge variant="destructive" className="animate-pulse h-7 px-3">
                    <ShieldAlert className="size-3.5 mr-1.5" /> Akses Kritis
                </Badge>
            </div>

            {/* ── SUMMARY BAR (24H) ── */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {SUMMARY_24H.map((item, i) => {
                    const isCritical = item.label === "Critical Events" || item.label === "Failed Actions"
                    return (
                        <Card key={i} className={`overflow-hidden border-slate-200 transition-all ${isCritical ? "border-red-500/50" : "ring-1 ring-slate-200 border-none"}`}>
                            <div className="flex items-stretch h-full relative">
                                <div className={`w-1.5 rounded-full my-3 ml-3 shrink-0 ${isCritical ? "bg-red-500" : "bg-cakli-orange"}`} />
                                <div className="flex-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                        <CardTitle className={`text-xs font-semibold ${isCritical ? "text-red-600" : "text-slate-700"}`}>{item.label}</CardTitle>
                                        <item.icon className={`size-3.5 ${isCritical ? "text-red-500" : "text-slate-400"}`} />
                                    </CardHeader>
                                    <CardContent className="px-3 pb-3 flex flex-col gap-0.5">
                                        <div className={`text-2xl font-bold ${isCritical ? "text-red-600" : "text-slate-900"}`}>{item.value}</div>
                                        <p className="text-[10px] text-muted-foreground font-medium">{item.sub}</p>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* ── ALERT & ANOMALY SECTION ── */}
            <div className="flex flex-col gap-2">
                {ANOMALIES.map((alert, i) => {
                    const isCritical = alert.severity === 'Critical'
                    const bgColor = isCritical ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
                    const textColor = isCritical ? 'text-red-600' : 'text-orange-600'
                    const iconBg = isCritical ? 'bg-red-100' : 'bg-orange-100'

                    return (
                        <div key={i} className={`flex items-center gap-3 px-4 py-2 rounded-xl border text-[11px] font-medium transition-all hover:translate-x-1 ${bgColor}`}>
                            <div className={`p-1 rounded-lg ${iconBg}`}>
                                <alert.icon className={`size-3.5 shrink-0 ${textColor}`} />
                            </div>
                            <span className={`font-bold ${textColor} shrink-0 uppercase tracking-tight`}>{alert.severity}</span>
                            <span className="text-slate-800">{alert.msg}</span>
                        </div>
                    )
                })}
            </div>

            {/* ── INTEGRITY & RETENTION (MOVED FROM FOOTER) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Integrity Panel (Light Theme) */}
                <div className="lg:col-span-8 bg-white rounded-xl p-5 border relative overflow-hidden group ring-1 ring-slate-200">
                    <div className="absolute right-0 top-0 opacity-[0.03] p-4 text-slate-900">
                        <Fingerprint className="size-24" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="size-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 border border-green-200">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900">Status Integritas Rantai Audit</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="inline-block size-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Verifikasi Hash: VALID</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                <div className="space-y-0.5">
                                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Pemeriksaan Integritas Terakhir</p>
                                    <p className="text-xs font-mono font-bold text-slate-800">2 menit lalu</p>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Enkripsi</p>
                                    <p className="text-xs font-mono font-bold text-slate-800">RSA-4096 / SHA-256</p>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Node Utama</p>
                                    <p className="text-xs font-mono font-bold text-slate-800">IND-JKT-04 (Safe Vault)</p>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-slate-50 border-slate-200 text-xs gap-2 hover:bg-slate-100 transition-colors h-9">
                            <RefreshCw className="size-3.5" /> Verifikasi Integritas Log
                        </Button>
                    </div>
                </div>

                {/* Retention & Export */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <Card className="border-none ring-1 ring-slate-200 bg-white">
                        <CardHeader className="p-4 pb-0">
                            <CardTitle className="text-xs font-bold flex items-center gap-2">
                                <Database className="size-3.5 text-blue-500" /> Kebijakan Retensi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 space-y-3">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-muted-foreground">Penyimpanan Aktif</span>
                                <span className="font-bold">365 Hari</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-muted-foreground">Standar Arsip</span>
                                <span className="font-bold text-slate-800">Terenkripsi AES-256</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-muted-foreground">Akses Penghapusan</span>
                                <span className="text-red-600 font-bold flex items-center gap-1">
                                    <Lock className="size-3" /> Log Baca-Saja
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* ── FILTER ROW ── */}
            <div className="flex items-center gap-2 mb-3">
                <div className="relative group">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-cakli-orange transition-colors" />
                    <Input
                        placeholder="Cari Log ID, Aktor, atau Aksi..."
                        className="pl-9 h-9 w-[200px] bg-white border-slate-200 text-xs"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-[130px] h-9 text-xs bg-white text-slate-600">
                        <SelectValue placeholder="Tingkat" />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                        <SelectItem value="all">Semua Tingkat</SelectItem>
                        <SelectItem value="Critical">Hanya Kritis</SelectItem>
                        <SelectItem value="High">Tinggi</SelectItem>
                        <SelectItem value="Medium">Sedang</SelectItem>
                        <SelectItem value="Low">Rendah</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                    <SelectTrigger className="w-[130px] h-9 text-xs bg-white text-slate-600">
                        <SelectValue placeholder="Modul" />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                        <SelectItem value="all">Semua Modul</SelectItem>
                        {Array.from(new Set(AUDIT_LOGS.map(l => l.module))).map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Date Range Picker */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className={`h-9 text-xs gap-1.5 justify-start font-normal bg-white border-slate-200 ${!auditDateRange ? 'text-muted-foreground' : 'text-slate-800'}`}>
                            <CalendarIcon className="size-3.5" />
                            {auditDateRange?.from ? (
                                auditDateRange.to ? (
                                    <>{format(auditDateRange.from, 'dd MMM yyyy', { locale: localeId })} - {format(auditDateRange.to, 'dd MMM yyyy', { locale: localeId })}</>
                                ) : (
                                    format(auditDateRange.from, 'dd MMM yyyy', { locale: localeId })
                                )
                            ) : (
                                'Pilih rentang tanggal'
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            defaultMonth={auditDateRange?.from}
                            selected={auditDateRange}
                            onSelect={setAuditDateRange}
                            numberOfMonths={2}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {auditDateRange && (
                    <Button variant="ghost" size="sm" className="h-9 text-xs text-muted-foreground" onClick={() => setAuditDateRange(undefined)}>
                        <XCircle className="size-3.5 mr-1" /> Reset
                    </Button>
                )}

                <div className="ml-auto flex items-center gap-2">
                    <Button className="bg-cakli-orange hover:bg-cakli-orange/90 text-white text-xs gap-2 h-9 px-4">
                        <Download className="size-4" /> Manajemen Ekspor
                    </Button>
                </div>
            </div>

            {/* ── MAIN LOG TABLE ── */}
            <Card className="border-none ring-1 ring-slate-200">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-[10px] font-bold uppercase py-3 pl-5 w-[110px]">ID Log</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-3">Stempel Waktu</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-3">Aktor</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-3">Sumber</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-3">Tindakan</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-3">Modul</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-3">Keparahan</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-3">Hasil</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-3 text-right pr-5">Detail</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLogs.map((log) => (
                                <TableRow
                                    key={log.id}
                                    className={`group hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedLog?.id === log.id ? "bg-slate-50" : ""}`}
                                    onClick={() => setSelectedLog(log)}
                                >
                                    <TableCell className="pl-5 py-3 font-mono text-[10px] font-bold uppercase tracking-tight text-blue-600">{log.id}</TableCell>
                                    <TableCell className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="size-6">
                                                <AvatarFallback className="text-[9px] bg-slate-100">{log.actor.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p className="text-[11px] font-bold">{log.actor.name}</p>
                                                <p className="text-[9px] text-muted-foreground font-medium">{log.actor.role}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className={`text-[10px] font-bold ${sourceColor(log.source)}`}>{log.source}</TableCell>
                                    <TableCell className="text-[11px] font-semibold">{log.action}</TableCell>
                                    <TableCell className="text-[10px] font-mono text-muted-foreground">{log.module}</TableCell>
                                    <TableCell>
                                        <Badge className={`text-[9px] h-4.5 px-1.5 rounded-full border-0 ${severityBadge(log.severity)}`}>
                                            {translateSeverity(log.severity)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`flex items-center gap-1 text-[10px] font-bold ${log.result === 'Success' ? 'text-green-600' : 'text-red-500'}`}>
                                            {log.result === 'Success' ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
                                            {translateResult(log.result)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-5">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-muted-foreground group-hover:text-blue-600 transition-colors"
                                            onClick={(e) => { e.stopPropagation(); setSelectedLog(log) }}
                                        >
                                            <ArrowRight className="size-3.5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* ── PAGINATION ── */}
            <div className="flex items-center justify-between px-2 py-4 border-t border-slate-100 mt-auto">
                <p className="text-[10px] text-muted-foreground font-medium">
                    Menampilkan <span className="text-slate-900 font-bold">1–{filteredLogs.length}</span> dari <span className="text-slate-900 font-bold">{AUDIT_LOGS.length}</span> log
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
                        <span className="text-[10px] px-1">...</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[10px] font-bold">
                            12
                        </Button>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>

            {/* ── DETAIL SIDE DRAWER ── */}
            {selectedLog && (
                <div className="fixed top-0 right-0 h-full w-[420px] bg-white border-l z-50 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b shrink-0 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${severityBadge(selectedLog.severity)}`}>
                                <Terminal className="size-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold flex items-center gap-2 tracking-tight">
                                    {selectedLog.id}
                                </h3>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{selectedLog.module}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="size-7" onClick={() => setSelectedLog(null)}>
                            <X className="size-4" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

                        {/* Section A: Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1 tracking-tighter">Stempel Waktu</p>
                                <p className="text-[11px] font-bold leading-tight">{selectedLog.timestamp}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1 tracking-tighter">Hasil</p>
                                <div className={`flex items-center gap-1 font-bold text-[11px] ${selectedLog.result === 'Success' ? 'text-green-600' : 'text-red-500'}`}>
                                    {selectedLog.result === 'Success' ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
                                    {translateResult(selectedLog.result)}
                                </div>
                            </div>
                            <div className="col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
                                <div>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1 tracking-tighter">Correlation ID</p>
                                    <p className="text-[11px] font-mono font-bold text-blue-600">{selectedLog.correlationId}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="size-7"><Share2 className="size-3.5" /></Button>
                            </div>
                        </div>

                        <Separator />

                        {/* Section B: Actor Metadata */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Metadata Aktor</p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <Avatar className="size-9 border-2 border-white font-bold">
                                        <AvatarFallback className="text-xs bg-white text-slate-800">{selectedLog.actor.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-[11px] font-bold">{selectedLog.actor.name}</p>
                                        <p className="text-[10px] text-muted-foreground">{selectedLog.actor.role}</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-7 text-[9px] font-bold px-2 rounded-md">LIHAT PROFIL</Button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="px-3 py-2 bg-slate-50/50 rounded-lg border border-slate-100 flex items-center gap-2">
                                        <Globe className="size-3 text-muted-foreground" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter">Lokasi</p>
                                            <p className="text-[10px] font-bold truncate">{selectedLog.details.location}</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-2 bg-slate-50/50 rounded-lg border border-slate-100 flex items-center gap-2">
                                        <Monitor className="size-3 text-muted-foreground" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter">OS/Agen</p>
                                            <p className="text-[10px] font-bold truncate">{selectedLog.details.device}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Section C: Action Detail (Before/After) - NOW LIGHT THEME */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Detail Tindakan</p>
                            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-slate-500">Tindakan:</span>
                                    <Badge className="bg-blue-50 text-blue-600 border-blue-200 text-[10px] h-5">{selectedLog.action}</Badge>
                                </div>
                                {selectedLog.details.changes ? (
                                    <div className="space-y-3">
                                        <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">Kolom Diubah</p>
                                            <p className="text-xs font-mono font-bold text-slate-800 mt-1 uppercase">{selectedLog.details.changes.field}</p>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="space-y-1 flex flex-col items-center">
                                                <p className="text-[8px] font-bold text-red-500 uppercase tracking-widest text-center">SEBELUM</p>
                                                <div className="bg-red-50 border border-red-100 p-2.5 rounded-lg w-full max-w-[240px] text-center">
                                                    <p className="text-sm font-mono font-bold text-red-600">{selectedLog.details.changes.before}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-1 flex flex-col items-center">
                                                <p className="text-[8px] font-bold text-green-500 uppercase tracking-widest text-center">SESUDAH</p>
                                                <div className="bg-green-50 border border-green-100 p-2.5 rounded-lg w-full max-w-[240px] text-center">
                                                    <p className="text-sm font-mono font-bold text-green-600">{selectedLog.details.changes.after}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 border border-dashed border-slate-200 rounded-lg text-center bg-slate-50/50">
                                        <p className="text-[10px] text-slate-400">Tidak ada modifikasi data dalam log ini.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Section D: Related Events */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sesi Terkait (Korelasi)</p>
                            <div className="space-y-2">
                                {[
                                    { time: "13:40", action: "Login Sistem", color: "text-green-600" },
                                    { time: "13:45", action: "Navigasi Panel Admin", color: "text-slate-600" }
                                ].map((rel, i) => (
                                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <Clock className="size-3 text-muted-foreground" />
                                            <span className="text-[10px] font-bold tracking-tight">{rel.action}</span>
                                        </div>
                                        <span className="text-[9px] font-mono text-muted-foreground">{rel.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t bg-slate-50 flex gap-2 shrink-0">
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-9 bg-white">
                            <Download className="size-3.5 mr-2" /> Ekspor Entri
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-9 bg-white">
                            <History className="size-3.5 mr-2" /> Lihat Siklus Hidup
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}