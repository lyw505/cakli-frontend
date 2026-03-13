"use client"

import * as React from "react"
import { toast } from "sonner"
import {
    ShieldCheck,
    ShieldAlert,
    UserPlus,
    Search,
    Filter,
    MoreHorizontal,
    Users,
    Lock,
    KeyRound,
    Activity,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    X,
    Eye,
    RefreshCw,
    Ban,
    UserX,
    Pencil,
    Globe,
    MapPin,
    Navigation,
    ArrowUpRight,
    MonitorCheck,
    Fingerprint,
    Info,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { type DateRange } from "react-day-picker"

// ─── DATA ────────────────────────────────────────────────────────────────────

const ADMINS = [
    {
        id: "ADM-001",
        name: "Aulia Rahmawati",
        email: "aulia@cakli.com",
        role: "Master Admin",
        scope: "Global",
        scopeDetail: null,
        mfa: "Enabled",
        status: "Active",
        lastLogin: "2 menit lalu",
        lastAction: "Edit tarif zona Surabaya",
        lastLoginIP: "103.145.22.10",
        risk: "High",
        createdAt: "2024-01-10",
        createdBy: "System",
        passwordChanged: "14 hari lalu",
        failedLogins: 0,
    },
    {
        id: "ADM-002",
        name: "Goldi Pratama",
        email: "goldi@cakli.com",
        role: "Master Admin",
        scope: "Global",
        scopeDetail: null,
        mfa: "Enabled",
        status: "Active",
        lastLogin: "1 jam lalu",
        lastAction: "Review pending request",
        lastLoginIP: "180.242.11.44",
        risk: "High",
        createdAt: "2024-01-10",
        createdBy: "System",
        passwordChanged: "30 hari lalu",
        failedLogins: 0,
    },
    {
        id: "ADM-003",
        name: "Risma Fitriani",
        email: "risma@cakli.com",
        role: "Reporting Admin",
        scope: "Regional",
        scopeDetail: "Jawa Timur",
        mfa: "Disabled",
        status: "Active",
        lastLogin: "3 jam lalu",
        lastAction: "Export data revenue",
        lastLoginIP: "203.77.55.21",
        risk: "Medium",
        createdAt: "2024-03-05",
        createdBy: "Aulia Rahmawati",
        passwordChanged: "60 hari lalu",
        failedLogins: 2,
    },
    {
        id: "ADM-004",
        name: "Admin Ops Surabaya",
        email: "ops.sby@cakli.com",
        role: "Operating Admin",
        scope: "Zone-Specific",
        scopeDetail: "Surabaya Pusat",
        mfa: "Enabled",
        status: "Active",
        lastLogin: "Kemarin",
        lastAction: "Suspend driver DR-0441",
        lastLoginIP: "114.5.28.99",
        risk: "Low",
        createdAt: "2024-04-20",
        createdBy: "Goldi Pratama",
        passwordChanged: "7 hari lalu",
        failedLogins: 0,
    },
    {
        id: "ADM-005",
        name: "Dev Internal",
        email: "dev@cakli.com",
        role: "Master Admin",
        scope: "Global",
        scopeDetail: null,
        mfa: "Disabled",
        status: "Suspended",
        lastLogin: "65 hari lalu",
        lastAction: "Config system parameter",
        lastLoginIP: "10.0.0.1",
        risk: "High",
        createdAt: "2023-11-01",
        createdBy: "System",
        passwordChanged: "90+ hari lalu",
        failedLogins: 7,
    },
    {
        id: "ADM-006",
        name: "Budi Santoso",
        email: "budi@cakli.com",
        role: "Operating Admin",
        scope: "Regional",
        scopeDetail: "Jawa Barat",
        mfa: "Required",
        status: "Pending Approval",
        lastLogin: "Belum pernah login",
        lastAction: "-",
        lastLoginIP: "-",
        risk: "Low",
        createdAt: "2025-02-20",
        createdBy: "Goldi Pratama",
        passwordChanged: "-",
        failedLogins: 0,
    },
]

function translateStatus(status: string) {
    if (status === "Active") return "Aktif"
    if (status === "Suspended") return "Ditangguhkan"
    if (status === "Pending Approval") return "Menunggu Persetujuan"
    return status
}

function translateRole(role: string) {
    if (role === "Master Admin") return "Master Admin"
    if (role === "Operating Admin") return "Admin Operasional"
    if (role === "Reporting Admin") return "Admin Pelaporan"
    return role
}

function translateScope(scope: string) {
    if (scope === "Global") return "Global"
    if (scope === "Regional") return "Regional"
    if (scope === "Zone-Specific") return "Spesifik Zona"
    return scope
}

function translateMfa(mfa: string) {
    if (mfa === "Enabled") return "Aktif"
    if (mfa === "Disabled") return "Nonaktif"
    if (mfa === "Required") return "Wajib"
    return mfa
}

function translateResult(result: string) {
    if (result === "Success") return "Berhasil"
    return "Gagal"
}

const PERMS = [
    { key: "View", label: "Lihat" },
    { key: "Edit", label: "Ubah" },
    { key: "Approve", label: "Setujui" },
    { key: "Export", label: "Ekspor" },
    { key: "Delete", label: "Hapus" },
]

const PERMISSION_MATRIX = [
    { module: "Analitik Dasbor", reporting: ["View"], operating: ["View"], master: ["View", "Export"] },
    { module: "Manajemen Driver", reporting: ["View"], operating: ["View", "Edit", "Suspend"], master: ["View", "Edit", "Suspend", "Delete"] },
    { module: "Manajemen Zona", reporting: ["View"], operating: ["View", "Edit"], master: ["View", "Edit", "Approve", "Delete"] },
    { module: "Manajemen Tarif", reporting: ["View"], operating: [], master: ["View", "Edit", "Approve"] },
    { module: "Pengaturan Global", reporting: [], operating: [], master: ["View", "Edit"] },
    { module: "Penutupan Darurat", reporting: [], operating: [], master: ["Approve"] },
    { module: "Ekspor Data", reporting: ["View", "Export"], operating: ["View", "Export"], master: ["View", "Export", "Delete"] },
    { module: "Manajemen Admin", reporting: [], operating: [], master: ["View", "Edit", "Approve", "Delete"] },
]

const ACTIVITY_LOG = [
    { date: "2025-02-28", time: "13:42", admin: "Aulia Rahmawati", action: "Edit Role", target: "ADM-006 → Operating Admin", ip: "103.145.22.10", result: "Success" },
    { date: "2025-02-28", time: "13:05", admin: "Goldi Pratama", action: "Approve Request", target: "New Zone: Malang Selatan", ip: "180.242.11.44", result: "Success" },
    { date: "2025-02-28", time: "12:51", admin: "Risma Fitriani", action: "Export Data", target: "Revenue Report Jan–Feb", ip: "203.77.55.21", result: "Success" },
    { date: "2025-02-28", time: "11:30", admin: "Dev Internal", action: "Login Attempt", target: "-", ip: "10.0.0.1", result: "Failed" },
    { date: "2025-02-28", time: "11:28", admin: "Dev Internal", action: "Login Attempt", target: "-", ip: "10.0.0.1", result: "Failed" },
    { date: "2025-02-27", time: "10:15", admin: "Aulia Rahmawati", action: "Suspend Admin", target: "Dev Internal (ADM-005)", ip: "103.145.22.10", result: "Success" },
    { date: "2025-02-27", time: "09:44", admin: "Admin Ops Surabaya", action: "Suspend Driver", target: "DR-0441", ip: "114.5.28.99", result: "Success" },
    { date: "2025-02-26", time: "09:10", admin: "Goldi Pratama", action: "Reset MFA", target: "ADM-003 (Risma)", ip: "180.242.11.44", result: "Success" },
]

const RISK_ALERTS = [
    { level: "Critical", icon: ShieldAlert, msg: "3 Master Admin aktif — melebihi batas aman (maks. 2).", color: "text-red-600", bg: "bg-red-50 border-red-200" },
    { level: "High", icon: AlertTriangle, msg: "Dev Internal (ADM-005): Master Admin tanpa MFA aktif.", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
    { level: "High", icon: Clock, msg: "ADM-005 tidak login selama 65 hari (batas: 60 hari).", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
    { level: "Medium", icon: KeyRound, msg: "ADM-003 (Risma): MFA disabled, 2 failed login attempts.", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function roleBadge(role: string) {
    if (role === "Master Admin") return "bg-red-100 text-red-700 border-red-200"
    if (role === "Operating Admin") return "bg-blue-100 text-blue-700 border-blue-200"
    return "bg-slate-100 text-slate-700 border-slate-200"
}

function statusBadge(status: string) {
    if (status === "Active") return "bg-green-100 text-green-700 border-green-200"
    if (status === "Suspended") return "bg-red-100 text-red-700 border-red-200"
    if (status === "Pending Approval") return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-slate-100 text-slate-600 border-slate-200"
}

function riskBadge(risk: string) {
    if (risk === "High") return "bg-red-100 text-red-700"
    if (risk === "Medium") return "bg-yellow-100 text-yellow-700"
    return "bg-green-100 text-green-700"
}

function translateRisk(risk: string) {
    if (risk === "High") return "Tinggi"
    if (risk === "Medium") return "Sedang"
    return "Rendah"
}

function mfaBadge(mfa: string) {
    if (mfa === "Enabled") return { cls: "text-green-600", Icon: CheckCircle2 }
    if (mfa === "Disabled") return { cls: "text-red-500", Icon: XCircle }
    return { cls: "text-yellow-600", Icon: AlertTriangle }
}

function scopeIcon(scope: string) {
    if (scope === "Global") return <Globe className="size-3 text-blue-500" />
    if (scope === "Regional") return <MapPin className="size-3 text-purple-500" />
    return <Navigation className="size-3 text-orange-500" />
}

function permBadge(perms: string[], label: string) {
    return perms.includes(label) ? (
        <span className="inline-flex items-center justify-center size-5 rounded-full bg-green-100">
            <CheckCircle2 className="size-3 text-green-600" />
        </span>
    ) : (
        <span className="inline-flex items-center justify-center size-5 rounded-full bg-slate-100">
            <XCircle className="size-3 text-slate-300" />
        </span>
    )
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function RoleManagement() {
    const [selectedAdmin, setSelectedAdmin] = React.useState<typeof ADMINS[0] | null>(null)
    const [search, setSearch] = React.useState("")
    const [roleFilter, setRoleFilter] = React.useState("all")
    const [statusFilter, setStatusFilter] = React.useState("all")

    // ── New Admin Modal State ──
    const [newAdminOpen, setNewAdminOpen] = React.useState(false)
    const [newAdminRole, setNewAdminRole] = React.useState("")
    const [newAdminScope, setNewAdminScope] = React.useState("")
    const [newAdminMfa, setNewAdminMfa] = React.useState(true)
    const resetNewAdmin = () => { setNewAdminRole(""); setNewAdminScope(""); setNewAdminMfa(true) }

    // ── Activity Log Date Picker State ──
    const [logDateRange, setLogDateRange] = React.useState<DateRange | undefined>(undefined)

    const filteredLog = ACTIVITY_LOG.filter(log => {
        const logDate = new Date(log.date)
        if (logDateRange?.from) {
            const from = new Date(logDateRange.from)
            from.setHours(0, 0, 0, 0)
            if (logDate < from) return false
        }
        if (logDateRange?.to) {
            const to = new Date(logDateRange.to)
            to.setHours(23, 59, 59, 999)
            if (logDate > to) return false
        }
        return true
    })

    const masterActiveCount = ADMINS.filter(a => a.role === "Master Admin" && a.status === "Active").length
    const totalActive = ADMINS.filter(a => a.status === "Active").length
    const mfaCompliant = ADMINS.filter(a => a.mfa === "Enabled").length
    const suspended = ADMINS.filter(a => a.status === "Suspended" || a.status === "Locked").length

    const filtered = ADMINS.filter(a => {
        const matchesSearch =
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.email.toLowerCase().includes(search.toLowerCase())

        const matchesRole = roleFilter === "all" || a.role === roleFilter
        const matchesStatus = statusFilter === "all" || a.status === statusFilter

        return matchesSearch && matchesRole && matchesStatus
    })

    return (
        <div className="flex flex-col gap-4 p-6 relative">

            {/* ── HEADER ── */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Kontrol Akses Admin</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Kelola peran, cakupan akses, dan keamanan administratif sistem.</p>
                </div>
                <Dialog open={newAdminOpen} onOpenChange={(open) => { setNewAdminOpen(open); if (!open) resetNewAdmin() }}>
                    <DialogTrigger asChild>
                        <Button className="bg-cakli-orange hover:bg-cakli-orange/90 text-white gap-2 h-9 text-xs shrink-0">
                            <UserPlus className="size-3.5" /> Akses Admin Baru
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>Tambah Akses Admin Baru</DialogTitle>
                            <DialogDescription>Buat akun admin baru dengan peran dan cakupan akses yang sesuai.</DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 overflow-y-auto -mx-6 px-6">
                        <div className="space-y-4">
                            {/* Name & Email */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="admin-name" className="text-xs">Nama Lengkap <span className="text-red-500">*</span></Label>
                                    <Input id="admin-name" placeholder="cth: Budi Santoso" className="h-9 text-xs" />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="admin-email" className="text-xs">Email <span className="text-red-500">*</span></Label>
                                    <Input id="admin-email" placeholder="budi@cakli.com" type="email" className="h-9 text-xs" />
                                </div>
                            </div>

                            {/* Role */}
                            <div className="grid gap-1.5">
                                <Label className="text-xs">Peran Admin <span className="text-red-500">*</span></Label>
                                <Select value={newAdminRole} onValueChange={(val) => {
                                    setNewAdminRole(val)
                                    if (val === "Master Admin") setNewAdminScope("Global")
                                    else setNewAdminScope("")
                                }}>
                                    <SelectTrigger className="h-9 text-xs">
                                        <SelectValue placeholder="Pilih peran..." />
                                    </SelectTrigger>
                                    <SelectContent className="text-xs">
                                        <SelectItem value="Master Admin">Master Admin</SelectItem>
                                        <SelectItem value="Operating Admin">Admin Operasional</SelectItem>
                                        <SelectItem value="Reporting Admin">Admin Pelaporan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {newAdminRole === "Master Admin" && masterActiveCount >= 2 && (
                                    <div className="flex items-start gap-2 p-2.5 rounded-md bg-red-50 border border-red-200">
                                        <ShieldAlert className="size-3.5 text-red-500 mt-0.5 shrink-0" />
                                        <p className="text-[11px] text-red-700 leading-snug">
                                            <strong>Peringatan:</strong> Sudah ada {masterActiveCount} Master Admin aktif (batas aman: 2). Menambah Master Admin baru meningkatkan risiko keamanan sistem.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Scope */}
                            <div className="grid gap-1.5">
                                <Label className="text-xs">Cakupan Akses <span className="text-red-500">*</span></Label>
                                {newAdminRole === "Master Admin" ? (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-md border text-xs text-muted-foreground">
                                        <Globe className="size-3.5 text-blue-500" />
                                        Global — akses penuh ke semua sistem
                                    </div>
                                ) : (
                                    <Select value={newAdminScope} onValueChange={setNewAdminScope} disabled={!newAdminRole}>
                                        <SelectTrigger className="h-9 text-xs">
                                            <SelectValue placeholder={newAdminRole ? "Pilih cakupan..." : "Pilih peran terlebih dahulu"} />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                            <SelectItem value="Regional">Regional</SelectItem>
                                            <SelectItem value="Zone-Specific">Spesifik Zona</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>

                            {/* Region/Zone detail — only for non-Master */}
                            {newAdminRole !== "Master Admin" && newAdminScope && (
                                <div className="grid gap-1.5">
                                    <Label className="text-xs">
                                        {newAdminScope === "Regional" ? "Pilih Region" : "Pilih Zona"} <span className="text-red-500">*</span>
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="h-9 text-xs">
                                            <SelectValue placeholder={newAdminScope === "Regional" ? "Pilih region..." : "Pilih zona..."} />
                                        </SelectTrigger>
                                        <SelectContent className="text-xs">
                                            {newAdminScope === "Regional" ? (
                                                <>
                                                    <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                                                    <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                                                    <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                                                </>
                                            ) : (
                                                <>
                                                    <SelectItem value="Malang Kota">Malang Kota</SelectItem>
                                                    <SelectItem value="Surabaya Pusat">Surabaya Pusat</SelectItem>
                                                    <SelectItem value="Batu Wisata">Batu Wisata</SelectItem>
                                                    <SelectItem value="Sidoarjo Kota">Sidoarjo Kota</SelectItem>
                                                    <SelectItem value="Kepanjen Sub">Kepanjen Sub</SelectItem>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {/* MFA Switch */}
                            <div className="flex items-center justify-between px-3 py-3 bg-slate-50 rounded-lg border">
                                <div className="flex items-center gap-2.5">
                                    <Fingerprint className="size-4 text-slate-600" />
                                    <div>
                                        <p className="text-xs font-semibold">Wajibkan MFA</p>
                                        <p className="text-[10px] text-muted-foreground">Admin harus mendaftarkan authenticator saat login pertama</p>
                                    </div>
                                </div>
                                <Switch checked={newAdminMfa} onCheckedChange={setNewAdminMfa} />
                            </div>

                            {/* Reason */}
                            <div className="grid gap-1.5">
                                <Label className="text-xs">Alasan Pembuatan <span className="text-red-500">*</span></Label>
                                <Textarea
                                    placeholder="cth: Dibutuhkan admin baru untuk operasional zona Sidoarjo..."
                                    className="text-xs resize-none"
                                    rows={2}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex items-start gap-2 p-2.5 rounded-md bg-blue-50 border border-blue-200">
                                <Info className="size-3.5 text-blue-500 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-blue-700 leading-snug">
                                    Admin baru akan menerima email undangan dan harus menyelesaikan pendaftaran dalam 72 jam. Akun akan berstatus <strong>"Menunggu Persetujuan"</strong> hingga diaktifkan oleh Master Admin.
                                </p>
                            </div>
                        </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button className="bg-cakli-orange hover:bg-orange-700 gap-1.5" onClick={() => { setNewAdminOpen(false); resetNewAdmin(); toast.success("Admin baru berhasil dibuat") }}>
                                <UserPlus className="size-3.5" /> Buat Admin Baru
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* ── SUMMARY CARDS ── */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                    { label: "Total Admin Aktif", value: String(totalActive), sub: `dari ${ADMINS.length} admin`, icon: Users, danger: false },
                    { label: "Master Admin Aktif", value: String(masterActiveCount), sub: `batas aman: 2`, icon: ShieldCheck, danger: masterActiveCount > 2 },
                    { label: "Kepatuhan MFA", value: `${Math.round(mfaCompliant / ADMINS.length * 100)}%`, sub: `${mfaCompliant} dari ${ADMINS.length} admin`, icon: Fingerprint, danger: false },
                    { label: "Ditangguhkan / Dikunci", value: String(suspended), sub: "perlu perhatian", icon: Lock, danger: true, isSuspended: true },
                    { label: "Peran Berubah (7H)", value: "3", sub: "Perubahan terakhir 2j lalu", icon: Activity, danger: false },
                ].map((card, i) => (
                    <Card key={i} className={`overflow-hidden border-slate-200 transition-all ${card.isSuspended ? "border-red-500/50" : ""}`}>
                        <div className="flex items-stretch h-full relative">
                            <div className={`w-1.5 rounded-full my-3 ml-3 shrink-0 ${card.isSuspended ? "bg-red-500" : "bg-cakli-orange"}`} />
                            <div className="flex-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                    <CardTitle className={`text-xs font-semibold ${card.isSuspended ? "text-red-600" : "text-slate-700"}`}>{card.label}</CardTitle>
                                    <card.icon className={`h-3.5 w-3.5 ${card.isSuspended ? "text-red-500" : "text-slate-400"}`} />
                                </CardHeader>
                                <CardContent className="px-3 pb-3">
                                    <div className={`text-2xl font-bold ${card.isSuspended ? "text-red-600" : "text-slate-900"}`}>{card.value}</div>
                                    <p className="text-[10px] text-muted-foreground font-medium">{card.sub}</p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* ── RISK ALERTS ── */}
            <div className="flex flex-col gap-2">
                {RISK_ALERTS.map((alert, i) => (
                    <div key={i} className={`flex items-center gap-3 px-4 py-2 rounded-xl border text-[11px] font-medium transition-all hover:translate-x-1 ${alert.bg}`}>
                        <div className={`p-1 rounded-lg ${alert.bg.replace('bg-', 'bg-').replace('-50', '-100')}`}>
                            <alert.icon className={`size-3.5 shrink-0 ${alert.color}`} />
                        </div>
                        <span className={`font-bold ${alert.color} shrink-0 uppercase tracking-tight`}>{alert.level}</span>
                        <span className="text-slate-800">{alert.msg}</span>
                    </div>
                ))}
            </div>

            {/* ── MAIN TABS ── */}
            <Tabs defaultValue="admins" className="w-full">
                <div className="flex items-center justify-between mb-3">
                    <TabsList className="bg-slate-100 h-9 p-1">
                        <TabsTrigger value="admins" className="text-xs gap-1.5 h-7"><Users className="size-3.5" /> Admin</TabsTrigger>
                        <TabsTrigger value="matrix" className="text-xs gap-1.5 h-7"><MonitorCheck className="size-3.5" /> Matriks Izin</TabsTrigger>
                        <TabsTrigger value="log" className="text-xs gap-1.5 h-7"><Activity className="size-3.5" /> Log Aktivitas</TabsTrigger>
                    </TabsList>

                    {/* SEARCH + FILTER */}
                    <div className="flex items-center gap-2">
                        <div className="relative group">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-cakli-orange transition-colors" />
                            <Input
                                placeholder="Cari nama atau email..."
                                className="pl-9 h-9 w-[200px] bg-white border-slate-200 text-xs"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[130px] h-9 text-xs bg-white">
                                <SelectValue placeholder="Semua Role" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                                <SelectItem value="all">Semua Role</SelectItem>
                                <SelectItem value="Master Admin">Master Admin</SelectItem>
                                <SelectItem value="Operating Admin">Operating Admin</SelectItem>
                                <SelectItem value="Reporting Admin">Reporting Admin</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[130px] h-9 text-xs bg-white">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="Active">Aktif</SelectItem>
                                <SelectItem value="Suspended">Ditangguhkan</SelectItem>
                                <SelectItem value="Pending Approval">Menunggu Persetujuan</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>

                <TabsContent value="admins" className="mt-0">
                    <div className="flex gap-4">
                        <Card className="border-none ring-1 ring-slate-200 flex-1 min-w-0">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="text-[10px] font-bold uppercase py-3 pl-5">Admin</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Peran</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Cakupan</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">MFA</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Status</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Aktivitas Terakhir</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3">Risiko</TableHead>
                                            <TableHead className="text-[10px] font-bold uppercase py-3 text-right pr-5">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filtered.map((admin) => {
                                            const mfa = mfaBadge(admin.mfa)
                                            const MfaIcon = mfa.Icon
                                            return (
                                                <TableRow
                                                    key={admin.id}
                                                    className={`group hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedAdmin?.id === admin.id ? "bg-slate-50" : ""}`}
                                                    onClick={() => setSelectedAdmin(selectedAdmin?.id === admin.id ? null : admin)}
                                                >
                                                    {/* Admin */}
                                                    <TableCell className="pl-5 py-3">
                                                        <div className="flex items-center gap-2.5">
                                                            <Avatar className="size-7 shrink-0">
                                                                <AvatarFallback className="text-[10px] bg-slate-100">{admin.name[0]}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-xs font-semibold">{admin.name}</p>
                                                                <p className="text-[10px] text-muted-foreground">{admin.email}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    {/* Role */}
                                                    <TableCell>
                                                        <Badge variant="outline" className={`text-[9px] h-5 font-semibold ${roleBadge(admin.role)}`}>
                                                            {translateRole(admin.role)}
                                                        </Badge>
                                                    </TableCell>
                                                    {/* Scope */}
                                                    <TableCell>
                                                        <div className="flex items-center gap-1.5">
                                                            {scopeIcon(admin.scope)}
                                                            <div>
                                                                <p className="text-[10px] font-medium">{translateScope(admin.scope)}</p>
                                                                {admin.scopeDetail && <p className="text-[9px] text-muted-foreground">{admin.scopeDetail}</p>}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    {/* MFA */}
                                                    <TableCell>
                                                        <div className={`flex items-center gap-1 text-[10px] font-medium ${mfa.cls}`}>
                                                            <MfaIcon className="size-3.5" />
                                                            {translateMfa(admin.mfa)}
                                                        </div>
                                                    </TableCell>
                                                    {/* Status */}
                                                    <TableCell>
                                                        <Badge variant="outline" className={`text-[9px] h-5 ${statusBadge(admin.status)}`}>
                                                            {translateStatus(admin.status)}
                                                        </Badge>
                                                    </TableCell>
                                                    {/* Last Activity */}
                                                    <TableCell>
                                                        <p className="text-[10px] font-medium">{admin.lastLogin}</p>
                                                        <p className="text-[9px] text-muted-foreground truncate max-w-[120px]">{admin.lastAction}</p>
                                                    </TableCell>
                                                    {/* Risk */}
                                                    <TableCell>
                                                        <Badge className={`text-[9px] h-5 border-0 ${riskBadge(admin.risk)}`}>
                                                            {translateRisk(admin.risk)}
                                                        </Badge>
                                                    </TableCell>
                                                    {/* Actions */}
                                                    <TableCell className="text-right pr-5">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button
                                                                variant="ghost" size="sm"
                                                                className="h-7 text-[10px] gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                                onClick={e => { e.stopPropagation(); setSelectedAdmin(admin) }}
                                                            >
                                                                <Eye className="size-3" /> Detail
                                                            </Button>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => e.stopPropagation()}>
                                                                        <MoreHorizontal className="size-3.5" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-44 text-xs">
                                                                    <DropdownMenuLabel className="text-[10px]">Aksi Admin</DropdownMenuLabel>
                                                                    <DropdownMenuItem className="text-xs gap-2"><Pencil className="size-3" /> Ubah Peran</DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-xs gap-2"><Globe className="size-3" /> Ubah Cakupan</DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-xs gap-2"><RefreshCw className="size-3" /> Reset MFA</DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-xs gap-2 text-orange-700"><Ban className="size-3" /> Tangguhkan</DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-xs gap-2 text-red-700"><UserX className="size-3" /> Nonaktifkan</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>

                            {/* ── PAGINATION ── */}
                            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 mt-auto">
                                <p className="text-[10px] text-muted-foreground font-medium">
                                    Menampilkan <span className="text-slate-900 font-bold">1–{filtered.length}</span> dari <span className="text-slate-900 font-bold">{ADMINS.length}</span> admin
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
                    </div>
                </TabsContent>

                {/* ── TAB: PERMISSION MATRIX ── */}
                <TabsContent value="matrix" className="mt-0">
                    <Card className="border-none ring-1 ring-slate-200">
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-sm">Matriks Izin</CardTitle>
                            <CardDescription className="text-xs">Cakupan aksi per modul untuk tiap peran admin.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-[10px] font-bold uppercase py-3 pl-5 w-[220px]">Modul</TableHead>
                                        {PERMS.map(p => (
                                            <TableHead key={p.key} colSpan={3} className="text-[10px] font-bold uppercase py-3 text-center border-l">{p.label}</TableHead>
                                        ))}
                                    </TableRow>
                                    <TableRow className="hover:bg-transparent bg-slate-50/30">
                                        <TableHead className="pl-5 py-2" />
                                        {PERMS.map(p => (
                                            <React.Fragment key={p.key}>
                                                <TableHead className="text-[9px] font-semibold py-2 text-center text-red-700 border-l">Master</TableHead>
                                                <TableHead className="text-[9px] font-semibold py-2 text-center text-blue-700">Oper.</TableHead>
                                                <TableHead className="text-[9px] font-semibold py-2 text-center text-slate-600">Pelap.</TableHead>
                                            </React.Fragment>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {PERMISSION_MATRIX.map((row, i) => (
                                        <TableRow key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="pl-5 py-3 font-medium text-xs">{row.module}</TableCell>
                                            {PERMS.map(p => (
                                                <React.Fragment key={p.key}>
                                                    <TableCell className="text-center py-3 border-l">{permBadge(row.master, p.key)}</TableCell>
                                                    <TableCell className="text-center py-3">{permBadge(row.operating, p.key)}</TableCell>
                                                    <TableCell className="text-center py-3">{permBadge(row.reporting, p.key)}</TableCell>
                                                </React.Fragment>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="log" className="mt-0">
                    <Card className="border-none ring-1 ring-slate-200">
                        <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm">Log Aktivitas Admin</CardTitle>
                                <CardDescription className="text-xs">Semua aksi administratif tercatat secara real-time.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className={`h-8 text-xs gap-1.5 justify-start font-normal ${!logDateRange ? 'text-muted-foreground' : ''}`}>
                                            <Clock className="size-3.5" />
                                            {logDateRange?.from ? (
                                                logDateRange.to ? (
                                                    <>{format(logDateRange.from, 'dd MMM yyyy', { locale: localeId })} - {format(logDateRange.to, 'dd MMM yyyy', { locale: localeId })}</>
                                                ) : (
                                                    format(logDateRange.from, 'dd MMM yyyy', { locale: localeId })
                                                )
                                            ) : (
                                                'Pilih rentang tanggal'
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar
                                            mode="range"
                                            defaultMonth={logDateRange?.from}
                                            selected={logDateRange}
                                            onSelect={setLogDateRange}
                                            numberOfMonths={2}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {logDateRange && (
                                    <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={() => setLogDateRange(undefined)}>
                                        <XCircle className="size-3.5 mr-1" /> Reset
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-[10px] font-bold uppercase py-3 pl-5">Waktu</TableHead>
                                        <TableHead className="text-[10px] font-bold uppercase py-3">Admin</TableHead>
                                        <TableHead className="text-[10px] font-bold uppercase py-3">Aksi</TableHead>
                                        <TableHead className="text-[10px] font-bold uppercase py-3">Target</TableHead>
                                        <TableHead className="text-[10px] font-bold uppercase py-3">Alamat IP</TableHead>
                                        <TableHead className="text-[10px] font-bold uppercase py-3 text-right pr-5">Hasil</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredLog.map((log, i) => (
                                        <TableRow key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="pl-5 py-3 font-mono text-[10px] text-muted-foreground">{log.time}</TableCell>
                                            <TableCell className="text-xs font-medium">{log.admin}</TableCell>
                                            <TableCell className="text-xs">{log.action}</TableCell>
                                            <TableCell className="text-[10px] text-muted-foreground">{log.target}</TableCell>
                                            <TableCell className="font-mono text-[10px] text-muted-foreground">{log.ip}</TableCell>
                                            <TableCell className="text-right pr-5">
                                                <Badge className={`text-[9px] h-5 border-0 ${log.result === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                    {translateResult(log.result)}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>

                        {/* ── PAGINATION ── */}
                        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 mt-auto">
                            <p className="text-[10px] text-muted-foreground font-medium">
                                Menampilkan <span className="text-slate-900 font-bold">{filteredLog.length}</span> aktivitas
                            </p>
                            <div className="flex items-center gap-1.5">
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                                    <ChevronRight className="size-4 rotate-180" />
                                </Button>
                                <div className="flex items-center gap-1">
                                    <Button variant="default" size="sm" className="h-8 w-8 p-0 text-[10px] font-bold bg-cakli-orange hover:bg-cakli-orange/90 text-white">1</Button>
                                </div>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* ── SIDE PANEL DETAIL ── */}
            {selectedAdmin && (
                <div className="fixed top-0 right-0 h-full w-[380px] bg-white border-l z-50 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-9">
                                <AvatarFallback className="bg-slate-100 font-semibold">{selectedAdmin.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-bold">{selectedAdmin.name}</p>
                                <p className="text-[10px] text-muted-foreground">{selectedAdmin.email}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="size-7" onClick={() => setSelectedAdmin(null)}>
                            <X className="size-4" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                        {/* Basic Info */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Informasi Dasar</p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "ID Admin", val: selectedAdmin.id },
                                    { label: "Dibuat oleh", val: selectedAdmin.createdBy },
                                    { label: "Tanggal Dibuat", val: selectedAdmin.createdAt },
                                    { label: "Tingkat Risiko", val: translateRisk(selectedAdmin.risk) },
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-50 rounded-md p-2.5">
                                        <p className="text-[9px] text-muted-foreground uppercase font-bold">{item.label}</p>
                                        <p className="text-xs font-semibold mt-0.5">{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Assigned Role */}
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Peran yang Ditugaskan</p>
                            <div className={`flex items-center justify-between px-3 py-2.5 rounded-md border ${roleBadge(selectedAdmin.role)}`}>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="size-4" />
                                    <span className="text-sm font-bold">{translateRole(selectedAdmin.role)}</span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1">
                                    <Pencil className="size-2.5" /> Ubah
                                </Button>
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                                {selectedAdmin.role === "Master Admin" && "Global control & configuration — akses penuh ke semua sistem."}
                                {selectedAdmin.role === "Operating Admin" && "Operasional zona & driver — tidak dapat mengubah konfigurasi global."}
                                {selectedAdmin.role === "Reporting Admin" && "Read-only data — hanya dapat melihat dan mengekspor laporan."}
                            </p>
                        </div>

                        <Separator />

                        {/* Scope */}
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Scope Akses</p>
                            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-md border">
                                {scopeIcon(selectedAdmin.scope)}
                                <div>
                                    <p className="text-xs font-semibold">{selectedAdmin.scope}</p>
                                    {selectedAdmin.scopeDetail && <p className="text-[10px] text-muted-foreground">{selectedAdmin.scopeDetail}</p>}
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="w-full h-7 text-[10px] gap-1">
                                <Globe className="size-3" /> Ubah Cakupan Akses
                            </Button>
                        </div>

                        <Separator />

                        {/* Security */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Keamanan</p>
                            <div className="space-y-2">
                                {[
                                    { label: "Status MFA", val: translateMfa(selectedAdmin.mfa), highlight: selectedAdmin.mfa !== "Enabled" },
                                    { label: "Password Terakhir Diubah", val: selectedAdmin.passwordChanged, highlight: false },
                                    { label: "Login Terakhir IP", val: selectedAdmin.lastLoginIP, highlight: false },
                                    { label: "Upaya Login Gagal", val: String(selectedAdmin.failedLogins), highlight: selectedAdmin.failedLogins > 3 },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-md ${item.highlight ? "bg-red-50 border border-red-200" : "bg-slate-50"}`}>
                                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                                        <p className={`text-xs font-semibold ${item.highlight ? "text-red-600" : ""}`}>{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Actions */}
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-2 border-orange-200 text-orange-700 hover:bg-orange-50">
                                <KeyRound className="size-3.5" /> Paksa Reset Kata Sandi
                            </Button>
                            <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                                <Fingerprint className="size-3.5" /> Paksa Pendaftaran Ulang MFA
                            </Button>
                        </div>

                        <Separator />

                        {/* Danger Zone */}
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">Zona Bahaya</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1.5 border-orange-300 text-orange-700 hover:bg-orange-50">
                                    <Ban className="size-3" /> Tangguhkan
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1.5 border-red-300 text-red-700 hover:bg-red-50">
                                    <UserX className="size-3" /> Nonaktifkan
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}