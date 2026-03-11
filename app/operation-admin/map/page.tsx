"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Map as MapIcon,
    Layers,
    Maximize2,
    Users,
    Truck,
    AlertCircle,
    Search,
    Filter,
    TrendingUp,
    Clock,
    MousePointer2,
    Bell,
    ChevronDown,
    Activity,
    Navigation
} from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"

// Dynamic import for MapComponent
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50 dark:bg-slate-900 animate-pulse">
            <MapIcon className="h-12 w-12 text-slate-300 mb-4" />
            <p className="text-slate-400 font-medium">Loading Spatial Engine...</p>
        </div>
    )
})

export default function RealTimeMapPage() {
    const [layers, setLayers] = React.useState({
        drivers: true,
        orders: true,
        demand: true,
    })
    const [searchQuery, setSearchQuery] = React.useState("")
    const [activeTab, setActiveTab] = React.useState("all")

    const toggleLayer = (layer: keyof typeof layers) => {
        setLayers(prev => ({ ...prev, [layer]: !prev[layer] }))
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-slate-50/50">
            {/* Header + KPI Cards */}
            <header className="p-6 shrink-0 bg-white border-b space-y-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Live Map</h1>
                    <p className="text-sm text-muted-foreground">Pantau pergerakan driver dan pesanan secara real-time.</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <MetricCard
                        icon={<Truck className="h-3.5 w-3.5" />}
                        label="Active Drivers"
                        value="42"
                        sublabel="+5% from last hour"
                        trendColor="text-cakli-green"
                    />
                    <MetricCard
                        icon={<Activity className="h-3.5 w-3.5" />}
                        label="Live Orders"
                        value="128"
                        sublabel="System status: Steady"
                    />
                    <MetricCard
                        icon={<Clock className="h-3.5 w-3.5" />}
                        label="Avg. ETA"
                        value="8.4 min"
                        sublabel="Reduced by 1.2m"
                        trendColor="text-cakli-green"
                    />
                    <MetricCard
                        icon={<TrendingUp className="h-3.5 w-3.5" />}
                        label="High Demand Area"
                        value="Malang Kota"
                        sublabel="Demand: Very High"
                        trendColor="text-rose-600"
                    />
                </div>
            </header>

            <div className="flex flex-1 relative overflow-hidden">
                <div className="flex-1 relative">
                    <MapComponent
                        drivers={mockDrivers}
                        orders={mockOrders}
                        demandAreas={mockDemandAreas}
                        layers={layers}
                    />

                    {/* Floating Layer Controls */}
                    <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-2">
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 p-2 flex flex-col gap-1">
                            <LayerToggle
                                active={layers.drivers}
                                onClick={() => toggleLayer('drivers')}
                                icon={<Users className="w-4 h-4" />}
                                label="Drivers"
                                count="5"
                            />
                            <LayerToggle
                                active={layers.orders}
                                onClick={() => toggleLayer('orders')}
                                icon={<Navigation className="w-4 h-4" />}
                                label="Orders"
                                count="3"
                            />
                            <LayerToggle
                                active={layers.demand}
                                onClick={() => toggleLayer('demand')}
                                icon={<Activity className="w-4 h-4" />}
                                label="Demand Heatmap"
                            />
                        </div>
                    </div>

                    {/* Alert Panel */}
                    <div className="absolute bottom-28 right-6 z-[1000] max-w-xs w-full transition-all">
                        <Card className="border border-orange-100 bg-white/95 backdrop-blur">
                            <CardHeader className="p-3 pb-1 flex flex-row items-center justify-between pointer-events-none">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-[#E04D04]" />
                                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Alerts</CardTitle>
                                </div>
                                <Badge variant="outline" className="text-[10px] text-[#E04D04] border-[#E04D04]/20 bg-[#E04D04]/5 animate-pulse">3 Issues</Badge>
                            </CardHeader>
                            <CardContent className="p-3 pt-2 space-y-2">
                                <AlertItem
                                    title="Driver Stuck > 10m"
                                    desc="Budi S. stopped at Jl. Ijen"
                                    time="2m ago"
                                    severity="high"
                                />
                                <AlertItem
                                    title="Order Delay Escalation"
                                    desc="ORD-092 ETA +15m"
                                    time="5m ago"
                                    severity="medium"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Sidebar Filter */}
                <aside className="w-80 bg-white border-l p-4 flex flex-col gap-6 z-10 transition-transform duration-300">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-lg">Control Panel</h2>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400">
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search Driver or Order ID..."
                                className="pl-9 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-slate-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Driver Status</label>
                        <ToggleGroup type="single" variant="outline" className="justify-start gap-2" value={activeTab} onValueChange={setActiveTab}>
                            <ToggleGroupItem value="all" className="rounded-full text-xs h-8 px-4 data-[state=on]:bg-[#E04D04] data-[state=on]:text-white">All</ToggleGroupItem>
                            <ToggleGroupItem value="available" className="rounded-full text-xs h-8 px-4 data-[state=on]:bg-emerald-500 data-[state=on]:text-white data-[state=on]:border-emerald-500">Available</ToggleGroupItem>
                            <ToggleGroupItem value="on-trip" className="rounded-full text-xs h-8 px-4 data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500">On Trip</ToggleGroupItem>
                        </ToggleGroup>
                    </div>

                    <Separator />

                    <div className="flex-1 overflow-y-auto space-y-4 -mx-2 px-2 scrollbar-hide text-black">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nearby Results</label>
                        <div className="space-y-2">
                            {mockDrivers.map((d: Driver) => (
                                <div key={d.id} className="group p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm group-hover:text-[#E04D04] transition-colors">{d.name}</span>
                                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">{d.status}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Truck className="w-3 h-3" />
                                        <span>{d.vehicle}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full bg-[#E04D04] hover:bg-[#E04D04]/90 text-white rounded-xl py-6 font-bold">
                        Export Snapshot Report
                    </Button>
                </aside>
            </div>
        </div>
    )
}

function MetricCard({ icon, label, value, sublabel, trendColor = "text-muted-foreground" }: { icon: React.ReactNode, label: string, value: string, sublabel?: string, trendColor?: string }) {
    return (
        <Card className="overflow-hidden">
            <div className="flex items-stretch h-full">
                <div className="w-1.5 bg-cakli-orange rounded-full my-3 ml-3 shrink-0" />
                <div className="flex-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                        <CardTitle className="text-xs font-medium">{label}</CardTitle>
                        <span className="text-muted-foreground">{icon}</span>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                        <div className="text-xl font-bold">{value}</div>
                        {sublabel && (
                            <p className={`text-[10px] ${trendColor}`}>{sublabel}</p>
                        )}
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}

function LayerToggle({ active, onClick, icon, label, count }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, count?: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${active ? 'bg-[#E04D04] text-white border border-[#E04D04]' : 'hover:bg-slate-100 text-slate-600'
                }`}
        >
            <div className={`p-1.5 rounded-lg ${active ? 'bg-white/10' : 'bg-slate-100'}`}>
                {icon}
            </div>
            <div className="flex flex-col items-start flex-1">
                <span className="text-xs font-bold leading-none">{label}</span>
                {count && <span className={`text-[9px] ${active ? 'text-white/70' : 'text-slate-400'}`}>{count} active</span>}
            </div>
            {active && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        </button>
    )
}

function AlertItem({ title, desc, time, severity }: { title: string, desc: string, time: string, severity: 'high' | 'medium' }) {
    return (
        <div className={`p-2.5 rounded-xl border-l-4 transition-all hover:translate-x-1 cursor-pointer ${severity === 'high' ? 'bg-[#E04D04]/5 border-[#E04D04]' : 'bg-orange-50/50 border-orange-500'
            }`}>
            <div className="flex justify-between items-start mb-0.5">
                <h4 className="text-[11px] font-bold text-slate-800">{title}</h4>
                <span className="text-[9px] text-slate-400">{time}</span>
            </div>
            <p className="text-[10px] text-slate-500 truncate">{desc}</p>
        </div>
    )
}

// --- Data Types & Mock Data ---

export type DriverStatus = "available" | "on-trip" | "offline" | "idle";

export interface Driver {
    id: string;
    name: string;
    status: DriverStatus;
    rating: number;
    vehicle: string;
    lat: number;
    lng: number;
}

export type OrderStatus = "on-the-way" | "picked-up" | "completed" | "delayed";

export interface Order {
    id: string;
    customerName: string;
    driverId?: string;
    status: OrderStatus;
    pickup: [number, number];
    dropoff: [number, number];
    route: [number, number][];
    eta: string;
}

export interface DemandArea {
    id: string;
    name: string;
    lat: number;
    lng: number;
    intensity: number;
    orderCount: number;
    driverCount: number;
}

export const mockDrivers: Driver[] = [
    { id: "D1", name: "Budi Santoso", status: "available", rating: 4.8, vehicle: "Honda Vario (P 1234 AB)", lat: -7.9666, lng: 112.6326 },
    { id: "D2", name: "Siti Aminah", status: "on-trip", rating: 4.9, vehicle: "Yamaha NMAX (P 5678 CD)", lat: -7.9540, lng: 112.6120 },
    { id: "D3", name: "Joko Widodo", status: "idle", rating: 4.7, vehicle: "Suzuki Nex (P 9012 EF)", lat: -7.9780, lng: 112.6450 },
    { id: "D4", name: "Andi Wijaya", status: "available", rating: 4.6, vehicle: "Honda Beat (P 3456 GH)", lat: -7.9400, lng: 112.6200 },
    { id: "D5", name: "Rina Kartika", status: "on-trip", rating: 4.9, vehicle: "Yamaha Mio (P 7890 IJ)", lat: -7.9850, lng: 112.6100 },
];

export const mockOrders: Order[] = [
    {
        id: "ORD-001",
        customerName: "Alice",
        driverId: "D2",
        status: "on-the-way",
        pickup: [-7.9600, 112.6200],
        dropoff: [-7.9540, 112.6120],
        route: [[-7.9600, 112.6200], [-7.9570, 112.6150], [-7.9540, 112.6120]],
        eta: "5 mins"
    },
    {
        id: "ORD-002",
        customerName: "Bob",
        driverId: "D5",
        status: "picked-up",
        pickup: [-7.9700, 112.6400],
        dropoff: [-7.9850, 112.6100],
        route: [[-7.9700, 112.6400], [-7.9750, 112.6300], [-7.9800, 112.6200], [-7.9850, 112.6100]],
        eta: "12 mins"
    },
    {
        id: "ORD-003",
        customerName: "Charlie",
        status: "delayed",
        pickup: [-7.9450, 112.6350],
        dropoff: [-7.9300, 112.6500],
        route: [],
        eta: "25 mins"
    }
];

export const mockDemandAreas: DemandArea[] = [
    { id: "A1", name: "Malang Kota", lat: -7.9666, lng: 112.6326, intensity: 0.9, orderCount: 45, driverCount: 12 },
    { id: "A2", name: "Suhat", lat: -7.9400, lng: 112.6150, intensity: 0.7, orderCount: 30, driverCount: 8 },
    { id: "A3", name: "Sawojajar", lat: -7.9800, lng: 112.6500, intensity: 0.4, orderCount: 15, driverCount: 5 },
];
