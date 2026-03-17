"use client"

import * as React from "react"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Bell,
    CheckCircle2,
    MessageSquare,
    History,
    ShieldAlert,
    Ban,
    ExternalLink,
    Send,
    TrendingDown,
    Clock,
    AlertTriangle,
    UserX,
    Search,
    Activity,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Eye,
    PhoneCall,
    Timer,
    CheckCheck,
    Info,
    RefreshCw,
    RotateCcw,
    X
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@/components/ui/empty"

type DriverStatus = "Peringatan" | "Kritis" | "Info" | "Dipantau" | "Diselidiki"

interface ActivityDriver {
    id: string
    name: string
    issue: string
    location: string
    duration: string
    status: DriverStatus
    lastOnline: string
    lastTrip: string
    cancelRate: string
    acceptanceRate: string
}

// Data awal dengan 12 entri untuk demo pagination
const INITIAL_ACTIVITY_DATA: ActivityDriver[] = [
    { id: "DRV-001", name: "Budi Santoso", issue: "Diam > 30 menit", location: "Suhat", duration: "32m", status: "Peringatan", lastOnline: "5m lalu", lastTrip: "Suhat -> Dinoyo", cancelRate: "5%", acceptanceRate: "92%" },
    { id: "DRV-002", name: "Siti Rahayu", issue: "Diam > 15 menit", location: "Ijen", duration: "18m", status: "Info", lastOnline: "Aktif Sekarang", lastTrip: "Ijen -> Kayutangan", cancelRate: "2%", acceptanceRate: "98%" },
    { id: "DRV-003", name: "Ahmad Fauzi", issue: "Pembatalan Sering", location: "Dinoyo", duration: "4 perjalanan", status: "Kritis", lastOnline: "Aktif Sekarang", lastTrip: "Dinoyo -> Matos", cancelRate: "25%", acceptanceRate: "50%" },
    { id: "DRV-004", name: "Dewi Lestari", issue: "Offline Mendadak", location: "Sawojajar", duration: "Baru saja", status: "Info", lastOnline: "Offline", lastTrip: "MOG -> Sawojajar", cancelRate: "1%", acceptanceRate: "99%" },
    { id: "DRV-005", name: "Rudi H.", issue: "Pembatalan Sering", location: "Dinoyo", duration: "5 perjalanan", status: "Kritis", lastOnline: "Aktif Sekarang", lastTrip: "Landungsari -> Matos", cancelRate: "28%", acceptanceRate: "45%" },
    { id: "DRV-006", name: "Maya Sari", issue: "Diam > 20 menit", location: "Blimbing", duration: "22m", status: "Peringatan", lastOnline: "10m lalu", lastTrip: "Blimbing -> Dieng", cancelRate: "8%", acceptanceRate: "88%" },
    { id: "DRV-007", name: "Hendra Wijaya", issue: "Pembatalan Tinggi", location: "Klojen", duration: "3 perjalanan", status: "Dipantau", lastOnline: "Aktif Sekarang", lastTrip: "Klojen -> Pasar Besar", cancelRate: "15%", acceptanceRate: "75%" },
    { id: "DRV-008", name: "Ratna Dewi", issue: "Offline Mendadak", location: "Lowokwaru", duration: "5m lalu", status: "Diselidiki", lastOnline: "Offline", lastTrip: "Lowokwaru -> Tlogomas", cancelRate: "3%", acceptanceRate: "95%" },
    { id: "DRV-009", name: "Agus T.", issue: "Offline Mendadak", location: "Gadang", duration: "Baru saja", status: "Info", lastOnline: "Offline", lastTrip: "Pasar Besar -> Gadang", cancelRate: "2%", acceptanceRate: "98%" },
    { id: "DRV-010", name: "Bambang P.", issue: "Diam > 25 menit", location: "Kedungkandang", duration: "27m", status: "Peringatan", lastOnline: "15m lalu", lastTrip: "Kedungkandang -> Pasar", cancelRate: "6%", acceptanceRate: "90%" },
    { id: "DRV-011", name: "Rina Wati", issue: "Pembatalan Sering", location: "Sukun", duration: "4 perjalanan", status: "Kritis", lastOnline: "Aktif Sekarang", lastTrip: "Sukun -> Cemorokandang", cancelRate: "22%", acceptanceRate: "60%" },
    { id: "DRV-012", name: "Slamet", issue: "Diam > 15 menit", location: "Matos", duration: "18m", status: "Info", lastOnline: "Aktif Sekarang", lastTrip: "Suhat -> Matos", cancelRate: "0%", acceptanceRate: "100%" },
]

interface ActionLog {
    id: string;
    admin: string;
    timestamp: string;
    action: string;
    driver: string;
}

interface ActionResult {
    type: "warning_sent" | "monitor_confirmed" | "investigate_action"
    driverName: string
    driverId: string
    actionLabel: string
    actionDetail: string
    nextSteps: { icon: React.ReactNode; title: string; desc: string }[]
}

// Warna status yang konsisten
const statusColorMap: Record<DriverStatus, string> = {
    "Kritis": "bg-red-100 text-red-700 border-red-200",
    "Peringatan": "bg-orange-100 text-orange-700 border-orange-200",
    "Dipantau": "bg-blue-100 text-blue-700 border-blue-200",
    "Diselidiki": "bg-teal-100 text-teal-700 border-teal-200",
    "Info": "bg-slate-100 text-slate-700 border-slate-200"
}

export default function ActivityPage() {
    const [driverList, setDriverList] = React.useState<ActivityDriver[]>(INITIAL_ACTIVITY_DATA)
    const [selectedDriver, setSelectedDriver] = React.useState<ActivityDriver | null>(null)
    const [actionType, setActionType] = React.useState<"monitor" | "reminder" | "investigate" | null>(null)
    const [showLogsModal, setShowLogsModal] = React.useState(false)
    const [logs, setLogs] = React.useState<ActionLog[]>([])
    const [message, setMessage] = React.useState("")
    const [actionResult, setActionResult] = React.useState<ActionResult | null>(null)

    // State untuk pagination
    const [currentPage, setCurrentPage] = React.useState(1)
    const [searchQuery, setSearchQuery] = React.useState("")
    const itemsPerPage = 8

    // Filter data berdasarkan pencarian
    const filteredDrivers = React.useMemo(() => {
        return driverList.filter(driver =>
            driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [driverList, searchQuery])

    // Hitung total halaman
    const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage)

    // Dapatkan data untuk halaman saat ini
    const paginatedDrivers = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredDrivers.slice(startIndex, endIndex)
    }, [filteredDrivers, currentPage])

    // Reset ke halaman 1 ketika search query berubah
    React.useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

    const addLog = (action: string, driverName: string) => {
        const newLog: ActionLog = {
            id: `LOG-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            admin: "Admin Operasional",
            timestamp: new Date().toLocaleTimeString(),
            action,
            driver: driverName
        }
        setLogs(prev => [newLog, ...prev])
    }

    const updateDriverStatus = (driverId: string, newStatus: DriverStatus) => {
        setDriverList((prev: ActivityDriver[]) => prev.map((d: ActivityDriver) => d.id === driverId ? { ...d, status: newStatus } : d))
    }

    const openModal = (driver: ActivityDriver, type: "monitor" | "reminder" | "investigate") => {
        setSelectedDriver(driver)
        setActionType(type)
        if (type === "reminder") {
            setMessage(`Anda terdeteksi ${driver.issue}. Mohon aktif kembali atau pindah ke area permintaan tinggi.`)
        }
    }

    const closeModal = () => {
        setSelectedDriver(null)
        setActionType(null)
    }

    const handleSendWarning = () => {
        if (!selectedDriver) return
        addLog(`Peringatan Dikirim: "${message.substring(0, 30)}..."`, selectedDriver.name)
        updateDriverStatus(selectedDriver.id, "Dipantau")
        closeModal()
        setActionResult({
            type: "warning_sent",
            driverName: selectedDriver.name,
            driverId: selectedDriver.id,
            actionLabel: "Peringatan Berhasil Dikirim",
            actionDetail: `Pesan sudah terkirim ke ${selectedDriver.name}. Status pengemudi diubah ke Dipantau.`,
            nextSteps: [
                {
                    icon: <Timer className="w-4 h-4 text-orange-500" />,
                    title: "Tunggu Respons (5–10 Menit)",
                    desc: "Sistem akan memantau apakah pengemudi aktif kembali setelah menerima peringatan."
                },
                {
                    icon: <Eye className="w-4 h-4 text-blue-500" />,
                    title: "Pantau Status Secara Berkala",
                    desc: "Lihat kolom status pengemudi. Jika masih tidak aktif, lakukan eskalasi ke Selidiki."
                },
                {
                    icon: <PhoneCall className="w-4 h-4 text-emerald-500" />,
                    title: "Hubungi Langsung Jika Tidak Merespons",
                    desc: "Jika dalam 10 menit tidak ada perubahan, hubungi pengemudi via telepon atau ubah status ke Kritis."
                },
            ]
        })
    }

    const handleEscalateLevel = () => {
        if (!selectedDriver) return
        addLog("Peringatan ditingkatkan ke Kritis", selectedDriver.name)
        updateDriverStatus(selectedDriver.id, "Kritis")
        closeModal()
        setActionResult({
            type: "warning_sent",
            driverName: selectedDriver.name,
            driverId: selectedDriver.id,
            actionLabel: "Status Ditingkatkan ke Kritis",
            actionDetail: `${selectedDriver.name} sekarang ditandai Kritis. Tim supervisor akan mendapat notifikasi.`,
            nextSteps: [
                {
                    icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
                    title: "Supervisor Akan Menerima Notifikasi",
                    desc: "Tim supervisor otomatis diberitahu untuk memantau pengemudi ini secara langsung."
                },
                {
                    icon: <Eye className="w-4 h-4 text-orange-500" />,
                    title: "Gunakan Tombol 'Selidiki'",
                    desc: "Sekarang pengemudi berstatus Kritis. Klik tombol Selidiki untuk mengambil tindakan lebih lanjut."
                },
            ]
        })
    }

    const handleConfirmMonitor = () => {
        if (!selectedDriver) return
        addLog("Konfirmasi Pemantauan Awal", selectedDriver.name)
        updateDriverStatus(selectedDriver.id, "Dipantau")
        closeModal()
        setActionResult({
            type: "monitor_confirmed",
            driverName: selectedDriver.name,
            driverId: selectedDriver.id,
            actionLabel: "Pemantauan Aktif Dikonfirmasi",
            actionDetail: `${selectedDriver.name} masuk ke mode Dipantau. Admin telah mengonfirmasi pemantauan awal.`,
            nextSteps: [
                {
                    icon: <Eye className="w-4 h-4 text-blue-500" />,
                    title: "Status Berubah ke 'Dipantau'",
                    desc: "Pengemudi ditandai sedang dalam pengawasan aktif. Tidak perlu tindakan mendesak saat ini."
                },
                {
                    icon: <Timer className="w-4 h-4 text-orange-500" />,
                    title: "Cek Ulang dalam 15 Menit",
                    desc: "Jika pola tidak aktif berlanjut, kirim peringatan atau tingkatkan ke level Kritis."
                },
                {
                    icon: <History className="w-4 h-4 text-slate-500" />,
                    title: "Aksi Tercatat di Log Audit",
                    desc: "Semua tindakan pemantauan tercatat otomatis untuk keperluan laporan dan evaluasi."
                },
            ]
        })
    }

    const handleContactDriver = () => {
        if (!selectedDriver) return
        addLog("Dihubungi untuk info status", selectedDriver.name)
        closeModal()
        setActionResult({
            type: "monitor_confirmed",
            driverName: selectedDriver.name,
            driverId: selectedDriver.id,
            actionLabel: "Permintaan Kontak Tercatat",
            actionDetail: `Log kontak dengan ${selectedDriver.name} sudah dibuat. Hubungi via nomor terdaftar.`,
            nextSteps: [
                {
                    icon: <PhoneCall className="w-4 h-4 text-emerald-500" />,
                    title: "Hubungi via Telepon Terdaftar",
                    desc: "Gunakan nomor kontak pengemudi di halaman Manajemen Driver untuk menghubungi langsung."
                },
                {
                    icon: <CheckCheck className="w-4 h-4 text-blue-500" />,
                    title: "Catat Hasil Percakapan",
                    desc: "Setelah menghubungi, catat hasilnya di log atau update status pengemudi sesuai kondisi."
                },
            ]
        })
    }

    const handleInvestigateAction = (actionLabel: string, logMsg: string, newStatus: DriverStatus, nextSteps: ActionResult["nextSteps"]) => {
        if (!selectedDriver) return
        addLog(logMsg, selectedDriver.name)
        updateDriverStatus(selectedDriver.id, newStatus)
        closeModal()
        setActionResult({
            type: "investigate_action",
            driverName: selectedDriver.name,
            driverId: selectedDriver.id,
            actionLabel,
            actionDetail: `Tindakan terhadap ${selectedDriver.name} berhasil dilakukan dan tercatat dalam Log Audit.`,
            nextSteps
        })
    }

    // Fungsi untuk navigasi halaman
    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    // Generate nomor halaman untuk ditampilkan
    const getPageNumbers = (): (number | string)[] => {
        const delta = 2
        const range: number[] = []
        const rangeWithDots: (number | string)[] = []
        let l: number | undefined

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i)
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1)
                } else if (i - l !== 1) {
                    rangeWithDots.push('...')
                }
            }
            rangeWithDots.push(i)
            l = i
        })

        return rangeWithDots
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pemantauan Aktivitas Pengemudi</h1>
                    <p className="text-muted-foreground">Deteksi pola tidak produktif dan perubahan perilaku mendadak.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-4 text-sm gap-2 border-slate-200 rounded-xl"
                        onClick={() => setShowLogsModal(true)}
                    >
                        <RotateCcw className="h-4 w-4" />
                        <span className="font-semibold text-slate-700">Audit Log</span>
                        {logs.length > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E04D04] text-[10px] font-bold text-white ml-0.5">
                                {logs.length > 9 ? "9+" : logs.length}
                            </span>
                        )}
                    </Button>
                    <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-50 h-9 px-3 rounded-full">
                        <TrendingDown className="w-3 h-3 mr-2" />
                        {driverList.filter(d => d.status === "Kritis" || d.status === "Peringatan").length} Pengemudi Butuh Perhatian
                    </Badge>
                </div>
            </div>

            <div className="flex items-center justify-between px-1 -mb-2">
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        Batas Diam: 15m
                    </span>
                    <span className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        Batas Batal: 3/jam
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                <MetricCard
                    label="Pengemudi Diam"
                    value={String(driverList.filter(d => d.issue.toLowerCase().includes("diam")).length)}
                    sublabel={`${driverList.filter(d => d.issue.toLowerCase().includes("diam")).length} pengemudi perlu perhatian`}
                    icon={<Clock className="w-5 h-5" />}
                    iconColor="text-blue-400"
                />
                <MetricCard
                    label="Tingkat Batal Tinggi"
                    value={String(driverList.filter(d => d.issue.toLowerCase().includes("pembatalan")).length)}
                    sublabel="Membutuhkan evaluasi"
                    icon={<AlertTriangle className="w-5 h-5" />}
                    iconColor="text-orange-400"
                />
                <MetricCard
                    label="Offline Terbaru"
                    value={String(driverList.filter(d => d.issue.toLowerCase().includes("offline") || d.lastOnline === "Offline").length)}
                    sublabel="Dalam 30 menit terakhir"
                    icon={<UserX className="w-5 h-5" />}
                    iconColor="text-rose-400"
                />
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between mb-6">
                    <div>
                        <CardTitle>Peringatan Tidak Aktif & Pola</CardTitle>
                        <CardDescription>Pengemudi yang memerlukan perhatian operasional.</CardDescription>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari pengemudi..."
                            className="pl-8 w-[250px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table className="min-w-[1000px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-5">Pengemudi</TableHead>
                                    <TableHead>Pola Masalah</TableHead>
                                    <TableHead>Lokasi Terakhir</TableHead>
                                    <TableHead>Durasi/Jumlah</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right pr-5">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedDrivers.length > 0 ? (
                                    paginatedDrivers.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                                        {item.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 leading-tight">{item.name}</div>
                                                        <div className="text-[11px] text-muted-foreground">{item.id}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm font-semibold">{item.issue}</TableCell>
                                            <TableCell className="text-sm">{item.location}</TableCell>
                                            <TableCell className="text-sm">{item.duration}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={item.status} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <ActionButton item={item} openModal={openModal} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                            Tidak ada pengemudi yang ditemukan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination dengan warna abu-abu pastel */}
            {filteredDrivers.length > 0 && (
                <div className="flex items-center justify-between py-4">
                    <div className="text-sm text-slate-500">
                        Menampilkan{' '}
                        <span className="font-bold text-slate-900">
                            {(currentPage - 1) * itemsPerPage + 1}
                        </span>{' '}
                        -{' '}
                        <span className="font-bold text-slate-900">
                            {Math.min(currentPage * itemsPerPage, filteredDrivers.length)}
                        </span>{' '}
                        dari{' '}
                        <span className="font-bold text-slate-900">{filteredDrivers.length}</span>{' '}
                        entri
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((page, index) => (
                                <React.Fragment key={index}>
                                    {page === '...' ? (
                                        <span className="px-2 text-slate-400">...</span>
                                    ) : (
                                        <Button
                                            size="sm"
                                            className={`h-9 w-9 rounded-xl font-medium ${currentPage === page
                                                ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 border-none'
                                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                                }`}
                                            onClick={() => goToPage(Number(page))}
                                        >
                                            {page}
                                        </Button>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* MODAL: Pantau */}
            <Dialog open={actionType === "monitor"} onOpenChange={closeModal}>
                <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>
                            Pantau Aktivitas: {selectedDriver?.name}
                        </DialogTitle>
                        <DialogDescription>Ikhtisar untuk status stabil yang dikonfirmasi.</DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Online Terakhir</span>
                                <div className="text-lg font-bold text-slate-900">{selectedDriver?.lastOnline}</div>
                            </div>
                            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Penerimaan</span>
                                <div className="text-lg font-bold text-emerald-600">{selectedDriver?.acceptanceRate}</div>
                            </div>
                        </div>
                        <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Riwayat Terbaru (2jam)</span>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-slate-500 font-medium">Perjalanan Terakhir</span>
                                    <span className="text-sm font-bold text-slate-900">{selectedDriver?.lastTrip}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-sm text-slate-500 font-medium">Pola Aktivitas</span>
                                    <span className="text-sm font-bold bg-emerald-100 text-emerald-700 px-3 py-0.5 rounded-full">Konsisten</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-700 font-medium leading-relaxed">
                                Jika dikonfirmasi, status pengemudi berubah ke <strong>Dipantau</strong>. Anda bisa terus mengamati atau langsung menghubungi pengemudi.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeModal}>Tutup Panel</Button>
                        <Button variant="outline" onClick={handleConfirmMonitor}>
                            <Eye className="w-3.5 h-3.5 mr-1.5" />
                            Terus Pantau
                        </Button>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleContactDriver}>
                            <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                            Hubungi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Audit Log Modal */}
            <Dialog open={showLogsModal} onOpenChange={setShowLogsModal}>
                <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Audit Log</DialogTitle>
                        <DialogDescription>
                            Catatan tindakan intervensi pada pemantauan aktivitas
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto custom-scrollbar -mx-6 px-6 space-y-3">
                        {logs.length > 0 ? (
                            <div className="space-y-3">
                                {logs.map((log) => (
                                    <div key={log.id} className="bg-white border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-all relative overflow-hidden group">
                                        <div className="flex gap-5">
                                            <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 text-slate-500 transition-all group-hover:scale-105">
                                                <Activity className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0 pr-24">
                                                <div className="flex flex-col gap-0.5">
                                                    <h4 className="font-bold text-slate-900 text-base tracking-tight leading-none">{log.action}</h4>
                                                    <p className="text-sm text-slate-400 font-medium mt-1 uppercase text-[10px] tracking-wider">
                                                        Driver: <span className="text-slate-700 font-bold">{log.driver}</span>
                                                    </p>
                                                </div>
                                                <div className="mt-4 flex items-center gap-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Executor: {log.admin}</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-6 right-6 text-right">
                                                <p className="text-[11px] font-bold text-slate-300 font-mono whitespace-nowrap">{log.timestamp}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Empty className="h-full bg-muted/30">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <History />
                                    </EmptyMedia>
                                    <EmptyTitle>Belum Ada Aktivitas</EmptyTitle>
                                    <EmptyDescription className="max-w-xs text-pretty">
                                        Lakukan tindakan pada pengemudi untuk melihat log di sini.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowLogsModal(false)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* MODAL: Kirim Peringatan */}
            <Dialog open={actionType === "reminder"} onOpenChange={closeModal}>
                <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Kirim Peringatan</DialogTitle>
                        <DialogDescription>Intervensi langsung untuk pola non-urgent.</DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto -mx-6 px-6">
                        <div className="flex min-h-0">
                            <div className="w-[52%] pr-4 space-y-4">
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 relative overflow-hidden">
                                    <div className="flex flex-col gap-6 relative z-10">
                                        <div>
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-0.5">Pengemudi Target</h4>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                                                    {selectedDriver?.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-base font-bold text-slate-900 leading-none mb-1">{selectedDriver?.name}</div>
                                                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-md inline-block">{selectedDriver?.id}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-slate-200 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deteksi</span>
                                                <span className="text-[11px] font-bold text-[#E04D04]">Peringatan Tidak Aktif</span>
                                            </div>
                                            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                                                <p className="text-sm font-bold text-slate-800 leading-relaxed italic">"{selectedDriver?.issue}"</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
                                                <Clock className="w-3 h-3" />
                                                Terdeteksi di {selectedDriver?.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 space-y-3">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Alur Setelah Kirim</span>
                                    <div className="space-y-2.5">
                                        {[
                                            { step: "1", text: "Pesan terkirim ke aplikasi pengemudi" },
                                            { step: "2", text: "Status berubah ke Dipantau" },
                                            { step: "3", text: "Pantau respons dalam 5–10 menit" },
                                            { step: "4", text: "Eskalasi jika tidak ada respons" },
                                        ].map(s => (
                                            <div key={s.step} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-[#E04D04]/10 text-[#E04D04] text-[10px] font-black flex items-center justify-center flex-shrink-0">{s.step}</div>
                                                <span className="text-xs text-slate-600 font-medium">{s.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Button variant="ghost" onClick={handleEscalateLevel} className="w-full justify-start text-xs h-9 px-4 text-rose-600 hover:bg-rose-50/50 font-medium">
                                    <TrendingDown className="w-3.5 h-3.5 mr-1.5" />
                                    Tingkatkan Level Deteksi ke Kritis
                                </Button>
                            </div>
                            <div className="flex-1 pl-4 space-y-4 flex flex-col border-l border-slate-100">
                                <div className="flex items-center gap-2 px-1">
                                    <Send className="w-3.5 h-3.5 text-slate-400" />
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pesan</label>
                                </div>
                                <Textarea
                                    className="flex-1 min-h-[200px] bg-slate-50/30 border-slate-200 rounded-xl text-sm leading-6 p-5 focus-visible:ring-[#E04D04]/10 transition-all font-medium resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeModal}>Batal</Button>
                        <Button
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                            onClick={handleSendWarning}
                            disabled={!message.trim()}
                        >
                            <Send className="w-3.5 h-3.5 mr-1.5" />
                            Kirim
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* MODAL: Selidiki */}
            <Dialog open={actionType === "investigate"} onOpenChange={closeModal}>
                <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <DialogTitle>{selectedDriver?.name}</DialogTitle>
                                <DialogDescription>Panel Investigasi • {selectedDriver?.id}</DialogDescription>
                            </div>
                            <Badge variant="outline" className="bg-teal-100 text-teal-700 border-teal-200 font-medium uppercase tracking-wider text-[11px] py-2 px-3">
                                Risiko Tinggi
                            </Badge>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Tingkat Batal", val: selectedDriver?.cancelRate, highlight: true },
                                { label: "Penerimaan", val: selectedDriver?.acceptanceRate },
                                { label: "Pola", val: "Sering" },
                                { label: "Area Jemput", val: selectedDriver?.location }
                            ].map((st, i) => (
                                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#E04D04]/20 transition-colors">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">{st.label}</span>
                                    <span className={`text-xl font-bold ${st.highlight ? 'text-rose-600' : 'text-slate-800'}`}>{st.val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <History className="w-3 h-3" />
                                Linimasa Insiden (60m Terakhir)
                            </h3>
                            <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 space-y-4">
                                <div className="flex gap-4 relative">
                                    <div className="absolute left-1.5 top-6 bottom-[-12px] w-[1px] bg-slate-200" />
                                    <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/10 mt-1.5 shrink-0 z-10" />
                                    <div>
                                        <div className="text-[13px] font-bold text-slate-900">3 Pembatalan Beruntun</div>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Area Jemput: {selectedDriver?.location} • Alasan: Lokasi Tidak Terjangkau</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-3 h-3 rounded-full bg-slate-300 mt-1.5 shrink-0 z-10" />
                                    <div>
                                        <div className="text-[13px] font-bold text-slate-600">Aktivitas Stabil</div>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Menyelesaikan 2 perjalanan normal sebelum insiden</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Pilih Tindakan</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 transition-all text-left group"
                                    onClick={() => handleInvestigateAction(
                                        "Peringatan Resmi Dikirim",
                                        "Peringatan Resmi Dikirim",
                                        "Dipantau",
                                        [
                                            { icon: <Send className="w-4 h-4 text-orange-500" />, title: "Notifikasi Resmi Dikirim ke Pengemudi", desc: "Pengemudi menerima peringatan formal via aplikasi dan SMS." },
                                            { icon: <Timer className="w-4 h-4 text-blue-500" />, title: "Tunggu Respons 10 Menit", desc: "Jika tidak ada perubahan, pertimbangkan Batasi Sementara atau Eskalasi Supervisor." },
                                            { icon: <History className="w-4 h-4 text-slate-500" />, title: "Tindakan Tercatat di Log Audit", desc: "Semua langkah investigasi tersimpan otomatis untuk pelaporan." },
                                        ]
                                    )}
                                >
                                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-sm text-slate-800 group-hover:text-orange-700">Kirim Peringatan Resmi</div>
                                        <div className="text-[11px] text-slate-400 mt-0.5">Notifikasi formal + catat pelanggaran</div>
                                    </div>
                                </button>

                                <button
                                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-rose-400 hover:bg-rose-50/50 transition-all text-left group"
                                    onClick={() => handleInvestigateAction(
                                        "Batasi Sementara 30 Menit",
                                        "Suspensi Sementara 30m",
                                        "Diselidiki",
                                        [
                                            { icon: <Ban className="w-4 h-4 text-rose-500" />, title: "Akses Order Diblokir 30 Menit", desc: "Pengemudi tidak dapat menerima order baru selama masa pembatasan." },
                                            { icon: <PhoneCall className="w-4 h-4 text-orange-500" />, title: "Hubungi Pengemudi untuk Klarifikasi", desc: "Gunakan waktu ini untuk berbicara langsung dan memahami situasinya." },
                                            { icon: <RefreshCw className="w-4 h-4 text-emerald-500" />, title: "Evaluasi Setelah 30 Menit", desc: "Setelah masa berlaku, putuskan apakah pengemudi bisa kembali aktif atau perlu eskalasi." },
                                        ]
                                    )}
                                >
                                    <Ban className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-sm text-slate-800 group-hover:text-rose-700">Batasi Sementara (30m)</div>
                                        <div className="text-[11px] text-slate-400 mt-0.5">Blokir order baru selama 30 menit</div>
                                    </div>
                                </button>

                                <button
                                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left group"
                                    onClick={() => handleInvestigateAction(
                                        "Eskalasi ke Supervisor",
                                        "Dieskalasi ke Supervisor",
                                        "Diselidiki",
                                        [
                                            { icon: <ExternalLink className="w-4 h-4 text-blue-500" />, title: "Laporan Diteruskan ke Supervisor", desc: "Supervisor akan menerima notifikasi lengkap dengan data insiden pengemudi ini." },
                                            { icon: <Eye className="w-4 h-4 text-slate-500" />, title: "Supervisor yang Menentukan Tindakan", desc: "Anda tidak perlu mengambil keputusan lebih lanjut. Supervisor akan menangani dari sini." },
                                            { icon: <History className="w-4 h-4 text-slate-500" />, title: "Pantau Perkembangan di Log Audit", desc: "Tindakan supervisor akan tercatat dan bisa dipantau di Log Audit." },
                                        ]
                                    )}
                                >
                                    <ExternalLink className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-sm text-slate-800 group-hover:text-blue-700">Eskalasi Supervisor</div>
                                        <div className="text-[11px] text-slate-400 mt-0.5">Teruskan kasus ke level lebih tinggi</div>
                                    </div>
                                </button>

                                <button
                                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left group"
                                    onClick={() => handleInvestigateAction(
                                        "Kasus Ditutup (False Alarm)",
                                        "Investigasi Ditutup (False Alarm)",
                                        "Info",
                                        [
                                            { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, title: "Kasus Ditandai False Alarm", desc: "Status pengemudi dikembalikan ke Info dan tidak ada tindakan lanjutan diperlukan." },
                                            { icon: <History className="w-4 h-4 text-slate-500" />, title: "Tercatat di Log untuk Evaluasi", desc: "Meski false alarm, catatan ini membantu perbaikan algoritma deteksi ke depannya." },
                                        ]
                                    )}
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-sm text-slate-800 group-hover:text-emerald-700">Tutup Kasus (False Alarm)</div>
                                        <div className="text-[11px] text-slate-400 mt-0.5">Tidak ada tindakan lanjutan</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeModal}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* MODAL: Hasil Aksi (Next Steps) */}
            <Dialog open={!!actionResult} onOpenChange={() => setActionResult(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{actionResult?.actionLabel ?? "Hasil Aksi"}</DialogTitle>
                        <DialogDescription>{actionResult?.actionDetail ?? "Detail hasil tindakan pengemudi."}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm">
                                {actionResult?.driverName?.charAt(0)}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">{actionResult?.driverName}</div>
                                <div className="text-[11px] text-slate-400 font-mono">{actionResult?.driverId}</div>
                            </div>
                            <div className="ml-auto">
                                <Badge variant="outline" className="text-[10px] font-medium border-emerald-200 text-emerald-700 bg-emerald-50">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Diproses
                                </Badge>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <ArrowRight className="w-3 h-3" />
                                Langkah Selanjutnya
                            </h3>
                            {actionResult?.nextSteps.map((step, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-slate-800 leading-tight">{step.title}</div>
                                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setActionResult(null)}>Mengerti, Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* MODAL: Log Audit */}
            <Dialog open={showLogsModal} onOpenChange={setShowLogsModal}>
                <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Log Audit Aktivitas</DialogTitle>
                        <DialogDescription>
                            Jejak real-time intervensi operasional.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto custom-scrollbar -mx-6 px-6">
                        {logs.length === 0 ? (
                            <Empty className="h-full bg-muted/30">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <History />
                                    </EmptyMedia>
                                    <EmptyTitle>Tidak ada aksi yang tercatat</EmptyTitle>
                                    <EmptyDescription className="max-w-xs text-pretty">
                                        Lakukan tindakan pada pengemudi untuk melihat log di sini.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {logs.map((log, i) => (
                                    <div key={log.id} className="p-4 px-4 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                                                    {log.admin[0]}
                                                </div>
                                                {i === 0 && (
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{log.action}</div>
                                                <div className="text-[11px] text-slate-500 mt-0.5">{log.driver} • {log.admin}</div>
                                            </div>
                                        </div>
                                        <div className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{log.timestamp}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowLogsModal(false)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

// Helper Components
function StatusBadge({ status }: { status: DriverStatus }) {
    return (
        <Badge variant="outline" className={`${statusColorMap[status]} font-medium flex items-center px-2 py-1 w-fit`}>
            {status === "Kritis" && <AlertCircle className="w-3 h-3 mr-1" />}
            {status === "Peringatan" && <AlertTriangle className="w-3 h-3 mr-1" />}
            {status === "Dipantau" && <Eye className="w-3 h-3 mr-1" />}
            {status === "Diselidiki" && <Search className="w-3 h-3 mr-1" />}
            {status === "Info" && <Info className="w-3 h-3 mr-1" />}
            {status}
        </Badge>
    )
}

function ActionButton({ item, openModal }: { item: ActivityDriver; openModal: (d: ActivityDriver, type: "monitor" | "reminder" | "investigate") => void }) {
    // Mapping teks button berdasarkan status
    const buttonText: Record<DriverStatus, string> = {
        "Info": "Pantau",
        "Peringatan": "Kirim Peringatan",
        "Kritis": "Selidiki",
        "Dipantau": "Lihat Status",
        "Diselidiki": "Tindak Lanjut"
    }

    // Mapping tipe aksi berdasarkan status
    const actionType: Record<DriverStatus, "monitor" | "reminder" | "investigate"> = {
        "Info": "monitor",
        "Peringatan": "reminder",
        "Kritis": "investigate",
        "Dipantau": "monitor",
        "Diselidiki": "investigate"
    }

    // Button tanpa icon, teks biru lebih besar, rata kanan
    const baseClass = "h-9 px-2 text-sm font-medium rounded-xl inline-flex items-center justify-end text-blue-600 hover:text-blue-800 hover:bg-transparent w-full transition-colors"

    return (
        <Button
            variant="link"
            size="sm"
            className={baseClass}
            onClick={() => openModal(item, actionType[item.status])}
        >
            {buttonText[item.status]}
        </Button>
    )
}

function MetricCard({ icon, label, value, sublabel, iconColor }: {
    icon: React.ReactNode,
    label: string,
    value: string,
    sublabel?: string,
    iconColor?: string
}) {
    return (
        <Card className="overflow-hidden">
            <div className="flex items-stretch h-full">
                <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                <div className="flex-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                        <CardTitle className="text-xs font-medium">{label}</CardTitle>
                        <span className={`${iconColor || 'text-muted-foreground'}`}>
                            {icon}
                        </span>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                        <div className="text-xl font-bold">{value}</div>
                        {sublabel && (
                            <p className="text-[10px] text-muted-foreground">{sublabel}</p>
                        )}
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}