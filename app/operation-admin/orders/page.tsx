"use client"

import React, { useState, useMemo } from "react"
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription as EmptyDesc,
} from "@/components/ui/empty"
import {
    DropdownMenu as ShadcnDropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ─── Shadcn Wrappers ────────────────────────────────────────────────────────
function Select({ value, onChange, options, placeholder, className = "", id }: { value: string, onChange: (v: string) => void, options: any[], placeholder?: string, className?: string, id?: string }) {
    return (
        <ShadcnSelect value={value} onValueChange={onChange}>
            <SelectTrigger className={className} id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option: any) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadcnSelect>
    )
}

// Modal wrapper removed — using shadcn Dialog directly

function DropdownMenu({ trigger, children }: any) {
    return (
        <ShadcnDropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer inline-block">{trigger}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {children}
            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    )
}

function DropdownItem({ children, onClick, className = "", disabled, danger }: any) {
    return (
        <DropdownMenuItem onClick={onClick} disabled={disabled} className={`${className} ${danger ? "text-red-600 focus:text-red-600 focus:bg-red-50" : "text-slate-700"} cursor-pointer`}>
            {children}
        </DropdownMenuItem>
    )
}

function DropdownLabel({ children }: any) {
    return <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{children}</DropdownMenuLabel>
}

function DropdownSeparator() {
    return <DropdownMenuSeparator className="bg-slate-200 my-1" />
}


// ─── Types ────────────────────────────────────────────────────────────────────
type StatusType = "pending" | "assigned" | "on-trip" | "selesai" | "batal" | "issue" | "unassigned"

interface TimelineEvent {
    status: string
    label: string
    timestamp: string
    done: boolean
}

interface AuditLogEntry {
    id: string
    time: string
    action: string
    by: string
    reason?: string
    details?: string
    orderId?: string
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
    auditLog: AuditLogEntry[]
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
        auditLog: [{ id: "LOG-001", time: "2024-02-20 10:30", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" }],
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
            { id: "LOG-002", time: "2024-02-20 10:45", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-003", time: "2024-02-20 10:47", action: "Driver ditugaskan: Siti Aminah", by: "System", details: "Penugasan otomatis oleh sistem" },
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
            { id: "LOG-004", time: "2024-02-20 11:00", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-005", time: "2024-02-20 11:02", action: "Driver ditugaskan: Hendra Wijaya", by: "System", details: "Penugasan otomatis oleh sistem" },
            { id: "LOG-006", time: "2024-02-20 11:10", action: "Status diubah ke On-Trip", by: "Driver App", details: "Driver memulai perjalanan" },
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
            { id: "LOG-007", time: "2024-02-20 11:15", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-008", time: "2024-02-20 11:17", action: "Driver ditugaskan: Dewi Lestari", by: "System", details: "Penugasan otomatis oleh sistem" },
            { id: "LOG-009", time: "2024-02-20 11:35", action: "Ditandai bermasalah: Driver sulit dihubungi", by: "Admin", details: "Masalah dilaporkan oleh admin operasional" },
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
            { id: "LOG-010", time: "2024-02-20 09:15", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-011", time: "2024-02-20 09:17", action: "Driver ditugaskan: Rudi Hartono", by: "System", details: "Penugasan otomatis oleh sistem" },
            { id: "LOG-012", time: "2024-02-20 09:25", action: "Status diubah ke On-Trip", by: "Driver App", details: "Driver memulai perjalanan" },
            { id: "LOG-013", time: "2024-02-20 09:48", action: "Order selesai", by: "Driver App", details: "Driver menyelesaikan pengantaran" },
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
            { id: "LOG-014", time: "2024-02-20 08:30", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-015", time: "2024-02-20 08:32", action: "Driver ditugaskan: Eko Wibowo", by: "System", details: "Penugasan otomatis oleh sistem" },
            { id: "LOG-016", time: "2024-02-20 08:45", action: "Order dibatalkan — Alasan: Kesalahan pemesanan", by: "Admin", details: "Admin membatalkan order atas permintaan customer" },
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
            { id: "LOG-017", time: "2024-02-20 08:10", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-018", time: "2024-02-20 08:12", action: "Driver ditugaskan: Agus Triyono", by: "System", details: "Penugasan otomatis oleh sistem" },
            { id: "LOG-019", time: "2024-02-20 08:18", action: "Status diubah ke On-Trip", by: "Driver App", details: "Driver memulai perjalanan" },
            { id: "LOG-020", time: "2024-02-20 08:32", action: "Order selesai", by: "Driver App", details: "Driver menyelesaikan pengantaran" },
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
        auditLog: [{ id: "LOG-021", time: "2024-02-20 12:00", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" }],
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
            { id: "LOG-022", time: "2024-02-19 14:20", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-023", time: "2024-02-19 14:22", action: "Driver ditugaskan: Hendra Wijaya", by: "System", details: "Penugasan otomatis oleh sistem" },
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
            { id: "LOG-024", time: "2024-02-19 09:00", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-025", time: "2024-02-19 09:02", action: "Driver ditugaskan: Rudi Hartono", by: "System", details: "Penugasan otomatis oleh sistem" },
            { id: "LOG-026", time: "2024-02-19 09:10", action: "Status diubah ke On-Trip", by: "Driver App", details: "Driver memulai perjalanan" },
            { id: "LOG-027", time: "2024-02-19 09:35", action: "Order selesai", by: "Driver App", details: "Driver menyelesaikan pengantaran" },
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
            { id: "LOG-028", time: "2024-02-21 14:00", action: "Order dibuat", by: "System", details: "Order baru masuk ke sistem" },
            { id: "LOG-029", time: "2024-02-21 14:05", action: "Driver ditugaskan: Dewi Lestari", by: "Admin (Auto)", details: "Penugasan sistem di area Malang Utara" },
            { id: "LOG-030", time: "2024-02-21 15:00", action: "Order selesai dengan anomali durasi", by: "System", details: "Terdeteksi keterlambatan signifikan (>300%)" },
        ],
    },
]

// ─── Status Config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<StatusType, { label: string; pill: string; dot: string }> = {
    pending: { label: "Pending", pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200", dot: "bg-amber-400" },
    unassigned: { label: "Mencari", pill: "bg-slate-100 text-slate-600 ring-1 ring-slate-300", dot: "bg-slate-400" },
    assigned: { label: "Assigned", pill: "bg-blue-50 text-blue-700 ring-1 ring-blue-200", dot: "bg-blue-500" },
    "on-trip": { label: "On Trip", pill: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200", dot: "bg-indigo-500" },
    selesai: { label: "Selesai", pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dot: "bg-emerald-500" },
    batal: { label: "Batal", pill: "bg-red-50 text-red-700 ring-1 ring-red-200", dot: "bg-red-500" },
    issue: { label: "Issue", pill: "bg-orange-50 text-orange-700 ring-1 ring-orange-200", dot: "bg-orange-500" },
}

const DRIVER_OPTIONS = Array.from(
    new Set(INITIAL_ORDERS.map((o) => o.driver).filter((d) => d !== "-"))
).sort()

const PAGE_SIZE = 7

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons = {
    Download: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>,
    Search: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    MapPin: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
    User: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Truck: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>,
    Eye: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>,
    RotateCcw: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" /><path d="M3 3v9h9" /></svg>,
    MoreHorizontal: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>,
    XCircle: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>,
    AlertTriangle: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>,
    UserPlus: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>,
    CheckCircle2: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>,
    ChevronLeft: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6" /></svg>,
    ChevronRight: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>,
    Phone: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    CreditCard: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>,
    CalendarDays: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>,
    Star: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    ShieldAlert: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>,
    X: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    ChevronDown: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6" /></svg>,
    PowerOff: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18.36 6.64A9 9 0 0 1 20.77 15" /><path d="M6.16 6.16a9 9 0 1 0 12.68 12.68" /><path d="M12 2v4" /><path d="m2 2 20 20" /></svg>,
    History: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" /><path d="M3 3v9h9" /><path d="M12 7v5l3 3" /></svg>,
}

// ─── Native UI Components ─────────────────────────────────────────────────────
// Native components have been replaced by Shadcn UI equivalents above.


// ─── Sub-components ────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: StatusType }) {
    const cfg = STATUS_CONFIG[status]
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.pill}`}>
            <span className={`h-1 w-1 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    )
}

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

    return (
        <div className="space-y-6 pt-1">
            {(order.isAnomaly || order.rating || (order.durasiAktual && order.durasiAktual !== "-")) && (
                <div className="flex flex-wrap gap-4">
                    {order.isAnomaly && (
                        <div className="flex-1 min-w-[300px] border border-red-200 bg-red-50 rounded-xl p-3 flex gap-3 text-red-700">
                            <Icons.ShieldAlert />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider">Terdeteksi Anomali</p>
                                <p className="text-sm mt-0.5">{order.anomalyReason}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-4">
                        {order.rating && (
                            <div className="border rounded-xl p-3 bg-white flex flex-col items-center justify-center min-w-[100px]">
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Rating</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-lg font-bold">{order.rating}</span>
                                    <Icons.Star />
                                </div>
                            </div>
                        )}
                        {order.durasiAktual && (
                            <div className="border rounded-xl p-3 bg-white flex flex-col items-center justify-center min-w-[120px]">
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Durasi Aktual</p>
                                <p className="text-lg font-bold">{order.durasiAktual}</p>
                            </div>
                        )}
                        {order.totalWaktuOrder && (
                            <div className="border rounded-xl p-3 bg-white flex flex-col items-center justify-center min-w-[120px]">
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Waktu</p>
                                <p className="text-lg font-bold text-slate-500">{order.totalWaktuOrder}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border bg-slate-50 p-4 space-y-3">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Customer</p>
                    <div>
                        <p className="text-base font-bold leading-tight">{order.customer}</p>
                        <a href={`tel:${order.customerPhone}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1 font-medium">
                            <Icons.Phone /> {order.customerPhone}
                        </a>
                    </div>
                    {order.customerNote && (
                        <div className="rounded-lg bg-amber-50 border border-amber-200 p-2 text-[11px] leading-snug text-amber-700 font-medium">
                            {order.customerNote}
                        </div>
                    )}
                </div>

                <div className="rounded-xl border bg-slate-50 p-4 space-y-3">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Driver</p>
                    {order.driver === "-" ? (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-slate-500 italic">Belum ditugaskan</p>
                            <Button size="xs" className="bg-[#E04D04] hover:bg-[#E04D04]/90 font-bold text-white w-fit" onClick={onReassign}>Tugaskan</Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-base font-bold leading-tight">{order.driver}</p>
                                    <span className={`text-[8px] rounded-full px-1 py-0.5 font-bold ${order.driverActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{order.driverActive ? "AKTIF" : "OFFLINE"}</span>
                                </div>
                                <a href={`tel:${order.driverPhone}`} className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1 font-medium">
                                    <Icons.Phone /> {order.driverPhone}
                                </a>
                            </div>
                            {!order.driverActive && (
                                <Button size="xs" variant="outline" className="border-[#E04D04]/20 text-[#E04D04] hover:bg-[#E04D04]/5 w-fit" onClick={onReassign}>Ganti Driver</Button>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="rounded-xl border p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Rute</p>
                    <button onClick={() => setShowAlamat(!showAlamat)} className="text-[10px] font-bold text-blue-600 hover:underline">
                        {showAlamat ? "Tutup Alamat" : "Detail Alamat"}
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-1.5 relative py-1">
                        <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-slate-200 border-dashed" />
                        <div className="flex items-center gap-3 relative">
                            <Icons.MapPin className="text-red-500" />
                            <p className="text-sm font-bold truncate">{order.pickup}</p>
                        </div>
                        <div className="flex items-center gap-3 relative">
                            <Icons.MapPin className="text-emerald-500" />
                            <p className="text-sm font-bold truncate">{order.dropoff}</p>
                        </div>
                    </div>
                    <div className="text-right border-l pl-4">
                        <p className="text-sm font-black">{order.dist}</p>
                        <p className="text-[10px] text-blue-600 font-bold uppercase">{order.estimasiWaktu}</p>
                    </div>
                </div>
                {showAlamat && (
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-dashed text-[11px] leading-relaxed font-medium text-slate-500">
                        <p>Pickup: Jl. Raya {order.pickup} No. 123...</p>
                        <p>Dropoff: Kawasan {order.dropoff} Blok B...</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div className="rounded-xl border p-4 bg-slate-50 space-y-3">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Biaya & Pembayaran</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>Tarif Dasar</span>
                                <span className="text-slate-900">{order.biayaBreakdown?.base || order.estimasi}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>Layanan</span>
                                <span className="text-slate-900">{order.biayaBreakdown?.service || "Rp 0"}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t font-black border-dashed">
                                <span>Total</span>
                                <span className="text-emerald-700">{order.totalBiaya}</span>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-dashed flex justify-between items-center text-[10px] font-bold">
                            <span className="text-slate-500 uppercase">{order.metodePembayaran}</span>
                            <span className={`px-2 py-0.5 rounded-md ${order.statusPembayaran === "lunas" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>{order.statusPembayaran === "lunas" ? "LUNAS" : "BELUM"}</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border p-4 space-y-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Timeline</p>
                    <div className="relative pl-4 space-y-3">
                        <div className="absolute left-[19px] top-1.5 bottom-1.5 w-[1px] bg-slate-200" />
                        {order.timeline.map((ev, i) => (
                            <div key={i} className="relative flex gap-3 text-[10px] group">
                                <div className={`mt-1 h-2 w-2 rounded-full z-10 ring-2 ring-white ${ev.done ? "bg-emerald-500" : "bg-slate-200"}`} />
                                <div className="min-w-0">
                                    <p className={`font-bold truncate ${ev.done ? "text-slate-900" : "text-slate-500"}`}>{ev.label}</p>
                                    <p className="text-[9px] text-slate-500 italic font-medium">{ev.timestamp === "-" ? timelineHint(ev.label, order.status) : ev.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-xl border p-5 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Icons.RotateCcw className="h-3 w-3" /> Audit Log
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border">
                        {order.auditLog.length} Entri
                    </span>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                    {order.auditLog.map((log, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 hover:bg-slate-50 transition-all relative overflow-hidden group">
                            <div className="flex gap-3">
                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border border-transparent transition-all group-hover:scale-105 ${log.action.includes('diganti') || log.action.includes('ditugaskan') ? "bg-orange-50 text-[#E04D04]" :
                                    log.action.includes('dinonaktifkan') || log.action.includes('dibatalkan') ? "bg-red-50 text-red-600" :
                                        log.action.includes('bermasalah') ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-600"
                                    }`}>
                                    {log.action.includes('diganti') || log.action.includes('ditugaskan') ? <Icons.UserPlus className="h-4 w-4" /> :
                                        log.action.includes('dinonaktifkan') ? <Icons.PowerOff className="h-4 w-4" /> :
                                            log.action.includes('dibatalkan') ? <Icons.XCircle className="h-4 w-4" /> :
                                                log.action.includes('bermasalah') ? <Icons.AlertTriangle className="h-4 w-4" /> :
                                                    <Icons.RotateCcw className="h-4 w-4" />}
                                </div>
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-slate-900 text-[11px] leading-tight">{log.action}</h4>
                                        <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed italic">
                                            {log.details || log.action}
                                        </p>
                                    </div>
                                    {log.reason && (
                                        <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                                            <span className="text-[9px] font-bold text-slate-900 whitespace-nowrap pt-0.5">Alasan:</span>
                                            <span className="text-[9px] text-slate-600 leading-relaxed font-medium">
                                                {log.reason}
                                            </span>
                                        </div>
                                    )}
                                    <div className="mt-2 flex items-center gap-1.5 opacity-60">
                                        <div className="h-3 w-3 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Icons.User className="h-2 w-2 text-slate-400" />
                                        </div>
                                        <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Oleh: {log.by}</span>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 text-right">
                                    <p className="text-[9px] font-bold text-slate-400 font-mono tracking-tighter">{log.time.split(" ")[1]}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {order.auditLog.length === 0 && (
                        <div className="text-center py-6 bg-white border border-dashed border-slate-200 rounded-xl">
                            <p className="text-[10px] italic text-slate-400">Tidak ada data</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)

    const [search, setSearch] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
    const [page, setPage] = useState(1)

    const [filterDriver] = useState("all")
    const [filterArea] = useState("all")

    const [detailOrder, setDetailOrder] = useState<Order | null>(null)
    const liveDetail = detailOrder ? orders.find(o => o.id === detailOrder.id) ?? detailOrder : null

    const [cancelTarget, setCancelTarget] = useState<Order | null>(null)
    const [cancelReason, setCancelReason] = useState("")
    const [issueTarget, setIssueTarget] = useState<Order | null>(null)
    const [issueNote, setIssueNote] = useState("")
    const [reassignTarget, setReassignTarget] = useState<Order | null>(null)
    const [reassignDriver, setReassignDriver] = useState("")
    const [reassignReason, setReassignReason] = useState("")

    const [deactivateTarget, setDeactivateTarget] = useState<Order | null>(null)
    const [deactivateReason, setDeactivateReason] = useState("")

    const [isGlobalAuditOpen, setIsGlobalAuditOpen] = useState(false)
    const [globalLogs, setGlobalLogs] = useState<AuditLogEntry[]>(() => {
        const all: AuditLogEntry[] = []
        INITIAL_ORDERS.forEach(o => {
            o.auditLog.forEach(log => {
                all.push({ ...log, orderId: o.id })
            })
        })
        return all.sort((a, b) => b.time.localeCompare(a.time)).slice(0, 3)
    })

    const activeFilters = [filterStatus !== "all", dateRange !== undefined].filter(Boolean).length

    const resetFilters = () => {
        setSearch(""); setFilterStatus("all"); setDateRange(undefined); setPage(1)
    }

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return orders.filter((o) => {
            if (q && !o.id.toLowerCase().includes(q) && !o.customer.toLowerCase().includes(q) && !o.driver.toLowerCase().includes(q)) return false
            if (filterStatus !== "all" && o.status !== filterStatus) return false
            if (dateRange?.from) {
                const orderDate = new Date(o.dateOnly)
                const from = new Date(dateRange.from)
                from.setHours(0, 0, 0, 0)
                if (orderDate < from) return false
                if (dateRange.to) {
                    const to = new Date(dateRange.to)
                    to.setHours(23, 59, 59, 999)
                    if (orderDate > to) return false
                }
            }
            if (filterDriver !== "all" && o.driver !== filterDriver) return false
            if (filterArea !== "all" && o.area !== filterArea) return false
            return true
        })
    }, [orders, search, filterStatus, dateRange, filterDriver, filterArea])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const now = () =>
        new Date().toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" }).replace("T", " ").slice(0, 16)

    const applyCancel = () => {
        if (!cancelTarget || !cancelReason.trim()) return
        const t = now()
        const logId = `LOG-${Math.floor(Math.random() * 10000)}`
        const newLog: AuditLogEntry = {
            id: logId,
            time: t,
            action: "Order Dibatalkan",
            by: "Admin",
            reason: cancelReason,
            details: `Order dibatalkan secara manual oleh admin operasional`,
            orderId: cancelTarget.id
        }
        setOrders((prev) => prev.map((o) => o.id !== cancelTarget.id ? o : {
            ...o, status: "batal",
            timeline: [...o.timeline, { status: "batal", label: "Order Dibatalkan", timestamp: t, done: true }],
            auditLog: [newLog, ...o.auditLog],
        }))
        setGlobalLogs(prev => [newLog, ...prev])
        setCancelTarget(null); setCancelReason("")
        toast.success(`Order ${cancelTarget.id} berhasil dibatalkan`)
    }

    const applyIssue = () => {
        if (!issueTarget || !issueNote.trim()) return
        const t = now()
        const logId = `LOG-${Math.floor(Math.random() * 10000)}`
        const newLog: AuditLogEntry = {
            id: logId,
            time: t,
            action: "Ditandai Bermasalah",
            by: "Admin",
            reason: issueNote,
            details: "Order membutuhkan perhatian khusus oleh admin",
            orderId: issueTarget.id
        }
        setOrders((prev) => prev.map((o) => o.id !== issueTarget.id ? o : {
            ...o, status: "issue",
            auditLog: [newLog, ...o.auditLog],
        }))
        setGlobalLogs(prev => [newLog, ...prev])
        setIssueTarget(null); setIssueNote("")
        toast.success(`Order ${issueTarget.id} ditandai bermasalah`)
    }

    const applyReassign = () => {
        if (!reassignTarget || !reassignDriver || !reassignReason.trim()) return
        const t = now()
        const logId = `LOG-${Math.floor(Math.random() * 10000)}`
        const driverPhone = INITIAL_ORDERS.find((o) => o.driver === reassignDriver)?.driverPhone ?? "-"

        const newLog: AuditLogEntry = {
            id: logId,
            time: t,
            action: `Driver diganti ke: ${reassignDriver}`,
            by: "Admin",
            reason: reassignReason,
            details: `Driver diganti dari ${reassignTarget.driver === "-" ? "Mencari" : reassignTarget.driver} ke ${reassignDriver}`,
            orderId: reassignTarget.id
        }

        setOrders((prev) => prev.map((o) => o.id !== reassignTarget.id ? o : {
            ...o,
            driver: reassignDriver, driverPhone, driverActive: true, driverInactiveSince: null,
            status: o.status === "unassigned" ? "assigned" : o.status,
            timeline: o.status === "unassigned"
                ? [...o.timeline, { status: "assigned", label: "Driver Ditugaskan", timestamp: t, done: true }]
                : o.timeline,
            auditLog: [newLog, ...o.auditLog],
        }))
        setGlobalLogs(prev => [newLog, ...prev])
        setReassignTarget(null); setReassignDriver(""); setReassignReason("")
        setDetailOrder(null)
        toast.success(`Driver berhasil diganti untuk order ${reassignTarget.id}`)
    }

    const applyDeactivateDriver = () => {
        if (!deactivateTarget || !deactivateReason.trim()) return
        const t = now()
        const logId = `LOG-${Math.floor(Math.random() * 10000)}`

        const canRelease = ["pending", "assigned", "unassigned"].includes(deactivateTarget.status)
        const newLog: AuditLogEntry = {
            id: logId,
            time: t,
            action: `Driver ${deactivateTarget.driver} dinonaktifkan`,
            by: "Admin",
            reason: deactivateReason,
            details: canRelease ? "Order dikembalikan ke antrian (Mencari Driver)" : "Driver offline namun tetap terikat order on-trip",
            orderId: deactivateTarget.id
        }

        setOrders((prev) => prev.map((o) => {
            if (o.id !== deactivateTarget.id) return o
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
                auditLog: [newLog, ...o.auditLog],
            }
        }))
        setGlobalLogs(prev => [newLog, ...prev])
        setDeactivateTarget(null); setDeactivateReason("")
        toast.success(`Driver ${deactivateTarget.driver} berhasil dinonaktifkan`)
    }

    const canAct = (o: Order) => o.status !== "selesai" && o.status !== "batal"

    const statusOptions = [
        { value: "all", label: "Semua Status" },
        ...(Object.keys(STATUS_CONFIG) as StatusType[]).map((s) => ({
            value: s,
            label: (
                <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${STATUS_CONFIG[s].dot}`} />
                    {STATUS_CONFIG[s].label}
                </span>
            )
        }))
    ]

    return (
        <div className="flex flex-col gap-6 p-6 bg-white min-h-screen">

            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Order Management</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Pusat kendali operasional — monitoring, intervensi, dan pengambilan keputusan berbasis data.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-white h-9 border-slate-200 rounded-xl px-4"
                        onClick={() => setIsGlobalAuditOpen(true)}
                    >
                        <Icons.RotateCcw className="h-4 w-4" />
                        <span className="font-semibold text-slate-700">Audit Log</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E04D04] text-[10px] font-bold text-white ml-0.5">
                            {globalLogs.length}
                        </span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-white h-9 border-slate-200 rounded-xl">
                        <Icons.Download className="h-4 w-4" /> Export CSV
                    </Button>
                </div>
            </div>

            {/* ── Filter Panel & Table Container ── */}
            <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">Filter Order</p>
                        {activeFilters > 0 && (
                            <span className="rounded-full bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
                                {activeFilters}
                            </span>
                        )}
                    </div>
                    {(activeFilters > 0 || search) && (
                        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs gap-1 text-slate-500">
                            <Icons.RotateCcw /> Reset
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="relative sm:col-span-1">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Icons.Search />
                        </div>
                        <Input
                            placeholder="Cari kode order, customer, atau driver…"
                            className="pl-10 text-sm bg-white"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        />
                    </div>

                    <div className="relative">
                        <Select
                            value={filterStatus}
                            onChange={(v) => { setFilterStatus(v); setPage(1) }}
                            options={statusOptions}
                            className="bg-white"
                        />
                    </div>

                    <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={`w-full justify-start text-sm bg-white ${!dateRange ? 'text-muted-foreground' : ''}`}>
                                    <Icons.CalendarDays className="mr-2" />
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
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    defaultMonth={dateRange?.from}
                                    selected={dateRange}
                                    onSelect={(range) => { setDateRange(range); setPage(1) }}
                                    numberOfMonths={2}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            {/* ── Table Container ── */}
            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <table className="w-full table-fixed">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="h-12 text-left text-sm font-semibold text-slate-700 pl-6 w-[100px]">Kode Order</th>
                            <th className="h-12 text-left text-sm font-semibold text-slate-700 w-[120px]">Customer</th>
                            <th className="h-12 text-left text-sm font-semibold text-slate-700 w-[120px]">Driver</th>
                            <th className="h-12 text-left text-sm font-semibold text-slate-700 w-[220px]">Pickup → Dropoff</th>
                            <th className="h-12 text-left text-sm font-semibold text-slate-700 w-[90px]">Status</th>
                            <th className="h-12 text-left text-sm font-semibold text-slate-700 w-[140px]">Waktu Order</th>
                            <th className="h-12 text-left text-sm font-semibold text-slate-700 w-[100px]">Est. Biaya</th>
                            <th className="h-12 text-right text-sm font-semibold text-slate-700 pr-6 w-[90px]">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="py-20 text-center">
                                    <div className="flex flex-col items-center gap-3 text-slate-500">
                                        <Icons.Search />
                                        <p className="text-sm font-medium">Tidak ada order yang sesuai filter</p>
                                        <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1">
                                            <Icons.RotateCcw /> Reset Filter
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ) : paginated.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                <td className="py-4 pl-6 font-mono font-bold text-sm truncate" style={{ color: '#E04D04' }}>{order.id}</td>
                                <td className="py-4 truncate pr-2">
                                    <span className="text-sm font-medium text-slate-900">{order.customer}</span>
                                </td>
                                <td className="py-4 truncate pr-2">
                                    {order.driver === "-"
                                        ? <span className="text-xs text-slate-500 italic">Belum ditugaskan</span>
                                        : <span className="text-sm text-slate-900">{order.driver}</span>
                                    }
                                </td>
                                <td className="py-4 pr-2">
                                    <div className="flex items-center gap-1 text-sm truncate">
                                        <div className="flex items-center gap-1 min-w-0">
                                            <Icons.MapPin className="text-red-500 shrink-0" />
                                            <span className="font-medium text-slate-900 truncate">{order.pickup}</span>
                                        </div>
                                        <span className="text-slate-400 shrink-0">→</span>
                                        <div className="flex items-center gap-1 min-w-0">
                                            <Icons.MapPin className="text-emerald-500 shrink-0" />
                                            <span className="font-medium text-slate-900 truncate">{order.dropoff}</span>
                                        </div>
                                        <span className="text-xs text-slate-500 ml-1 shrink-0">({order.dist})</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex justify-start">
                                        <StatusPill status={order.status} />
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className="text-sm text-slate-500">{order.date}</span>
                                </td>
                                <td className="py-4">
                                    <span className="text-sm font-semibold text-slate-900">{order.estimasi}</span>
                                </td>
                                <td className="py-4 text-right pr-6">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 gap-1.5 text-xs shrink-0"
                                            onClick={() => setDetailOrder(order)}
                                        >
                                            <Icons.Eye /> Detail
                                        </Button>

                                        <DropdownMenu
                                            trigger={
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                                                    <Icons.MoreHorizontal />
                                                </Button>
                                            }
                                        >
                                            <DropdownLabel>Aksi Operasional</DropdownLabel>
                                            <DropdownSeparator />
                                            <DropdownItem
                                                onClick={() => { setReassignTarget(order); setReassignDriver("") }}
                                                disabled={!canAct(order)}
                                            >
                                                <Icons.UserPlus /> Ganti Driver
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => { setDeactivateTarget(order); setDeactivateReason("") }}
                                                disabled={!(canAct(order) && order.driver !== "-" && order.driverActive)}
                                                className="text-red-500"
                                            >
                                                <Icons.PowerOff /> Nonaktifkan Driver
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => { setIssueTarget(order); setIssueNote("") }}
                                                disabled={!canAct(order)}
                                                className="text-orange-600"
                                            >
                                                <Icons.AlertTriangle /> Tandai Bermasalah
                                            </DropdownItem>
                                            <DropdownSeparator />
                                            <DropdownItem
                                                onClick={() => { setCancelTarget(order); setCancelReason("") }}
                                                disabled={!canAct(order)}
                                                className="text-red-600"
                                            >
                                                <Icons.XCircle /> Batalkan Order
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Summary & Pagination Bar ── */}
            <div className="flex items-center justify-between text-sm text-slate-500 px-1 mt-6">
                <p className="font-medium text-slate-400">
                    Menampilkan <span className="font-bold text-slate-700">{filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, filtered.length)}</span> dari <span className="font-bold text-slate-700">{filtered.length}</span> order
                </p>

                {totalPages > 1 && (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className={`transition-all ${page === 1 ? "text-slate-200 cursor-not-allowed" : "text-slate-400 hover:text-slate-900"}`}
                        >
                            <Icons.ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                                const isVisible = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                                const showEllipsisBefore = p === 2 && page > 3;
                                const showEllipsisAfter = p === totalPages - 1 && page < totalPages - 2;

                                if (showEllipsisBefore) return <span key="dots-before" className="px-1 text-slate-300">...</span>;
                                if (showEllipsisAfter) return <span key="dots-after" className="px-1 text-slate-300">...</span>;
                                if (!isVisible && p > 1 && p < totalPages) return null;

                                return (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`h-8 min-w-[32px] px-2 rounded-lg text-sm font-bold transition-all ${page === p
                                            ? "bg-slate-100 text-slate-900"
                                            : "text-slate-400 hover:text-slate-900"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className={`transition-all ${page === totalPages ? "text-slate-200 cursor-not-allowed" : "text-slate-400 hover:text-slate-900"}`}
                        >
                            <Icons.ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* ═══════════════════════════════════════════════════════════
                    DIALOGS (Shadcn Dialog style)
                ═══════════════════════════════════════════════════════════ */}

            {/* Detail Order */}
            <Dialog open={!!detailOrder} onOpenChange={() => setDetailOrder(null)}>
                <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 flex-wrap">
                            Detail Order
                            <span className="font-mono text-sm" style={{ color: '#E04D04' }}>{liveDetail?.id}</span>
                            {liveDetail && <StatusPill status={liveDetail.status} />}
                        </DialogTitle>
                        <DialogDescription>
                            Informasi lengkap transaksi — durasi, breakdown biaya, rating, audit log & rute.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto custom-scrollbar -mx-6 px-6">
                        {liveDetail && <DetailDialog order={liveDetail} onReassign={() => { setReassignTarget(liveDetail); setReassignDriver(""); setDetailOrder(null) }} />}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDetailOrder(null)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reassign Driver */}
            <Dialog open={!!reassignTarget} onOpenChange={() => setReassignTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ganti Driver</DialogTitle>
                        <DialogDescription>
                            Pilih driver pengganti untuk order{" "}
                            <span className="font-mono font-semibold" style={{ color: '#E04D04' }}>{reassignTarget?.id}</span>.
                            Driver sebelumnya: <strong className="text-slate-900">{reassignTarget?.driver === "-" ? "Belum ditugaskan" : reassignTarget?.driver}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Pilih Driver Aktif <span className="text-red-500">*</span>
                            </label>
                            <Select
                                value={reassignDriver}
                                onChange={setReassignDriver}
                                options={DRIVER_OPTIONS
                                    .filter((d) => d !== reassignTarget?.driver)
                                    .map((d) => ({ value: d, label: d }))}
                                placeholder="Pilih driver…"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Alasan Penggantian <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                placeholder="Jelaskan mengapa driver perlu diganti..."
                                className="text-sm"
                                rows={2}
                                value={reassignReason}
                                onChange={(e) => setReassignReason(e.target.value)}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Pergantian akan tercatat di audit log dan notifikasi dikirim ke driver baru.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setReassignTarget(null)}>Batal</Button>
                        <Button
                            disabled={!reassignDriver}
                            onClick={applyReassign}
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            Konfirmasi Ganti Driver
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Cancel Order */}
            <Dialog open={!!cancelTarget} onOpenChange={() => setCancelTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Batalkan Order</DialogTitle>
                        <DialogDescription>
                            Order <span className="font-mono font-semibold" style={{ color: '#E04D04' }}>{cancelTarget?.id}</span> —{" "}
                            {cancelTarget?.customer} akan dibatalkan. Tindakan ini tercatat di audit log.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Alasan Pembatalan <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                placeholder="Contoh: Driver tidak datang, kesalahan pemesanan, gangguan sistem…"
                                className="text-sm"
                                rows={3}
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Dibatalkan oleh: <strong>Admin</strong></p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setCancelTarget(null)}>Batal</Button>
                        <Button
                            disabled={!cancelReason.trim()}
                            onClick={applyCancel}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Konfirmasi Batalkan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Mark as Issue */}
            <Dialog open={!!issueTarget} onOpenChange={() => setIssueTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tandai Bermasalah</DialogTitle>
                        <DialogDescription>
                            Order <span className="font-mono font-semibold" style={{ color: '#E04D04' }}>{issueTarget?.id}</span> akan ditandai sebagai <strong>Issue</strong>.
                            Order tidak dibatalkan, namun butuh perhatian admin.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Catatan Masalah <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                placeholder="Contoh: Driver sulit dihubungi, customer komplain, keterlambatan…"
                                className="text-sm"
                                rows={3}
                                value={issueNote}
                                onChange={(e) => setIssueNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIssueTarget(null)}>Batal</Button>
                        <Button
                            disabled={!issueNote.trim()}
                            onClick={applyIssue}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Tandai Bermasalah
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Deactivate Driver Confirmation */}
            <Dialog open={!!deactivateTarget} onOpenChange={() => setDeactivateTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nonaktifkan Driver</DialogTitle>
                        <DialogDescription>
                            Tindakan ini akan menonaktifkan driver dari armada aktif.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3 text-red-700">
                            <Icons.AlertTriangle className="shrink-0" />
                            <div className="text-xs leading-relaxed">
                                <p className="font-bold uppercase tracking-wider mb-1 text-red-800">Peringatan Penting</p>
                                <p>Tindakan ini akan menonaktifkan driver <strong>{deactivateTarget?.driver}</strong> dari armada aktif.</p>
                                {["pending", "assigned", "unassigned"].includes(deactivateTarget?.status || "") && (
                                    <p className="mt-1 font-bold">Order {deactivateTarget?.id} akan dikembalikan ke antrian pencarian driver.</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Alasan Nonaktifkan <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                placeholder="Contoh: Perilaku tidak pantas, menolak order berkali-kali, tidak aktif terlalu lama..."
                                className="text-sm"
                                rows={3}
                                value={deactivateReason}
                                onChange={(e) => setDeactivateReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeactivateTarget(null)}>Batal</Button>
                        <Button
                            disabled={!deactivateReason.trim()}
                            onClick={applyDeactivateDriver}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Konfirmasi Nonaktifkan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Global Audit Log */}
            <Dialog open={isGlobalAuditOpen} onOpenChange={() => setIsGlobalAuditOpen(false)}>
                <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Audit Log</DialogTitle>
                        <DialogDescription>
                            Catatan semua tindakan administratif
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto custom-scrollbar -mx-6 px-6 space-y-3">
                        {globalLogs.length > 0 ? (
                            globalLogs.map((log) => (
                                <div key={log.id} className="bg-white border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-all relative overflow-hidden">
                                    <div className="flex gap-5">
                                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${log.action.includes('diganti') || log.action.includes('ditugaskan') ? "bg-orange-50/50 text-orange-500" :
                                            log.action.includes('dinonaktifkan') || log.action.includes('dibatalkan') ? "bg-red-50/50 text-red-500" :
                                                log.action.includes('bermasalah') ? "bg-amber-50/50 text-amber-500" : "bg-emerald-50/50 text-emerald-500"
                                            }`}>
                                            {log.action.includes('diganti') || log.action.includes('ditugaskan') ? <Icons.UserPlus className="h-5 w-5" /> :
                                                log.action.includes('dinonaktifkan') ? <Icons.PowerOff className="h-5 w-5" /> :
                                                    log.action.includes('dibatalkan') ? <Icons.XCircle className="h-5 w-5" /> :
                                                        log.action.includes('bermasalah') ? <Icons.AlertTriangle className="h-5 w-5" /> :
                                                            <Icons.RotateCcw className="h-5 w-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-0.5">
                                                    <h4 className="font-bold text-slate-900 text-base tracking-tight leading-none">{log.action}</h4>
                                                    <p className="text-[13px] text-slate-400 font-medium mt-1">
                                                        {log.details || log.action} {log.orderId && <span className="text-slate-300 ml-1">({log.orderId})</span>}
                                                    </p>
                                                </div>
                                                <span className="text-[11px] font-bold text-slate-300 whitespace-nowrap pt-0.5 font-mono">
                                                    {log.time}
                                                </span>
                                            </div>
                                            {log.reason && (
                                                <div className="mt-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100/50">
                                                    <div className="flex gap-2">
                                                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest leading-relaxed">Alasan:</span>
                                                        <span className="text-xs text-slate-500 leading-relaxed font-semibold">{log.reason}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Empty className="h-full bg-muted/30">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Icons.History />
                                    </EmptyMedia>
                                    <EmptyTitle>Belum Ada Aktivitas</EmptyTitle>
                                    <EmptyDesc className="max-w-xs text-pretty">
                                        Catatan tindakan administratif akan muncul di sini.
                                    </EmptyDesc>
                                </EmptyHeader>
                            </Empty>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsGlobalAuditOpen(false)}>Tutup</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
