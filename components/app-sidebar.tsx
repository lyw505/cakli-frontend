"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Car,
  MessageSquareWarning,
  TrendingUp,
  Map,
  ShieldCheck,
  ClipboardList,
  TrendingDown,
  History,
  FileText,
  Home,
  Zap,
  EllipsisVertical,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// ── Navigation data ──────────────────────────────────────────────────────────
const adminNavigation = {
  "reporting-admin": {
    user: {
      name: "Admin Pelaporan",
      email: "finance@cakli.com",
      avatar: "/avatars/reporting.jpg",
    },
    items: [
      { title: "Dashboard", url: "/reporting-admin", icon: Home, exact: true },
      { title: "Laporan Revenue", url: "/reporting-admin/reports", icon: Zap },
      { title: "Riwayat Pesanan", url: "/reporting-admin/history", icon: History },
      { title: "Laporan Driver", url: "/reporting-admin/drivers", icon: Car },
    ],
  },
  "master-admin": {
    user: {
      name: "Master Admin",
      email: "superadmin@cakli.com",
      avatar: "/avatars/master.jpg",
    },
    items: [
      { title: "Global Dashboard", url: "/master-admin", icon: LayoutDashboard, exact: true },
      { title: "Analitik Data", url: "/master-admin/analytics", icon: TrendingUp },
      { title: "Tariff Management", url: "/master-admin/tariffs", icon: Zap },
      { title: "Area & Zone", url: "/master-admin/areas", icon: Map },
      { title: "Admin Roles", url: "/master-admin/roles", icon: ShieldCheck },
      { title: "Audit Log System", url: "/master-admin/audit", icon: ClipboardList },
    ],
  },
  "operation-admin": {
    user: {
      name: "Operation Admin",
      email: "admin@cakli.com",
      avatar: "/avatars/admin.jpg",
    },
    items: [
      { title: "Dashboard", url: "/operation-admin", icon: LayoutDashboard, exact: true },
      { title: "Live Map", url: "/operation-admin/map", icon: Map },
      { title: "Order Management", url: "/operation-admin/orders", icon: ShoppingCart },
      { title: "Driver Management", url: "/operation-admin/drivers", icon: Car },
      { title: "User Management", url: "/operation-admin/users", icon: Users },
      { title: "Activity Monitoring", url: "/operation-admin/activity", icon: Zap },
      { title: "Complaints & Disputes", url: "/operation-admin/complaints", icon: MessageSquareWarning },
    ],
  },
}

// ── CakLi Mascot Logo ────────────────────────────────────────────────────────
function CakLiLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Passenger cabin */}
      <rect x="5" y="15" width="25" height="14" rx="5" fill="#E65100" />
      {/* Roof */}
      <rect x="8" y="9" width="19" height="9" rx="3" fill="#E65100" />
      {/* Driver handlebar post */}
      <rect x="30" y="17" width="3.5" height="11" rx="1.75" fill="#E65100" />
      {/* Rear wheel (big) */}
      <circle cx="13" cy="34" r="7" fill="#E65100" />
      <circle cx="13" cy="34" r="4" fill="white" />
      <circle cx="13" cy="34" r="1.5" fill="#E65100" />
      {/* Front wheel (small) */}
      <circle cx="35" cy="34" r="5.5" fill="#E65100" />
      <circle cx="35" cy="34" r="3" fill="white" />
      <circle cx="35" cy="34" r="1.2" fill="#E65100" />
      {/* Lightning bolt (electric) */}
      <path d="M21 10L17.5 19H21L17.5 27L27 15.5H23L26.5 10Z" fill="white" opacity="0.95" />
    </svg>
  )
}

// ── AppSidebar ───────────────────────────────────────────────────────────────
export function AppSidebar() {
  const pathname = usePathname()

  const section = React.useMemo(() => {
    if (pathname.startsWith("/master-admin")) return "master-admin"
    if (pathname.startsWith("/operation-admin")) return "operation-admin"
    return "reporting-admin"
  }, [pathname])

  const { items, user } = adminNavigation[section]

  return (
    <aside
      style={{ width: "220px", minWidth: "220px", maxWidth: "220px" }}
      className="flex flex-col h-screen shrink-0"
    >
      {/* ── Logo / Header — uses public/cakli-logo.svg ── */}
      <div className="flex items-center px-4 pt-6 pb-6">
        <img
          src="/cakli-logo.svg"
          alt="CakLi"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = item.exact
            ? pathname === item.url
            : pathname.startsWith(item.url)

          if (isActive) {
            // Active: white pill with ONLY LEFT radius, right edge is square
            // This makes it visually "extend into" the white content rectangle
            return (
              <a
                key={item.title}
                href={item.url}
                className="flex items-center gap-3.5 ml-4 pl-4 pr-5 py-3 bg-[#FDFAF8] text-[#E65100] rounded-l-full font-semibold text-sm whitespace-nowrap transition-all"
              >
                <item.icon className="shrink-0 text-[#E65100]" style={{ width: 18, height: 18 }} strokeWidth={2.5} />
                <span>{item.title}</span>
              </a>
            )
          }

          return (
            <a
              key={item.title}
              href={item.url}
              className="flex items-center gap-3.5 mx-4 px-4 py-3 text-white/85 rounded-full font-medium text-sm whitespace-nowrap hover:bg-white/15 hover:text-white transition-all"
            >
              <item.icon className="shrink-0 text-white/80" style={{ width: 18, height: 18 }} strokeWidth={2} />
              <span>{item.title}</span>
            </a>
          )
        })}
      </nav>

      {/* ── User Footer ── */}
      <div className="mx-4 mb-5 mt-3 pt-3 border-t border-white/20">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
          <Avatar className="h-8 w-8 rounded-xl shrink-0">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-xl bg-white/25 text-white text-xs font-bold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0 leading-tight">
            <span className="text-white text-xs font-semibold truncate">{user.name}</span>
            <span className="text-white/55 text-[10px] truncate">{user.email}</span>
          </div>
          <EllipsisVertical className="w-4 h-4 text-white/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </aside>
  )
}
