"use client"

import * as React from "react"
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
import {
    Search,
    MoreHorizontal,
    MessageSquareWarning,
    ArrowRightCircle,
    Eye,
    Copy,
    Phone,
    Mail,
    UserCheck,
    ShieldAlert,
    AlertCircle,
    Clock,
    MapPin,
    Calendar,
    User,
    ArrowRight,
    FileText,
    CheckCircle2,
    XCircle,
    Ban,
    RefreshCcw,
    ChevronLeft,
    ChevronRight,
    X,
    Camera,
    MessageSquare,
    Activity,
    Filter
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const allComplaints = [
    {
        id: "TKT-001",
        type: "Penumpang -> Pengemudi",
        subject: "Perilaku tidak sopan",
        from: "Rina S.",
        fromRole: "Penumpang",
        fromContact: { phone: "+62 812-3456-7890", email: "rina.s@example.com" },
        to: "Budi Santoso",
        toRole: "Pengemudi",
        toContact: { phone: "+62 899-8877-6655", email: "budi.driver@example.com" },
        status: "Baru",
        priority: "Tinggi",
        tripId: "TRP-9921",
        date: "2024-02-28 14:20",
        detail: "Pengemudi berteriak ketika saya memintanya untuk melambat. Dia mengemudi sangat agresif di area perumahan."
    },
    {
        id: "TKT-002",
        type: "Pengemudi -> Penumpang",
        subject: "Penumpang menolak bayar",
        from: "Siti Aminah",
        fromRole: "Pengemudi",
        fromContact: { phone: "+62 877-1122-3344", email: "siti.driver@example.com" },
        to: "Ahmad J.",
        toRole: "Penumpang",
        toContact: { phone: "+62 811-2233-4455", email: "ahmad.j@example.com" },
        status: "Sedang Diinvestigasi",
        priority: "Sedang",
        tripId: "TRP-8872",
        date: "2024-02-28 09:15",
        detail: "Penumpang mengatakan harga aplikasi terlalu mahal dan hanya ingin membayar setengah. Dia meninggalkan mobil tanpa membayar penuh."
    },
    {
        id: "TKT-003",
        type: "Penumpang -> Pengemudi",
        subject: "Mengemudi tidak aman",
        from: "Dewi P.",
        fromRole: "Penumpang",
        fromContact: { phone: "+62 822-1122-3344", email: "dewi.p@example.com" },
        to: "Joko W.",
        toRole: "Pengemudi",
        toContact: { phone: "+62 855-6677-8899", email: "joko.driver@example.com" },
        status: "Selesai",
        priority: "Tinggi",
        tripId: "TRP-7721",
        date: "2024-02-27 21:00",
        detail: "Pengemudi menggunakan ponsel sambil mengemudi dengan kecepatan tinggi di jalan tol."
    },
    {
        id: "TKT-004",
        type: "Pengguna -> Aplikasi",
        subject: "Aplikasi crash",
        from: "Kevin L.",
        fromRole: "Pengguna",
        fromContact: { phone: "+62 813-9988-7766", email: "kevin.l@example.com" },
        to: "Dukungan",
        toRole: "Sistem",
        toContact: { phone: "N/A", email: "support@cakli.com" },
        status: "Dieskalasi",
        priority: "Rendah",
        tripId: "N/A",
        date: "2024-02-27 18:45",
        detail: "Aplikasi crash setiap kali saya mencoba membuka riwayat pembayaran."
    },
    {
        id: "TKT-005",
        type: "Pengemudi -> Aplikasi",
        subject: "Masalah GPS",
        from: "Budi Santoso",
        fromRole: "Pengemudi",
        fromContact: { phone: "+62 899-8877-6655", email: "budi.driver@example.com" },
        to: "Dukungan",
        toRole: "Sistem",
        toContact: { phone: "N/A", email: "support@cakli.com" },
        status: "Selesai",
        priority: "Sedang",
        tripId: "N/A",
        date: "2024-02-27 10:30",
        detail: "Peta menunjukkan saya di tengah laut padahal saya sebenarnya di Jakarta Selatan."
    },
    {
        id: "TKT-006",
        type: "Penumpang -> Pengemudi",
        subject: "Tarif berlebihan",
        from: "Maya R.",
        fromRole: "Penumpang",
        fromContact: { phone: "+62 812-9876-5432", email: "maya.r@example.com" },
        to: "Agus W.",
        toRole: "Pengemudi",
        toContact: { phone: "+62 899-1234-5678", email: "agus.driver@example.com" },
        status: "Baru",
        priority: "Tinggi",
        tripId: "TRP-5543",
        date: "2024-02-26 16:45",
        detail: "Pengemudi mengambil rute yang lebih panjang dan tarifnya dua kali lipat dari estimasi."
    },
    {
        id: "TKT-007",
        type: "Pengemudi -> Penumpang",
        subject: "Kendaraan rusak",
        from: "Hendra K.",
        fromRole: "Pengemudi",
        fromContact: { phone: "+62 877-5544-3322", email: "hendra.driver@example.com" },
        to: "Lisa M.",
        toRole: "Penumpang",
        toContact: { phone: "+62 811-8877-6655", email: "lisa.m@example.com" },
        status: "Sedang Diinvestigasi",
        priority: "Sedang",
        tripId: "TRP-4432",
        date: "2024-02-26 11:20",
        detail: "Penumpang menggores pintu mobil saya dengan tasnya dan menolak untuk mengakuinya."
    },
    {
        id: "TKT-008",
        type: "Penumpang -> Pengemudi",
        subject: "Jemputan terlambat",
        from: "Fajar N.",
        fromRole: "Penumpang",
        fromContact: { phone: "+62 822-3344-5566", email: "fajar.n@example.com" },
        to: "Dedi S.",
        toRole: "Pengemudi",
        toContact: { phone: "+62 855-7788-9900", email: "dedi.driver@example.com" },
        status: "Baru",
        priority: "Rendah",
        tripId: "TRP-3321",
        date: "2024-02-25 08:30",
        detail: "Pengemudi datang terlambat 30 menit dan saya ketinggalan pesawat."
    },
    {
        id: "TKT-009",
        type: "Pengguna -> Aplikasi",
        subject: "Pembayaran gagal",
        from: "Sari P.",
        fromRole: "Pengguna",
        fromContact: { phone: "+62 813-1122-3344", email: "sari.p@example.com" },
        to: "Dukungan",
        toRole: "Sistem",
        toContact: { phone: "N/A", email: "support@cakli.com" },
        status: "Dieskalasi",
        priority: "Tinggi",
        tripId: "N/A",
        date: "2024-02-25 19:15",
        detail: "Kartu kredit saya didebit dua kali untuk perjalanan yang sama."
    },
    {
        id: "TKT-010",
        type: "Pengemudi -> Aplikasi",
        subject: "Akun diblokir",
        from: "Rudi H.",
        fromRole: "Pengemudi",
        fromContact: { phone: "+62 899-4455-6677", email: "rudi.driver@example.com" },
        to: "Dukungan",
        toRole: "Sistem",
        toContact: { phone: "N/A", email: "support@cakli.com" },
        status: "Selesai",
        priority: "Sedang",
        tripId: "N/A",
        date: "2024-02-24 14:00",
        detail: "Akun pengemudi saya diblokir tanpa penjelasan apapun."
    },
    {
        id: "TKT-011",
        type: "Penumpang -> Pengemudi",
        subject: "Barang tertinggal di mobil",
        from: "Andi W.",
        fromRole: "Penumpang",
        fromContact: { phone: "+62 812-5566-7788", email: "andi.w@example.com" },
        to: "Bambang T.",
        toRole: "Pengemudi",
        toContact: { phone: "+62 899-2233-4455", email: "bambang.driver@example.com" },
        status: "Sedang Diinvestigasi",
        priority: "Rendah",
        tripId: "TRP-2210",
        date: "2024-02-24 09:45",
        detail: "Saya meninggalkan laptop di mobil dan pengemudi tidak merespons."
    },
    {
        id: "TKT-012",
        type: "Pengemudi -> Penumpang",
        subject: "Tidak hadir",
        from: "Citra L.",
        fromRole: "Pengemudi",
        fromContact: { phone: "+62 877-9988-7766", email: "citra.driver@example.com" },
        to: "Bayu A.",
        toRole: "Penumpang",
        toContact: { phone: "+62 811-3344-5566", email: "bayu.a@example.com" },
        status: "Baru",
        priority: "Sedang",
        tripId: "TRP-1109",
        date: "2024-02-23 17:30",
        detail: "Penumpang memesan tapi tidak hadir dan tidak membatalkan perjalanan."
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Baru": return "text-slate-600"
        case "Sedang Diinvestigasi": return "text-slate-600"
        case "Selesai": return "text-slate-600"
        case "Dieskalasi": return "text-slate-600"
        default: return "text-slate-600"
    }
}

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "Tinggi": return "text-red-600 bg-red-50"
        case "Sedang": return "text-orange-600 bg-orange-50"
        case "Rendah": return "text-blue-600 bg-blue-50"
        default: return "text-slate-600 bg-slate-50"
    }
}

// Warna untuk kolom Subject
const getSubjectColor = (subject: string) => {
    if (subject.includes("tidak sopan") || subject.includes("tidak aman") || subject.includes("berlebihan")) return "text-red-600 bg-red-50 border-red-200"
    if (subject.includes("menolak") || subject.includes("crash") || subject.includes("diblockir")) return "text-orange-600 bg-orange-50 border-orange-200"
    if (subject.includes("GPS") || subject.includes("terlambat") || subject.includes("tidak hadir")) return "text-blue-600 bg-blue-50 border-blue-200"
    if (subject.includes("rusak") || subject.includes("tertinggal") || subject.includes("gagal")) return "text-purple-600 bg-purple-50 border-purple-200"
    return "text-slate-600 bg-slate-50 border-slate-200"
}

export default function ComplaintsPage() {
    const [selectedComplaint, setSelectedComplaint] = React.useState<any>(null);
    const [isReviewOpen, setIsReviewOpen] = React.useState(false);
    const [isContactOpen, setIsContactOpen] = React.useState(false);
    const [isEscalateOpen, setIsEscalateOpen] = React.useState(false);
    const [contactTarget, setContactTarget] = React.useState<"user" | "driver">("user");

    // Pagination state
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(allComplaints.length / itemsPerPage);

    const currentComplaints = React.useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return allComplaints.slice(start, end);
    }, [currentPage]);

    const openReview = (complaint: any) => {
        setSelectedComplaint(complaint);
        setIsReviewOpen(true);
    };

    const openContact = (complaint: any, target: "user" | "driver") => {
        setSelectedComplaint(complaint);
        setContactTarget(target);
        setIsContactOpen(true);
    };

    const openEscalate = (complaint: any) => {
        setSelectedComplaint(complaint);
        setIsEscalateOpen(true);
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Keluhan & Sengketa</h1>
                    <p className="text-slate-500 mt-1">Tangani laporan dari pengguna dan pengemudi secara efisien.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="Cari tiket..."
                        className="pl-10 h-10 border-slate-200 focus-visible:ring-[#E65100]/20"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[160px] h-10 border-slate-200">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="new">Baru</SelectItem>
                            <SelectItem value="investigating">Sedang Diinvestigasi</SelectItem>
                            <SelectItem value="resolved">Selesai</SelectItem>
                            <SelectItem value="escalated">Dieskalasi</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[160px] h-10 border-slate-200">
                            <SelectValue placeholder="Prioritas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Prioritas</SelectItem>
                            <SelectItem value="high">Tinggi</SelectItem>
                            <SelectItem value="medium">Sedang</SelectItem>
                            <SelectItem value="low">Rendah</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] h-10 border-slate-200">
                            <SelectValue placeholder="Jenis Laporan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Jenis</SelectItem>
                            <SelectItem value="p2d">Penumpang -&gt; Pengemudi</SelectItem>
                            <SelectItem value="d2p">Pengemudi -&gt; Penumpang</SelectItem>
                            <SelectItem value="system">Sistem / Aplikasi</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[160px] h-10 border-slate-200">
                            <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                            <SelectValue placeholder="Tanggal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Waktu</SelectItem>
                            <SelectItem value="today">Hari Ini</SelectItem>
                            <SelectItem value="week">7 Hari Terakhir</SelectItem>
                            <SelectItem value="month">30 Hari Terakhir</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="h-10 border-slate-200 text-slate-600 px-3">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-slate-200">
                            <TableHead className="font-semibold text-slate-700 py-4">ID Tiket</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Jenis</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Subjek</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Dari / Kepada</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Prioritas</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Status</TableHead>
                            <TableHead className="text-right font-semibold text-slate-700 py-4">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentComplaints.map((complaint) => (
                            <TableRow key={complaint.id} className="border-slate-200">
                                <TableCell
                                    className="font-bold text-black cursor-pointer py-5"
                                    onClick={() => openReview(complaint)}
                                >
                                    {complaint.id}
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MessageSquareWarning className="h-4 w-4 text-slate-400" />
                                        {complaint.type}
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border ${getSubjectColor(complaint.subject)}`}>
                                        {complaint.subject}
                                    </span>
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex flex-col text-xs">
                                        <span className="text-slate-500">Dari: <span className="text-slate-700 font-medium">{complaint.from}</span></span>
                                        <span className="text-slate-500">Kepada: <span className="text-slate-700 font-medium">{complaint.to}</span></span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                                        {complaint.priority}
                                    </span>
                                </TableCell>
                                <TableCell className="py-5">
                                    <span className={`text-sm ${getStatusColor(complaint.status)}`}>
                                        {complaint.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right py-5">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-[#E65100] hover:text-[#E65100]/80 hover:bg-[#E65100]/10"
                                            onClick={() => openReview(complaint)}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            Detail
                                        </Button>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                                    <MoreHorizontal className="h-4 w-4 text-slate-600" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel className="text-xs text-slate-500">Aksi Cepat</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openContact(complaint, "user")} className="cursor-pointer">
                                                    <User className="mr-2 h-4 w-4" /> Hubungi Pengguna
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => openContact(complaint, "driver")} className="cursor-pointer">
                                                    <User className="mr-2 h-4 w-4" /> Hubungi Pengemudi
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-[#E65100] font-medium cursor-pointer focus:text-[#E65100] focus:bg-[#E65100]/10"
                                                    onClick={() => openEscalate(complaint)}
                                                >
                                                    <ArrowRightCircle className="mr-2 h-4 w-4" /> Eskalasi
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination - Tanpa Border untuk Angka */}
            <div className="flex items-center justify-between px-2">
                <div className="text-sm text-slate-500">
                    Menampilkan <span className="font-semibold text-slate-700">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, allComplaints.length)}</span> dari <span className="font-semibold text-slate-700">{allComplaints.length}</span> entri
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-slate-300 hover:bg-slate-50 text-slate-600"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant="outline"
                            className={`h-8 w-8 border-0 font-medium ${currentPage === page
                                    ? "bg-slate-100 text-slate-700"
                                    : "bg-white text-slate-600 hover:bg-slate-50"
                                }`}
                            onClick={() => goToPage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white border-slate-300 hover:bg-slate-50 text-slate-600"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Detail Modal - Layout Rapi */}
            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden border-none shadow-xl max-h-[90vh] flex flex-col">
                    {selectedComplaint && (
                        <>
                            {/* Header */}
                            <div className="border-b border-slate-200 p-6 bg-white">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-black font-bold font-mono">
                                                {selectedComplaint.id}
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                                                Prioritas {selectedComplaint.priority}
                                            </span>
                                        </div>
                                        <DialogTitle className="text-2xl font-semibold text-slate-900">
                                            {selectedComplaint.subject}
                                        </DialogTitle>
                                        <DialogDescription className="flex items-center gap-2 text-slate-500">
                                            <Clock className="h-4 w-4" />
                                            Dikirim pada {selectedComplaint.date}
                                        </DialogDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-slate-600"
                                        onClick={() => setIsReviewOpen(false)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="space-y-6">
                                    {/* Parties Involved */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Reporter */}
                                        <div className="p-4 rounded-lg border border-slate-200">
                                            <div className="text-xs font-medium text-slate-400 mb-3">PELAPOR</div>
                                            <div className="flex items-start gap-3">
                                                <Avatar className="h-10 w-10 bg-[#E65100]/10">
                                                    <AvatarFallback className="text-[#E65100] text-sm">
                                                        {selectedComplaint.from.split(' ').map((n: string) => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-slate-900">{selectedComplaint.from}</div>
                                                    <div className="text-sm text-slate-500 mb-2">{selectedComplaint.fromRole}</div>
                                                    <div className="space-y-1 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <Phone className="h-3.5 w-3.5 text-slate-400" />
                                                            {selectedComplaint.fromContact.phone}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                                                            {selectedComplaint.fromContact.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reported */}
                                        <div className="p-4 rounded-lg border border-slate-200">
                                            <div className="text-xs font-medium text-slate-400 mb-3">PIHAK YANG DILAPORKAN</div>
                                            <div className="flex items-start gap-3">
                                                <Avatar className="h-10 w-10 bg-slate-100">
                                                    <AvatarFallback className="text-slate-600 text-sm">
                                                        {selectedComplaint.to.split(' ').map((n: string) => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-slate-900">{selectedComplaint.to}</div>
                                                    <div className="text-sm text-slate-500 mb-2">{selectedComplaint.toRole}</div>
                                                    <div className="space-y-1 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <Phone className="h-3.5 w-3.5 text-slate-400" />
                                                            {selectedComplaint.toContact.phone}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                                                            {selectedComplaint.toContact.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Trip Info */}
                                    {selectedComplaint.tripId !== "N/A" && (
                                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="h-5 w-5 text-slate-400" />
                                                    <div>
                                                        <div className="text-sm text-slate-500">Perjalanan Terkait</div>
                                                        <div className="font-mono font-medium text-slate-900">{selectedComplaint.tripId}</div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-[#E65100] hover:text-[#E65100]/80 hover:bg-[#E65100]/10">
                                                    Lihat Detail
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Complaint Detail */}
                                    <div className="rounded-lg border border-slate-200">
                                        <div className="p-4 border-b border-slate-200 bg-slate-50">
                                            <h3 className="font-medium text-slate-900 flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-slate-400" />
                                                Detail Keluhan
                                            </h3>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-slate-600 leading-relaxed">
                                                "{selectedComplaint.detail}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Evidence Section */}
                                    <div className="rounded-lg border border-slate-200">
                                        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                                            <h3 className="font-medium text-slate-900 flex items-center gap-2">
                                                <Camera className="h-4 w-4 text-slate-400" />
                                                Bukti (Evidence)
                                            </h3>
                                        </div>
                                        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                                            <div className="border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-white hover:border-[#E65100]/40 transition-colors cursor-pointer group">
                                                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-[#E65100]/10 transition-colors">
                                                    <Camera className="h-5 w-5 text-slate-500 group-hover:text-[#E65100] transition-colors" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Foto Kejadian</span>
                                            </div>
                                            <div className="border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-white hover:border-[#E65100]/40 transition-colors cursor-pointer group">
                                                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-[#E65100]/10 transition-colors">
                                                    <MessageSquare className="h-5 w-5 text-slate-500 group-hover:text-[#E65100] transition-colors" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Riwayat Chat</span>
                                            </div>
                                            <div className="border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-white hover:border-[#E65100]/40 transition-colors cursor-pointer group">
                                                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-[#E65100]/10 transition-colors">
                                                    <MapPin className="h-5 w-5 text-slate-500 group-hover:text-[#E65100] transition-colors" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Log Perjalanan</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline / Activity Log */}
                                    <div className="rounded-lg border border-slate-200">
                                        <div className="p-4 border-b border-slate-200 bg-slate-50">
                                            <h3 className="font-medium text-slate-900 flex items-center gap-2">
                                                <Activity className="h-4 w-4 text-slate-400" />
                                                Timeline Aktivitas
                                            </h3>
                                        </div>
                                        <div className="p-5">
                                            <div className="relative pl-6 space-y-6 border-l-2 border-slate-100 ml-2">
                                                <div className="relative">
                                                    <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white" />
                                                    <div className="text-sm font-medium text-slate-900">{selectedComplaint.date}</div>
                                                    <div className="text-sm text-slate-500">Tiket dibuat oleh {selectedComplaint.from}</div>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[#E65100] ring-4 ring-white" />
                                                    <div className="text-sm font-medium text-slate-900">{selectedComplaint.date.split(" ")[0]} {(parseInt(selectedComplaint.date.split(" ")[1]?.split(":")[0] || "0") + 1).toString().padStart(2, '0')}:00</div>
                                                    <div className="text-sm text-slate-500">Admin mulai investigasi tiket ini</div>
                                                </div>
                                                {selectedComplaint.status === "Selesai" && (
                                                    <div className="relative">
                                                        <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white" />
                                                        <div className="text-sm font-medium text-slate-900">{selectedComplaint.date.split(" ")[0]} {(parseInt(selectedComplaint.date.split(" ")[1]?.split(":")[0] || "0") + 3).toString().padStart(2, '0')}:30</div>
                                                        <div className="text-sm text-slate-500">Keputusan akhir dibuat (Tiket Ditutup)</div>
                                                    </div>
                                                )}
                                                {selectedComplaint.status !== "Selesai" && (
                                                    <div className="relative">
                                                        <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-slate-200 ring-4 ring-white" />
                                                        <div className="text-sm font-medium text-slate-400">Menunggu keputusan akhir...</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resolution */}
                                    <div className="rounded-lg border border-slate-200">
                                        <div className="p-4 border-b border-slate-200 bg-slate-50">
                                            <h3 className="font-medium text-slate-900 flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-slate-400" />
                                                Resolusi
                                            </h3>
                                        </div>
                                        <div className="p-4 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-sm text-slate-600">Tindakan Resolusi</Label>
                                                    <Select>
                                                        <SelectTrigger className="border-slate-200">
                                                            <SelectValue placeholder="Pilih keputusan..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="laporan-valid">Laporan Valid</SelectItem>
                                                            <SelectItem value="laporan-tidak-valid">Laporan Tidak Valid</SelectItem>
                                                            <SelectItem value="peringatan">Peringatan Diberikan</SelectItem>
                                                            <SelectItem value="suspend-sementara">Suspend Sementara</SelectItem>
                                                            <SelectItem value="suspend-permanen">Suspend Permanen</SelectItem>
                                                            <SelectItem value="refund">Refund Diberikan</SelectItem>
                                                            <SelectItem value="tidak-ada-tindakan">Tidak Ada Tindakan</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-sm text-slate-600">Tingkat Keparahan</Label>
                                                    <Select defaultValue={selectedComplaint.priority.toLowerCase()}>
                                                        <SelectTrigger className="border-slate-200">
                                                            <SelectValue placeholder="Atur tingkat keparahan..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="high">Tinggi - Tindakan Segera</SelectItem>
                                                            <SelectItem value="medium">Sedang - Proses Standar</SelectItem>
                                                            <SelectItem value="low">Rendah - Pantau Saja</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm text-slate-600">Catatan Internal</Label>
                                                <Textarea
                                                    placeholder="Tambahkan catatan investigasi atau alasan keputusan..."
                                                    className="min-h-[100px] border-slate-200 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer - Tombol Diperbesar */}
                            <div className="border-t border-slate-200 p-4 flex justify-end gap-3 bg-white">
                                <Button
                                    variant="outline"
                                    className="border-slate-200 h-11 px-6"
                                    onClick={() => setIsReviewOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    className="bg-[#E65100] hover:bg-[#E65100]/90 text-white h-11 px-6"
                                    onClick={() => setIsReviewOpen(false)}
                                >
                                    Kirim Resolusi
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Contact Modal - Layout Rapi */}
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                    <DialogHeader className="p-6 pb-4 bg-white border-b border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-xl border border-orange-200 text-orange-600 shadow-sm">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <DialogTitle className="text-xl font-bold text-slate-900">Informasi Kontak</DialogTitle>
                                <DialogDescription className="text-sm text-slate-500 mt-1">
                                    {selectedComplaint?.[contactTarget === "user" ? "from" : "to"]}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {selectedComplaint && (
                        <div className="p-6 space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group hover:border-orange-300 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                                            <Phone className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Nomor Telepon</span>
                                            <span className="font-mono font-semibold text-slate-800">
                                                {selectedComplaint?.[contactTarget === "user" ? "fromContact" : "toContact"]?.phone}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white hover:shadow-sm text-slate-400 hover:text-orange-600">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group hover:border-orange-300 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                                            <Mail className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Alamat Email</span>
                                            <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                                                {selectedComplaint?.[contactTarget === "user" ? "fromContact" : "toContact"]?.email}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white hover:shadow-sm text-slate-400 hover:text-orange-600">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <Button className="w-full h-11 font-semibold bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-200 rounded-xl" onClick={() => setIsContactOpen(false)}>
                                    <UserCheck className="mr-2 h-5 w-5" /> Tandai Sudah Dihubungi
                                </Button>
                                <Button variant="ghost" className="w-full h-11 font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl" onClick={() => setIsContactOpen(false)}>
                                    Tutup
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Escalate Modal - Layout Rapi */}
            <Dialog open={isEscalateOpen} onOpenChange={setIsEscalateOpen}>
                <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                    <DialogHeader className="p-6 pb-4 bg-white border-b border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 flex items-center justify-center rounded-xl border border-orange-200 shadow-sm">
                                <ShieldAlert className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <DialogTitle className="text-xl font-bold text-slate-900">Eskalasi Tiket</DialogTitle>
                                <DialogDescription className="text-sm text-slate-500 mt-1">
                                    Transfer {selectedComplaint?.id} ke otoritas lebih tinggi
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {selectedComplaint && (
                        <div className="p-6 space-y-5">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Target Eskalasi</Label>
                                    <Select>
                                        <SelectTrigger className="h-11 border-slate-200 rounded-xl bg-white">
                                            <SelectValue placeholder="Pilih otoritas..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="master">Admin Utama</SelectItem>
                                            <SelectItem value="legal">Tim Legal & Kepatuhan</SelectItem>
                                            <SelectItem value="ops">Manajer Operasional</SelectItem>
                                            <SelectItem value="tech">Tim Teknis</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Alasan Eskalasi</Label>
                                    <Textarea
                                        placeholder="Jelaskan mengapa tiket ini memerlukan intervensi otoritas lebih tinggi..."
                                        className="min-h-[100px] border-slate-200 resize-none rounded-xl bg-slate-50/50 focus-visible:ring-orange-500/20"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-2">
                                <Button
                                    className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
                                    onClick={() => setIsEscalateOpen(false)}
                                >
                                    Konfirmasi Eskalasi
                                </Button>
                                <Button variant="ghost" className="w-full h-11 font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl" onClick={() => setIsEscalateOpen(false)}>
                                    Batal
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}