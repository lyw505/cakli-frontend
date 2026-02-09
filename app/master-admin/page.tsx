"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
} from "recharts"
import {
    ShieldAlert,
    Globe,
    TrendingUp,
    AlertTriangle,
    ArrowRight,
    MapPin,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const consolidatedData = [
    { name: "Mon", malang: 4000, surabaya: 2400, batu: 1200 },
    { name: "Tue", malang: 3000, surabaya: 1398, batu: 2100 },
    { name: "Wed", malang: 2000, surabaya: 9800, batu: 2290 },
    { name: "Thu", malang: 2780, surabaya: 3908, batu: 2000 },
    { name: "Fri", malang: 1890, surabaya: 4800, batu: 2181 },
    { name: "Sat", malang: 2390, surabaya: 3800, batu: 2500 },
    { name: "Sun", malang: 3490, surabaya: 4300, batu: 2100 },
]

export default function MasterDashboard() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Global System Control</h1>
                    <p className="text-muted-foreground">High-level consolidated data and regional comparisons.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="animate-pulse">
                        <ShieldAlert className="size-3 mr-1" /> Critical Access Only
                    </Badge>
                </div>
            </div>

            {/* High-Level Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-l-4 border-l-primary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Regional Revenue</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rp 124.5M</div>
                        <p className="text-xs text-muted-foreground">+8.2% vs previous week</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Operation Zones</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 Zones</div>
                        <p className="text-xs text-muted-foreground">3 Region Capitals Active</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Integrity</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">99.98%</div>
                        <p className="text-xs text-muted-foreground">No critical configuration errors</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                {/* Comparison Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Regional Performance Comparison</CardTitle>
                        <CardDescription>Consolidated order volume across main operation cities.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={consolidatedData}>
                                    <defs>
                                        <linearGradient id="colorMalang" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="malang" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorMalang)" />
                                    <Area type="monotone" dataKey="surabaya" stroke="#3b82f6" fillOpacity={0} />
                                    <Area type="monotone" dataKey="batu" stroke="#f59e0b" fillOpacity={0} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Global Alerts & Policies */}
                <div className="col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Critical Policies</CardTitle>
                            <CardDescription>Current global system parameters.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border p-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Main Tariff Mode</p>
                                    <p className="text-xs text-muted-foreground">Standard Regional Pricing</p>
                                </div>
                                <Badge>Active</Badge>
                            </div>
                            <div className="rounded-lg border p-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">New Zone Expansion</p>
                                    <p className="text-xs text-muted-foreground">Medan, Palembang (Pending)</p>
                                </div>
                                <Button size="sm" variant="ghost">Details <ArrowRight className="size-3 ml-1" /></Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="size-4 text-yellow-600" />
                                <CardTitle className="text-sm font-bold text-yellow-800">Configuration Alert</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-yellow-700">
                                Surabaya zone update detected. Please verify the new tariff structure before end of day processing.
                            </p>
                            <Button size="sm" variant="link" className="px-0 h-auto text-yellow-800 font-bold mt-2">Go to Tariff Config</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
