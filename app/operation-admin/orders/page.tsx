"use client"

import React, { useState, useMemo } from "react"

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
    Download: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
    Search: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    MapPin: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    User: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    Truck: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>,
    Eye: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
    RotateCcw: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"/></svg>,
    MoreHorizontal: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
    XCircle: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>,
    AlertTriangle: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
    UserPlus: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>,
    CheckCircle2: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>,
    ChevronLeft: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>,
    ChevronRight: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>,
    Phone: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    CreditCard: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
    CalendarDays: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>,
    Star: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    ShieldAlert: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>,
    X: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    ChevronDown: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>,
    PowerOff: ({ className }: { className?: string } = {}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18.36 6.64A9 9 0 0 1 20.77 15"/><path d="M6.16 6.16a9 9 0 1 0 12.68 12.68"/><path d="M12 2v4"/><path d="m2 2 20 20"/></svg>,
}

// ─── Native UI Components ─────────────────────────────────────────────────────

function Button({ 
    children, 
    onClick, 
    disabled = false, 
    variant = "default", 
    size = "default",
    className = "", 
    style = {},
    type = "button"
}: { 
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: "default" | "outline" | "ghost"
    size?: "default" | "sm" | "xs"
    className?: string
    style?: React.CSSProperties
    type?: "button" | "submit"
}) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
    
    const variants = {
        default: "bg-slate-900 text-white hover:bg-slate-800 border border-transparent",
        outline: "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-600"
    }

    const sizes = {
        default: "h-10 px-4 text-sm",
        sm: "h-8 px-3 text-xs",
        xs: "h-6 px-2 text-[10px]"
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            style={style}
        >
            {children}
        </button>
    )
}

function Input({ 
    value, 
    onChange, 
    placeholder, 
    className = "",
    type = "text",
    id
}: { 
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string
    type?: string
    id?: string
}) {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 ${className}`}
        />
    )
}

function Textarea({ 
    value, 
    onChange, 
    placeholder, 
    className = "",
    rows = 3
}: { 
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    className?: string
    rows?: number
}) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 resize-none ${className}`}
        />
    )
}

function Select({ 
    value, 
    onChange, 
    options, 
    placeholder,
    className = "",
    id
}: { 
    value: string
    onChange: (value: string) => void
    options: { value: string; label: React.ReactNode }[]
    placeholder?: string
    className?: string
    id?: string
}) {
    const [isOpen, setIsOpen] = useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedLabel = options.find(o => o.value === value)?.label || placeholder

    return (
        <div className={`relative ${className}`} ref={ref} id={id}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 flex items-center justify-between hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
                <span className={value ? "text-slate-900" : "text-slate-400"}>{selectedLabel}</span>
                <Icons.ChevronDown />
            </button>
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 py-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 ${value === option.value ? "bg-slate-50 font-medium" : ""}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

function Modal({ 
    isOpen, 
    onClose, 
    children, 
    maxWidth = "md"
}: { 
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    maxWidth?: "sm" | "md" | "lg" | "xl" | "4xl"
}) {
    if (!isOpen) return null

    const maxWidths = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "4xl": "max-w-4xl"
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
                onClick={onClose}
            />
            <div className={`relative w-full ${maxWidths[maxWidth]} bg-white rounded-xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col`}>
                {children}
            </div>
        </div>
    )
}

function DropdownMenu({ 
    trigger, 
    children 
}: { 
    trigger: React.ReactNode
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block" ref={ref}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                    {children}
                </div>
            )}
        </div>
    )
}

function DropdownItem({ 
    children, 
    onClick, 
    className = "",
    disabled = false
}: { 
    children: React.ReactNode
    onClick?: () => void
    className?: string
    disabled?: boolean
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 ${className}`}
        >
            {children}
        </button>
    )
}

function DropdownLabel({ children }: { children: React.ReactNode }) {
    return <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{children}</div>
}

function DropdownSeparator() {
    return <div className="h-px bg-slate-200 my-1" />
}

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

            <div className="rounded-xl border p-4 bg-slate-50">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Audit Log</p>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {order.auditLog.map((log, i) => (
                        <div key={i} className="text-[10px] flex gap-3 bg-white p-2 rounded border border-slate-200">
                            <span className="font-mono text-slate-500 shrink-0 border-r pr-2">{log.time.split(" ")[1]}</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold truncate text-slate-700">{log.by}</p>
                                <p className="font-medium text-slate-900">{log.action}</p>
                            </div>
                        </div>
                    ))}
                    {order.auditLog.length === 0 && <p className="text-[10px] text-center italic text-slate-500 py-2">Tidak ada data</p>}
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
    const [filterDate, setFilterDate] = useState("")
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
                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                    <Icons.Download /> Export CSV
                </Button>
            </div>

            {/* ── Filter Panel & Table Container ── */}
            <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
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
                                className="pl-10 text-sm"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                            />
                        </div>

                        <div className="relative">
                            <Select 
                                value={filterStatus} 
                                onChange={(v) => { setFilterStatus(v); setPage(1) }}
                                options={statusOptions}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <Icons.CalendarDays />
                            </div>
                            <Input
                                type="date"
                                value={filterDate}
                                onChange={(e) => { setFilterDate(e.target.value); setPage(1) }}
                                className="text-sm pl-10"
                            />
                        </div>
                    </div>
                </div>

                {/* ── Table Container ── */}
                <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
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
                                                    onClick={() => deactivateDriver(order.id)}
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

                {/* ── Summary Bar ── */}
                <div className="flex items-center justify-between text-sm text-slate-500 px-1">
                    <span>
                        Menampilkan <span className="font-semibold text-slate-900">{filtered.length}</span> dari{" "}
                        <span className="font-semibold text-slate-900">{orders.length}</span> order
                    </span>
                    <span>Halaman {page} dari {totalPages}</span>
                </div>

                {/* ── Pagination tanpa border ── */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-2">
                        <Button
                            variant="ghost" 
                            size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="h-8 px-3 gap-1 text-xs"
                            style={{ color: page !== 1 ? '#E04D04' : '#94a3b8' }}
                        >
                            <Icons.ChevronLeft className="h-3.5 w-3.5" />
                            <span>Prev</span>
                        </Button>
                        
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                                const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1
                                if (!show) {
                                    const prevShow = p - 1 === 1 || Math.abs((p - 1) - page) <= 1
                                    if (!prevShow) return null
                                    return <span key={`ellipsis-${p}`} className="px-1 text-slate-400">…</span>
                                }
                                return (
                                    <Button 
                                        key={p} 
                                        variant={page === p ? "default" : "ghost"} 
                                        size="sm"
                                        onClick={() => setPage(p)} 
                                        className="h-8 w-8 p-0 text-xs"
                                        style={page === p ? { 
                                            backgroundColor: '#E04D04', 
                                            color: 'white'
                                        } : { 
                                            color: '#64748B'
                                        }}
                                    >
                                        {p}
                                    </Button>
                                )
                            })}
                        </div>

                        <Button
                            variant="ghost" 
                            size="sm"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="h-8 px-3 gap-1 text-xs"
                            style={{ color: page < totalPages ? '#E04D04' : '#94a3b8' }}
                        >
                            <span>Next</span>
                            <Icons.ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════
                    DIALOGS
                ═══════════════════════════════════════════════════════════ */}

                {/* Detail Order */}
                <Modal isOpen={!!detailOrder} onClose={() => setDetailOrder(null)} maxWidth="4xl">
                    <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between bg-white">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2 flex-wrap">
                                <span>Detail Order</span>
                                <span className="font-mono text-sm" style={{ color: '#E04D04' }}>{liveDetail?.id}</span>
                                {liveDetail && <StatusPill status={liveDetail.status} />}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Informasi lengkap transaksi — durasi, breakdown biaya, rating, audit log & rute.
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setDetailOrder(null)} className="h-8 w-8 p-0">
                            <Icons.X />
                        </Button>
                    </div>
                    <div className="p-6 overflow-y-auto max-h-[70vh] bg-white">
                        {liveDetail && <DetailDialog order={liveDetail} onReassign={() => { setReassignTarget(liveDetail); setReassignDriver(""); setDetailOrder(null) }} />}
                    </div>
                </Modal>

                {/* Reassign Driver */}
                <Modal isOpen={!!reassignTarget} onClose={() => setReassignTarget(null)}>
                    <div className="px-5 py-4 border-b border-slate-200">
                        <div className="flex items-center gap-2 text-[#E04D04]">
                            <Icons.UserPlus />
                            <span className="font-semibold text-base">Ganti Driver</span>
                        </div>
                    </div>
                    <div className="px-5 py-4 space-y-4 bg-white">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Pilih driver pengganti untuk order{" "}
                            <span className="font-mono font-semibold" style={{ color: '#E04D04' }}>{reassignTarget?.id}</span>.
                            Driver sebelumnya: <strong className="text-slate-900">{reassignTarget?.driver === "-" ? "Belum ditugaskan" : reassignTarget?.driver}</strong>.
                        </p>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
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
                        <p className="text-xs text-slate-500">
                            Pergantian akan tercatat di audit log dan notifikasi dikirim ke driver baru.
                        </p>
                        <div className="flex gap-2 justify-end pt-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setReassignTarget(null)}
                            >
                                Tutup
                            </Button>
                            <Button
                                size="sm"
                                disabled={!reassignDriver}
                                onClick={applyReassign}
                                style={{ backgroundColor: '#E04D04', color: 'white' }}
                            >
                                <Icons.UserPlus /> Konfirmasi Ganti Driver
                            </Button>
                        </div>
                    </div>
                </Modal>

                {/* Cancel Order */}
                <Modal isOpen={!!cancelTarget} onClose={() => setCancelTarget(null)}>
                    <div className="px-5 py-4 border-b border-slate-200">
                        <div className="flex items-center gap-2 text-red-600">
                            <Icons.XCircle />
                            <span className="font-semibold text-base">Batalkan Order</span>
                        </div>
                    </div>
                    <div className="px-5 py-4 space-y-4 bg-white">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Order <span className="font-mono font-semibold" style={{ color: '#E04D04' }}>{cancelTarget?.id}</span> —{" "}
                            {cancelTarget?.customer} akan dibatalkan. Tindakan ini tercatat di audit log.
                        </p>
                        <div>
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
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
                        <p className="text-xs text-slate-500">Dibatalkan oleh: <strong>Admin</strong></p>
                        <div className="flex gap-2 justify-end pt-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setCancelTarget(null)}
                            >
                                Tutup
                            </Button>
                            <Button
                                size="sm"
                                disabled={!cancelReason.trim()}
                                onClick={applyCancel}
                                style={{ backgroundColor: '#DC2626', color: 'white' }}
                            >
                                <Icons.XCircle /> Konfirmasi Batalkan
                            </Button>
                        </div>
                    </div>
                </Modal>

                {/* Mark as Issue */}
                <Modal isOpen={!!issueTarget} onClose={() => setIssueTarget(null)}>
                    <div className="px-5 py-4 border-b border-slate-200">
                        <div className="flex items-center gap-2 text-orange-600">
                            <Icons.AlertTriangle />
                            <span className="font-semibold text-base">Tandai Bermasalah</span>
                        </div>
                    </div>
                    <div className="px-5 py-4 space-y-4 bg-white">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Order <span className="font-mono font-semibold" style={{ color: '#E04D04' }}>{issueTarget?.id}</span> akan ditandai sebagai <strong>Issue</strong>.
                            Order tidak dibatalkan, namun butuh perhatian admin.
                        </p>
                        <div>
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
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
                        <div className="flex gap-2 justify-end pt-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setIssueTarget(null)}
                            >
                                Tutup
                            </Button>
                            <Button
                                size="sm"
                                disabled={!issueNote.trim()}
                                onClick={applyIssue}
                                style={{ backgroundColor: '#F97316', color: 'white' }}
                            >
                                <Icons.AlertTriangle /> Tandai Bermasalah
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}