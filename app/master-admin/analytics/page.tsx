"use client"

import * as React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import {
    TrendingUp,
    TrendingDown,
    Map,
    ArrowUpRight,
    ArrowDownRight,
    Globe,
    Filter
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const cityComparisonData = [
    { city: "Malang", orders: 4500, revenue: 85000000, cancelRate: 2.1 },
    { city: "Surabaya", orders: 9200, revenue: 180000000, cancelRate: 4.5 },
    { city: "Batu", orders: 2100, revenue: 42000000, cancelRate: 1.8 },
    { city: "Sidoarjo", orders: 3400, revenue: 62000000, cancelRate: 3.2 },
]

const revenueShareData = [
    { name: "Surabaya", value: 55, color: "#3b82f6" },
    { name: "Malang", value: 25, color: "hsl(var(--primary))" },
    { name: "Batu", value: 12, color: "#f59e0b" },
    { name: "Others", value: 8, color: "#64748b" },
]

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cross-Area Analytics</h1>
                    <p className="text-muted-foreground">Deep dive into comparative performance between operational cities.</p>
                </div>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Regional Filter</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">High Performance Area</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-bold italic">SURABAYA</h3>
                                <p className="text-xs text-green-600 font-bold flex items-center">
                                    <ArrowUpRight className="size-3 mr-1" /> +15.4% YoY Growth
                                </p>
                            </div>
                            <Globe className="size-8 text-blue-500 opacity-20" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Low Cancel Rate Area</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-bold italic">BATU</h3>
                                <p className="text-xs text-green-600 font-bold flex items-center">
                                    <ArrowDownRight className="size-3 mr-1" /> 1.8% Minimum
                                </p>
                            </div>
                            <Map className="size-8 text-orange-500 opacity-20" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-primary text-primary-foreground">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm opacity-80 uppercase tracking-widest">Global Market Leader</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold italic">EAST JAVA HUB</div>
                        <p className="text-xs opacity-70">Dominating 82% of regional traffic</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>City Order & Revenue Comparison</CardTitle>
                        <CardDescription>Volume and financial scale per area.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={cityComparisonData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="city" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} hide />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Regional Revenue Share</CardTitle>
                        <CardDescription>Market distribution among cities.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueShareData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {revenueShareData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Efficiency & Cancel Rate by Area</CardTitle>
                    <CardDescription>Operational quality tracking.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {cityComparisonData.map((city) => (
                        <div key={city.city} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{city.city}</span>
                                <span className={city.cancelRate > 4 ? "text-red-500 font-bold" : "text-muted-foreground"}>
                                    {city.cancelRate}% Cancel Rate
                                </span>
                            </div>
                            <Progress value={city.cancelRate * 10} className="h-2" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
