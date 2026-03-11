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
    DialogFooter,
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
    Filter,
    Info,
    History,
    Download,
    TrendingUp,
    AlertTriangle,
    CheckCheck,
    Image as ImageIcon,
    FileText as FileIcon,
    MessageCircle,
    Users,
    AlertOctagon,
    CheckCircle,
    Clock3,
    GaugeCircle,
    MessageCircleQuestion,
    FileWarning,
    UserX,
    Coins,
    Car,
    Map,
    AlertTriangle as AlertTriangleIcon,
    RotateCcw
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@/components/ui/empty"

// ==================== TYPES ====================
interface ContactInfo {
    phone: string;
    email: string;
}

interface TimelineEntry {
    date: string;
    title: string;
    description: string;
    performedBy?: string;
}

interface Complaint {
    id: string;
    type: string;
    subject: string;
    from: string;
    fromRole: string;
    fromContact: ContactInfo;
    to: string;
    toRole: string;
    toContact: ContactInfo;
    status: "Baru" | "Sedang Diinvestigasi" | "Menunggu Konfirmasi" | "Dieskalasi" | "Selesai";
    priority: "Tinggi" | "Sedang" | "Rendah"; // Priority sekarang akan berubah sesuai resolusi
    tripId: string;
    date: string;
    detail: string;
    timeline: TimelineEntry[];
    resolution?: {
        action: string;
        notes: string;
        resolvedAt: string;
        resolvedBy: string;
        finalPriority: "Tinggi" | "Sedang" | "Rendah";
    };
    escalation?: {
        target: string;
        reason: string;
        escalatedAt: string;
        escalatedBy: string;
        status: "PENDING" | "RESOLVED" | "REJECTED";
        response?: string;
    };
}

interface AuditLog {
    id: string;
    ticketId: string;
    action: string;
    performedBy: string;
    timestamp: string;
    details: string;
    date: Date; // Untuk grouping
}

interface EscalatedTicket {
    ticketId: string;
    escalatedTo: string;
    escalatedAt: string;
    reason: string;
    status: "PENDING" | "RESOLVED" | "REJECTED";
    response?: string;
    respondedAt?: string;
}

// ==================== DATA DUMMY ====================
const allComplaintsData = [
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
        status: "Baru" as const,
        priority: "Tinggi" as const,
        tripId: "TRP-9921",
        date: "2024-02-28 14:20",
        detail: "Pengemudi berteriak ketika saya memintanya untuk melambat. Dia mengemudi sangat agresif di area perumahan.",
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
        status: "Sedang Diinvestigasi" as const,
        priority: "Sedang" as const,
        tripId: "TRP-8872",
        date: "2024-02-28 09:15",
        detail: "Penumpang mengatakan harga aplikasi terlalu mahal dan hanya ingin membayar setengah. Dia meninggalkan mobil tanpa membayar penuh.",
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
        status: "Selesai" as const,
        priority: "Tinggi" as const,
        tripId: "TRP-7721",
        date: "2024-02-27 21:00",
        detail: "Pengemudi menggunakan ponsel sambil mengemudi dengan kecepatan tinggi di jalan tol.",
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
        status: "Dieskalasi" as const,
        priority: "Rendah" as const,
        tripId: "N/A",
        date: "2024-02-27 18:45",
        detail: "Aplikasi crash setiap kali saya mencoba membuka riwayat pembayaran.",
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
        status: "Selesai" as const,
        priority: "Sedang" as const,
        tripId: "N/A",
        date: "2024-02-27 10:30",
        detail: "Peta menunjukkan saya di tengah laut padahal saya sebenarnya di Jakarta Selatan.",
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
        status: "Baru" as const,
        priority: "Tinggi" as const,
        tripId: "TRP-5543",
        date: "2024-02-26 16:45",
        detail: "Pengemudi mengambil rute yang lebih panjang dan tarifnya dua kali lipat dari estimasi.",
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
        status: "Sedang Diinvestigasi" as const,
        priority: "Sedang" as const,
        tripId: "TRP-4432",
        date: "2024-02-26 11:20",
        detail: "Penumpang menggores pintu mobil saya dengan tasnya dan menolak untuk mengakuinya.",
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
        status: "Baru" as const,
        priority: "Rendah" as const,
        tripId: "TRP-3321",
        date: "2024-02-25 08:30",
        detail: "Pengemudi datang terlambat 30 menit dan saya ketinggalan pesawat.",
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
        status: "Dieskalasi" as const,
        priority: "Tinggi" as const,
        tripId: "N/A",
        date: "2024-02-25 19:15",
        detail: "Kartu kredit saya didebit dua kali untuk perjalanan yang sama.",
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
        status: "Selesai" as const,
        priority: "Tinggi" as const,
        tripId: "N/A",
        date: "2024-02-24 14:00",
        detail: "Akun pengemudi saya diblokir tanpa penjelasan apapun.",
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
        status: "Sedang Diinvestigasi" as const,
        priority: "Sedang" as const,
        tripId: "TRP-2210",
        date: "2024-02-24 09:45",
        detail: "Saya meninggalkan laptop di mobil dan pengemudi tidak merespons.",
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
        status: "Baru" as const,
        priority: "Rendah" as const,
        tripId: "TRP-1109",
        date: "2024-02-23 17:30",
        detail: "Penumpang memesan tapi tidak hadir dan tidak membatalkan perjalanan.",
    },
];

// Inisialisasi data dengan timeline
const INITIAL_COMPLAINTS: Complaint[] = allComplaintsData.map(c => ({
    ...c,
    timeline: [
        {
            date: c.date,
            title: "Tiket Dibuat",
            description: `Laporan baru diterima dari ${c.from}`,
            performedBy: "Sistem"
        },
        {
            date: (() => {
                const [date, time] = c.date.split(" ");
                const [hours, minutes] = time.split(":");
                const newHours = (parseInt(hours) + 1).toString().padStart(2, '0');
                return `${date} ${newHours}:${minutes}`;
            })(),
            title: "Diterima oleh Admin",
            description: "Tiket masuk ke antrian dan siap untuk diproses",
            performedBy: "Sistem"
        }
    ]
}));

// ==================== HELPER FUNCTIONS ====================
const getPriorityColor = (priority: string | undefined) => {
    if (!priority) return "text-slate-600 bg-slate-50 border-slate-200";

    switch (priority) {
        case "Tinggi": return "text-red-600 bg-red-50 border-red-200"
        case "Sedang": return "text-orange-600 bg-orange-50 border-orange-200"
        case "Rendah": return "text-blue-600 bg-blue-50 border-blue-200"
        default: return "text-slate-600 bg-slate-50 border-slate-200"
    }
}

// Ubah fungsi ini untuk hanya mengembalikan warna teks tanpa background
const getStatusColor = (status: string) => {
    switch (status) {
        case "Baru": return "text-purple-600"
        case "Sedang Diinvestigasi": return "text-blue-600"
        case "Menunggu Konfirmasi": return "text-yellow-600"
        case "Selesai": return "text-green-600"
        case "Dieskalasi": return "text-orange-600"
        default: return "text-slate-600"
    }
}

// Fungsi untuk menentukan prioritas berdasarkan tindakan resolusi
const getPriorityFromAction = (action: string): "Tinggi" | "Sedang" | "Rendah" => {
    const highPriorityActions = [
        "Suspend Permanen",
        "Suspend Sementara",
        "Laporan Valid",
        "Refund Diberikan"
    ];
    const mediumPriorityActions = [
        "Peringatan Diberikan",
        "Kompensasi"
    ];

    if (highPriorityActions.includes(action)) return "Tinggi";
    if (mediumPriorityActions.includes(action)) return "Sedang";
    return "Rendah";
};

// Format tanggal untuk grouping
const formatDateGroup = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return "Hari Ini";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Kemarin";
    } else {
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// ==================== MAIN COMPONENT ====================
export default function ComplaintsPage() {
    // ==================== STATES ====================
    const [complaints, setComplaints] = React.useState<Complaint[]>(INITIAL_COMPLAINTS);
    const [selectedComplaint, setSelectedComplaint] = React.useState<Complaint | null>(null);
    const [isReviewOpen, setIsReviewOpen] = React.useState(false);
    const [isContactOpen, setIsContactOpen] = React.useState(false);
    const [isEscalateOpen, setIsEscalateOpen] = React.useState(false);
    const [isAuditLogOpen, setIsAuditLogOpen] = React.useState(false);
    const [contactTarget, setContactTarget] = React.useState<"user" | "driver">("user");

    // Audit Logs
    const [auditLogs, setAuditLogs] = React.useState<AuditLog[]>([]);

    // Escalated Tickets tracking
    const [escalatedTickets, setEscalatedTickets] = React.useState<EscalatedTicket[]>([]);

    // Form states for Resolution
    const [resolutionAction, setResolutionAction] = React.useState("");
    const [resolutionNotes, setResolutionNotes] = React.useState("");

    // Form states for Escalation
    const [escalateTarget, setEscalateTarget] = React.useState("");
    const [escalateReason, setEscalateReason] = React.useState("");

    // Result panel state
    const [showResult, setShowResult] = React.useState(false);
    const [resultData, setResultData] = React.useState<any>(null);

    // Filter states
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [priorityFilter, setPriorityFilter] = React.useState("all");
    const [typeFilter, setTypeFilter] = React.useState("all");
    const [dateFilter, setDateFilter] = React.useState("all");
    const [searchQuery, setSearchQuery] = React.useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 8;

    // ==================== FILTERING & PAGINATION ====================
    const filteredComplaints = React.useMemo(() => {
        return complaints.filter(complaint => {
            // Search filter
            if (searchQuery && !complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !complaint.from.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !complaint.to.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !complaint.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            // Status filter
            if (statusFilter !== "all" && complaint.status !== statusFilter) return false;

            // Priority filter
            if (priorityFilter !== "all") {
                if (priorityFilter === "high" && complaint.priority !== "Tinggi") return false;
                if (priorityFilter === "medium" && complaint.priority !== "Sedang") return false;
                if (priorityFilter === "low" && complaint.priority !== "Rendah") return false;
            }

            // Type filter
            if (typeFilter !== "all") {
                if (typeFilter === "p2d" && !complaint.type.includes("Penumpang -> Pengemudi")) return false;
                if (typeFilter === "d2p" && !complaint.type.includes("Pengemudi -> Penumpang")) return false;
                if (typeFilter === "system" && !complaint.type.includes("Aplikasi")) return false;
            }

            // Date filter
            if (dateFilter !== "all") {
                const complaintDate = new Date(complaint.date.split(" ")[0]);
                const today = new Date();
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                const monthAgo = new Date(today);
                monthAgo.setMonth(monthAgo.getMonth() - 1);

                if (dateFilter === "today" && complaintDate.toDateString() !== today.toDateString()) return false;
                if (dateFilter === "week" && complaintDate < weekAgo) return false;
                if (dateFilter === "month" && complaintDate < monthAgo) return false;
            }

            return true;
        });
    }, [complaints, searchQuery, statusFilter, priorityFilter, typeFilter, dateFilter]);

    const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

    const currentComplaints = React.useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredComplaints.slice(start, end);
    }, [filteredComplaints, currentPage]);

    // Reset to first page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, priorityFilter, typeFilter, dateFilter]);

    // ==================== HELPER FUNCTIONS ====================
    const addAuditLog = (ticketId: string, action: string, details: string) => {
        const newLog: AuditLog = {
            id: `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            ticketId,
            action,
            performedBy: "Admin Operasional",
            timestamp: new Date().toLocaleString('id-ID'),
            details,
            date: new Date()
        };
        setAuditLogs(prev => [newLog, ...prev]);
    };

    const sendNotifications = (complaint: Complaint, action: string) => {
        toast.success(`Notifikasi dikirim ke ${complaint.from}`, {
            description: `Keputusan: ${action}`
        });

        toast.success(`Notifikasi dikirim ke ${complaint.to}`, {
            description: `Keputusan: ${action}`
        });

        addAuditLog(
            complaint.id,
            "NOTIFICATION_SENT",
            `Notifikasi dikirim ke ${complaint.from} (${complaint.fromRole}) dan ${complaint.to} (${complaint.toRole})`
        );
    };

    const getCurrentTimestamp = () => {
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    // ==================== ACTION HANDLERS ====================
    const openReview = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setResolutionAction(complaint.resolution?.action || "");
        setResolutionNotes(complaint.resolution?.notes || "");
        setIsReviewOpen(true);

        addAuditLog(complaint.id, "VIEW_DETAIL", "Admin membuka detail tiket");
    };

    const openContact = (complaint: Complaint, target: "user" | "driver") => {
        setSelectedComplaint(complaint);
        setContactTarget(target);
        setIsContactOpen(true);

        addAuditLog(
            complaint.id,
            "VIEW_CONTACT",
            `Melihat informasi kontak ${target === "user" ? "pelapor" : "terlapor"}`
        );
    };

    const openEscalate = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setEscalateTarget("");
        setEscalateReason("");
        setIsEscalateOpen(true);

        addAuditLog(complaint.id, "OPEN_ESCALATION", "Membuka form eskalasi");
    };

    const markAsContacted = () => {
        if (!selectedComplaint) return;

        addAuditLog(
            selectedComplaint.id,
            "CONTACT_MADE",
            `Telah menghubungi ${contactTarget === "user" ? selectedComplaint.from : selectedComplaint.to}`
        );

        setIsContactOpen(false);
        toast.success("Kontak berhasil dicatat");
    };

    const handleResolution = () => {
        if (!selectedComplaint || !resolutionAction) {
            toast.error("Pilih tindakan resolusi terlebih dahulu");
            return;
        }

        const timestamp = getCurrentTimestamp();
        const finalPriority = getPriorityFromAction(resolutionAction);

        const newTimelineEntry: TimelineEntry = {
            date: timestamp,
            title: "Keputusan Resolusi Dibuat",
            description: `Tindakan: ${resolutionAction}. Prioritas keputusan: ${finalPriority}. Catatan: ${resolutionNotes || "-"}`,
            performedBy: "Admin Operasional"
        };

        // Update complaints dengan prioritas baru (mengikuti finalPriority)
        const updatedComplaints = complaints.map(c => {
            if (c.id === selectedComplaint.id) {
                return {
                    ...c,
                    status: "Selesai" as const,
                    priority: finalPriority, // PRIORITAS BERUBAH MENGIKUTI FINAL PRIORITY
                    timeline: [...c.timeline, newTimelineEntry],
                    resolution: {
                        action: resolutionAction,
                        notes: resolutionNotes,
                        resolvedAt: timestamp,
                        resolvedBy: "Admin Operasional",
                        finalPriority: finalPriority
                    }
                };
            }
            return c;
        });

        setComplaints(updatedComplaints);

        addAuditLog(
            selectedComplaint.id,
            "RESOLUTION_MADE",
            `Resolusi: ${resolutionAction} (Prioritas: ${finalPriority}), Catatan: ${resolutionNotes}`
        );

        sendNotifications(selectedComplaint, resolutionAction);

        setIsReviewOpen(false);

        setResultData({
            id: selectedComplaint.id,
            action: resolutionAction,
            status: "Selesai",
            priority: finalPriority, // Menampilkan prioritas baru
            finalPriority: finalPriority,
            notes: resolutionNotes,
            timestamp
        });

        setShowResult(true);
    };

    const handleEscalate = () => {
        if (!selectedComplaint || !escalateTarget) {
            toast.error("Pilih target eskalasi terlebih dahulu");
            return;
        }

        const timestamp = getCurrentTimestamp();

        const targetNames: Record<string, string> = {
            "master": "Admin Utama",
            "legal": "Tim Legal & Kepatuhan",
            "ops": "Manajer Operasional",
            "tech": "Tim Teknis"
        };

        const targetName = targetNames[escalateTarget];

        const newTimelineEntry: TimelineEntry = {
            date: timestamp,
            title: "Tiket Dieskalasi",
            description: `Dieskalasi ke ${targetName}. Alasan: ${escalateReason || "Tidak ada alasan spesifik"}`,
            performedBy: "Admin Operasional"
        };

        const updatedComplaints = complaints.map(c => {
            if (c.id === selectedComplaint.id) {
                return {
                    ...c,
                    status: "Dieskalasi" as const,
                    timeline: [...c.timeline, newTimelineEntry],
                    escalation: {
                        target: targetName,
                        reason: escalateReason,
                        escalatedAt: timestamp,
                        escalatedBy: "Admin Operasional",
                        status: "PENDING" as const
                    }
                };
            }
            return c;
        });

        setComplaints(updatedComplaints);

        const newEscalatedTicket: EscalatedTicket = {
            ticketId: selectedComplaint.id,
            escalatedTo: targetName,
            escalatedAt: timestamp,
            reason: escalateReason,
            status: "PENDING"
        };
        setEscalatedTickets(prev => [...prev, newEscalatedTicket]);

        addAuditLog(
            selectedComplaint.id,
            "ESCALATION_MADE",
            `Dieskalasi ke ${targetName}. Alasan: ${escalateReason}`
        );

        setIsEscalateOpen(false);
        toast.success(`Tiket berhasil dieskalasi ke ${targetName}`);
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // ==================== STATISTICS ====================
    const statistics = {
        new: complaints.filter(c => c.status === "Baru").length,
        investigating: complaints.filter(c => c.status === "Sedang Diinvestigasi").length,
        waiting: complaints.filter(c => c.status === "Menunggu Konfirmasi").length,
        escalated: complaints.filter(c => c.status === "Dieskalasi").length,
        resolved: complaints.filter(c => c.status === "Selesai").length,
        highPriority: complaints.filter(c => c.priority === "Tinggi" && c.status !== "Selesai").length
    };

    // Group audit logs by date untuk tampilan dengan pemisah
    const groupedAuditLogs = React.useMemo(() => {
        const groups: { [key: string]: AuditLog[] } = {};

        auditLogs.forEach(log => {
            const dateKey = log.date.toDateString();
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(log);
        });

        // Sort groups by date (descending)
        return Object.entries(groups)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([date, logs]) => ({
                date: new Date(date),
                logs: logs.sort((a, b) => b.date.getTime() - a.date.getTime())
            }));
    }, [auditLogs]);

    // ==================== RENDER ====================
    return (
        <div className="flex flex-col gap-6 p-6 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Keluhan & Sengketa</h1>
                    <p className="text-slate-500 mt-1">Tangani laporan dari pengguna dan pengemudi secara efisien.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="h-10 px-4 text-sm gap-2 border-slate-200 rounded-xl"
                        onClick={() => setIsAuditLogOpen(true)}
                    >
                        <RotateCcw className="h-4 w-4" />
                        <span className="font-semibold text-slate-700">Audit Log</span>
                        {auditLogs.length > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E04D04] text-[10px] font-bold text-white ml-0.5">
                                {auditLogs.length}
                            </span>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        className="h-10 gap-2 border-slate-200 rounded-xl px-5"
                        onClick={() => toast.info("Fitur ekspor akan segera tersedia")}
                    >
                        <Download className="h-4 w-4" />
                        Ekspor
                    </Button>
                </div>
            </div>

            {/* Statistik Cards - Master Admin Style */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                {/* Tiket Baru */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                <CardTitle className="text-xs font-medium">Tiket Baru</CardTitle>
                                <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="px-3 pb-3">
                                <div className="text-xl font-bold">{statistics.new}</div>
                                <p className="text-[10px] text-muted-foreground">Menunggu diproses</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Investigasi */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                <CardTitle className="text-xs font-medium">Investigasi</CardTitle>
                                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="px-3 pb-3">
                                <div className="text-xl font-bold">{statistics.investigating}</div>
                                <p className="text-[10px] text-muted-foreground">Sedang ditindaklanjuti</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Menunggu */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                <CardTitle className="text-xs font-medium">Menunggu</CardTitle>
                                <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="px-3 pb-3">
                                <div className="text-xl font-bold">{statistics.waiting}</div>
                                <p className="text-[10px] text-muted-foreground">Menunggu konfirmasi</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Dieskalasi */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                <CardTitle className="text-xs font-medium">Dieskalasi</CardTitle>
                                <ArrowRightCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="px-3 pb-3">
                                <div className="text-xl font-bold">{statistics.escalated}</div>
                                <p className="text-[10px] text-muted-foreground">Ditangani tim lain</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Selesai */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                <CardTitle className="text-xs font-medium">Selesai</CardTitle>
                                <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="px-3 pb-3">
                                <div className="text-xl font-bold">{statistics.resolved}</div>
                                <p className="text-[10px] text-muted-foreground">Telah diselesaikan</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Prioritas Tinggi */}
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                <CardTitle className="text-xs font-medium">Prioritas Tinggi</CardTitle>
                                <GaugeCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="px-3 pb-3">
                                <div className="text-xl font-bold">{statistics.highPriority}</div>
                                <p className="text-[10px] text-muted-foreground">Perlu ditangani segera</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Filter Tiket</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 pb-5">
                    <div className="relative w-[180px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            type="search"
                            placeholder="Cari tiket..."
                            className="pl-8 h-9 text-sm border-slate-200 focus-visible:ring-[#E65100]/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[160px] h-10 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:ring-1 focus:ring-[#E65100]/20 px-3 text-slate-700">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="Baru">Baru</SelectItem>
                                <SelectItem value="Sedang Diinvestigasi">Investigasi</SelectItem>
                                <SelectItem value="Menunggu Konfirmasi">Menunggu</SelectItem>
                                <SelectItem value="Selesai">Selesai</SelectItem>
                                <SelectItem value="Dieskalasi">Dieskalasi</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Priority Filter */}
                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="w-[160px] h-10 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:ring-1 focus:ring-[#E65100]/20 px-3 text-slate-700">
                                <SelectValue placeholder="Prioritas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Prioritas</SelectItem>
                                <SelectItem value="high">Tinggi</SelectItem>
                                <SelectItem value="medium">Sedang</SelectItem>
                                <SelectItem value="low">Rendah</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Type Filter */}
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[180px] h-10 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:ring-1 focus:ring-[#E65100]/20 px-3 text-slate-700">
                                <SelectValue placeholder="Jenis Laporan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Jenis</SelectItem>
                                <SelectItem value="p2d">Penumpang → Pengemudi</SelectItem>
                                <SelectItem value="d2p">Pengemudi → Penumpang</SelectItem>
                                <SelectItem value="system">Sistem / Aplikasi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-slate-200 bg-slate-50">
                            <TableHead className="font-semibold text-slate-700 py-4">ID Tiket</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Jenis</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Subjek</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Dari / Kepada</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Prioritas</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4 pl-8">Status</TableHead>
                            <TableHead className="text-right font-semibold text-slate-700 py-4 pr-8">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentComplaints.length > 0 ? (
                            currentComplaints.map((complaint) => (
                                <TableRow key={complaint.id} className="border-slate-200 hover:bg-slate-50/50">
                                    <TableCell
                                        className="font-bold text-blue-600 cursor-pointer py-5 hover:underline"
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
                                        <span className="text-sm font-bold text-slate-800">
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
                                    <TableCell className="py-5 pl-8">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(complaint.status)}`}>
                                            {complaint.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right py-5 pr-8">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 px-3 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => openReview(complaint)}
                                            >
                                                <Eye className="h-3.5 w-3.5 mr-1.5" />
                                                Detail
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                                                        <MoreHorizontal className="h-4 w-4 text-slate-600" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56">
                                                    <DropdownMenuLabel className="text-xs text-slate-500">Aksi Cepat</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => openContact(complaint, "user")} className="cursor-pointer">
                                                        <User className="mr-2 h-4 w-4" /> Hubungi Pelapor
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openContact(complaint, "driver")} className="cursor-pointer">
                                                        <User className="mr-2 h-4 w-4" /> Hubungi Terlapor
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-orange-600 font-medium cursor-pointer focus:text-orange-600 focus:bg-orange-50"
                                                        onClick={() => openEscalate(complaint)}
                                                        disabled={complaint.status === "Selesai" || complaint.status === "Dieskalasi"}
                                                    >
                                                        <ArrowRightCircle className="mr-2 h-4 w-4" />
                                                        Eskalasi
                                                    </DropdownMenuItem>
                                                    {complaint.status === "Dieskalasi" && complaint.escalation && (
                                                        <DropdownMenuItem className="text-xs text-slate-500 cursor-default">
                                                            <Info className="mr-2 h-4 w-4" />
                                                            Dieskalasi ke {complaint.escalation.target}
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-12">
                                    <div className="flex flex-col items-center gap-2">
                                        <AlertCircle className="h-12 w-12 text-slate-300" />
                                        <p className="text-slate-500 font-medium">Tidak ada tiket ditemukan</p>
                                        <p className="text-sm text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </div >

            {/* Pagination */}
            {
                filteredComplaints.length > 0 && (
                    <div className="flex items-center justify-between px-2">
                        <div className="text-sm text-slate-500">
                            Menampilkan <span className="font-semibold text-slate-700">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
                            <span className="font-semibold text-slate-700">{Math.min(currentPage * itemsPerPage, filteredComplaints.length)}</span>{' '}
                            dari <span className="font-semibold text-slate-700">{filteredComplaints.length}</span> entri
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

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <Button
                                        key={pageNum}
                                        variant="outline"
                                        className={`h-8 w-8 border-0 font-medium ${currentPage === pageNum
                                            ? "bg-slate-200 text-slate-800"
                                            : "bg-white text-slate-600 hover:bg-slate-50"
                                            }`}
                                        onClick={() => goToPage(pageNum)}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <>
                                    <span className="px-1 text-slate-400">...</span>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 border-0 bg-white text-slate-600 hover:bg-slate-50"
                                        onClick={() => goToPage(totalPages)}
                                    >
                                        {totalPages}
                                    </Button>
                                </>
                            )}

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
                )
            }

            {/* ==================== MODALS ==================== */}

            {/* Detail Modal */}
            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogContent className="max-w-5xl max-h-[85vh] flex flex-col">
                    {selectedComplaint && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-sm font-mono font-bold text-[#E65100] bg-orange-50 px-3 py-1 rounded-full">
                                        {selectedComplaint.id}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                                        Prioritas {selectedComplaint.priority}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                                        {selectedComplaint.status}
                                    </span>
                                </div>
                                <DialogTitle>
                                    {selectedComplaint.subject}
                                </DialogTitle>
                                <DialogDescription className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Dikirim pada {selectedComplaint.date}
                                </DialogDescription>
                            </DialogHeader>

                            {/* Content - bisa di-scroll */}
                            <div className="flex-1 overflow-y-auto -mx-6 px-6">
                                <Tabs defaultValue="detail" className="w-full">
                                    <TabsList className="mb-8 p-6 bg-slate-100 rounded-xl w-full">
                                        <TabsTrigger value="detail" className="px-8 py-5 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#E65100]">
                                            Detail Keluhan
                                        </TabsTrigger>
                                        <TabsTrigger value="timeline" className="px-8 py-5 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#E65100]">
                                            Timeline
                                        </TabsTrigger>
                                        <TabsTrigger value="resolution" className="px-8 py-5 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#E65100]">
                                            Resolusi
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="detail" className="space-y-6">
                                        {/* Parties Involved */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Pelapor */}
                                            <div className="p-8 rounded-2xl border border-slate-200 bg-white">
                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">PELAPOR</div>
                                                <div className="flex items-start gap-4">
                                                    <Avatar className="h-12 w-12 bg-[#E65100]/10">
                                                        <AvatarFallback className="text-[#E65100] font-semibold">
                                                            {selectedComplaint.from.split(' ').map((n: string) => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-slate-900 text-lg">{selectedComplaint.from}</div>
                                                        <div className="text-sm text-slate-500 mb-3">{selectedComplaint.fromRole}</div>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <Phone className="h-4 w-4 text-slate-400" />
                                                                {selectedComplaint.fromContact.phone}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <Mail className="h-4 w-4 text-slate-400" />
                                                                {selectedComplaint.fromContact.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Terlapor */}
                                            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">PIHAK YANG DILAPORKAN</div>
                                                <div className="flex items-start gap-4">
                                                    <Avatar className="h-12 w-12 bg-slate-100">
                                                        <AvatarFallback className="text-slate-600 font-semibold">
                                                            {selectedComplaint.to.split(' ').map((n: string) => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-slate-900 text-lg">{selectedComplaint.to}</div>
                                                        <div className="text-sm text-slate-500 mb-3">{selectedComplaint.toRole}</div>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <Phone className="h-4 w-4 text-slate-400" />
                                                                {selectedComplaint.toContact.phone}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                <Mail className="h-4 w-4 text-slate-400" />
                                                                {selectedComplaint.toContact.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trip Info */}
                                        {selectedComplaint.tripId !== "N/A" && (
                                            <div className="p-5 rounded-xl bg-blue-50 border border-blue-200">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2 bg-white rounded-lg">
                                                            <MapPin className="h-5 w-5 text-blue-500" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-blue-700">Perjalanan Terkait</div>
                                                            <div className="font-mono font-bold text-blue-900">{selectedComplaint.tripId}</div>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-100">
                                                        Lihat Detail Perjalanan
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Complaint Detail */}
                                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                            <div className="p-4 border-b border-slate-200 bg-slate-50">
                                                <h3 className="font-medium text-slate-900 flex items-center gap-2">
                                                    <FileText className="h-5 w-5 text-slate-400" />
                                                    Detail Keluhan
                                                </h3>
                                            </div>
                                            <div className="p-8">
                                                <p className="text-slate-700 leading-relaxed text-base">
                                                    "{selectedComplaint.detail}"
                                                </p>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="timeline" className="space-y-4">
                                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                            <div className="p-4 border-b border-slate-200 bg-slate-50">
                                                <h3 className="font-medium text-slate-900 flex items-center gap-2">
                                                    <Activity className="h-5 w-5 text-slate-400" />
                                                    Timeline Aktivitas
                                                </h3>
                                            </div>
                                            <div className="p-8">
                                                <div className="relative pl-8 space-y-8 border-l-2 border-slate-200 ml-4">
                                                    {selectedComplaint.timeline.map((item, idx) => (
                                                        <div key={idx} className="relative">
                                                            <div className={`absolute -left-[37px] top-1 h-4 w-4 rounded-full ring-4 ring-white ${idx === selectedComplaint.timeline.length - 1
                                                                ? 'bg-[#E65100]'
                                                                : 'bg-slate-300'
                                                                }`} />
                                                            <div className="text-sm font-semibold text-slate-900">{item.date}</div>
                                                            <div className="text-base font-bold text-slate-800 mt-1">{item.title}</div>
                                                            <div className="text-sm text-slate-600 mt-1">{item.description}</div>
                                                            {item.performedBy && (
                                                                <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                                                    <User className="h-3 w-3" />
                                                                    Oleh: {item.performedBy}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {selectedComplaint.status !== "Selesai" && (
                                                        <div className="relative">
                                                            <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-slate-200 ring-4 ring-white animate-pulse" />
                                                            <div className="text-sm font-medium text-slate-400">Proses selanjutnya...</div>
                                                            <div className="text-sm text-slate-400">Menunggu keputusan admin</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="resolution" className="space-y-6">
                                        {/* Resolution Form */}
                                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                            <div className="p-4 border-b border-slate-200 bg-slate-50">
                                                <h3 className="font-medium text-slate-900 flex items-center gap-2">
                                                    <CheckCircle2 className="h-5 w-5 text-slate-400" />
                                                    Form Resolusi
                                                </h3>
                                            </div>
                                            <div className="p-8 space-y-8">
                                                {selectedComplaint.resolution ? (
                                                    // Sudah ada resolusi
                                                    <div className="space-y-4">
                                                        <div className="p-5 bg-green-50 rounded-xl border border-green-200">
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className="p-2 bg-green-100 rounded-full">
                                                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-green-700">Tiket Telah Diselesaikan</h4>
                                                                    <p className="text-sm text-green-600">Pada {selectedComplaint.resolution.resolvedAt}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Tindakan</span>
                                                                    <p className="text-sm font-medium text-green-800 mt-1">{selectedComplaint.resolution.action}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Prioritas Keputusan</span>
                                                                    <p className={`text-sm font-medium mt-1 ${selectedComplaint.resolution.finalPriority === "Tinggi" ? "text-red-600" :
                                                                        selectedComplaint.resolution.finalPriority === "Sedang" ? "text-orange-600" : "text-blue-600"
                                                                        }`}>
                                                                        {selectedComplaint.resolution.finalPriority}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Catatan</span>
                                                                    <p className="text-sm text-green-700 mt-1 italic">"{selectedComplaint.resolution.notes}"</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Diselesaikan Oleh</span>
                                                                    <p className="text-sm text-green-700 mt-1">{selectedComplaint.resolution.resolvedBy}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // Form resolusi
                                                    <>
                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium text-slate-700">Tindakan Resolusi</Label>
                                                            <Select value={resolutionAction} onValueChange={setResolutionAction}>
                                                                <SelectTrigger className="border-slate-200 h-11">
                                                                    <SelectValue placeholder="Pilih keputusan..." />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Laporan Valid">✅ Laporan Valid</SelectItem>
                                                                    <SelectItem value="Laporan Tidak Valid">❌ Laporan Tidak Valid</SelectItem>
                                                                    <SelectItem value="Peringatan Diberikan">⚠️ Peringatan Diberikan</SelectItem>
                                                                    <SelectItem value="Suspend Sementara">🔒 Suspend Sementara</SelectItem>
                                                                    <SelectItem value="Suspend Permanen">🔐 Suspend Permanen</SelectItem>
                                                                    <SelectItem value="Refund Diberikan">💰 Refund Diberikan</SelectItem>
                                                                    <SelectItem value="Kompensasi">🎁 Kompensasi</SelectItem>
                                                                    <SelectItem value="Tidak Ada Tindakan">⏭️ Tidak Ada Tindakan</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {resolutionAction && (
                                                                <p className="text-xs text-slate-500 mt-1">
                                                                    Prioritas keputusan: <span className={`font-semibold ${getPriorityFromAction(resolutionAction) === "Tinggi" ? "text-red-600" :
                                                                        getPriorityFromAction(resolutionAction) === "Sedang" ? "text-orange-600" : "text-blue-600"
                                                                        }`}>
                                                                        {getPriorityFromAction(resolutionAction)}
                                                                    </span>
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium text-slate-700">Catatan Internal</Label>
                                                            <Textarea
                                                                placeholder="Tambahkan catatan investigasi atau alasan keputusan..."
                                                                className="min-h-[120px] border-slate-200 resize-none"
                                                                value={resolutionNotes}
                                                                onChange={(e) => setResolutionNotes(e.target.value)}
                                                            />
                                                            <p className="text-xs text-slate-400">
                                                                Catatan ini hanya untuk internal dan tidak akan dibagikan ke pihak terkait
                                                            </p>
                                                        </div>

                                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                                                            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                                            <div className="text-sm text-blue-700">
                                                                <span className="font-bold">Perhatian:</span> Setelah resolusi dikirim, kedua belah pihak akan menerima notifikasi dan tiket akan ditutup.
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* Footer */}
                            {selectedComplaint.status !== "Selesai" && !selectedComplaint.resolution && (
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsReviewOpen(false)}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        className="bg-[#E65100] hover:bg-[#E65100]/90 text-white"
                                        onClick={handleResolution}
                                        disabled={!resolutionAction}
                                    >
                                        <CheckCheck className="h-5 w-5 mr-2" />
                                        Kirim Resolusi
                                    </Button>
                                </DialogFooter>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Contact Modal */}
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Informasi Kontak</DialogTitle>
                        <DialogDescription>
                            {selectedComplaint?.[contactTarget === "user" ? "from" : "to"]}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedComplaint && (
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group hover:border-blue-300 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                                            <Phone className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Nomor Telepon</span>
                                            <span className="font-mono font-semibold text-slate-800 text-base">
                                                {selectedComplaint?.[contactTarget === "user" ? "fromContact" : "toContact"]?.phone}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-slate-400 hover:text-blue-600"
                                        onClick={() => {
                                            navigator.clipboard.writeText(selectedComplaint?.[contactTarget === "user" ? "fromContact" : "toContact"]?.phone);
                                            toast.success("Nomor telepon disalin");
                                        }}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group hover:border-blue-300 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                                            <Mail className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Alamat Email</span>
                                            <span className="font-semibold text-slate-800 truncate max-w-[180px] text-base">
                                                {selectedComplaint?.[contactTarget === "user" ? "fromContact" : "toContact"]?.email}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-slate-400 hover:text-blue-600"
                                        onClick={() => {
                                            navigator.clipboard.writeText(selectedComplaint?.[contactTarget === "user" ? "fromContact" : "toContact"]?.email);
                                            toast.success("Email disalin");
                                        }}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsContactOpen(false)}>Tutup</Button>
                        <Button
                            className="bg-[#E65100] hover:bg-[#E65100]/90 text-white"
                            onClick={markAsContacted}
                        >
                            <UserCheck className="mr-2 h-5 w-5" />
                            Tandai Sudah Dihubungi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Escalate Modal */}
            <Dialog open={isEscalateOpen} onOpenChange={setIsEscalateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eskalasi Tiket</DialogTitle>
                        <DialogDescription>
                            Transfer {selectedComplaint?.id} ke otoritas lebih tinggi
                        </DialogDescription>
                    </DialogHeader>

                    {selectedComplaint && (
                        <>
                            <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-sm font-medium">Target Eskalasi</Label>
                                            <Select value={escalateTarget} onValueChange={setEscalateTarget}>
                                                <SelectTrigger className="h-12 border-slate-200 rounded-xl bg-white">
                                                    <SelectValue placeholder="Pilih otoritas..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="master">👑 Admin Utama</SelectItem>
                                                    <SelectItem value="legal">⚖️ Tim Legal & Kepatuhan</SelectItem>
                                                    <SelectItem value="ops">📊 Manajer Operasional</SelectItem>
                                                    <SelectItem value="tech">💻 Tim Teknis</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-slate-700">Alasan Eskalasi</Label>
                                            <Textarea
                                                placeholder="Jelaskan mengapa tiket ini memerlukan intervensi otoritas lebih tinggi..."
                                                className="min-h-[120px] border-slate-200 resize-none rounded-xl bg-slate-50/50 focus-visible:ring-orange-500/20"
                                                value={escalateReason}
                                                onChange={(e) => setEscalateReason(e.target.value)}
                                            />
                                        </div>

                                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
                                            <AlertCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                                            <div className="text-sm text-orange-700">
                                                <span className="font-bold">Perhatian:</span> Setelah dieskalasi, tiket akan ditangani oleh tim yang dipilih dan status akan berubah menjadi "Dieskalasi".
                                            </div>
                                        </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEscalateOpen(false)}>Batal</Button>
                                <Button
                                    className="bg-orange-600 hover:bg-orange-700 text-white"
                                    onClick={handleEscalate}
                                    disabled={!escalateTarget}
                                >
                                    <ArrowRightCircle className="mr-2 h-5 w-5" />
                                    Konfirmasi Eskalasi
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Resolution Result Modal */}
            <Dialog open={showResult} onOpenChange={setShowResult}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Resolusi Terkirim!</DialogTitle>
                        <DialogDescription>Tiket {resultData?.id} telah berhasil diselesaikan.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* INFORMASI TIKET */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Informasi Tiket</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs text-slate-500">ID Tiket</span>
                                    <span className="text-xs font-mono font-bold text-[#E65100]">{resultData?.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-slate-500">Status</span>
                                    <Badge className="bg-green-100 text-green-700 border-green-200">
                                        {resultData?.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* PRIORITAS */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <span className="text-xs text-slate-400 block mb-1">Prioritas Tiket (Telah Diperbarui)</span>
                            <span className={`text-lg font-bold ${getPriorityColor(resultData?.priority)}`}>
                                {resultData?.priority}
                            </span>
                        </div>

                        {/* DETAIL RESOLUSI */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                <span className="text-sm text-slate-500">Tindakan Resolusi</span>
                                <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                                    {resultData?.action}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                <span className="text-sm text-slate-500">Waktu</span>
                                <span className="text-sm font-medium text-slate-700">{resultData?.timestamp}</span>
                            </div>

                            {resultData?.notes && (
                                <div className="space-y-2 pt-2">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Catatan Resolusi</span>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700 italic leading-relaxed">
                                        "{resultData.notes}"
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* NOTIFIKASI */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-700 leading-relaxed">
                                <span className="font-bold">Notifikasi telah dikirim</span>
                                <p className="mt-1">Kedua belah pihak telah diberitahu mengenai keputusan ini. Log audit telah diperbarui secara otomatis.</p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowResult(false)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Audit Log Modal */}
            <Dialog open={isAuditLogOpen} onOpenChange={setIsAuditLogOpen}>
                <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Audit Log</DialogTitle>
                        <DialogDescription>
                            Semua aktivitas dan perubahan pada tiket keluhan
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto -mx-6 px-6">
                        {groupedAuditLogs.length > 0 ? (
                            <div className="space-y-6">
                                {groupedAuditLogs.map((group, groupIndex) => (
                                    <div key={group.date.toISOString()} className="space-y-3">
                                        {/* Header Group Tanggal */}
                                        <div className="flex items-center gap-2 sticky top-0 bg-white pt-2 pb-1 z-10">
                                            <div className="h-6 px-3 bg-slate-100 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-bold text-slate-600">
                                                    {formatDateGroup(group.date)}
                                                </span>
                                            </div>
                                            <div className="flex-1 h-px bg-slate-200"></div>
                                        </div>

                                        {/* Logs dalam group */}
                                        <div className="space-y-3 pl-2">
                                            {group.logs.map((log) => (
                                                <div key={log.id} className="bg-white border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-all relative overflow-hidden group">
                                                    <div className="flex gap-5">
                                                        <div className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 text-slate-500 transition-all group-hover:scale-105">
                                                            <Activity className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0 pr-24">
                                                            <div className="flex flex-col gap-0.5">
                                                                <h4 className="font-bold text-slate-900 text-base tracking-tight leading-none">{log.action}</h4>
                                                                <p className="text-sm text-slate-400 font-medium mt-1 uppercase text-[10px] tracking-wider">
                                                                    Tiket: <span className="text-slate-700 font-bold">{log.ticketId}</span>
                                                                </p>
                                                            </div>
                                                            <div className="mt-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100/50">
                                                                <div className="flex gap-2">
                                                                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest leading-relaxed">Detail:</span>
                                                                    <span className="text-xs text-slate-500 leading-relaxed font-semibold">
                                                                        {log.details}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 flex items-center gap-2">
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Executor: {log.performedBy}</span>
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-6 right-6 text-right">
                                                            <p className="text-[11px] font-bold text-slate-300 font-mono whitespace-nowrap">{log.timestamp}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pemisah antar group (kecuali group terakhir) */}
                                        {groupIndex < groupedAuditLogs.length - 1 && (
                                            <div className="relative py-2">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                                                        <Clock className="h-4 w-4 text-slate-400" />
                                                    </div>
                                                </div>
                                                <div className="border-t-2 border-dashed border-slate-200"></div>
                                            </div>
                                        )}
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
                                        Log akan muncul saat ada interaksi dengan tiket
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAuditLogOpen(false)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}