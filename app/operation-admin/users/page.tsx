"use client"

import React, { useState, useMemo, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────────────

type AccountStatus = "Active" | "Suspended" | "Under Review"

interface OrderRecord {
    id: string
    date: string
    status: "selesai" | "batal" | "on-trip" | "menunggu driver" | "assigned" | "issue"
    amount: string
}

interface ReportRecord {
    reportedBy: string
    type: string
    description: string
    date: string
    status: "Resolved" | "Investigating" | "Pending"
}

interface AuditEntry {
    id: string
    timestamp: string
    userId: string
    userName: string
    action: string
    before: string
    after: string
    reason: string
    admin: string
}

interface StatusHistory {
    date: string
    action: string
    reason: string
    admin: string
    duration?: string
}

interface UserData {
    id: string
    name: string
    email: string
    phone: string
    status: AccountStatus
    joinedDate: string
    totalOrders: number
    totalCancel: number
    cancelRate: number
    totalReports: number
    rating: number
    orderHistory: OrderRecord[]
    reportHistory: ReportRecord[]
    statusHistory: StatusHistory[]
    auditLog: AuditEntry[]
}

// ─── Mock Data ──────────────────────────────────────────────────────────

const INITIAL_USERS: UserData[] = [
    {
        id: "USR-001",
        name: "Rina Safitri",
        email: "rina.safitri@example.com",
        phone: "0812-3456-7890",
        status: "Active",
        joinedDate: "2023-01-15",
        totalOrders: 48,
        totalCancel: 2,
        cancelRate: 4.1,
        totalReports: 1,
        rating: 4.8,
        orderHistory: [
            { id: "ORD-9901", date: "2024-02-20 10:30", status: "selesai", amount: "Rp 15.000" },
            { id: "ORD-9842", date: "2024-02-18 14:20", status: "selesai", amount: "Rp 22.000" },
            { id: "ORD-9711", date: "2024-02-15 09:15", status: "batal", amount: "Rp 0" },
        ],
        reportHistory: [
            { reportedBy: "Driver Agus", type: "Wrong Pinpoint", description: "Pickup point does not match", date: "2024-01-10", status: "Resolved" }
        ],
        statusHistory: [
            { date: "2024-02-01", action: "Reactivation", reason: "Finished 3-day suspension", admin: "System" },
            { date: "2024-01-29", action: "Suspension", reason: "Too many cancelations in 1 hour", admin: "Admin B", duration: "3 Days" },
        ],
        auditLog: [
            { id: "LOG-001", timestamp: "2024-02-01 00:00", userId: "USR-001", userName: "Rina Safitri", action: "Reactivation", before: "Suspended", after: "Active", reason: "Suspension ended", admin: "System" },
            { id: "LOG-002", timestamp: "2024-01-29 15:30", userId: "USR-001", userName: "Rina Safitri", action: "Suspension", before: "Active", after: "Suspended", reason: "Abusive canceling", admin: "Admin B" },
        ]
    },
    {
        id: "USR-002",
        name: "Budi Santoso",
        email: "budi.s@test.com",
        phone: "0856-7890-1122",
        status: "Suspended",
        joinedDate: "2023-05-20",
        totalOrders: 150,
        totalCancel: 60,
        cancelRate: 40.0,
        totalReports: 8,
        rating: 3.2,
        orderHistory: [
            { id: "ORD-8821", date: "2024-02-19 12:00", status: "batal", amount: "Rp 0" },
            { id: "ORD-8815", date: "2024-02-19 11:45", status: "batal", amount: "Rp 0" },
            { id: "ORD-8810", date: "2024-02-19 11:30", status: "batal", amount: "Rp 0" },
        ],
        reportHistory: [
            { reportedBy: "Driver Hendra", type: "Fraud", description: "Proposed off-app transaction", date: "2024-02-19", status: "Investigating" },
            { reportedBy: "Driver Siti", type: "Abuse", description: "Abusive language in chat", date: "2024-02-15", status: "Resolved" }
        ],
        statusHistory: [
            { date: "2024-02-19", action: "Suspension", reason: "Fraud suspected & High cancel rate", admin: "Admin A", duration: "Permanent" },
        ],
        auditLog: [
            { id: "LOG-B01", timestamp: "2024-02-19 13:00", userId: "USR-002", userName: "Budi Santoso", action: "Suspension (Permanent)", before: "Active", after: "Suspended", reason: "Fraud suspected & High cancel rate", admin: "Admin A" },
        ]
    },
    {
        id: "USR-003",
        name: "Dewi Putri",
        email: "dewiputri@provider.id",
        phone: "0811-2233-4455",
        status: "Under Review",
        joinedDate: "2023-11-02",
        totalOrders: 12,
        totalCancel: 5,
        cancelRate: 41.6,
        totalReports: 4,
        rating: 4.0,
        orderHistory: [
            { id: "ORD-7701", date: "2024-02-21 08:00", status: "selesai", amount: "Rp 12.000" },
        ],
        reportHistory: [
            { reportedBy: "System Anomaly", type: "Fake Order", description: "Pola pemesanan janggal", date: "2024-02-22", status: "Pending" }
        ],
        statusHistory: [
            { date: "2024-02-22", action: "Flagged", reason: "System detected anomaly", admin: "Auto Reporter" },
        ],
        auditLog: [
            { id: "LOG-C01", timestamp: "2024-02-22 09:00", userId: "USR-003", userName: "Dewi Putri", action: "Under Review", before: "Active", after: "Under Review", reason: "Anomaly detection", admin: "System" },
        ]
    },
    {
        id: "USR-004",
        name: "Kevin Liman",
        email: "kevin.liman@gmail.com",
        phone: "0819-2233-0099",
        status: "Active",
        joinedDate: "2023-08-12",
        totalOrders: 200,
        totalCancel: 5,
        cancelRate: 2.5,
        totalReports: 0,
        rating: 4.9,
        orderHistory: [],
        reportHistory: [],
        statusHistory: [],
        auditLog: []
    },
    {
        id: "USR-005",
        name: "Sarah Wijaya",
        email: "sarah.w@yahoo.com",
        phone: "0877-1122-3344",
        status: "Active",
        joinedDate: "2023-10-01",
        totalOrders: 85,
        totalCancel: 10,
        cancelRate: 11.7,
        totalReports: 2,
        rating: 4.5,
        orderHistory: [],
        reportHistory: [],
        statusHistory: [],
        auditLog: []
    }
]

// ─── Constants ──────────────────────────────────────────────────────────

const PAGE_SIZE = 10
const AUDIT_LOG_PAGE_SIZE = 10
const now = new Date().toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })
const time = new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })

// ─── Icons (SVG Components) ─────────────────────────────────────────────

const Icons = {
    Search: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
    ),
    MoreHorizontal: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
        </svg>
    ),
    UserCheck: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
        </svg>
    ),
    Ban: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" />
        </svg>
    ),
    Eye: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
        </svg>
    ),
    Calendar: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    ),
    Mail: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    ),
    History: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" /><path d="M12 7v5l4 2" />
        </svg>
    ),
    AlertCircle: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    ),
    ShieldCheck: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" />
        </svg>
    ),
    Check: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    ArrowRight: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    ),
    Lock: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    ),
    Activity: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    ),
    X: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    ),
    ChevronLeft: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
        </svg>
    ),
    ChevronRight: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
        </svg>
    ),
    ShieldAlert: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="M12 8v4" /><path d="M12 16h.01" />
        </svg>
    ),
    ChevronDown: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}

// ─── Native UI Components ───────────────────────────────────────────────

function Button({
    children,
    onClick,
    disabled = false,
    variant = "default",
    className = "",
    style = {},
    type = "button"
}: {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: "default" | "outline" | "ghost"
    className?: string
    style?: React.CSSProperties
    type?: "button" | "submit"
}) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"

    const variants = {
        default: "bg-slate-900 text-white hover:bg-slate-800 border border-transparent",
        outline: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-600"
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
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
    type = "text"
}: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string
    type?: string
}) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 ${className}`}
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
            className={`w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 resize-none ${className}`}
        />
    )
}

function Select({
    value,
    onChange,
    options,
    placeholder,
    className = ""
}: {
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string }[]
    placeholder?: string
    className?: string
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
        <div className={`relative ${className}`} ref={ref}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 flex items-center justify-between hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
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

function Badge({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
            style={style}
        >
            {children}
        </span>
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
                <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
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
    danger = false
}: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    danger?: boolean
}) {
    return (
        <button
            onClick={() => {
                onClick?.()
            }}
            className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-50 ${danger ? "text-red-600 hover:bg-red-50" : "text-slate-700"} ${className}`}
        >
            {children}
        </button>
    )
}

function DropdownSeparator() {
    return <div className="h-px bg-slate-200 my-1" />
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AccountStatus }) {
    const configs: Record<AccountStatus, { bgColor: string, textColor: string, dotColor: string }> = {
        Active: {
            bgColor: "#E6F7E6",
            textColor: "#1E7B4C",
            dotColor: "#1E7B4C"
        },
        Suspended: {
            bgColor: "#FFE5E5",
            textColor: "#B91C1C",
            dotColor: "#B91C1C"
        },
        "Under Review": {
            bgColor: "#FEF3E2",
            textColor: "#B45309",
            dotColor: "#B45309"
        }
    }
    const cfg = configs[status] || configs.Active
    return (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-md"
            style={{
                backgroundColor: cfg.bgColor,
                color: cfg.textColor
            }}
        >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dotColor }}></span>
            {status}
        </span>
    )
}

function OrderStatusBadge({ status }: { status: string }) {
    const configs: Record<string, { bgColor: string, textColor: string }> = {
        "selesai": {
            bgColor: "#E6F7E6",
            textColor: "#1E7B4C"
        },
        "batal": {
            bgColor: "#FFE5E5",
            textColor: "#B91C1C"
        },
        "on-trip": {
            bgColor: "#E6F0FF",
            textColor: "#0057B3"
        },
        "menunggu driver": {
            bgColor: "#FFF4E5",
            textColor: "#B45B0A"
        },
        "assigned": {
            bgColor: "#E6F0FF",
            textColor: "#0057B3"
        },
        "issue": {
            bgColor: "#FFE5E5",
            textColor: "#B91C1C"
        }
    }
    const cfg = configs[status] || configs["selesai"]
    return (
        <span
            className="inline-flex px-2 py-0.5 rounded text-xs font-medium"
            style={{
                backgroundColor: cfg.bgColor,
                color: cfg.textColor
            }}
        >
            {status}
        </span>
    )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserData[]>(INITIAL_USERS)
    const [search, setSearch] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterRisk, setFilterRisk] = useState("all")
    const [page, setPage] = useState(1)

    // Modals
    const [detailUser, setDetailUser] = useState<UserData | null>(null)
    const [suspendTarget, setSuspendTarget] = useState<UserData | null>(null)
    const [showGlobalLogs, setShowGlobalLogs] = useState(false)

    // Audit Log Pagination State
    const [auditLogPage, setAuditLogPage] = useState(1)

    // Reset audit log page when modal opens
    useEffect(() => {
        if (showGlobalLogs) {
            setAuditLogPage(1)
        }
    }, [showGlobalLogs])

    // Derived: Global Audit Logs (Flattened from all users)
    const globalLogs = useMemo(() => {
        return users
            .flatMap(u => (u.auditLog || []))
            .sort((a, b) => {
                const timeA = a.timestamp || ""
                const timeB = b.timestamp || ""
                return timeB.localeCompare(timeA)
            })
    }, [users])

    // Paginated Audit Logs
    const paginatedAuditLogs = useMemo(() => {
        return globalLogs.slice((auditLogPage - 1) * AUDIT_LOG_PAGE_SIZE, auditLogPage * AUDIT_LOG_PAGE_SIZE)
    }, [globalLogs, auditLogPage])

    const totalAuditLogPages = Math.ceil(globalLogs.length / AUDIT_LOG_PAGE_SIZE)

    // Suspend Form State
    const [suspendType, setSuspendType] = useState<"Temporary" | "Permanent">("Temporary")
    const [suspendReason, setSuspendReason] = useState("")
    const [suspendDuration, setSuspendDuration] = useState("7 Hari")

    // Filter Logic
    const filteredUsers = useMemo(() => {
        const q = search.toLowerCase()
        return users.filter(u => {
            const matchesSearch = u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.phone.includes(q)

            const matchesStatus = filterStatus === "all" || u.status === filterStatus

            let matchesRisk = true
            if (filterRisk === "high") matchesRisk = u.cancelRate > 30
            if (filterRisk === "risk") matchesRisk = u.totalReports > 3

            return matchesSearch && matchesStatus && matchesRisk
        })
    }, [users, search, filterStatus, filterRisk])

    const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE)

    // Actions
    const handleSuspend = () => {
        if (!suspendTarget || !suspendReason) return

        const timestamp = `${now} ${time}`
        const logId = `LOG-${Math.floor(Math.random() * 10000)}`

        setUsers(prev => prev.map(u => u.id === suspendTarget.id ? {
            ...u,
            status: "Suspended",
            statusHistory: [
                {
                    date: now,
                    action: "Suspension",
                    reason: suspendReason,
                    admin: "Admin (You)",
                    duration: suspendType === "Temporary" ? suspendDuration : "Permanent"
                },
                ...u.statusHistory
            ],
            auditLog: [
                {
                    id: logId,
                    timestamp,
                    userId: u.id,
                    userName: u.name,
                    action: `Suspension (${suspendType})`,
                    before: u.status,
                    after: "Suspended",
                    reason: suspendReason,
                    admin: "Admin (You)"
                },
                ...u.auditLog
            ]
        } : u))

        setSuspendTarget(null)
        setSuspendReason("")
        setDetailUser(null)
    }

    const handleReactivate = (user: UserData) => {
        const timestamp = `${now} ${time}`
        const logId = `LOG-${Math.floor(Math.random() * 10000)}`

        setUsers(prev => prev.map(u => u.id === user.id ? {
            ...u,
            status: "Active",
            statusHistory: [
                { date: now, action: "Reactivation", reason: "Reviewed by admin (Clean account)", admin: "Admin (You)" },
                ...u.statusHistory
            ],
            auditLog: [
                {
                    id: logId,
                    timestamp,
                    userId: u.id,
                    userName: u.name,
                    action: "Reactivation",
                    before: u.status,
                    after: "Active",
                    reason: "Manual reactivation",
                    admin: "Admin (You)"
                },
                ...u.auditLog
            ]
        } : u))
    }

    const statusOptions = [
        { value: "all", label: "All Status" },
        { value: "Active", label: "Active" },
        { value: "Suspended", label: "Suspended" },
        { value: "Under Review", label: "Under Review" }
    ]

    const riskOptions = [
        { value: "all", label: "All Activity" },
        { value: "high", label: "Cancel Rate > 30%" },
        { value: "risk", label: "High Reports (> 3)" }
    ]

    const durationOptions = [
        { value: "24 Jam", label: "24 Hours" },
        { value: "3 Hari", label: "3 Days" },
        { value: "7 Hari", label: "7 Days (Default)" },
        { value: "30 Hari", label: "30 Days" }
    ]

    return (
        <div className="flex flex-col gap-8 p-8 min-h-screen bg-white">

            {/* ── Header Section ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        User Management
                    </h1>
                    <p className="text-slate-500 text-sm max-w-xl">
                        Control center for user activity monitoring, risk mitigation, and account moderation.
                    </p>
                </div>
                <div className="flex gap-2.5">
                    <Button
                        variant="outline"
                        onClick={() => setShowGlobalLogs(true)}
                        className="h-10 px-4 text-sm"
                    >
                        <span className="mr-2"><Icons.History /></span> Audit Logs
                    </Button>
                    <Button
                        className="h-10 px-5 text-sm"
                        style={{ backgroundColor: '#E04D04', color: 'white' }}
                    >
                        Export Database
                    </Button>
                </div>
            </div>

            {/* ── Search & Filter Panel ── */}
            <div className="flex flex-wrap gap-4 mb-2">
                <div className="relative flex-1 min-w-[280px]">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icons.Search />
                    </div>
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, or phone number..."
                        className="pl-9 h-11 bg-white"
                    />
                </div>

                <div className="flex gap-3">
                    <Select
                        value={filterStatus}
                        onChange={setFilterStatus}
                        options={statusOptions}
                        className="w-[150px] h-11"
                    />
                    <Select
                        value={filterRisk}
                        onChange={setFilterRisk}
                        options={riskOptions}
                        className="w-[180px] h-11"
                    />
                </div>
            </div>

            {/* ── User Table ── */}
            <div className="space-y-6">
                <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-md">
                    <table className="w-full">
                        <thead className="bg-slate-53 border-b border-slate-300">
                            <tr>
                                <th className="h-12 text-left text-sm font-semibold text-slate-700 pl-6">User Profile</th>
                                <th className="h-12 text-left text-sm font-semibold text-slate-700">Joined Date</th>
                                <th className="h-12 text-center text-sm font-semibold text-slate-700">Orders</th>
                                <th className="h-12 text-center text-sm font-semibold text-slate-700">Cancel Rate</th>
                                <th className="h-12 text-center text-sm font-semibold text-slate-700">Reports</th>
                                <th className="h-12 text-left text-sm font-semibold text-slate-700">Status</th>
                                <th className="w-[80px] h-12 text-right pr-6 text-sm font-semibold text-slate-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-200 last:border-0">
                                    <td className="py-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium text-base">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800 text-base">{user.name}</p>
                                                <p className="text-sm text-slate-400 flex items-center gap-1 mt-0.5">
                                                    <Icons.Mail /> {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-sm text-slate-500">{user.joinedDate}</td>
                                    <td className="text-center font-medium text-slate-700 text-base">{user.totalOrders}</td>
                                    <td className="text-center">
                                        <span className={`text-base font-medium ${user.cancelRate > 30 ? "text-[#E04D04]" : "text-slate-600"}`}>
                                            {user.cancelRate}%
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <span className={`text-base font-medium ${user.totalReports > 0 ? "text-[#E04D04]" : "text-slate-400"}`}>
                                            {user.totalReports}
                                        </span>
                                    </td>
                                    <td>
                                        <StatusBadge status={user.status} />
                                    </td>
                                    <td className="text-right pr-6">
                                        <DropdownMenu
                                            trigger={
                                                <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                                                    <Icons.MoreHorizontal />
                                                </Button>
                                            }
                                        >
                                            <DropdownItem onClick={() => setDetailUser(user)}>
                                                <Icons.Eye /> View Profile
                                            </DropdownItem>
                                            <DropdownSeparator />
                                            {user.status === "Active" || user.status === "Under Review" ? (
                                                <DropdownItem onClick={() => setSuspendTarget(user)} danger>
                                                    <Icons.Ban /> Suspend Account
                                                </DropdownItem>
                                            ) : (
                                                <DropdownItem onClick={() => handleReactivate(user)} className="text-emerald-600 hover:bg-emerald-50">
                                                    <Icons.UserCheck /> Activate Profile
                                                </DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-16 text-slate-400 text-sm">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Pagination Section ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-slate-100">
                    <div className="text-sm text-slate-400">
                        Menampilkan <span className="font-bold text-slate-900">{filteredUsers.length}</span> dari <span className="font-bold text-slate-900">{users.length}</span> user
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="ghost"
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 disabled:opacity-30"
                        >
                            <Icons.ChevronLeft />
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${page === p
                                        ? "bg-slate-100 text-slate-900"
                                        : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 disabled:opacity-30"
                        >
                            <Icons.ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>

            {/* ── Suspend Confirmation Modal ── */}
            <Modal isOpen={!!suspendTarget} onClose={() => setSuspendTarget(null)}>
                <div className="p-6 flex flex-col items-center text-center space-y-4" style={{ backgroundColor: 'rgba(224, 77, 4, 0.1)' }}>
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm" style={{ color: '#E04D04' }}>
                        <Icons.ShieldAlert />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold tracking-tight" style={{ color: '#E04D04' }}>Confirm Suspension</h2>
                        <p className="text-sm px-4" style={{ color: 'rgba(224, 77, 4, 0.8)' }}>
                            You are about to restrict access for <span className="font-semibold" style={{ color: '#E04D04' }}>{suspendTarget?.name}</span>. This action cannot be easily undone.
                        </p>
                    </div>
                </div>

                <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Suspension Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant={suspendType === "Temporary" ? "default" : "outline"}
                                onClick={() => setSuspendType("Temporary")}
                                className={`h-10 text-sm font-medium ${suspendType === "Temporary" ? "bg-slate-900 text-white border-transparent" : "border-slate-200 text-slate-600"}`}
                                style={suspendType === "Temporary" ? { backgroundColor: '#E04D04' } : {}}
                            >
                                Temporary
                            </Button>
                            <Button
                                variant={suspendType === "Permanent" ? "default" : "outline"}
                                onClick={() => setSuspendType("Permanent")}
                                className={`h-10 text-sm font-medium ${suspendType === "Permanent" ? "text-white border-transparent" : "border-slate-200 text-slate-600"}`}
                                style={suspendType === "Permanent" ? { backgroundColor: '#E04D04' } : {}}
                            >
                                Permanent
                            </Button>
                        </div>
                    </div>

                    {suspendType === "Temporary" && (
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Lock Duration</label>
                            <Select
                                value={suspendDuration}
                                onChange={setSuspendDuration}
                                options={durationOptions}
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Official Reason <span style={{ color: '#E04D04' }}>*</span></label>
                        <Textarea
                            value={suspendReason}
                            onChange={(e) => setSuspendReason(e.target.value)}
                            placeholder="Explain the decision for internal auditing..."
                            className="min-h-[100px]"
                        />
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <Button
                        onClick={handleSuspend}
                        disabled={!suspendReason}
                        className="w-full h-10 font-medium text-sm shadow-sm"
                        style={{ backgroundColor: '#E04D04', color: 'white' }}
                    >
                        Suspend Account
                    </Button>
                </div>
            </Modal>

            {/* ── User Detail Modal ── */}
            <Modal isOpen={!!detailUser} onClose={() => setDetailUser(null)} maxWidth="4xl">
                <div className="px-6 py-4 border-b border-slate-100 flex items-start shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-slate-700 text-xl font-medium border border-slate-200">
                            {detailUser?.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold text-slate-900">{detailUser?.name}</h2>
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                                <span className="text-slate-400 flex items-center gap-1">
                                    <Icons.Mail /> {detailUser?.email}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-400">{detailUser?.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                {detailUser && <StatusBadge status={detailUser.status} />}
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Icons.Calendar /> Joined {detailUser?.joinedDate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">

                    {/* Stats Summary */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <p className="text-xs uppercase font-medium text-slate-400 mb-1">Total Orders</p>
                            <p className="text-2xl font-semibold text-slate-900">{detailUser?.totalOrders}</p>
                            <p className="text-xs text-slate-400 mt-1">All time</p>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <p className="text-xs uppercase font-medium text-slate-400 mb-1">Cancel Rate</p>
                            <p className={`text-2xl font-semibold ${detailUser && detailUser.cancelRate > 30 ? "text-[#E04D04]" : "text-slate-900"}`}>
                                {detailUser?.cancelRate}%
                            </p>
                            <p className="text-xs text-slate-400 mt-1">Of total orders</p>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <p className="text-xs uppercase font-medium text-slate-400 mb-1">Risk Reports</p>
                            <p className={`text-2xl font-semibold ${detailUser && detailUser.totalReports > 0 ? "text-[#E04D04]" : "text-slate-900"}`}>
                                {detailUser?.totalReports}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">Total reports</p>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <p className="text-xs uppercase font-medium text-slate-400 mb-1">Avg Rating</p>
                            <p className="text-2xl font-semibold text-slate-900">{detailUser?.rating}</p>
                            <p className="text-xs text-slate-400 mt-1">Out of 5.0</p>
                        </div>
                    </div>

                    {/* Account Security & Violations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Security Info */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Icons.ShieldCheck /> Account Security
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-white hover:border-slate-200 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <Icons.ShieldCheck />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Identity Verification</p>
                                            <p className="text-xs text-slate-500">KYC Level 2 Authorized</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-50 text-emerald-700 border-none text-[10px] font-medium px-2 py-0.5">
                                        Verified
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-white hover:border-slate-200 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
                                            <Icons.Lock />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Account Standing</p>
                                            <p className="text-xs text-slate-500">Regular account behavior</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-slate-100 text-slate-600 border-none text-[10px] font-medium px-2 py-0.5">
                                        Clear
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Violations */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Icons.AlertCircle /> Violations
                            </h3>
                            <div className="h-[calc(100%-2rem)] min-h-[130px] border border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-center p-5 bg-slate-50/30">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                                    <Icons.Check />
                                </div>
                                <p className="text-sm font-medium text-slate-400">No active violations</p>
                                <p className="text-xs text-slate-400 mt-0.5">This user has a clean record</p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            <Icons.History /> Recent Activity History
                        </h3>
                        <div className="rounded-lg border border-slate-100 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50/80">
                                    <tr>
                                        <th className="h-10 text-left text-xs font-medium uppercase text-slate-400 pl-4">ID</th>
                                        <th className="h-10 text-left text-xs font-medium uppercase text-slate-400">Timestamp</th>
                                        <th className="h-10 text-left text-xs font-medium uppercase text-slate-400">Status</th>
                                        <th className="h-10 text-right text-xs font-medium uppercase text-slate-400 pr-4">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detailUser?.orderHistory && detailUser.orderHistory.length > 0 ? (
                                        detailUser.orderHistory.slice(0, 3).map((order) => (
                                            <tr key={order.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/50">
                                                <td className="pl-4 py-3 font-mono text-sm text-slate-600">{order.id}</td>
                                                <td className="text-sm text-slate-500">{order.date}</td>
                                                <td>
                                                    <OrderStatusBadge status={order.status} />
                                                </td>
                                                <td className="text-right pr-4 text-sm font-medium text-slate-900">{order.amount}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center py-8 text-slate-400 text-sm">
                                                No transaction history available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* System Logs */}
                    {detailUser?.statusHistory && detailUser.statusHistory.length > 0 && (
                        <div className="space-y-3 pt-3 border-t border-slate-100">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Icons.Activity /> System Logs
                            </h3>
                            <div className="space-y-2">
                                {detailUser.statusHistory.slice(0, 3).map((log, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 px-4 rounded-lg border border-slate-100 bg-slate-50/30 hover:bg-slate-50">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-medium text-slate-800">{log.action}</p>
                                            <p className="text-xs text-slate-500">{log.reason}</p>
                                            <p className="text-[10px] font-medium text-slate-400 uppercase">By {log.admin}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-400">{log.date}</p>
                                            {log.duration && (
                                                <p className="text-[10px] text-slate-400 mt-0.5">Duration: {log.duration}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Modal>

            {/* ── Global Audit Log Modal ── */}
            <Modal isOpen={showGlobalLogs} onClose={() => setShowGlobalLogs(false)} maxWidth="4xl">
                <div className="px-6 py-6 flex items-start justify-between bg-white border-b border-slate-100">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Audit Log</h3>
                        <p className="text-sm text-slate-500 mt-1">Catatan semua tindakan administratif</p>
                    </div>
                    <button
                        onClick={() => setShowGlobalLogs(false)}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                        <Icons.X />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                    {paginatedAuditLogs.map((log) => {
                        // Determine icon and colors based on action
                        let icon = <Icons.Activity />
                        let bgColor = "bg-slate-100"
                        let iconColor = "text-slate-600"

                        if (log.action.toLowerCase().includes("suspend")) {
                            icon = <Icons.Ban />
                            bgColor = "bg-rose-50"
                            iconColor = "text-rose-600"
                        } else if (log.action.toLowerCase().includes("reactivation") || log.action.toLowerCase().includes("active")) {
                            icon = <Icons.UserCheck />
                            bgColor = "bg-emerald-50"
                            iconColor = "text-emerald-600"
                        } else if (log.action.toLowerCase().includes("review") || log.action.toLowerCase().includes("verification")) {
                            icon = <Icons.ShieldCheck />
                            bgColor = "bg-amber-50"
                            iconColor = "text-amber-600"
                        }

                        return (
                            <div key={log.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="flex gap-4">
                                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-transparent transition-all group-hover:scale-105", bgColor, iconColor)}>
                                        {icon}
                                    </div>
                                    <div className="flex-1 min-w-0 pr-24">
                                        <div className="flex flex-col gap-0.5">
                                            <h4 className="font-bold text-slate-900 text-[15px]">{log.action}</h4>
                                            <p className="text-sm text-slate-500 line-clamp-1">
                                                {log.action} user: <span className="font-medium text-slate-700">{log.userName} ({log.userId})</span>
                                            </p>
                                        </div>

                                        {log.reason && (
                                            <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                                                <span className="text-[13px] font-bold text-slate-900 whitespace-nowrap pt-0.5">Alasan:</span>
                                                <span className="text-[13px] text-slate-600 leading-relaxed font-medium">
                                                    {log.reason}
                                                </span>
                                            </div>
                                        )}

                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Executor: {log.admin}</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-5 right-5 text-right">
                                        <p className="text-[11px] font-medium text-slate-400">{log.timestamp}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {globalLogs.length === 0 && (
                        <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
                            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 text-slate-400">
                                <Icons.History />
                            </div>
                            <p className="text-sm font-medium text-slate-900">No activity logs found</p>
                            <p className="text-xs text-slate-400 mt-1">Updates to user accounts will appear here.</p>
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="bg-white p-4 px-6 border-t border-slate-100 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                {globalLogs.length} Entri Tercatat
                            </p>
                        </div>

                        {totalAuditLogPages > 1 && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => setAuditLogPage(p => Math.max(1, p - 1))}
                                    disabled={auditLogPage === 1}
                                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                >
                                    <Icons.ChevronLeft />
                                </Button>

                                <div className="flex gap-1">
                                    {Array.from({ length: totalAuditLogPages }, (_, i) => i + 1)
                                        .filter(p => {
                                            if (p === 1 || p === totalAuditLogPages) return true
                                            if (Math.abs(p - auditLogPage) <= 1) return true
                                            return false
                                        })
                                        .map((p, idx, arr) => {
                                            const prev = arr[idx - 1]
                                            const showEllipsis = prev && p - prev > 1

                                            return (
                                                <React.Fragment key={p}>
                                                    {showEllipsis && (
                                                        <span className="h-8 w-8 flex items-center justify-center text-xs text-slate-300">...</span>
                                                    )}
                                                    <button
                                                        onClick={() => setAuditLogPage(p)}
                                                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${auditLogPage === p
                                                            ? "bg-slate-100 text-slate-900"
                                                            : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                                            }`}
                                                    >
                                                        {p}
                                                    </button>
                                                </React.Fragment>
                                            )
                                        })}
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() => setAuditLogPage(p => Math.min(totalAuditLogPages, p + 1))}
                                    disabled={auditLogPage === totalAuditLogPages}
                                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                >
                                    <Icons.ChevronRight />
                                </Button>
                            </div>
                        )}
                        <p className="text-[10px] text-slate-300 font-medium">Audit Trail v4.0</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}