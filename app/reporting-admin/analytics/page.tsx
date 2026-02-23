"use client"

import * as React from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Line,
    LineChart,
} from "recharts"
import {
    TrendingUp,
    TrendingDown,
    Map,
    ArrowUpRight,
    ArrowDownRight,
    AlertCircle,
    Download,
    Filter,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const comparisonData = [
    { city: "Malang", orders: 15230, revenue: 18500, cancelRate: 4.2 },
    { city: "Surabaya", orders: 42100, revenue: 84200, cancelRate: 6.8 },
    { city: "Batu", orders: 4500, revenue: 9100, cancelRate: 2.1 },
    { city: "Sidoarjo", orders: 9200, revenue: 12300, cancelRate: 5.5 },
]

const growthTrend = [
    { month: "Jan", malang: 10, surabaya: 15, batu: 5 },
    { month: "Feb", malang: 12, surabaya: 18, batu: 4 },
    { month: "Mar", malang: 11, surabaya: 22, batu: 6 },
    { month: "Apr", malang: 14, surabaya: 25, batu: 8 },
    { month: "May", malang: 16, surabaya: 28, batu: 10 },
]

export default function CrossAreaAnalytics() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cross-Area Analytics</h1>
                    <p className="text-muted-foreground">Comparative performance metrics across operational regions.</p>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Region Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Regions</SelectItem>
                            <SelectItem value="active">Active Only</SelectItem>
                            <SelectItem value="growth">High Growth Only</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </div>
            </div>

            {/* Key Comparison Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Top Revenue City</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            Surabaya <ArrowUpRight className="text-green-500 size-5" />
                        </div>
                        <p className="text-xs text-muted-foreground">Contributes 68% of total gross revenue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Lowest Cancel Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            Batu <Badge variant="secondary" className="ml-2 text-green-600 bg-green-50">2.1%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Highest customer satisfaction score (4.9/5)</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Fastest Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            Sidoarjo <TrendingUp className="text-blue-500 size-5" />
                        </div>
                        <p className="text-xs text-muted-foreground">+5.8% MoM New User Acquisition</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Revenue vs Orders Comparison */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue vs Order Volume</CardTitle>
                        <CardDescription>Correlation between trip volume and gross revenue per city.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparisonData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="city" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="revenue" name="Revenue (juta)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                    <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Cancel Rate Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Cancellation Rate Analysis</CardTitle>
                        <CardDescription>Percentage of trips cancelled by driver or user.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparisonData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis dataKey="city" type="category" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="cancelRate" name="Cancel Rate %" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Expansion Strategy */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Map className="size-5 text-blue-600" />
                        <CardTitle>Expansion Strategy Insights</CardTitle>
                    </div>
                    <CardDescription>AI-driven recommendations for next operational zones based on current data.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <ArrowUpRight className="size-4 text-green-500" /> Primary Target: Gresik
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            High demand spillover from Surabaya West. Estimated 15% market capture in first 3 months due to industrial zone commute patterns.
                        </p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <AlertCircle className="size-4 text-orange-500" /> Optimization Needed: Surabaya East
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            Current cancel rate (6.8%) indicates driver shortage. Recommend increasing driver incentives in East Zones by 5% to match demand.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
