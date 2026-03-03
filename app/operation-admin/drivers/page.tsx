"use client"

import { useState } from "react"
import {
    Search,
    MoreVertical,
    UserCheck,
    UserX,
    FileText,
    Bike,
    Shield,
    Star,
    AlertCircle,
    Phone,
    Mail,
    Calendar,
    RefreshCw,
    History,
    FileWarning,
    Car,
    CheckCircle2,
    XCircle,
    Clock,
    AlertTriangle,
    MapPin,
    X,
    Plus,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Upload,
    Camera,
    IdCard,
    User,
    FileClock,
    ChevronDown,
    Info,
    TrendingUp,
    TrendingDown,
    Activity,
    Filter
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Users, Wifi, ShieldCheck, ActivitySquare } from "lucide-react"

// Tipe data untuk Audit Log
interface AuditLog {
    id: string
    action: string
    admin: string
    adminRole: string
    timestamp: string
    reason: string
    details: string
}

// Tipe data untuk Role
type UserRole = "Super Admin" | "Admin" | "Supervisor" | "Operator"

// Tipe data berdasarkan spesifikasi
interface Driver {
    id: string
    name: string
    nik: string
    status: "Aktif" | "Pending Verifikasi" | "Suspend" | "Nonaktif"
    onlineStatus: "Online" | "Offline"
    vehicle: string
    phone: string
    email: string
    rating: number
    totalOrders: number
    cancelRate: number
    joinDate: string
    address: string
    documents: {
        ktp: boolean
        sim: boolean
        vehicle: boolean
    }
    violations: number
    reports: number
    lastActive?: string
    currentTrip?: {
        id: string
        status: "On Trip" | "Assigned" | "Issue" | "Selesai" | "Batal"
        customer: string
        pickup: string
        destination: string
    }
    suspendHistory?: {
        date: string
        reason: string
        admin: string
    }[]
    reactivationHistory?: {
        date: string
        reason: string
        admin: string
    }[]
}

// Data dummy Audit Log
const INITIAL_AUDIT_LOGS: AuditLog[] = [
    {
        id: "AUD-001",
        action: "Suspend Driver",
        admin: "Admin Utama",
        adminRole: "Super Admin",
        timestamp: "2024-02-26 14:30",
        reason: "Pelanggaran berat - menolak order 3x berturut-turut",
        details: "Suspend driver: Rudi H. (DRV-005)"
    },
    {
        id: "AUD-002",
        action: "Verifikasi Driver",
        admin: "Supervisor",
        adminRole: "Supervisor",
        timestamp: "2024-02-26 10:15",
        reason: "Dokumen lengkap dan valid",
        details: "Verifikasi driver: Dewi Lestari (DRV-006)"
    },
    {
        id: "AUD-003",
        action: "Aktivasi Kembali",
        admin: "Admin Utama",
        adminRole: "Super Admin",
        timestamp: "2024-02-25 09:00",
        reason: "Masa suspend selesai dan driver telah mengikuti pelatihan",
        details: "Reaktifasi driver: Agus T. (DRV-004)"
    },
    {
        id: "AUD-004",
        action: "Edit Data Driver",
        admin: "Operator",
        adminRole: "Operator",
        timestamp: "2024-02-24 16:20",
        reason: "Perbaikan alamat",
        details: "Edit data driver: Siti Aminah (DRV-002)"
    }
]

// Data dummy dengan suspend/reactivation history
const INITIAL_DRIVERS: Driver[] = [
    {
        id: "DRV-001",
        name: "Budi Santoso",
        nik: "3174123456789012",
        status: "Aktif",
        onlineStatus: "Online",
        vehicle: "Becak Listrik A-01",
        phone: "081234567890",
        email: "budi@example.com",
        rating: 4.8,
        totalOrders: 1250,
        cancelRate: 2.5,
        joinDate: "2023-01-15",
        address: "Jl. Merdeka No. 45, Jakarta",
        documents: { ktp: true, sim: true, vehicle: true },
        violations: 0,
        reports: 1,
        lastActive: "2024-02-26 14:30",
        currentTrip: {
            id: "TRP-1234",
            status: "On Trip",
            customer: "Ahmad Fauzi",
            pickup: "Jl. Sudirman No. 12",
            destination: "Jl. Thamrin No. 45"
        }
    },
    {
        id: "DRV-002",
        name: "Siti Aminah",
        nik: "3174234567890123",
        status: "Aktif",
        onlineStatus: "Offline",
        vehicle: "Becak Listrik A-02",
        phone: "081234567891",
        email: "siti@example.com",
        rating: 4.9,
        totalOrders: 980,
        cancelRate: 1.2,
        joinDate: "2023-03-20",
        address: "Jl. Sudirman No. 12, Jakarta",
        documents: { ktp: true, sim: true, vehicle: true },
        violations: 0,
        reports: 0,
        lastActive: "2024-02-26 10:15"
    },
    {
        id: "DRV-003",
        name: "Joko Widodo",
        nik: "3174345678901234",
        status: "Aktif",
        onlineStatus: "Online",
        vehicle: "Becak Listrik A-03",
        phone: "081234567892",
        email: "joko@example.com",
        rating: 4.7,
        totalOrders: 850,
        cancelRate: 3.8,
        joinDate: "2023-05-10",
        address: "Jl. Thamrin No. 33, Jakarta",
        documents: { ktp: true, sim: true, vehicle: true },
        violations: 1,
        reports: 2,
        lastActive: "2024-02-26 14:45",
        currentTrip: {
            id: "TRP-1235",
            status: "Assigned",
            customer: "Rina Wijaya",
            pickup: "Jl. Gatot Subroto No. 78",
            destination: "Jl. Kuningan No. 23"
        }
    },
    {
        id: "DRV-004",
        name: "Agus T.",
        nik: "3174456789012345",
        status: "Aktif",
        onlineStatus: "Online",
        vehicle: "Becak Listrik B-01",
        phone: "081234567893",
        email: "agus@example.com",
        rating: 4.5,
        totalOrders: 620,
        cancelRate: 4.2,
        joinDate: "2023-08-05",
        address: "Jl. Gatot Subroto No. 78, Jakarta",
        documents: { ktp: true, sim: false, vehicle: true },
        violations: 2,
        reports: 1,
        lastActive: "2024-02-26 13:20",
        currentTrip: {
            id: "TRP-1236",
            status: "Issue",
            customer: "Budi Hartono",
            pickup: "Jl. Rasuna Said No. 56",
            destination: "Jl. M.H. Thamrin No. 10"
        },
        suspendHistory: [
            {
                date: "2024-02-20",
                reason: "Penolakan order berulang",
                admin: "Supervisor"
            }
        ],
        reactivationHistory: [
            {
                date: "2024-02-23",
                reason: "Telah mengikuti pembinaan",
                admin: "Admin Utama"
            }
        ]
    },
    {
        id: "DRV-005",
        name: "Rudi H.",
        nik: "3174567890123456",
        status: "Suspend",
        onlineStatus: "Offline",
        vehicle: "Becak Listrik B-02",
        phone: "081234567894",
        email: "rudi@example.com",
        rating: 3.2,
        totalOrders: 320,
        cancelRate: 12.5,
        joinDate: "2023-10-12",
        address: "Jl. Rasuna Said No. 56, Jakarta",
        documents: { ktp: true, sim: true, vehicle: true },
        violations: 3,
        reports: 4,
        lastActive: "2024-02-25 16:40",
        suspendHistory: [
            {
                date: "2024-02-25",
                reason: "Pelanggaran berat - menolak order 3x berturut-turut",
                admin: "Admin Utama"
            }
        ]
    },
    {
        id: "DRV-006",
        name: "Dewi Lestari",
        nik: "3174678901234567",
        status: "Pending Verifikasi",
        onlineStatus: "Offline",
        vehicle: "Becak Listrik C-01",
        phone: "081234567895",
        email: "dewi@example.com",
        rating: 0,
        totalOrders: 0,
        cancelRate: 0,
        joinDate: "2024-02-01",
        address: "Jl. Kuningan No. 23, Jakarta",
        documents: { ktp: true, sim: false, vehicle: false },
        violations: 0,
        reports: 0,
        lastActive: "2024-02-26 09:00"
    }
]



// Stat Card Component mirip gambar
const StatCard = ({
    title,
    value,
    subtitle,
    subtitleColor = "text-gray-500",
    borderColor = "border-[#E04D04]",
    icon: Icon
}: {
    title: string;
    value: React.ReactNode;
    subtitle: string;
    subtitleColor?: string;
    borderColor?: string;
    icon?: any;
}) => (
    <div className={`bg-[#E8EBEA]/50 rounded-xl border-l-[3px] ${borderColor} border-t border-r border-b border-gray-100 p-4 relative`}>
        {/* Icon di pojok kanan atas - lebih soft */}
        {Icon && (
            <div className="absolute top-4 right-4 text-slate-400">
                <Icon className="h-4 w-4" />
            </div>
        )}

        <div className="space-y-1">
            <h3 className="text-xs font-semibold text-slate-600 mb-2 mr-6">{title}</h3>

            <div className="text-2xl font-bold text-slate-800">
                {value}
            </div>

            <div className={`text-[10px] sm:text-xs font-medium ${subtitleColor}`}>
                {subtitle}
            </div>
        </div>
    </div>
)

// Modal Wrapper Component
const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    maxWidth = "max-w-md"
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    maxWidth?: string;
}) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={cn(maxWidth, "p-0 overflow-hidden max-h-[90vh] flex flex-col")}>
            {title ? (
                <div className="px-6 pt-6 mb-4 flex-shrink-0">
                    <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                    {description && <DialogDescription className="mt-1.5 text-sm text-muted-foreground">{description}</DialogDescription>}
                </div>
            ) : (
                <DialogTitle className="sr-only">Dialog</DialogTitle>
            )}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {children}
            </div>
        </DialogContent>
    </Dialog>
)

export default function DriversPage() {
    const [driverList, setDriverList] = useState<Driver[]>(INITIAL_DRIVERS)
    const [logList, setLogList] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [onlineFilter, setOnlineFilter] = useState("all")
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isAddDriverOpen, setIsAddDriverOpen] = useState(false)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
    const [isAuditLogOpen, setIsAuditLogOpen] = useState(false)
    const [actionType, setActionType] = useState<"suspend" | "reinstate" | "verify" | null>(null)
    const [actionReason, setActionReason] = useState("")
    const [activeTab, setActiveTab] = useState("personal")
    const [currentPage, setCurrentPage] = useState(1)
    const [detailTab, setDetailTab] = useState("info")

    // Simulasi role-based control
    const [currentUserRole, setCurrentUserRole] = useState<UserRole>("Super Admin")

    const getStatusBadge = (status: Driver["status"]) => {
        switch (status) {
            case "Aktif":
                return <Badge variant="success">Aktif</Badge>
            case "Pending Verifikasi":
                return <Badge variant="warning">Pending Verifikasi</Badge>
            case "Suspend":
                return <Badge variant="danger">Suspend</Badge>
            case "Nonaktif":
                return <Badge variant="neutral">Nonaktif</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getOnlineStatusBadge = (status: Driver["onlineStatus"]) => {
        switch (status) {
            case "Online":
                return <Badge variant="success">Online</Badge>
            case "Offline":
                return <Badge variant="neutral">Offline</Badge>
        }
    }

    const getTripStatusBadge = (status: string) => {
        switch (status) {
            case "On Trip":
                return <Badge variant="blue">On Trip</Badge>
            case "Assigned":
                return <Badge variant="purple">Assigned</Badge>
            case "Issue":
                return <Badge variant="orange">Issue</Badge>
            case "Selesai":
                return <Badge variant="success">Selesai</Badge>
            case "Batal":
                return <Badge variant="danger">Batal</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    // Cek permission berdasarkan role
    const canSuspend = () => {
        return currentUserRole === "Super Admin" || currentUserRole === "Admin"
    }

    const canVerify = () => {
        return currentUserRole === "Super Admin" || currentUserRole === "Admin" || currentUserRole === "Supervisor"
    }

    const canReactivate = () => {
        return currentUserRole === "Super Admin" || currentUserRole === "Admin"
    }

    const canViewAuditLog = () => {
        return currentUserRole === "Super Admin" || currentUserRole === "Admin"
    }

    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase()
    }

    const filteredDrivers = driverList.filter(driver => {
        const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.nik.includes(searchQuery)
        const matchesStatus = statusFilter === "all" || driver.status.toLowerCase() === statusFilter.toLowerCase()
        const matchesOnline = onlineFilter === "all" || driver.onlineStatus.toLowerCase() === onlineFilter.toLowerCase()
        return matchesSearch && matchesStatus && matchesOnline
    })

    const handleAction = (driver: Driver, action: "suspend" | "reinstate" | "verify") => {
        if (action === "suspend" && !canSuspend()) {
            alert("Anda tidak memiliki izin untuk melakukan suspend driver")
            return
        }
        if (action === "verify" && !canVerify()) {
            alert("Anda tidak memiliki izin untuk melakukan verifikasi driver")
            return
        }
        if (action === "reinstate" && !canReactivate()) {
            alert("Anda tidak memiliki izin untuk mengaktifkan kembali driver")
            return
        }

        setSelectedDriver(driver)
        setActionType(action)
        setActionReason("")
        setIsConfirmDialogOpen(true)
    }

    const confirmAction = () => {
        if (!actionReason.trim() || !selectedDriver || !actionType) {
            alert("Alasan wajib diisi!")
            return
        }

        const newStatus: Driver["status"] =
            actionType === "suspend" ? "Suspend" : "Aktif";

        // Update driver status in the list
        setDriverList(prev => prev.map(d =>
            d.id === selectedDriver.id ? { ...d, status: newStatus } : d
        ));

        // Create new log
        const newAuditLog: AuditLog = {
            id: `AUD-${Math.floor(Math.random() * 10000)}`,
            action: actionType === "suspend" ? "Suspend Driver" :
                actionType === "reinstate" ? "Aktivasi Kembali" : "Verifikasi Driver",
            admin: "Admin Utama",
            adminRole: currentUserRole,
            timestamp: new Date().toLocaleString('id-ID', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }).replace(/\//g, '-'),
            reason: actionReason,
            details: `${actionType === "suspend" ? "Suspend" : actionType === "reinstate" ? "Reaktifasi" : "Verifikasi"} driver: ${selectedDriver.name} (${selectedDriver.id})`
        }

        setLogList(prev => [newAuditLog, ...prev]);

        // If detail modal is open, update the selected driver object there too
        if (isDetailOpen) {
            setSelectedDriver({ ...selectedDriver, status: newStatus });
        }

        setIsConfirmDialogOpen(false)
        setActionType(null)
        setActionReason("")
    }

    // Data untuk select options
    const roleOptions = [
        { value: "Super Admin", label: "Super Admin" },
        { value: "Admin", label: "Admin" },
        { value: "Supervisor", label: "Supervisor" },
        { value: "Operator", label: "Operator" }
    ]

    const statusOptions = [
        { value: "all", label: "Semua Status" },
        { value: "aktif", label: "Aktif" },
        { value: "pending verifikasi", label: "Pending Verifikasi" },
        { value: "suspend", label: "Suspend" },
        { value: "nonaktif", label: "Nonaktif" }
    ]

    const onlineOptions = [
        { value: "all", label: "Semua" },
        { value: "online", label: "Online" },
        { value: "offline", label: "Offline" }
    ]

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1400px] mx-auto space-y-6">
                {/* Header - Title di kiri, Controls di kanan */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manajemen Driver</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola driver, verifikasi dokumen, dan monitor performa armada.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select value={currentUserRole} onValueChange={(value) => setCurrentUserRole(value as UserRole)}>
                            <SelectTrigger className="w-40 bg-white">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roleOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {canViewAuditLog() && (
                            <Button
                                variant="outline"
                                onClick={() => setIsAuditLogOpen(true)}
                                className="bg-white"
                            >
                                <FileClock className="mr-2 h-4 w-4" />
                                Audit Log
                            </Button>
                        )}

                        <Button variant="outline" className="bg-white">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                        <Button onClick={() => setIsAddDriverOpen(true)} className="bg-[#E04D04] hover:bg-[#c94504] text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Driver Baru
                        </Button>
                    </div>
                </div>

                {/* Stats Cards - Mirip gambar referensi */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <StatCard
                        title="Total Driver"
                        value={driverList.length}
                        subtitle="Registered drivers"
                        borderColor="border-[#E04D04]"
                        icon={Users}
                    />
                    <StatCard
                        title="Online"
                        value={driverList.filter(d => d.onlineStatus === "Online").length}
                        subtitle={`${driverList.filter(d => d.status === "Aktif").length} total aktif`}
                        subtitleColor="text-gray-500"
                        borderColor="border-[#E04D04]"
                        icon={Wifi}
                    />
                    <StatCard
                        title="Pending Verifikasi"
                        value={driverList.filter(d => d.status === "Pending Verifikasi").length}
                        subtitle="Menunggu verifikasi"
                        subtitleColor="text-gray-500"
                        borderColor="border-[#E04D04]"
                        icon={Clock}
                    />
                    <StatCard
                        title="Rating Rata-rata"
                        value={
                            <span className="flex items-center gap-1">
                                4.5
                            </span>
                        }
                        subtitle="Dari 2.5k ulasan"
                        subtitleColor="text-gray-500"
                        borderColor="border-[#E04D04]"
                        icon={ShieldCheck}
                    />
                    <StatCard
                        title="Cancel Rate"
                        value="4.2%"
                        subtitle="batas aman: 5%"
                        subtitleColor="text-gray-500"
                        borderColor="border-[#E04D04]"
                        icon={ActivitySquare}
                    />
                </div>

                {/* Filter Horizontal - Tanpa Card Background */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Cari nama, ID, NIK, atau kendaraan..."
                            className="pl-10 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40 bg-white">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={onlineFilter} onValueChange={setOnlineFilter}>
                        <SelectTrigger className="w-32 bg-white">
                            <SelectValue placeholder="Online" />
                        </SelectTrigger>
                        <SelectContent>
                            {onlineOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tabel Driver - Lebih Rapat dan Rapi */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50">
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[250px]">Driver</TableHead>
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status Akun</TableHead>
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Online</TableHead>
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Trip Status</TableHead>
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Kendaraan</TableHead>
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[100px]">Rating</TableHead>
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[100px]">Order</TableHead>
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Risiko</TableHead>
                                <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[120px] text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDrivers.map((driver, index) => (
                                <TableRow
                                    key={driver.id}
                                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors`}
                                >
                                    <TableCell className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#E8EBEA] flex items-center justify-center text-gray-700 font-bold text-xs flex-shrink-0 shadow-inner">
                                                {getInitials(driver.name)}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-semibold text-gray-900 text-sm truncate">{driver.name}</div>
                                                <div className="text-xs text-gray-400 font-mono">{driver.id}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 px-4">{getStatusBadge(driver.status)}</TableCell>
                                    <TableCell className="py-3 px-4">{getOnlineStatusBadge(driver.onlineStatus)}</TableCell>
                                    <TableCell className="py-3 px-4">
                                        {driver.currentTrip ? (
                                            getTripStatusBadge(driver.currentTrip.status)
                                        ) : (
                                            <span className="text-gray-400 text-sm">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Bike className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm truncate">{driver.vehicle}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                                            <span className="text-sm font-semibold text-gray-900">
                                                {driver.rating > 0 ? driver.rating.toFixed(1) : "-"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 px-6 text-sm text-gray-900 font-medium">{driver.totalOrders}</TableCell>
                                    <TableCell className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-16">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${driver.cancelRate > 10 ? 'bg-red-500' :
                                                        driver.cancelRate > 5 ? 'bg-orange-400' : 'bg-emerald-500'
                                                        }`}
                                                    style={{ width: `${Math.min(driver.cancelRate * 4, 100)}%` }}
                                                />
                                            </div>
                                            <span className={`text-[12px] font-bold ${driver.cancelRate > 10 ? "text-red-500" :
                                                driver.cancelRate > 5 ? "text-orange-500" : "text-emerald-500"
                                                }`}>
                                                {driver.cancelRate > 10 ? 'Tinggi' : driver.cancelRate > 5 ? 'Sedang' : 'Rendah'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 px-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => {
                                                    setSelectedDriver(driver)
                                                    setIsDetailOpen(true)
                                                }}
                                            >
                                                <FileText className="h-4 w-4" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56">
                                                    <DropdownMenuLabel>Operasional Armada</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {canVerify() && (
                                                        <DropdownMenuItem
                                                            onClick={() => handleAction(driver, "verify")}
                                                            disabled={driver.status !== "Pending Verifikasi"}
                                                        >
                                                            <Shield className="mr-2 h-4 w-4" />
                                                            Verifikasi Driver
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuSeparator />
                                                    {driver.status === "Suspend" ? (
                                                        canReactivate() && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleAction(driver, "reinstate")}
                                                                className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50"
                                                            >
                                                                <RotateCcw className="mr-2 h-4 w-4" />
                                                                Aktifkan Kembali
                                                            </DropdownMenuItem>
                                                        )
                                                    ) : (
                                                        canSuspend() && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleAction(driver, "suspend")}
                                                                disabled={driver.status !== "Aktif"}
                                                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                            >
                                                                <UserX className="mr-2 h-4 w-4" />
                                                                Suspend Driver
                                                            </DropdownMenuItem>
                                                        )
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination - Warna #DCDCDC untuk tidak aktif */}
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Menampilkan <span className="font-medium text-gray-900">{filteredDrivers.length}</span> dari{" "}
                        <span className="font-medium text-gray-900">{driverList.length}</span> driver
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:scale-100 text-gray-400 hover:bg-gray-100 hover:text-gray-900 active:scale-90 border border-transparent"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                            <ChevronLeft className="h-4.5 w-4.5" />
                        </button>
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all active:scale-90 ${currentPage === page
                                    ? 'bg-[#E8EBEA] text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <span className="px-1.5 text-gray-300 font-bold tracking-widest">...</span>
                        <button
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 active:scale-90 transition-all"
                            onClick={() => setCurrentPage(12)}
                        >
                            12
                        </button>
                        <button
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:scale-100 text-gray-400 hover:bg-gray-100 hover:text-gray-900 active:scale-90 border border-transparent"
                            disabled={currentPage === 12}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 12))}
                        >
                            <ChevronRight className="h-4.5 w-4.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Driver Baru - Desain Seperti Sebelumnya */}
            <Modal
                isOpen={isAddDriverOpen}
                onClose={() => setIsAddDriverOpen(false)}
                maxWidth="max-w-4xl"
                title="Tambah Driver Baru"
                description="Isi lengkap data driver untuk mendaftarkan ke sistem"
            >
                <div className="p-6">
                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between relative px-2">
                            <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-gray-100 -translate-y-1/2" />
                            {[
                                { id: "personal", label: "Pribadi", icon: User },
                                { id: "contact", label: "Kontak", icon: Phone },
                                { id: "documents", label: "Dokumen", icon: FileText },
                                { id: "vehicle", label: "Unit", icon: Bike },
                                { id: "status", label: "Status", icon: Shield }
                            ].map((step, index) => {
                                const Icon = step.icon
                                const isActive = activeTab === step.id
                                const isCompleted = ["personal", "contact", "documents", "vehicle", "status"].indexOf(step.id) <
                                    ["personal", "contact", "documents", "vehicle", "status"].indexOf(activeTab)

                                return (
                                    <div key={step.id} className="relative flex flex-col items-center z-10 transition-all">
                                        <button
                                            onClick={() => setActiveTab(step.id)}
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${isActive ? "bg-gray-900 text-white shadow-xl shadow-slate-200 scale-110" :
                                                isCompleted ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" :
                                                    "bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-200 hover:scale-105"
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle2 className="h-7 w-7" />
                                            ) : (
                                                <Icon className="h-7 w-7" />
                                            )}
                                        </button>
                                        <span className={`mt-3 text-[11px] font-bold uppercase tracking-widest ${isActive ? "text-gray-900" : isCompleted ? "text-emerald-600" : "text-gray-400"
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="space-y-8 px-8 pb-8 pt-0">
                        {activeTab === "personal" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col items-center justify-center p-10 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#E04D04]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-xl shadow-slate-200 mb-6 relative z-10 border border-slate-100 group-hover:scale-105 transition-transform">
                                        <User className="h-12 w-12 text-slate-300" />
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#E04D04] rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-orange-600 transition-colors">
                                            <Camera className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div className="text-center relative z-10">
                                        <h4 className="text-base font-bold text-slate-900 mb-1">Foto Profil</h4>
                                        <p className="text-xs text-slate-400 font-medium tracking-wide">JPG, PNG. Max 2MB</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nama Lengkap</Label>
                                        <Input id="name" placeholder="Masukkan nama lengkap" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nik" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">NIK (Nomor Induk Kependudukan)</Label>
                                        <Input id="nik" placeholder="16 digit NIK" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="birthdate" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Tanggal Lahir</Label>
                                        <Input id="birthdate" type="date" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Jenis Kelamin</Label>
                                        <Select
                                            value=""
                                            onValueChange={() => { }}
                                        >
                                            <SelectTrigger className="rounded-xl h-12">
                                                <SelectValue placeholder="Pilih Jenis Kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Laki-laki</SelectItem>
                                                <SelectItem value="female">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Alamat Domisili Sesuai KTP</Label>
                                    <Input id="address" placeholder="Masukkan alamat lengkap" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                </div>
                            </div>
                        )}

                        {activeTab === "contact" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nomor HP</Label>
                                        <Input id="phone" placeholder="081234567890" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                        <p className="text-[10px] text-slate-400 font-medium ml-1">Gunakan format angka saja (contoh: 081234567890)</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Alamat Email</Label>
                                        <Input id="email" type="email" placeholder="email@example.com" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="emergency" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Kontak Darurat</Label>
                                        <Input id="emergency" placeholder="Nama & Nomor HP" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "documents" && (
                            <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {[
                                    { id: "ktp", label: "KTP (Kartu Tanda Penduduk)", icon: IdCard, desc: "Sisi depan harus terlihat jelas. JPG, PNG. Maks 5MB" },
                                    { id: "sim", label: "SIM (Surat Izin Mengemudi)", icon: Car, desc: "Pastikan masa berlaku aktif. JPG, PNG. Maks 5MB" },
                                    { id: "vehicle", label: "STNK / Foto Kendaraan", icon: Bike, desc: "Plat nomor harus terbaca jelas. JPG, PNG. Maks 5MB" }
                                ].map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl hover:border-gray-900 hover:shadow-md transition-all group bg-white">
                                        <div className="flex items-center gap-5">
                                            <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-colors">
                                                <doc.icon className="h-6 w-6 text-slate-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm mb-0.5">{doc.label}</h4>
                                                <p className="text-[11px] text-slate-400 font-medium">{doc.desc}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="rounded-xl px-5 py-2 h-auto text-xs font-bold border-slate-200">
                                            <Upload className="mr-2 h-3.5 w-3.5" />
                                            Upload
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "vehicle" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="vehicleNumber" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nomor Plat Kendaraan</Label>
                                        <Input id="vehicleNumber" placeholder="B 1234 ABC" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vehicleType" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Model / Tipe Kendaraan</Label>
                                        <Input id="vehicleType" placeholder="Contoh: Becak Listrik G-1" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <Label htmlFor="vehicleYear" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Tahun Kendaraan</Label>
                                        <Input id="vehicleYear" placeholder="2024" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="vehicleColor" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Warna Kendaraan</Label>
                                        <Input id="vehicleColor" placeholder="Merah / Hitam" className="rounded-xl border-slate-200 focus:border-[#E04D04] h-12" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "status" && (
                            <div className="space-y-4">
                                <Card className="border-2 border-amber-200 bg-amber-50/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                                <Clock className="h-6 w-6 text-amber-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">Pending Verifikasi</h4>
                                                <p className="text-sm text-gray-600">Driver akan memerlukan verifikasi dokumen sebelum aktif</p>
                                            </div>
                                            <Badge variant="warning">Default</Badge>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-emerald-50 rounded-xl">
                                                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900">Aktif</h4>
                                                <p className="text-sm text-gray-600">Driver langsung aktif (hanya untuk admin dengan kewenangan khusus)</p>
                                            </div>
                                            <Select
                                                value="pending"
                                                onValueChange={() => { }}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="active">Aktif</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                        <div>
                            {activeTab !== "personal" && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const tabs = ["personal", "contact", "documents", "vehicle", "status"]
                                        const currentIndex = tabs.indexOf(activeTab)
                                        setActiveTab(tabs[currentIndex - 1])
                                    }}
                                    className="rounded-xl px-6"
                                >
                                    Sebelumnya
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setIsAddDriverOpen(false)} className="rounded-xl px-6 transition-all hover:bg-gray-50">
                                Batal
                            </Button>
                            {activeTab !== "status" ? (
                                <Button
                                    onClick={() => {
                                        const tabs = ["personal", "contact", "documents", "vehicle", "status"]
                                        const currentIndex = tabs.indexOf(activeTab)
                                        setActiveTab(tabs[currentIndex + 1])
                                    }}
                                    className="rounded-xl px-8 shadow-lg shadow-orange-100"
                                >
                                    Selanjutnya
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        console.log("Menyimpan data driver...")
                                        setIsAddDriverOpen(false)
                                        setActiveTab("personal")
                                    }}
                                    className="rounded-xl px-10 shadow-lg shadow-orange-200"
                                >
                                    Simpan Driver
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Modal Audit Log */}
            <Modal
                isOpen={isAuditLogOpen}
                onClose={() => setIsAuditLogOpen(false)}
                maxWidth="max-w-4xl"
                title="Audit Log - Memori Sistem"
                description="Catatan semua tindakan administratif untuk akuntabilitas"
            >
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                        {logList.map((log) => (
                            <div
                                key={log.id}
                                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${log.action.includes('Suspend') ? 'bg-red-50' :
                                        log.action.includes('Verifikasi') ? 'bg-orange-50' :
                                            log.action.includes('Aktivasi') ? 'bg-emerald-50' : 'bg-blue-50'
                                        }`}>
                                        <FileClock className={`h-6 w-6 ${log.action.includes('Suspend') ? 'text-red-600' :
                                            log.action.includes('Verifikasi') ? 'text-orange-600' :
                                                log.action.includes('Aktivasi') ? 'text-emerald-600' : 'text-blue-600'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <h4 className="font-semibold text-gray-900">{log.action}</h4>
                                                <span className="text-xs text-gray-400 font-mono">{log.id}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">{log.timestamp}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">{log.details}</p>
                                        <div className="flex items-center gap-3 mb-3">
                                            <Badge variant="outline">
                                                {log.admin} ({log.adminRole})
                                            </Badge>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 text-sm">
                                            <span className="font-semibold text-gray-700">Alasan: </span>
                                            <span className="text-gray-600">{log.reason}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Modal Konfirmasi Tindakan */}
            <Modal
                isOpen={isConfirmDialogOpen}
                onClose={() => {
                    setIsConfirmDialogOpen(false)
                    setActionReason("")
                }}
                maxWidth="max-w-md"
            >
                <div className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${actionType === "suspend" ? "bg-red-100" :
                        actionType === "reinstate" ? "bg-emerald-100" : "bg-orange-100"
                        }`}>
                        {actionType === "suspend" && <UserX className="h-10 w-10 text-red-600" />}
                        {actionType === "reinstate" && <RotateCcw className="h-10 w-10 text-emerald-600" />}
                        {actionType === "verify" && <Shield className="h-10 w-10 text-[#E04D04]" />}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {actionType === "suspend" && "Suspend Driver"}
                        {actionType === "reinstate" && "Aktifkan Kembali Driver"}
                        {actionType === "verify" && "Verifikasi Driver"}
                    </h3>
                    <p className="text-gray-500 mb-8">
                        {actionType === "suspend" && "Apakah Anda yakin ingin menonaktifkan driver ini?"}
                        {actionType === "reinstate" && "Apakah Anda yakin ingin mengaktifkan kembali driver ini?"}
                        {actionType === "verify" && "Apakah Anda yakin ingin memverifikasi driver ini?"}
                    </p>

                    <div className="text-left mb-6">
                        <Label htmlFor="reason">
                            Alasan <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="reason"
                            placeholder="Jelaskan alasan tindakan ini (wajib diisi)"
                            value={actionReason}
                            onChange={(e) => setActionReason(e.target.value)}
                            className="mt-2"
                            rows={3}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Alasan akan tercatat di audit log untuk akuntabilitas
                        </p>
                    </div>

                    <div className="flex justify-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsConfirmDialogOpen(false)
                                setActionReason("")
                            }}
                            className="px-8"
                        >
                            Batal
                        </Button>
                        <Button
                            variant={actionType === "suspend" ? "destructive" : "default"}
                            onClick={confirmAction}
                            disabled={!actionReason.trim()}
                            className="px-8"
                        >
                            {actionType === "suspend" && "Ya, Suspend"}
                            {actionType === "reinstate" && "Ya, Aktifkan"}
                            {actionType === "verify" && "Ya, Verifikasi"}
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                maxWidth="max-w-4xl"
                title={`Detail Driver: ${selectedDriver?.name}`}
                description="Informasi lengkap, statistik performa, dan riwayat driver"
            >
                <div className="px-8 pb-8 pt-0 text-sm">
                    {/* Tabs */}
                    <div className="flex gap-1 p-3 bg-gray-50 rounded-xl mb-8 border border-gray-100 sticky top-0 z-10 bg-white/80 backdrop-blur-md mt-4">
                        {[
                            { id: "info", label: "Informasi Pribadi" },
                            { id: "stats", label: "Statistik Performa" },
                            { id: "documents", label: "Dokumen" },
                            { id: "history", label: "Riwayat Aktivitas" },
                            { id: "audit", label: "Audit Trail" }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setDetailTab(tab.id)}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${detailTab === tab.id
                                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6">
                        {/* Informasi Pribadi */}
                        {detailTab === "info" && (
                            <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                                    <h4 className="text-lg font-bold text-[#0f172a] mb-4">Identitas</h4>
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">NIK</span>
                                            <p className="text-xl font-bold text-[#1e293b]">{selectedDriver?.nik}</p>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tanggal Daftar</span>
                                            <p className="text-sm font-semibold text-[#1e293b]">{selectedDriver?.joinDate}</p>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Alamat</span>
                                            <p className="text-sm font-semibold text-[#1e293b] leading-relaxed">{selectedDriver?.address}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                                    <h4 className="text-lg font-bold text-[#0f172a] mb-4">Kontak</h4>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl group hover:bg-white hover:border-gray-300 border border-transparent transition-all">
                                            <div className="p-2.5 bg-white rounded-lg shadow-sm">
                                                <Phone className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Telepon</span>
                                                <span className="font-bold text-[#1e293b]">{selectedDriver?.phone}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl group hover:bg-white hover:border-gray-300 border border-transparent transition-all">
                                            <div className="p-2.5 bg-white rounded-lg shadow-sm">
                                                <Mail className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email</span>
                                                <span className="font-bold text-[#1e293b]">{selectedDriver?.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectedDriver?.currentTrip && (
                                    <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-500 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-8 opacity-5">
                                            <Activity className="w-32 h-32" />
                                        </div>
                                        <div className="flex items-center justify-between mb-6 relative">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                                <h4 className="text-lg font-bold text-[#0f172a]">Trip Aktif Saat Ini</h4>
                                            </div>
                                            <div className="flex gap-2">
                                                <Badge variant="blue" className="px-4 py-1.5 font-bold shadow-sm">#{selectedDriver.currentTrip.id}</Badge>
                                                <Badge variant="blue" className="px-4 py-1.5 font-bold shadow-sm">{selectedDriver.currentTrip.status}</Badge>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8 relative">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-blue-50 rounded-2xl shadow-inner mt-1">
                                                    <MapPin className="h-6 w-6 text-blue-500" />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Lokasi Penjemputan</span>
                                                    <p className="text-base font-bold text-[#1e293b] leading-tight">{selectedDriver.currentTrip.pickup}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-red-50 rounded-2xl shadow-inner mt-1">
                                                    <MapPin className="h-6 w-6 text-red-500" />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Tujuan</span>
                                                    <p className="text-base font-bold text-[#1e293b] leading-tight">{selectedDriver.currentTrip.destination}</p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 pt-4 border-t border-gray-100 mt-2 flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400 font-medium">Customer:</span>
                                                    <span className="font-bold text-[#0f172a]">{selectedDriver.currentTrip.customer}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {detailTab === "stats" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-base">Metrik Utama</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-5">
                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-600">Rating Keseluruhan</span>
                                                    <span className="font-bold text-gray-900">{selectedDriver?.rating} / 5.0</span>
                                                </div>
                                                <Progress value={selectedDriver?.rating ? selectedDriver.rating * 20 : 0} />
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-t border-gray-100">
                                                <span className="text-gray-600">Total Order</span>
                                                <span className="font-bold text-2xl text-gray-900">{selectedDriver?.totalOrders}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-t border-gray-100">
                                                <span className="text-gray-600">Cancel Rate</span>
                                                <span className={`font-bold text-lg ${selectedDriver && selectedDriver.cancelRate > 10 ? "text-red-600" :
                                                    selectedDriver && selectedDriver.cancelRate > 5 ? "text-orange-600" : "text-gray-900"
                                                    }`}>
                                                    {selectedDriver?.cancelRate}%
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-base">Pelanggaran & Laporan</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-600">Jumlah Pelanggaran</span>
                                                <Badge variant={selectedDriver && selectedDriver.violations > 0 ? "danger" : "neutral"} className="text-sm px-3 py-1">
                                                    {selectedDriver?.violations || 0}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                                <span className="text-gray-600">Laporan/ Komplain</span>
                                                <Badge variant={selectedDriver && selectedDriver.reports > 0 ? "warning" : "neutral"} className="text-sm px-3 py-1">
                                                    {selectedDriver?.reports || 0}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {selectedDriver && selectedDriver.violations > 0 && (
                                    <Card className="border-red-200">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-base text-red-600 flex items-center gap-2">
                                                <AlertTriangle className="h-5 w-5" />
                                                Riwayat Pelanggaran
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-bold text-red-700 text-base">Penolakan Order Beruntun</span>
                                                    <Badge variant="danger" className="font-bold px-3">Peringatan 1</Badge>
                                                </div>
                                                <p className="text-sm font-medium text-red-600">20 Februari 2024 • 14:30 WIB</p>
                                            </div>
                                            <div className="p-5 bg-red-50 rounded-2xl border border-red-100 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-red-700 text-base">Terlambat Menjemput</span>
                                                    <Badge variant="danger" className="font-bold px-3">Peringatan 2</Badge>
                                                </div>
                                                <p className="text-sm font-medium text-red-600">15 Februari 2024 • 09:15 WIB</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        )}

                        {detailTab === "documents" && (
                            <div className="space-y-4">
                                {[
                                    { key: "ktp", label: "KTP", icon: FileText, value: selectedDriver?.nik },
                                    { key: "sim", label: "SIM", icon: Car, value: "SIM A - 123456789" },
                                    { key: "vehicle", label: "Dokumen Kendaraan", icon: Bike, value: selectedDriver?.vehicle }
                                ].map((doc) => (
                                    <div key={doc.key} className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:border-[#E04D04] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-orange-50 rounded-lg">
                                                <doc.icon className="h-6 w-6 text-[#E04D04]" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{doc.label}</h4>
                                                <p className="text-sm text-gray-500">{doc.value}</p>
                                            </div>
                                        </div>
                                        {selectedDriver?.documents[doc.key as keyof typeof selectedDriver.documents] ? (
                                            <Badge variant="success" className="px-3 py-1">Terverifikasi</Badge>
                                        ) : (
                                            <Badge variant="danger" className="px-3 py-1">Belum Verifikasi</Badge>
                                        )}
                                    </div>
                                ))}

                                {selectedDriver?.status === "Pending Verifikasi" && canVerify() && (
                                    <Button
                                        className="w-full mt-6"
                                        onClick={() => {
                                            setIsDetailOpen(false)
                                            handleAction(selectedDriver, "verify")
                                        }}
                                    >
                                        <Shield className="mr-2 h-4 w-4" />
                                        Proses Verifikasi Sekarang
                                    </Button>
                                )}
                            </div>
                        )}

                        {detailTab === "history" && (
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Log Aktivitas</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-5">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-blue-50 rounded-lg">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Login Terakhir</p>
                                                <p className="text-sm text-gray-500 mt-1">{selectedDriver?.lastActive || "Tidak ada data"}</p>
                                            </div>
                                        </div>

                                        {selectedDriver?.suspendHistory && selectedDriver.suspendHistory.length > 0 && (
                                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <UserX className="h-4 w-4 text-red-600" />
                                                    Riwayat Suspend
                                                </h4>
                                                {selectedDriver.suspendHistory.map((item, idx) => (
                                                    <div key={idx} className="p-4 bg-red-50 rounded-xl border border-red-100">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-semibold text-red-700">Suspend</span>
                                                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{item.date}</span>
                                                        </div>
                                                        <p className="text-sm text-red-600 mb-2">{item.reason}</p>
                                                        <p className="text-xs text-gray-500">Oleh: {item.admin}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {selectedDriver?.reactivationHistory && selectedDriver.reactivationHistory.length > 0 && (
                                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <RotateCcw className="h-4 w-4 text-emerald-600" />
                                                    Riwayat Reaktivasi
                                                </h4>
                                                {selectedDriver.reactivationHistory.map((item, idx) => (
                                                    <div key={idx} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-semibold text-emerald-700">Aktivasi Kembali</span>
                                                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{item.date}</span>
                                                        </div>
                                                        <p className="text-sm text-emerald-600 mb-2">{item.reason}</p>
                                                        <p className="text-xs text-gray-500">Oleh: {item.admin}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {detailTab === "audit" && (
                            <div className="space-y-4">
                                {logList
                                    .filter(log => log.details.includes(selectedDriver?.id || ''))
                                    .map((log) => (
                                        <div key={log.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-xl ${log.action.includes('Suspend') ? 'bg-red-50' :
                                                    log.action.includes('Verifikasi') ? 'bg-orange-50' :
                                                        log.action.includes('Aktivasi') ? 'bg-emerald-50' : 'bg-blue-50'
                                                    }`}>
                                                    <FileClock className={`h-6 w-6 ${log.action.includes('Suspend') ? 'text-red-600' :
                                                        log.action.includes('Verifikasi') ? 'text-orange-600' :
                                                            log.action.includes('Aktivasi') ? 'text-emerald-600' : 'text-blue-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-semibold text-gray-900">{log.action}</span>
                                                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3">{log.details}</p>
                                                    <Badge variant="outline" className="mb-3">
                                                        {log.admin} ({log.adminRole})
                                                    </Badge>
                                                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                                                        <span className="font-semibold text-gray-700">Alasan: </span>
                                                        <span className="text-gray-600">{log.reason}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {logList.filter(log => log.details.includes(selectedDriver?.id || '')).length === 0 && (
                                    <div className="text-center py-12 text-gray-400">
                                        <FileClock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                                        <p>Belum ada catatan audit untuk driver ini</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0 bg-gray-50/50">
                    <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                        Tutup
                    </Button>
                    <Button onClick={() => alert("Fitur edit driver akan segera hadir!")}>Edit Driver</Button>
                </div>
            </Modal>
        </div>
    )
}