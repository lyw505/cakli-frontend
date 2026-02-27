"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
    Download,
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
    Upload,
    Camera,
    IdCard,
    User,
    Lock,
    Users,
    FileClock,
    AlertOctagon,
    RotateCcw
} from "lucide-react"

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
const auditLogs: AuditLog[] = [
    {
        id: "AUD-001",
        action: "Suspend Driver",
        admin: "Admin Utama",
        adminRole: "Super Admin",
        timestamp: "2024-02-26 14:30",
        reason: "Pelanggaran berat - menolak order 3x berturut-turut",
        details: "Driver Rudi H. disuspend karena menolak order 3x dalam 1 jam"
    },
    {
        id: "AUD-002",
        action: "Verifikasi Driver",
        admin: "Supervisor",
        adminRole: "Supervisor",
        timestamp: "2024-02-26 10:15",
        reason: "Dokumen lengkap dan valid",
        details: "Driver Dewi Lestari diverifikasi setelah upload KTP dan SIM"
    },
    {
        id: "AUD-003",
        action: "Aktivasi Kembali",
        admin: "Admin Utama",
        adminRole: "Super Admin",
        timestamp: "2024-02-25 09:00",
        reason: "Masa suspend selesai dan driver telah mengikuti pelatihan",
        details: "Driver Agus T. diaktifkan kembali setelah masa suspend 3 hari"
    },
    {
        id: "AUD-004",
        action: "Edit Data Driver",
        admin: "Operator",
        adminRole: "Operator",
        timestamp: "2024-02-24 16:20",
        reason: "Perbaikan alamat",
        details: "Alamat driver Siti Aminah diperbaiki"
    }
]

// Data dummy dengan suspend/reactivation history
const drivers: Driver[] = [
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

export default function DriversPage() {
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

    // Simulasi role-based control
    const [currentUserRole, setCurrentUserRole] = useState<UserRole>("Super Admin")
    const itemsPerPage = 10
    const totalItems = drivers.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const getStatusBadge = (status: Driver["status"]) => {
        switch(status) {
            case "Aktif":
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Aktif</Badge>
            case "Pending Verifikasi":
                return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0">Pending Verifikasi</Badge>
            case "Suspend":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">Suspend</Badge>
            case "Nonaktif":
                return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0">Nonaktif</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getOnlineStatusBadge = (status: Driver["onlineStatus"]) => {
        switch(status) {
            case "Online":
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Online</Badge>
            case "Offline":
                return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0">Offline</Badge>
        }
    }

    const getTripStatusBadge = (status: string) => {
        switch(status) {
            case "On Trip":
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">On Trip</Badge>
            case "Assigned":
                return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-0">Assigned</Badge>
            case "Issue":
                return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">Issue</Badge>
            case "Selesai":
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">Selesai</Badge>
            case "Batal":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">Batal</Badge>
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

    const filteredDrivers = drivers.filter(driver => {
        const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             driver.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             driver.nik.includes(searchQuery)
        const matchesStatus = statusFilter === "all" || driver.status.toLowerCase() === statusFilter.toLowerCase()
        const matchesOnline = onlineFilter === "all" || driver.onlineStatus.toLowerCase() === onlineFilter.toLowerCase()
        return matchesSearch && matchesStatus && matchesOnline
    })

    const handleAction = (driver: Driver, action: "suspend" | "reinstate" | "verify") => {
        // Cek permission
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
        if (!actionReason.trim()) {
            alert("Alasan wajib diisi!")
            return
        }

        // Simpan ke audit log
        const newAuditLog: AuditLog = {
            id: `AUD-${Math.floor(Math.random() * 1000)}`,
            action: actionType === "suspend" ? "Suspend Driver" : 
                    actionType === "reinstate" ? "Aktivasi Kembali" : "Verifikasi Driver",
            admin: "Admin Utama",
            adminRole: currentUserRole,
            timestamp: new Date().toLocaleString(),
            reason: actionReason,
            details: `${actionType} driver: ${selectedDriver?.name} (${selectedDriver?.id})`
        }
        
        auditLogs.unshift(newAuditLog)
        console.log(`${actionType} driver:`, selectedDriver?.id, "Alasan:", actionReason)
        
        setIsConfirmDialogOpen(false)
        setActionType(null)
        setActionReason("")
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-white min-h-screen">
            {/* Header dengan Role Selector */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Manajemen Driver</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Kelola driver, verifikasi dokumen, dan monitor performa armada.
                    </p>
                </div>
                <div className="flex gap-2">
                    {/* Role Selector untuk simulasi */}
                    <Select value={currentUserRole} onValueChange={(value) => setCurrentUserRole(value as UserRole)}>
                        <SelectTrigger className="w-[180px] border-gray-300">
                            <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Super Admin">Super Admin</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Supervisor">Supervisor</SelectItem>
                            <SelectItem value="Operator">Operator</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    {/* Tombol Audit Log */}
                    {canViewAuditLog() && (
                        <Button 
                            variant="outline" 
                            size="default" 
                            className="border-gray-300"
                            onClick={() => setIsAuditLogOpen(true)}
                        >
                            <FileClock className="mr-2 h-4 w-4" />
                            Audit Log
                        </Button>
                    )}
                    
                    <Button variant="outline" size="default" className="border-gray-300">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                    <Button 
                        size="default" 
                        style={{ backgroundColor: "#E04D04" }} 
                        className="hover:opacity-90 text-white"
                        onClick={() => setIsAddDriverOpen(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Driver Baru
                    </Button>
                </div>
            </div>

            {/* Statistik Ringkas dengan Cancel Rate */}
          {/* Statistik Ringkas - Persis seperti gambar */}
<div className="grid grid-cols-1 md:grid-cols-5 gap-5">
    {/* Card 1: Total Driver */}
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="text-sm text-gray-500 mb-2">Total Driver</div>
        <div className="text-3xl font-semibold text-gray-900 mb-1">{drivers.length}</div>
        <div className="text-xs text-gray-400">Registered drivers</div>
    </div>

    {/* Card 2: Online */}
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="text-sm text-gray-500 mb-2">Online</div>
        <div className="text-3xl font-semibold text-emerald-600 mb-1">
            {drivers.filter(d => d.onlineStatus === "Online").length}
        </div>
        <div className="text-xs text-gray-400">{drivers.filter(d => d.status === "Aktif").length} total aktif</div>
    </div>

    {/* Card 3: Pending Verifikasi */}
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="text-sm text-gray-500 mb-2">Pending Verifikasi</div>
        <div className="text-3xl font-semibold text-yellow-600 mb-1">
            {drivers.filter(d => d.status === "Pending Verifikasi").length}
        </div>
        <div className="text-xs text-gray-400">Menunggu verifikasi</div>
    </div>

    {/* Card 4: Rating Rata-rata */}
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="text-sm text-gray-500 mb-2">Rating Rata-rata</div>
        <div className="flex items-end gap-1 mb-1">
            <span className="text-3xl font-semibold text-gray-900">4.5</span>
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mb-1" />
        </div>
        <div className="text-xs text-gray-400">Dari 2.5k ulasan</div>
    </div>

    {/* Card 5: Cancel Rate */}
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="text-sm text-gray-500 mb-2">Cancel Rate</div>
        <div className="text-3xl font-semibold text-orange-600 mb-1">4.2%</div>
        <div className="text-xs text-gray-400">Rata-rata cancel rate</div>
    </div>
</div>

            {/* Filter dan Pencarian */}
            <div className="flex items-center gap-3 bg-white">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Cari nama, ID, NIK, atau kendaraan..."
                        className="pl-9 border-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px] border-gray-300">
                        <SelectValue placeholder="Semua Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="pending verifikasi">Pending Verifikasi</SelectItem>
                        <SelectItem value="suspend">Suspend</SelectItem>
                        <SelectItem value="nonaktif">Nonaktif</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={onlineFilter} onValueChange={setOnlineFilter}>
                    <SelectTrigger className="w-[140px] border-gray-300">
                        <SelectValue placeholder="Semua" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tabel Driver dengan Cancel Rate */}
            <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-white border-b border-gray-200">
                        <TableRow className="hover:bg-white">
                            <TableHead className="font-semibold text-gray-600">Driver</TableHead>
                            <TableHead className="font-semibold text-gray-600">Status Akun</TableHead>
                            <TableHead className="font-semibold text-gray-600">Online</TableHead>
                            <TableHead className="font-semibold text-gray-600">Trip Status</TableHead>
                            <TableHead className="font-semibold text-gray-600">Kendaraan</TableHead>
                            <TableHead className="font-semibold text-gray-600">Rating</TableHead>
                            <TableHead className="font-semibold text-gray-600">Order</TableHead>
                            <TableHead className="font-semibold text-gray-600">Cancel Rate</TableHead>
                            <TableHead className="font-semibold text-gray-600 text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDrivers.map((driver) => (
                            <TableRow key={driver.id} className="hover:bg-gray-50 border-b border-gray-100">
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-gray-900">{driver.name}</div>
                                        <div className="text-xs text-gray-400">{driver.id}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(driver.status)}
                                </TableCell>
                                <TableCell>
                                    {getOnlineStatusBadge(driver.onlineStatus)}
                                </TableCell>
                                <TableCell>
                                    {driver.currentTrip ? (
                                        getTripStatusBadge(driver.currentTrip.status)
                                    ) : (
                                        <Badge variant="outline" className="border-gray-200 text-gray-400">-</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Bike className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{driver.vehicle}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {driver.rating > 0 ? driver.rating.toFixed(1) : "-"}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm text-gray-600">{driver.totalOrders}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <span className={`text-sm font-medium ${
                                            driver.cancelRate > 10 ? "text-red-600" : 
                                            driver.cancelRate > 5 ? "text-orange-600" : "text-gray-600"
                                        }`}>
                                            {driver.cancelRate}%
                                        </span>
                                        {driver.cancelRate > 10 && (
                                            <AlertCircle className="h-3 w-3 text-red-600" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className="h-8 px-2 text-gray-500 hover:text-gray-900"
                                            onClick={() => {
                                                setSelectedDriver(driver)
                                                setIsDetailOpen(true)
                                            }}
                                        >
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel className="text-xs font-medium text-gray-400">Operasional Armada</DropdownMenuLabel>
                                                
                                                {/* Verifikasi - berdasarkan role */}
                                                {canVerify() && (
                                                    <DropdownMenuItem 
                                                        onClick={() => handleAction(driver, "verify")} 
                                                        className="cursor-pointer"
                                                        disabled={driver.status !== "Pending Verifikasi"}
                                                    >
                                                        <Shield className="mr-2 h-4 w-4" />
                                                        Verifikasi Driver
                                                    </DropdownMenuItem>
                                                )}
                                                
                                                <DropdownMenuSeparator />
                                                
                                                {/* Suspend/Reinstate - berdasarkan role */}
                                                {driver.status === "Suspend" ? (
                                                    canReactivate() && (
                                                        <DropdownMenuItem 
                                                            className="text-emerald-600 cursor-pointer"
                                                            onClick={() => handleAction(driver, "reinstate")}
                                                        >
                                                            <RotateCcw className="mr-2 h-4 w-4" />
                                                            Aktifkan Kembali
                                                        </DropdownMenuItem>
                                                    )
                                                ) : (
                                                    canSuspend() && (
                                                        <DropdownMenuItem 
                                                            className="text-red-600 cursor-pointer"
                                                            onClick={() => handleAction(driver, "suspend")}
                                                            disabled={driver.status !== "Aktif"}
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

            {/* Pagination */}
          {/* Pagination - Sesuai gambar */}
<div className="flex items-center justify-between mt-4">
    <div className="text-sm text-gray-500">
        Menampilkan {filteredDrivers.length} dari {drivers.length} driver
    </div>
    <div className="flex items-center gap-1">
        <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-500"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
            &lt;
        </Button>
        <Button 
            variant={currentPage === 1 ? "default" : "ghost"}
            size="sm" 
            className={`h-8 w-8 p-0 ${currentPage === 1 ? 'bg-[#E04D04] text-white hover:bg-[#E04D04]' : 'text-gray-700'}`}
            onClick={() => setCurrentPage(1)}
        >
            1
        </Button>
        <Button 
            variant={currentPage === 2 ? "default" : "ghost"}
            size="sm" 
            className={`h-8 w-8 p-0 ${currentPage === 2 ? 'bg-[#E04D04] text-white hover:bg-[#E04D04]' : 'text-gray-700'}`}
            onClick={() => setCurrentPage(2)}
        >
            2
        </Button>
        <Button 
            variant={currentPage === 3 ? "default" : "ghost"}
            size="sm" 
            className={`h-8 w-8 p-0 ${currentPage === 3 ? 'bg-[#E04D04] text-white hover:bg-[#E04D04]' : 'text-gray-700'}`}
            onClick={() => setCurrentPage(3)}
        >
            3
        </Button>
        <span className="px-1 text-gray-400">...</span>
        <Button 
            variant="ghost"
            size="sm" 
            className="h-8 w-8 p-0 text-gray-700"
            onClick={() => setCurrentPage(12)}
        >
            12
        </Button>
        <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-500"
            disabled={currentPage === 12}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 12))}
        >
            &gt;
        </Button>
    </div>
</div>

            {/* Modal Tambah Driver Baru - LENGKAP */}
            <Dialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                    <div className="px-6 py-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900">
                                Tambah Driver Baru
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">
                                Isi lengkap data driver untuk mendaftarkan ke sistem
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="px-6 py-4">
                        {/* Progress Steps */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                {[
                                    { id: "personal", label: "Informasi Pribadi", icon: User },
                                    { id: "contact", label: "Kontak", icon: Phone },
                                    { id: "documents", label: "Dokumen", icon: FileText },
                                    { id: "vehicle", label: "Kendaraan", icon: Bike },
                                    { id: "status", label: "Status Awal", icon: Shield }
                                ].map((step, index) => {
                                    const Icon = step.icon
                                    const isActive = activeTab === step.id
                                    const isCompleted = ["personal", "contact", "documents", "vehicle", "status"].indexOf(step.id) < 
                                                      ["personal", "contact", "documents", "vehicle", "status"].indexOf(activeTab)
                                    
                                    return (
                                        <div key={step.id} className="flex items-center flex-1">
                                            <div 
                                                className={`flex items-center gap-2 cursor-pointer ${isActive ? "text-[#E04D04]" : isCompleted ? "text-emerald-600" : "text-gray-400"}`}
                                                onClick={() => setActiveTab(step.id)}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                                                    ${isActive ? "border-[#E04D04] bg-orange-50" : 
                                                      isCompleted ? "border-emerald-600 bg-emerald-50" : 
                                                      "border-gray-300 bg-white"}`}>
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                                    ) : (
                                                        <Icon className={`h-4 w-4 ${isActive ? "text-[#E04D04]" : "text-gray-400"}`} />
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium hidden md:block">{step.label}</span>
                                            </div>
                                            {index < 4 && (
                                                <div className={`flex-1 h-px mx-2 ${
                                                    ["personal", "contact", "documents", "vehicle", "status"].indexOf(activeTab) > index 
                                                    ? "bg-emerald-600" : "bg-gray-300"
                                                }`} />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Form Sections */}
                        <div className="mt-6">
                            {/* Informasi Pribadi */}
                            {activeTab === "personal" && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Informasi Pribadi</h3>
                                    
                                    {/* Foto Profil */}
                                    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                            <User className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <div>
                                            <Button variant="outline" size="sm" className="border-gray-300">
                                                <Camera className="mr-2 h-4 w-4" />
                                                Upload Foto Profil
                                            </Button>
                                            <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG. Maks 2MB</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nama Lengkap</Label>
                                            <Input id="name" placeholder="Masukkan nama lengkap" className="border-gray-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nik">NIK</Label>
                                            <Input id="nik" placeholder="Masukkan NIK" className="border-gray-300" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="birthdate">Tanggal Lahir</Label>
                                            <Input id="birthdate" type="date" className="border-gray-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Jenis Kelamin</Label>
                                            <Select>
                                                <SelectTrigger className="border-gray-300">
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">Laki-laki</SelectItem>
                                                    <SelectItem value="female">Perempuan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Alamat Lengkap</Label>
                                        <Input id="address" placeholder="Masukkan alamat lengkap" className="border-gray-300" />
                                    </div>
                                </div>
                            )}

                            {/* Kontak */}
                            {activeTab === "contact" && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Informasi Kontak</h3>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Nomor HP</Label>
                                            <Input id="phone" placeholder="Masukkan nomor HP" className="border-gray-300" />
                                            <p className="text-xs text-gray-400">Contoh: 081234567890</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="Masukkan email" className="border-gray-300" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="emergency">Nomor Darurat</Label>
                                            <Input id="emergency" placeholder="Nomor kontak darurat" className="border-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Dokumen */}
                            {activeTab === "documents" && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Upload Dokumen</h3>
                                    
                                    <div className="space-y-3">
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-orange-50 rounded">
                                                        <IdCard className="h-5 w-5" style={{ color: "#E04D04" }} />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700">KTP</span>
                                                        <p className="text-xs text-gray-400">Format: JPG, PNG. Maks 5MB</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="border-gray-300">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Upload
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-orange-50 rounded">
                                                        <Car className="h-5 w-5" style={{ color: "#E04D04" }} />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700">SIM</span>
                                                        <p className="text-xs text-gray-400">Format: JPG, PNG. Maks 5MB</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="border-gray-300">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Upload
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-orange-50 rounded">
                                                        <Bike className="h-5 w-5" style={{ color: "#E04D04" }} />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-700">Foto Kendaraan</span>
                                                        <p className="text-xs text-gray-400">Format: JPG, PNG. Maks 5MB</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="border-gray-300">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Upload
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Informasi Kendaraan */}
                            {activeTab === "vehicle" && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Informasi Kendaraan</h3>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicleNumber">Nomor Kendaraan</Label>
                                            <Input id="vehicleNumber" placeholder="Contoh: B 1234 ABC" className="border-gray-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicleType">Tipe Kendaraan</Label>
                                            <Input id="vehicleType" placeholder="Contoh: Becak Listrik 2023" className="border-gray-300" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicleYear">Tahun</Label>
                                            <Input id="vehicleYear" placeholder="Contoh: 2023" className="border-gray-300" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicleColor">Warna</Label>
                                            <Input id="vehicleColor" placeholder="Warna kendaraan" className="border-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Status Awal */}
                            {activeTab === "status" && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Status Awal Driver</h3>
                                    
                                    <Card className="border border-gray-200">
                                        <CardContent className="pt-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white rounded">
                                                            <Clock className="h-5 w-5 text-yellow-600" />
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-medium text-gray-700">Pending Verifikasi</span>
                                                            <p className="text-xs text-gray-400">Driver akan memerlukan verifikasi dokumen sebelum aktif</p>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-yellow-100 text-yellow-700">Default</Badge>
                                                </div>

                                                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white rounded">
                                                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-medium text-gray-700">Aktif</span>
                                                            <p className="text-xs text-gray-400">Driver langsung aktif (hanya untuk admin dengan kewenangan khusus)</p>
                                                        </div>
                                                    </div>
                                                    <Select defaultValue="pending">
                                                        <SelectTrigger className="w-32 border-gray-300">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">Pending</SelectItem>
                                                            <SelectItem value="active">Aktif</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer dengan Navigasi */}
                    <div className="px-6 py-4 flex justify-between items-center">
                        <div>
                            {activeTab !== "personal" && (
                                <Button variant="outline" onClick={() => {
                                    const tabs = ["personal", "contact", "documents", "vehicle", "status"]
                                    const currentIndex = tabs.indexOf(activeTab)
                                    setActiveTab(tabs[currentIndex - 1])
                                }}>
                                    Sebelumnya
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsAddDriverOpen(false)}>
                                Batal
                            </Button>
                            {activeTab !== "status" ? (
                                <Button 
                                    style={{ backgroundColor: "#E04D04" }}
                                    className="text-white hover:opacity-90"
                                    onClick={() => {
                                        const tabs = ["personal", "contact", "documents", "vehicle", "status"]
                                        const currentIndex = tabs.indexOf(activeTab)
                                        setActiveTab(tabs[currentIndex + 1])
                                    }}
                                >
                                    Selanjutnya
                                </Button>
                            ) : (
                                <Button 
                                    style={{ backgroundColor: "#E04D04" }}
                                    className="text-white hover:opacity-90"
                                    onClick={() => {
                                        // Simpan data driver
                                        console.log("Menyimpan data driver...")
                                        setIsAddDriverOpen(false)
                                        setActiveTab("personal")
                                    }}
                                >
                                    Simpan Driver
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Modal Audit Log */}
            <Dialog open={isAuditLogOpen} onOpenChange={setIsAuditLogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                    <div className="px-6 py-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900">
                                Audit Log - Memori Sistem
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">
                                Catatan semua tindakan administratif untuk akuntabilitas
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="px-6 py-4">
                        <div className="space-y-4">
                            {auditLogs.map((log) => (
                                <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded ${
                                                log.action.includes('Suspend') ? 'bg-red-50' :
                                                log.action.includes('Verifikasi') ? 'bg-orange-50' :
                                                log.action.includes('Aktivasi') ? 'bg-emerald-50' : 'bg-blue-50'
                                            }`}>
                                                <FileClock className={`h-5 w-5 ${
                                                    log.action.includes('Suspend') ? 'text-red-600' :
                                                    log.action.includes('Verifikasi') ? 'text-orange-600' :
                                                    log.action.includes('Aktivasi') ? 'text-emerald-600' : 'text-blue-600'
                                                }`} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium text-gray-900">{log.action}</h4>
                                                    <span className="text-xs text-gray-400">{log.id}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <Badge variant="outline" className="bg-gray-50">
                                                        {log.admin} ({log.adminRole})
                                                    </Badge>
                                                    <span className="text-xs text-gray-400">{log.timestamp}</span>
                                                </div>
                                                <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                                                    <span className="font-medium text-gray-700">Alasan: </span>
                                                    <span className="text-gray-600">{log.reason}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Modal Konfirmasi Tindakan dengan Alasan Wajib */}
            <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                <DialogContent className="max-w-md p-0 overflow-hidden">
                    <div className="p-8">
                        <DialogHeader>
                            <div className="flex justify-center mb-6">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                    actionType === "suspend" ? "bg-red-50" :
                                    actionType === "reinstate" ? "bg-emerald-50" : "bg-orange-50"
                                }`}>
                                    {actionType === "suspend" && <UserX className="h-8 w-8 text-red-600" />}
                                    {actionType === "reinstate" && <RotateCcw className="h-8 w-8 text-emerald-600" />}
                                    {actionType === "verify" && <Shield className="h-8 w-8" style={{ color: "#E04D04" }} />}
                                </div>
                            </div>
                            <DialogTitle className="text-2xl font-semibold text-center text-gray-900 mb-2">
                                {actionType === "suspend" && "Suspend Driver"}
                                {actionType === "reinstate" && "Aktifkan Kembali Driver"}
                                {actionType === "verify" && "Verifikasi Driver"}
                            </DialogTitle>
                            <DialogDescription className="text-center text-gray-500">
                                {actionType === "suspend" && "Apakah Anda yakin ingin menonaktifkan driver ini?"}
                                {actionType === "reinstate" && "Apakah Anda yakin ingin mengaktifkan kembali driver ini?"}
                                {actionType === "verify" && "Apakah Anda yakin ingin memverifikasi driver ini?"}
                            </DialogDescription>
                        </DialogHeader>

                        {/* Alasan wajib diisi - untuk akuntabilitas */}
                        <div className="mt-6">
                            <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                                Alasan <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="reason"
                                placeholder="Jelaskan alasan tindakan ini (wajib diisi)"
                                value={actionReason}
                                onChange={(e) => setActionReason(e.target.value)}
                                className="mt-2 border-gray-300"
                                rows={3}
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Alasan akan tercatat di audit log untuk akuntabilitas
                            </p>
                        </div>

                        <div className="flex justify-center gap-3 mt-8">
                            <Button 
                                variant="outline" 
                                onClick={() => {
                                    setIsConfirmDialogOpen(false)
                                    setActionReason("")
                                }}
                                className="px-8 border-gray-300"
                            >
                                Batal
                            </Button>
                            <Button 
                                style={actionType === "verify" ? { backgroundColor: "#E04D04" } : {}}
                                className={actionType === "suspend" ? "bg-red-600 hover:bg-red-700 text-white px-8" :
                                         actionType === "reinstate" ? "bg-emerald-600 hover:bg-emerald-700 text-white px-8" :
                                         "text-white hover:opacity-90 px-8"}
                                onClick={confirmAction}
                                disabled={!actionReason.trim()}
                            >
                                {actionType === "suspend" && "Ya, Suspend"}
                                {actionType === "reinstate" && "Ya, Aktifkan"}
                                {actionType === "verify" && "Ya, Verifikasi"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Modal Detail Driver dengan Riwayat Suspend/Reactivation */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
                    <div className="px-6 py-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900">
                                Detail Driver: {selectedDriver?.name}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">
                                Informasi lengkap dan riwayat driver
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="px-6 py-4">
                        <Tabs defaultValue="info" className="mt-2">
                            <TabsList className="grid w-full grid-cols-5 bg-transparent p-0 gap-1">
                                <TabsTrigger 
                                    value="info" 
                                    className="data-[state=active]:bg-[#E04D04] data-[state=active]:text-white py-2 rounded-md border border-gray-200 data-[state=active]:border-[#E04D04]"
                                >
                                    Informasi Pribadi
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="stats" 
                                    className="data-[state=active]:bg-[#E04D04] data-[state=active]:text-white py-2 rounded-md border border-gray-200 data-[state=active]:border-[#E04D04]"
                                >
                                    Statistik Performa
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="documents" 
                                    className="data-[state=active]:bg-[#E04D04] data-[state=active]:text-white py-2 rounded-md border border-gray-200 data-[state=active]:border-[#E04D04]"
                                >
                                    Dokumen
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="history" 
                                    className="data-[state=active]:bg-[#E04D04] data-[state=active]:text-white py-2 rounded-md border border-gray-200 data-[state=active]:border-[#E04D04]"
                                >
                                    Riwayat Aktivitas
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="audit" 
                                    className="data-[state=active]:bg-[#E04D04] data-[state=active]:text-white py-2 rounded-md border border-gray-200 data-[state=active]:border-[#E04D04]"
                                >
                                    Audit Trail
                                </TabsTrigger>
                            </TabsList>

                            {/* Informasi Pribadi */}
                            <TabsContent value="info" className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Identitas</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-xs text-gray-400">NIK</span>
                                                <p className="text-sm text-gray-900">{selectedDriver?.nik}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-400">Tanggal Daftar</span>
                                                <p className="text-sm text-gray-900">{selectedDriver?.joinDate}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-400">Alamat</span>
                                                <p className="text-sm text-gray-900">{selectedDriver?.address}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Kontak</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{selectedDriver?.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{selectedDriver?.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectedDriver?.currentTrip && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Trip Aktif</h4>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-blue-700">Trip #{selectedDriver.currentTrip.id}</span>
                                                {getTripStatusBadge(selectedDriver.currentTrip.status)}
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-3 w-3 text-blue-500 mt-1" />
                                                    <span className="text-blue-700">Pickup: {selectedDriver.currentTrip.pickup}</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="h-3 w-3 text-blue-500 mt-1" />
                                                    <span className="text-blue-700">Destination: {selectedDriver.currentTrip.destination}</span>
                                                </div>
                                                <div className="text-xs text-blue-600 mt-1">
                                                    Customer: {selectedDriver.currentTrip.customer}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            {/* Statistik Performa dengan Cancel Rate */}
                            <TabsContent value="stats" className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Metrik Utama</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-500">Rating</span>
                                                    <span className="font-medium text-gray-900">{selectedDriver?.rating} / 5.0</span>
                                                </div>
                                                <Progress value={selectedDriver?.rating ? selectedDriver.rating * 20 : 0} className="h-1.5" />
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Total Order</span>
                                                <span className="font-medium text-gray-900">{selectedDriver?.totalOrders}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Order 30 Hari Terakhir</span>
                                                <span className="font-medium text-gray-900">45</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Cancel Rate</span>
                                                <span className={`font-medium ${
                                                    selectedDriver && selectedDriver.cancelRate > 10 ? "text-red-600" : 
                                                    selectedDriver && selectedDriver.cancelRate > 5 ? "text-orange-600" : "text-gray-900"
                                                }`}>
                                                    {selectedDriver?.cancelRate}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Pelanggaran & Laporan</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Jumlah Pelanggaran</span>
                                                <Badge variant="outline" className={selectedDriver && selectedDriver.violations > 0 ? "bg-red-50 text-red-700 border-red-200" : "bg-gray-50"}>
                                                    {selectedDriver?.violations || 0}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Laporan/ Komplain</span>
                                                <Badge variant="outline" className={selectedDriver && selectedDriver.reports > 0 ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-gray-50"}>
                                                    {selectedDriver?.reports || 0}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Riwayat Pelanggaran */}
                                {selectedDriver && selectedDriver.violations > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Riwayat Pelanggaran</h4>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-red-50 rounded-lg text-sm">
                                                <div className="font-medium text-red-700">Penolakan Order</div>
                                                <div className="text-xs text-red-600">2024-02-20 - Peringatan 1</div>
                                            </div>
                                            <div className="p-3 bg-red-50 rounded-lg text-sm">
                                                <div className="font-medium text-red-700">Telat Menjemput</div>
                                                <div className="text-xs text-red-600">2024-02-15 - Peringatan 2</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            {/* Dokumen */}
                            <TabsContent value="documents" className="space-y-4 mt-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-3">Verifikasi Dokumen</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-50 rounded">
                                                    <FileText className="h-4 w-4" style={{ color: "#E04D04" }} />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">KTP</span>
                                                    <p className="text-xs text-gray-400">Nomor: {selectedDriver?.nik}</p>
                                                </div>
                                            </div>
                                            {selectedDriver?.documents.ktp ? (
                                                <Badge className="bg-emerald-100 text-emerald-700">Terverifikasi</Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-red-200 text-red-600">Belum</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-50 rounded">
                                                    <Car className="h-4 w-4" style={{ color: "#E04D04" }} />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">SIM</span>
                                                    <p className="text-xs text-gray-400">SIM A - 123456789</p>
                                                </div>
                                            </div>
                                            {selectedDriver?.documents.sim ? (
                                                <Badge className="bg-emerald-100 text-emerald-700">Terverifikasi</Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-red-200 text-red-600">Belum</Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-orange-50 rounded">
                                                    <Bike className="h-4 w-4" style={{ color: "#E04D04" }} />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Dokumen Kendaraan</span>
                                                    <p className="text-xs text-gray-400">{selectedDriver?.vehicle}</p>
                                                </div>
                                            </div>
                                            {selectedDriver?.documents.vehicle ? (
                                                <Badge className="bg-emerald-100 text-emerald-700">Terverifikasi</Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-red-200 text-red-600">Belum</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {selectedDriver?.status === "Pending Verifikasi" && canVerify() && (
                                    <Button 
                                        className="w-full mt-4"
                                        style={{ backgroundColor: "#E04D04" }}
                                        onClick={() => {
                                            setIsDetailOpen(false)
                                            handleAction(selectedDriver, "verify")
                                        }}
                                    >
                                        <Shield className="mr-2 h-4 w-4" />
                                        Proses Verifikasi Sekarang
                                    </Button>
                                )}
                            </TabsContent>

                            {/* Riwayat Aktivitas */}
                            <TabsContent value="history" className="space-y-4 mt-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-3">Log Aktivitas</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                                            <div className="p-1 bg-blue-50 rounded">
                                                <Calendar className="h-3 w-3 text-blue-500" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-700">Login Terakhir</p>
                                                <p className="text-xs text-gray-400">{selectedDriver?.lastActive || "Tidak ada data"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                                            <div className="p-1 bg-purple-50 rounded">
                                                <History className="h-3 w-3 text-purple-500" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-700">Perubahan Status Akun</p>
                                                <p className="text-xs text-gray-400">
                                                    {selectedDriver?.status === "Suspend" 
                                                        ? `Disuspend pada ${selectedDriver?.suspendHistory?.[0]?.date || "2024-01-15"} oleh ${selectedDriver?.suspendHistory?.[0]?.admin || "Admin"}` 
                                                        : `Aktif sejak ${selectedDriver?.joinDate}`}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Riwayat Suspend */}
                                        {selectedDriver?.suspendHistory && selectedDriver.suspendHistory.length > 0 && (
                                            <div className="mt-2">
                                                <h5 className="text-xs font-medium text-gray-500 mb-2">Riwayat Suspend</h5>
                                                {selectedDriver.suspendHistory.map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 p-2 bg-red-50 rounded-lg mb-2">
                                                        <div className="p-1 bg-red-100 rounded">
                                                            <UserX className="h-3 w-3 text-red-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-xs font-medium text-red-700">Suspend</p>
                                                            <p className="text-xs text-red-600">{item.date} - {item.reason}</p>
                                                            <p className="text-xs text-gray-500">Oleh: {item.admin}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Riwayat Reaktivasi */}
                                        {selectedDriver?.reactivationHistory && selectedDriver.reactivationHistory.length > 0 && (
                                            <div className="mt-2">
                                                <h5 className="text-xs font-medium text-gray-500 mb-2">Riwayat Reaktivasi</h5>
                                                {selectedDriver.reactivationHistory.map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 p-2 bg-emerald-50 rounded-lg">
                                                        <div className="p-1 bg-emerald-100 rounded">
                                                            <RotateCcw className="h-3 w-3 text-emerald-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-xs font-medium text-emerald-700">Aktivasi Kembali</p>
                                                            <p className="text-xs text-emerald-600">{item.date} - {item.reason}</p>
                                                            <p className="text-xs text-gray-500">Oleh: {item.admin}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {selectedDriver && selectedDriver.violations > 0 && (
                                            <div className="flex items-start gap-3">
                                                <div className="p-1 bg-red-50 rounded">
                                                    <FileWarning className="h-3 w-3 text-red-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-700">Riwayat Pelanggaran</p>
                                                    <p className="text-xs text-gray-400">
                                                        {selectedDriver.violations} pelanggaran tercatat
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Audit Trail - Riwayat Tindakan */}
                            <TabsContent value="audit" className="space-y-4 mt-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-3">Audit Trail Driver</h4>
                                    <div className="space-y-3">
                                        {auditLogs
                                            .filter(log => log.details.includes(selectedDriver?.id || ''))
                                            .map((log) => (
                                                <div key={log.id} className="border border-gray-200 rounded-lg p-3">
                                                    <div className="flex items-start gap-3">
                                                        <div className={`p-1 rounded ${
                                                            log.action.includes('Suspend') ? 'bg-red-50' :
                                                            log.action.includes('Verifikasi') ? 'bg-orange-50' :
                                                            log.action.includes('Aktivasi') ? 'bg-emerald-50' : 'bg-blue-50'
                                                        }`}>
                                                            <FileClock className={`h-4 w-4 ${
                                                                log.action.includes('Suspend') ? 'text-red-600' :
                                                                log.action.includes('Verifikasi') ? 'text-orange-600' :
                                                                log.action.includes('Aktivasi') ? 'text-emerald-600' : 'text-blue-600'
                                                            }`} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium text-gray-700">{log.action}</span>
                                                                <span className="text-xs text-gray-400">{log.timestamp}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-600 mt-1">{log.details}</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge variant="outline" className="bg-gray-50 text-xs">
                                                                    {log.admin} ({log.adminRole})
                                                                </Badge>
                                                            </div>
                                                            <div className="mt-2 text-xs bg-gray-50 p-2 rounded">
                                                                <span className="font-medium text-gray-700">Alasan: </span>
                                                                <span className="text-gray-600">{log.reason}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        
                                        {auditLogs.filter(log => log.details.includes(selectedDriver?.id || '')).length === 0 && (
                                            <div className="text-center py-8 text-gray-400">
                                                <FileClock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                                <p>Belum ada catatan audit untuk driver ini</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                            Tutup
                        </Button>
                        <Button style={{ backgroundColor: "#E04D04" }} className="text-white hover:opacity-90">
                            Edit Driver
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}