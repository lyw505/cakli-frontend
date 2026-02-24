"use client"

import React, { useState, useMemo } from "react"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import {
    Download, Search, MapPin, User, Truck, Clock, ArrowRight, Eye,
    RotateCcw, MoreHorizontal, XCircle, AlertTriangle, UserPlus,
    CheckCircle2, Circle, ChevronLeft, ChevronRight, Phone, CreditCard,
    FileText, CalendarDays, Banknote, Copy, PowerOff, Star, ShieldAlert,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type StatusType = "pending" | "assigned" | "on-trip" | "selesai" | "batal" | "issue" | "unassigned"

interface TimelineEvent {
    status: string
    label: string
    timestamp: string
    done: boolean
}

interface Order {
    id: string
    customer: string
    customerPhone: string
    customerNote: string
    driver: string
    driverPhone: string
    driverActive: boolean
    driverInactiveSince: string | null
    status: StatusType
    date: string
    dateOnly: string
    pickup: string
    dropoff: string
    dist: string
    estimasiWaktu: string
    durasiAktual?: string
    totalWaktuOrder?: string
    paymentId?: string
    rating?: number
    isAnomaly?: boolean
    anomalyReason?: string
    area: string
    estimasi: string
    totalBiaya: string
    biayaBreakdown: {
        base: string
        service: string
        discount: string
    }
    metodePembayaran: string
    statusPembayaran: "belum" | "lunas"
    timeline: TimelineEvent[]
    auditLog: { time: string; action: string; by: string }[]
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const INITIAL_ORDERS: Order[] = [
    {
        id: "ORD-001", customer: "Rina Safitri", customerPhone: "0812-3456-7890", customerNote: "Tolong hubungi sebelum sampai",
        driver: "Budi Santoso", driverPhone: "0856-7890-1234", driverActive: false, driverInactiveSince: "2024-02-20 10:15",
        status: "unassigned", date: "2024-02-20 10:30", dateOnly: "2024-02-20",
        pickup: "Sawojajar", dropoff: "Suhat", dist: "4.2 km", estimasiWaktu: "±12 menit",
        area: "Malang Timur", estimasi: "Rp 15.000", totalBiaya: "Belum dihitung",
        biayaBreakdown: { base: "Rp 12.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "Cash", statusPembayaran: "belum",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-20 10:30", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "-", done: false },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "-", done: false },
            { status: "selesai", label: "Order Selesai", timestamp: "-", done: false },
        ],
        auditLog: [{ time: "2024-02-20 10:30", action: "Order dibuat", by: "System" }],
    },
    {
        id: "ORD-002", customer: "Ahmad Jayadi", customerPhone: "0813-2233-4455", customerNote: "",
        driver: "Siti Aminah", driverPhone: "0877-5566-7788", driverActive: true, driverInactiveSince: null,
        status: "assigned", date: "2024-02-20 10:45", dateOnly: "2024-02-20",
        pickup: "Dinoyo", dropoff: "Matos", dist: "2.5 km", estimasiWaktu: "±8 menit", area: "Malang Barat",
        estimasi: "Rp 25.000", totalBiaya: "Belum dihitung",
        biayaBreakdown: { base: "Rp 22.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "QRIS", statusPembayaran: "belum",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-20 10:45", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-20 10:47", done: true },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "-", done: false },
            { status: "selesai", label: "Order Selesai", timestamp: "-", done: false },
        ],
        auditLog: [
            { time: "2024-02-20 10:45", action: "Order dibuat", by: "System" },
            { time: "2024-02-20 10:47", action: "Driver ditugaskan: Siti Aminah", by: "System" },
        ],
    },
    {
        id: "ORD-003", customer: "Dina Rahayu", customerPhone: "0821-9988-7766", customerNote: "Barang fragile",
        driver: "Hendra Wijaya", driverPhone: "0899-1122-3344", driverActive: true, driverInactiveSince: null,
        status: "on-trip", date: "2024-02-20 11:00", dateOnly: "2024-02-20",
        pickup: "Kepanjen", dropoff: "Blimbing", dist: "6.3 km", estimasiWaktu: "±18 menit", area: "Malang Selatan",
        estimasi: "Rp 20.000", totalBiaya: "Belum dihitung",
        biayaBreakdown: { base: "Rp 17.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "Cash", statusPembayaran: "belum",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-20 11:00", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-20 11:02", done: true },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "2024-02-20 11:10", done: true },
            { status: "selesai", label: "Order Selesai", timestamp: "-", done: false },
        ],
        auditLog: [
            { time: "2024-02-20 11:00", action: "Order dibuat", by: "System" },
            { time: "2024-02-20 11:02", action: "Driver ditugaskan: Hendra Wijaya", by: "System" },
            { time: "2024-02-20 11:10", action: "Status diubah ke On-Trip", by: "Driver App" },
        ],
    },
    {
        id: "ORD-004", customer: "Farhan Aziz", customerPhone: "0815-6677-8899", customerNote: "",
        driver: "Dewi Lestari", driverPhone: "0888-4433-2211", driverActive: true, driverInactiveSince: null,
        status: "issue", date: "2024-02-20 11:15", dateOnly: "2024-02-20",
        pickup: "Lowokwaru", dropoff: "Klojen", dist: "3.1 km", estimasiWaktu: "±10 menit", area: "Malang Tengah",
        estimasi: "Rp 30.000", totalBiaya: "Belum dihitung",
        biayaBreakdown: { base: "Rp 27.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "Transfer", statusPembayaran: "belum",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-20 11:15", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-20 11:17", done: true },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "-", done: false },
            { status: "selesai", label: "Order Selesai", timestamp: "-", done: false },
        ],
        auditLog: [
            { time: "2024-02-20 11:15", action: "Order dibuat", by: "System" },
            { time: "2024-02-20 11:17", action: "Driver ditugaskan: Dewi Lestari", by: "System" },
            { time: "2024-02-20 11:35", action: "Ditandai bermasalah: Driver sulit dihubungi", by: "Admin" },
        ],
    },
    {
        id: "ORD-005", customer: "Sarah Maharani", customerPhone: "0819-3344-5566", customerNote: "",
        driver: "Rudi Hartono", driverPhone: "0811-2244-6688", driverActive: true, driverInactiveSince: null,
        status: "selesai", date: "2024-02-20 09:15", dateOnly: "2024-02-20",
        pickup: "Landungsari", dropoff: "Univ. Merdeka", dist: "5.1 km", estimasiWaktu: "±15 menit",
        durasiAktual: "18 menit", totalWaktuOrder: "33 menit", paymentId: "PAY-005112", rating: 4,
        area: "Malang Utara", estimasi: "Rp 12.000", totalBiaya: "Rp 12.000",
        biayaBreakdown: { base: "Rp 10.000", service: "Rp 2.000", discount: "Rp 0" },
        metodePembayaran: "QRIS", statusPembayaran: "lunas",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-20 09:15", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-20 09:17", done: true },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "2024-02-20 09:25", done: true },
            { status: "selesai", label: "Order Selesai", timestamp: "2024-02-20 09:48", done: true },
        ],
        auditLog: [
            { time: "2024-02-20 09:15", action: "Order dibuat", by: "System" },
            { time: "2024-02-20 09:17", action: "Driver ditugaskan: Rudi Hartono", by: "System" },
            { time: "2024-02-20 09:25", action: "Status diubah ke On-Trip", by: "Driver App" },
            { time: "2024-02-20 09:48", action: "Order selesai", by: "Driver App" },
        ],
    },
    {
        id: "ORD-006", customer: "Doni Prasetyo", customerPhone: "0822-7788-9900", customerNote: "",
        driver: "Eko Wibowo", driverPhone: "0833-5544-3322", driverActive: false, driverInactiveSince: null,
        status: "batal", date: "2024-02-20 08:30", dateOnly: "2024-02-20",
        pickup: "Arjosari", dropoff: "Stasiun Kota", dist: "7.8 km", estimasiWaktu: "±22 menit", area: "Malang Utara",
        estimasi: "Rp 0", totalBiaya: "Rp 0",
        biayaBreakdown: { base: "Rp 0", service: "Rp 0", discount: "Rp 0" },
        metodePembayaran: "Cash", statusPembayaran: "belum",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-20 08:30", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-20 08:32", done: true },
            { status: "batal", label: "Order Dibatalkan", timestamp: "2024-02-20 08:45", done: true },
        ],
        auditLog: [
            { time: "2024-02-20 08:30", action: "Order dibuat", by: "System" },
            { time: "2024-02-20 08:32", action: "Driver ditugaskan: Eko Wibowo", by: "System" },
            { time: "2024-02-20 08:45", action: "Order dibatalkan — Alasan: Kesalahan pemesanan", by: "Admin" },
        ],
    },
    {
        id: "ORD-007", customer: "Lina Kurniawati", customerPhone: "0814-6655-4433", customerNote: "",
        driver: "Agus Triyono", driverPhone: "0844-9988-7766", driverActive: true, driverInactiveSince: null,
        status: "selesai", date: "2024-02-20 08:10", dateOnly: "2024-02-20",
        pickup: "Gadang", dropoff: "Klayatan", dist: "1.8 km", estimasiWaktu: "±6 menit",
        durasiAktual: "8 menit", totalWaktuOrder: "22 menit", paymentId: "PAY-007221", rating: 5,
        area: "Malang Selatan", estimasi: "Rp 18.000", totalBiaya: "Rp 18.000",
        biayaBreakdown: { base: "Rp 15.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "Cash", statusPembayaran: "lunas",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-20 08:10", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-20 08:12", done: true },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "2024-02-20 08:18", done: true },
            { status: "selesai", label: "Order Selesai", timestamp: "2024-02-20 08:32", done: true },
        ],
        auditLog: [
            { time: "2024-02-20 08:10", action: "Order dibuat", by: "System" },
            { time: "2024-02-20 08:12", action: "Driver ditugaskan: Agus Triyono", by: "System" },
            { time: "2024-02-20 08:18", action: "Status diubah ke On-Trip", by: "Driver App" },
            { time: "2024-02-20 08:32", action: "Order selesai", by: "Driver App" },
        ],
    },
    {
        id: "ORD-008", customer: "Bayu Nugroho", customerPhone: "0816-1122-3344", customerNote: "Hubungi jika sudah di depan",
        driver: "-", driverPhone: "-", driverActive: false, driverInactiveSince: null,
        status: "pending", date: "2024-02-20 12:00", dateOnly: "2024-02-20",
        pickup: "Singosari", dropoff: "Pakis", dist: "8.0 km", estimasiWaktu: "±23 menit", area: "Malang Utara",
        estimasi: "Rp 22.000", totalBiaya: "Belum dihitung",
        biayaBreakdown: { base: "Rp 19.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "QRIS", statusPembayaran: "belum",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-20 12:00", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "-", done: false },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "-", done: false },
            { status: "selesai", label: "Order Selesai", timestamp: "-", done: false },
        ],
        auditLog: [{ time: "2024-02-20 12:00", action: "Order dibuat", by: "System" }],
    },
    {
        id: "ORD-009", customer: "Mira Oktavia", customerPhone: "0817-9900-1122", customerNote: "",
        driver: "Hendra Wijaya", driverPhone: "0899-1122-3344", driverActive: true, driverInactiveSince: null,
        status: "assigned", date: "2024-02-19 14:20", dateOnly: "2024-02-19",
        pickup: "Dieng", dropoff: "Sawojajar", dist: "3.5 km", estimasiWaktu: "±11 menit", area: "Malang Timur",
        estimasi: "Rp 17.000", totalBiaya: "Belum dihitung",
        biayaBreakdown: { base: "Rp 14.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "Cash", statusPembayaran: "belum",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-19 14:20", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-19 14:22", done: true },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "-", done: false },
            { status: "selesai", label: "Order Selesai", timestamp: "-", done: false },
        ],
        auditLog: [
            { time: "2024-02-19 14:20", action: "Order dibuat", by: "System" },
            { time: "2024-02-19 14:22", action: "Driver ditugaskan: Hendra Wijaya", by: "System" },
        ],
    },
    {
        id: "ORD-010", customer: "Yusuf Hidayat", customerPhone: "0818-3344-5566", customerNote: "",
        driver: "Rudi Hartono", driverPhone: "0811-2244-6688", driverActive: true, driverInactiveSince: null,
        status: "selesai", date: "2024-02-19 09:00", dateOnly: "2024-02-19",
        pickup: "Klojen", dropoff: "Sukun", dist: "4.0 km", estimasiWaktu: "±13 menit",
        durasiAktual: "14 menit", totalWaktuOrder: "35 menit", paymentId: "PAY-9901122", rating: 5,
        area: "Malang Tengah", estimasi: "Rp 13.000", totalBiaya: "Rp 13.000",
        biayaBreakdown: { base: "Rp 10.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "Transfer", statusPembayaran: "lunas",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-19 09:00", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-19 09:02", done: true },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "2024-02-19 09:10", done: true },
            { status: "selesai", label: "Order Selesai", timestamp: "2024-02-19 09:35", done: true },
        ],
        auditLog: [
            { time: "2024-02-19 09:00", action: "Order dibuat", by: "System" },
            { time: "2024-02-19 09:02", action: "Driver ditugaskan: Rudi Hartono", by: "System" },
            { time: "2024-02-19 09:10", action: "Status diubah ke On-Trip", by: "Driver App" },
            { time: "2024-02-19 09:35", action: "Order selesai", by: "Driver App" },
        ],
    },
    {
        id: "ORD-011", customer: "Budi Santoso", customerPhone: "0811-2222-3333", customerNote: "",
        driver: "Dewi Lestari", driverPhone: "0888-4433-2211", driverActive: true, driverInactiveSince: null,
        status: "selesai", date: "2024-02-21 14:00", dateOnly: "2024-02-21",
        pickup: "Karanglo", dropoff: "Singosari", dist: "4.5 km", estimasiWaktu: "±12 menit",
        durasiAktual: "45 menit", totalWaktuOrder: "60 menit", paymentId: "PAY-1122334", rating: 3,
        isAnomaly: true, anomalyReason: "Durasi perjalanan melebihi estimasi signifikan (>300%)",
        area: "Malang Utara", estimasi: "Rp 15.000", totalBiaya: "Rp 15.000",
        biayaBreakdown: { base: "Rp 12.000", service: "Rp 3.000", discount: "Rp 0" },
        metodePembayaran: "QRIS", statusPembayaran: "lunas",
        timeline: [
            { status: "pending", label: "Order Dibuat", timestamp: "2024-02-21 14:00", done: true },
            { status: "assigned", label: "Driver Ditugaskan", timestamp: "2024-02-21 14:05", done: true },
            { status: "on-trip", label: "Perjalanan Dimulai", timestamp: "2024-02-21 14:15", done: true },
            { status: "selesai", label: "Order Selesai", timestamp: "2024-02-21 15:00", done: true },
        ],
        auditLog: [
            { time: "2024-02-21 14:00", action: "Order dibuat", by: "System" },
            { time: "2024-02-21 14:05", action: "Driver ditugaskan: Dewi Lestari", by: "Admin (Auto)" },
            { time: "2024-02-21 15:00", action: "Order selesai dengan anomali durasi", by: "System" },
        ],
    },
]

// ─── Status Config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<StatusType, { label: string; pill: string; dot: string }> = {
    pending: { label: "Pending", pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-700", dot: "bg-amber-400" },
    unassigned: { label: "Menunggu Driver", pill: "bg-slate-100 text-slate-600 ring-1 ring-slate-300 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-600", dot: "bg-slate-400" },
    assigned: { label: "Assigned", pill: "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-700", dot: "bg-blue-500" },
    "on-trip": { label: "On Trip", pill: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:ring-indigo-700", dot: "bg-indigo-500" },
    selesai: { label: "Selesai", pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-700", dot: "bg-emerald-500" },
    batal: { label: "Batal", pill: "bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-700", dot: "bg-red-500" },
    issue: { label: "Issue", pill: "bg-orange-50 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:ring-orange-700", dot: "bg-orange-500" },
}

// used for scalable future features (driver reassign list, area filter)
const DRIVER_OPTIONS = Array.from(
    new Set(INITIAL_ORDERS.map((o) => o.driver).filter((d) => d !== "-"))
).sort()

const PAGE_SIZE = 7

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: StatusType }) {
    const cfg = STATUS_CONFIG[status]
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.pill}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    )
}

// ─── Timeline helper: contextual pending message ───────────────────────────────
function timelineHint(label: string, orderStatus: StatusType): string {
    if (orderStatus === "batal") return "Order dibatalkan"
    if (orderStatus === "issue") return "Tertunda - Menunggu resolusi"

    if (label === "Driver Ditugaskan") return "Mencari driver aktif terdekat…"
    if (label === "Perjalanan Dimulai") return "Menunggu driver berangkat"
    if (label === "Order Selesai") return "Menunggu proses perjalanan"
    return "Menunggu…"
}

// ─── Detail Dialog ─────────────────────────────────────────────────────────────
function DetailDialog({ order, onReassign }: { order: Order; onReassign: () => void }) {
    const [showAlamat, setShowAlamat] = useState(false)
    const copyPhone = (phone: string) => navigator.clipboard?.writeText(phone)

    return (
        <div className="space-y-6 pt-1">
            {/* Top Info: Anomaly, Rating, and Duration */}
            {(order.isAnomaly || order.rating || (order.durasiAktual && order.durasiAktual !== "-")) && (
                <div className="flex flex-wrap gap-4">
                    {order.isAnomaly && (
                        <div className="flex-1 min-w-[300px] border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-xl p-3 flex gap-3 text-red-700 dark:text-red-400">
                            <ShieldAlert className="h-5 w-5 shrink-0" />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider">Terdeteksi Anomali</p>
                                <p className="text-sm mt-0.5">{order.anomalyReason}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-4">
                        {order.rating && (
                            <div className="border rounded-xl p-3 bg-card flex flex-col items-center justify-center min-w-[100px]">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Rating</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-lg font-bold">{order.rating}</span>
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                </div>
                            </div>
                        )}
                        {order.durasiAktual && (
                            <div className="border rounded-xl p-3 bg-card flex flex-col items-center justify-center min-w-[120px]">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Durasi Aktual</p>
                                <p className="text-lg font-bold">{order.durasiAktual}</p>
                            </div>
                        )}
                        {order.totalWaktuOrder && (
                            <div className="border rounded-xl p-3 bg-card flex flex-col items-center justify-center min-w-[120px]">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Total Waktu</p>
                                <p className="text-lg font-bold text-muted-foreground">{order.totalWaktuOrder}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Top Row: Customer & Driver */}
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Customer</p>
                    <div>
                        <p className="text-base font-bold leading-tight">{order.customer}</p>
                        <a href={`tel:${order.customerPhone}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1 font-medium">
                            <Phone className="h-2.5 w-2.5" /> {order.customerPhone}
                        </a>
                    </div>
                    {order.customerNote && (
                        <div className="rounded-lg bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 p-2 text-[11px] leading-snug text-amber-700 dark:text-amber-400 font-medium">
                            {order.customerNote}
                        </div>
                    )}
                </div>

                <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Driver</p>
                    {order.driver === "-" ? (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-muted-foreground italic">Belum ditugaskan</p>
                            <Button size="sm" className="h-7 text-[10px] bg-[#E04D04] hover:bg-[#E04D04]/90 font-bold" onClick={onReassign}>Tugaskan</Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-base font-bold leading-tight">{order.driver}</p>
                                    <span className={`text-[8px] rounded-full px-1 py-0.5 font-bold ${order.driverActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{order.driverActive ? "AKTIF" : "OFFLINE"}</span>
                                </div>
                                <a href={`tel:${order.driverPhone}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1 font-medium">
                                    <Phone className="h-2.5 w-2.5" /> {order.driverPhone}
                                </a>
                            </div>
                            {!order.driverActive && (
                                <Button size="sm" variant="outline" className="h-7 w-full text-[10px] font-bold border-[#E04D04]/20 text-[#E04D04] hover:bg-[#E04D04]/5" onClick={onReassign}>Ganti Driver</Button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Middle Row: Rute & Alamat */}
            <div className="rounded-xl border p-4 space-y-3 bg-card/30">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Rute</p>
                    <button onClick={() => setShowAlamat(!showAlamat)} className="text-[10px] font-bold text-blue-600 hover:underline">
                        {showAlamat ? "Tutup Alamat" : "Detail Alamat"}
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-1.5 relative py-1">
                        <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-border border-dashed" />
                        <div className="flex items-center gap-3 relative">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-red-100 dark:ring-red-900/30" />
                            <p className="text-sm font-bold truncate">{order.pickup}</p>
                        </div>
                        <div className="flex items-center gap-3 relative">
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100 dark:ring-emerald-900/30" />
                            <p className="text-sm font-bold truncate">{order.dropoff}</p>
                        </div>
                    </div>
                    <div className="text-right border-l pl-4">
                        <p className="text-sm font-black">{order.dist}</p>
                        <p className="text-[10px] text-blue-600 font-bold uppercase">{order.estimasiWaktu}</p>
                    </div>
                </div>
                {showAlamat && (
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-dashed text-[11px] leading-relaxed font-medium text-muted-foreground">
                        <p>Pickup: Jl. Raya {order.pickup} No. 123...</p>
                        <p>Dropoff: Kawasan {order.dropoff} Blok B...</p>
                    </div>
                )}
            </div>

            {/* Bottom Grid: Finance, Transaksi & Timeline */}
            <div className="grid grid-cols-2 gap-4">
                {/* Finance & Payment combined */}
                <div className="space-y-4">
                    <div className="rounded-xl border p-4 bg-muted/5 space-y-3">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Biaya & Pembayaran</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                <span>Tarif Dasar</span>
                                <span className="text-foreground">{order.biayaBreakdown?.base || order.estimasi}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                <span>Layanan</span>
                                <span className="text-foreground">{order.biayaBreakdown?.service || "Rp 0"}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t font-black border-dashed">
                                <span>Total</span>
                                <span className="text-emerald-700">{order.totalBiaya}</span>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-dashed flex justify-between items-center text-[10px] font-bold">
                            <span className="text-muted-foreground uppercase">{order.metodePembayaran}</span>
                            <span className={`px-2 py-0.5 rounded-md ${order.statusPembayaran === "lunas" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>{order.statusPembayaran === "lunas" ? "LUNAS" : "BELUM"}</span>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="rounded-xl border p-4 space-y-3">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Timeline</p>
                    <div className="relative pl-4 space-y-3">
                        <div className="absolute left-[19px] top-1.5 bottom-1.5 w-[1px] bg-slate-100" />
                        {order.timeline.map((ev, i) => (
                            <div key={i} className="relative flex gap-3 text-[10px] group">
                                <div className={`mt-1 h-2 w-2 rounded-full z-10 ring-2 ring-white ${ev.done ? "bg-emerald-500" : "bg-slate-200"}`} />
                                <div className="min-w-0">
                                    <p className={`font-bold truncate ${ev.done ? "text-foreground" : "text-muted-foreground"}`}>{ev.label}</p>
                                    <p className="text-[9px] text-muted-foreground italic font-medium">{ev.timestamp === "-" ? timelineHint(ev.label, order.status) : ev.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Full Width Audit Log at the bottom */}
            <div className="rounded-xl border p-4 bg-muted/20">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Audit Log</p>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {order.auditLog.map((log, i) => (
                        <div key={i} className="text-[10px] flex gap-3 bg-card p-2 rounded border border-border/50">
                            <span className="font-mono text-muted-foreground shrink-0 border-r pr-2">{log.time.split(" ")[1]}</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold truncate text-primary/80">{log.by}</p>
                                <p className="font-medium text-foreground">{log.action}</p>
                            </div>
                        </div>
                    ))}
                    {order.auditLog.length === 0 && <p className="text-[10px] text-center italic text-muted-foreground py-2">Tidak ada data</p>}
                </div>
            </div>
        </div>
    )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)

    // Visible filters (simplified — area & driver hidden, kept in data)
    const [search, setSearch] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterDate, setFilterDate] = useState("")
    const [page, setPage] = useState(1)

    // Hidden filters kept for scalability (not rendered in UI yet)
    const [filterDriver] = useState("all")
    const [filterArea] = useState("all")

    // Detail dialog
    const [detailOrder, setDetailOrder] = useState<Order | null>(null)
    // sync detail view when orders state changes (e.g. after reassign/deactivate)
    const liveDetail = detailOrder ? orders.find(o => o.id === detailOrder.id) ?? detailOrder : null

    // Action dialogs
    const [cancelTarget, setCancelTarget] = useState<Order | null>(null)
    const [cancelReason, setCancelReason] = useState("")
    const [issueTarget, setIssueTarget] = useState<Order | null>(null)
    const [issueNote, setIssueNote] = useState("")
    const [reassignTarget, setReassignTarget] = useState<Order | null>(null)
    const [reassignDriver, setReassignDriver] = useState("")

    const activeFilters = [filterStatus !== "all", filterDate !== ""].filter(Boolean).length

    const resetFilters = () => {
        setSearch(""); setFilterStatus("all"); setFilterDate(""); setPage(1)
    }

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return orders.filter((o) => {
            if (q && !o.id.toLowerCase().includes(q) && !o.customer.toLowerCase().includes(q) && !o.driver.toLowerCase().includes(q)) return false
            if (filterStatus !== "all" && o.status !== filterStatus) return false
            if (filterDate !== "" && o.dateOnly !== filterDate) return false
            if (filterDriver !== "all" && o.driver !== filterDriver) return false
            if (filterArea !== "all" && o.area !== filterArea) return false
            return true
        })
    }, [orders, search, filterStatus, filterDate, filterDriver, filterArea])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    // ── Actions ──────────────────────────────────────────────────────────────
    const now = () =>
        new Date().toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }).replace("T", " ").slice(0, 16)

    const applyCancel = () => {
        if (!cancelTarget || !cancelReason.trim()) return
        const t = now()
        setOrders((prev) => prev.map((o) => o.id !== cancelTarget.id ? o : {
            ...o, status: "batal",
            timeline: [...o.timeline, { status: "batal", label: "Order Dibatalkan", timestamp: t, done: true }],
            auditLog: [...o.auditLog, { time: t, action: `Order dibatalkan — Alasan: ${cancelReason}`, by: "Admin" }],
        }))
        setCancelTarget(null); setCancelReason("")
    }

    const applyIssue = () => {
        if (!issueTarget || !issueNote.trim()) return
        const t = now()
        setOrders((prev) => prev.map((o) => o.id !== issueTarget.id ? o : {
            ...o, status: "issue",
            auditLog: [...o.auditLog, { time: t, action: `Ditandai bermasalah: ${issueNote}`, by: "Admin" }],
        }))
        setIssueTarget(null); setIssueNote("")
    }

    const applyReassign = () => {
        if (!reassignTarget || !reassignDriver) return
        const t = now()
        const driverPhone = INITIAL_ORDERS.find((o) => o.driver === reassignDriver)?.driverPhone ?? "-"
        setOrders((prev) => prev.map((o) => o.id !== reassignTarget.id ? o : {
            ...o,
            driver: reassignDriver, driverPhone, driverActive: true, driverInactiveSince: null,
            status: o.status === "unassigned" ? "assigned" : o.status,
            timeline: o.status === "unassigned"
                ? [...o.timeline, { status: "assigned", label: "Driver Ditugaskan", timestamp: t, done: true }]
                : o.timeline,
            auditLog: [...o.auditLog, { time: t, action: `Driver diganti ke: ${reassignDriver}`, by: "Admin" }],
        }))
        setReassignTarget(null); setReassignDriver("")
        setDetailOrder(null)
    }

    // Auto-deactivation: mark driver inactive → release from order if still pending/assigned/unassigned
    const deactivateDriver = (orderId: string) => {
        const t = now()
        setOrders((prev) => prev.map((o) => {
            if (o.id !== orderId) return o
            const canRelease = ["pending", "assigned", "unassigned"].includes(o.status)
            return {
                ...o,
                driverActive: false,
                driverInactiveSince: t,
                driver: canRelease ? "-" : o.driver,
                driverPhone: canRelease ? "-" : o.driverPhone,
                status: canRelease ? "unassigned" : o.status,
                timeline: canRelease
                    ? [...o.timeline, { status: "unassigned", label: "Driver Dinonaktifkan — Order Dikembalikan ke Antrian", timestamp: t, done: true }]
                    : o.timeline,
                auditLog: [...o.auditLog, {
                    time: t,
                    action: `Driver ${o.driver} dinonaktifkan — order dikembalikan ke antrian (Menunggu Driver)`,
                    by: "System",
                }],
            }
        }))
    }

    const canAct = (o: Order) => o.status !== "selesai" && o.status !== "batal"

    return (
        <div className="flex flex-col gap-6 p-6">

            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Pusat kendali operasional — monitoring, intervensi, dan pengambilan keputusan berbasis data.
                    </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                    <Download className="h-4 w-4" /> Export CSV
                </Button>
            </div>

            {/* ── Filter Panel & Table Container with proper spacing ── */}
            <div className="space-y-2">
                <div className="rounded-xl border bg-card shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold">Filter Order</p>
                            {activeFilters > 0 && (
                                <span className="rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 leading-none">
                                    {activeFilters}
                                </span>
                            )}
                        </div>
                        {(activeFilters > 0 || search) && (
                            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs gap-1 text-muted-foreground">
                                <RotateCcw className="h-3 w-3" /> Reset
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Search */}
                        <div className="relative sm:col-span-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                            <Input
                                id="order-search"
                                placeholder="Cari kode order, customer, atau driver…"
                                className="pl-9 text-sm"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                            />
                        </div>

                        {/* Status */}
                        <div className="relative">
                            <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setPage(1) }}>
                                <SelectTrigger id="filter-status" className="text-sm">
                                    <SelectValue placeholder="Semua Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    {(Object.keys(STATUS_CONFIG) as StatusType[]).map((s) => (
                                        <SelectItem key={s} value={s}>
                                            <span className="flex items-center gap-2">
                                                <span className={`h-2 w-2 rounded-full ${STATUS_CONFIG[s].dot}`} />
                                                {STATUS_CONFIG[s].label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tanggal */}
                        <div className="relative">
                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none z-10" />
                            <Input
                                id="filter-date"
                                type="date"
                                value={filterDate}
                                onChange={(e) => { setFilterDate(e.target.value); setPage(1) }}
                                className="text-sm pl-9"
                            />
                        </div>
                    </div>
                </div>

                {/* ── Table Container ── */}
                <div className="rounded-xl border shadow-sm overflow-hidden mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead className="font-semibold w-[110px]">Kode Order</TableHead>
                                <TableHead className="font-semibold">Customer</TableHead>
                                <TableHead className="font-semibold">Driver</TableHead>
                                <TableHead className="font-semibold">Pickup → Dropoff</TableHead>
                                <TableHead className="font-semibold w-[110px]">Status</TableHead>
                                <TableHead className="font-semibold w-[140px]">Waktu Order</TableHead>
                                <TableHead className="font-semibold w-[120px]">Est. Biaya</TableHead>
                                <TableHead className="font-semibold text-right pr-4 w-[120px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                            <Search className="h-10 w-10 opacity-20" />
                                            <p className="text-sm font-medium">Tidak ada order yang sesuai filter</p>
                                            <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1">
                                                <RotateCcw className="h-3.5 w-3.5" /> Reset Filter
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : paginated.map((order) => (
                                <TableRow key={order.id} className="hover:bg-muted/20 transition-colors group">

                                    {/* Kode */}
                                    <TableCell className="font-mono font-bold text-sm text-primary">{order.id}</TableCell>

                                    {/* Customer */}
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <User className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                            <span className="text-sm font-medium">{order.customer}</span>
                                        </div>
                                    </TableCell>

                                    {/* Driver */}
                                    <TableCell>
                                        {order.driver === "-"
                                            ? <span className="text-xs text-muted-foreground italic">Belum ditugaskan</span>
                                            : (
                                                <div className="flex items-center gap-1.5 text-sm">
                                                    <Truck className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                                    <span>{order.driver}</span>
                                                </div>
                                            )
                                        }
                                    </TableCell>

                                    {/* Route */}
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm flex-wrap">
                                            <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                                            <span className="font-medium">{order.pickup}</span>
                                            <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                                            <MapPin className="h-3 w-3 text-emerald-500 shrink-0" />
                                            <span className="font-medium">{order.dropoff}</span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">{order.dist}</p>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell><StatusPill status={order.status} /></TableCell>

                                    {/* Waktu */}
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Clock className="h-3.5 w-3.5 shrink-0" />
                                            {order.date}
                                        </div>
                                    </TableCell>

                                    {/* Estimasi */}
                                    <TableCell>
                                        <span className="text-sm font-semibold">{order.estimasi}</span>
                                    </TableCell>

                                    {/* Aksi */}
                                    <TableCell className="text-right pr-4">
                                        <div className="flex items-center justify-end gap-1">
                                            {/* View Detail Button */}
                                            <Button
                                                id={`btn-detail-${order.id}`}
                                                variant="outline"
                                                size="sm"
                                                className="h-8 gap-1.5 text-xs"
                                                onClick={() => setDetailOrder(order)}
                                            >
                                                <Eye className="h-3.5 w-3.5" /> Detail
                                            </Button>

                                            {/* Action Dropdown — always shown for every row */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56">
                                                    <DropdownMenuLabel>Aksi Operasional</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => { setReassignTarget(order); setReassignDriver("") }}
                                                        disabled={!canAct(order)}
                                                    >
                                                        <UserPlus className="mr-2 h-4 w-4 text-[#E04D04]" /> Ganti Driver
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => deactivateDriver(order.id)}
                                                        disabled={!(canAct(order) && order.driver !== "-" && order.driverActive)}
                                                        className="text-red-500 focus:text-red-500"
                                                    >
                                                        <PowerOff className="mr-2 h-4 w-4" /> Nonaktifkan Driver
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => { setIssueTarget(order); setIssueNote("") }}
                                                        disabled={!canAct(order)}
                                                        className="text-orange-600 focus:text-orange-600"
                                                    >
                                                        <AlertTriangle className="mr-2 h-4 w-4" /> Tandai Bermasalah
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => { setCancelTarget(order); setCancelReason("") }}
                                                        disabled={!canAct(order)}
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        <XCircle className="mr-2 h-4 w-4" /> Batalkan Order
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

                {/* ── Summary Bar (below table) ── */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                        Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari{" "}
                        <span className="font-semibold text-foreground">{orders.length}</span> order
                    </span>
                    <span>Halaman {page} dari {totalPages}</span>
                </div>
                {/* ── Pagination (centered, numbered, slightly bigger) ── */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1.5">
                        <Button
                            variant="outline" size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="h-9 w-9 p-0"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                            const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1
                            if (!show) {
                                const prevShow = p - 1 === 1 || Math.abs((p - 1) - page) <= 1
                                if (!prevShow) return null
                                return <span key={`ellipsis-${p}`} className="px-1 text-muted-foreground">…</span>
                            }
                            return (
                                <Button key={p} variant={page === p ? "default" : "outline"} size="sm"
                                    onClick={() => setPage(p)} className="h-9 w-9 p-0 text-sm">
                                    {p}
                                </Button>
                            )
                        })}
                        <Button
                            variant="outline" size="sm"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="h-9 w-9 p-0"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* ══════════════════════════════════════════════════════════
                DIALOGS
            ══════════════════════════════════════════════════════════ */}

                {/* Detail Order — uses liveDetail so it updates if state changes */}
                <Dialog open={!!detailOrder} onOpenChange={(o) => { if (!o) setDetailOrder(null) }}>
                    <DialogContent className="sm:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <DialogHeader className="mb-2">
                            <DialogTitle className="flex items-center gap-2 flex-wrap">
                                <span>Detail Order</span>
                                <span className="font-mono text-muted-foreground text-sm">{liveDetail?.id}</span>
                                {liveDetail && <StatusPill status={liveDetail.status} />}
                            </DialogTitle>
                            <DialogDescription>
                                Informasi lengkap transaksi — durasi, breakdown biaya, rating, audit log &amp; rute.
                            </DialogDescription>
                        </DialogHeader>
                        {liveDetail && <DetailDialog order={liveDetail} onReassign={() => { setReassignTarget(liveDetail); setReassignDriver(""); setDetailOrder(null) }} />}
                    </DialogContent>
                </Dialog>

                {/* Cancel Order */}
                <Dialog open={!!cancelTarget} onOpenChange={(o) => { if (!o) setCancelTarget(null) }}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-red-600">
                                <XCircle className="h-5 w-5" /> Batalkan Order
                            </DialogTitle>
                            <DialogDescription>
                                Order <span className="font-mono font-semibold">{cancelTarget?.id}</span> —{" "}
                                {cancelTarget?.customer} akan dibatalkan. Tindakan ini tercatat di audit log.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 pt-1">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    Alasan Pembatalan <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    placeholder="Contoh: Driver tidak datang, kesalahan pemesanan, gangguan sistem…"
                                    className="mt-1.5 text-sm"
                                    rows={3}
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Dibatalkan oleh: <strong>Admin</strong></p>
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="sm" onClick={() => setCancelTarget(null)}>Tutup</Button>
                                <Button
                                    variant="destructive" size="sm"
                                    disabled={!cancelReason.trim()}
                                    onClick={applyCancel}
                                >
                                    <XCircle className="mr-2 h-4 w-4" /> Konfirmasi Batalkan
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Mark as Issue */}
                <Dialog open={!!issueTarget} onOpenChange={(o) => { if (!o) setIssueTarget(null) }}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-orange-600">
                                <AlertTriangle className="h-5 w-5" /> Tandai Bermasalah
                            </DialogTitle>
                            <DialogDescription>
                                Order <span className="font-mono font-semibold">{issueTarget?.id}</span> akan ditandai sebagai <strong>Issue</strong>.
                                Order tidak dibatalkan, namun butuh perhatian admin.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 pt-1">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    Catatan Masalah <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    placeholder="Contoh: Driver sulit dihubungi, customer komplain, keterlambatan…"
                                    className="mt-1.5 text-sm"
                                    rows={3}
                                    value={issueNote}
                                    onChange={(e) => setIssueNote(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="sm" onClick={() => setIssueTarget(null)}>Tutup</Button>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white" size="sm"
                                    disabled={!issueNote.trim()}
                                    onClick={applyIssue}
                                >
                                    <AlertTriangle className="mr-2 h-4 w-4" /> Tandai Bermasalah
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Reassign Driver */}
                <Dialog open={!!reassignTarget} onOpenChange={(o) => { if (!o) setReassignTarget(null) }}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-[#E04D04]">
                                <UserPlus className="h-5 w-5" /> Ganti Driver
                            </DialogTitle>
                            <DialogDescription>
                                Pilih driver pengganti untuk order{" "}
                                <span className="font-mono font-semibold">{reassignTarget?.id}</span>.
                                Driver sebelumnya: <strong>{reassignTarget?.driver === "-" ? "Belum ditugaskan" : reassignTarget?.driver}</strong>.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 pt-1">
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    Pilih Driver Aktif <span className="text-red-500">*</span>
                                </label>
                                <Select value={reassignDriver} onValueChange={setReassignDriver}>
                                    <SelectTrigger className="mt-1.5 text-sm">
                                        <SelectValue placeholder="Pilih driver…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DRIVER_OPTIONS
                                            .filter((d) => d !== reassignTarget?.driver)
                                            .map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Pergantian akan tercatat di audit log dan notifikasi dikirim ke driver baru.
                            </p>
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" size="sm" onClick={() => setReassignTarget(null)}>Tutup</Button>
                                <Button
                                    className="bg-[#E04D04] hover:bg-[#E04D04]/90 text-white" size="sm"
                                    disabled={!reassignDriver}
                                    onClick={applyReassign}
                                >
                                    <UserPlus className="mr-2 h-4 w-4" /> Konfirmasi Ganti Driver
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}
