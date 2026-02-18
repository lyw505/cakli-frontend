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
    { city: "Malang", orders: 4500, revenue: 85000000, cancelRate: 2.1, color: "#E04D04" }, // Cakli Orange
    { city: "Surabaya", orders: 9200, revenue: 180000000, cancelRate: 4.5, color: "#3b82f6" }, // Blue-500
    { city: "Batu", orders: 2100, revenue: 42000000, cancelRate: 1.8, color: "#22c55e" }, // Green-500
    { city: "Sidoarjo", orders: 3400, revenue: 62000000, cancelRate: 3.2, color: "#8b5cf6" }, // Purple-500
]

const revenueShareData = [
    { name: "Surabaya", value: 55, color: "#3b82f6" }, // Blue-500
    { name: "Malang", value: 25, color: "#E04D04" }, // Cakli Orange
    { name: "Batu", value: 12, color: "#22c55e" }, // Green-500
    { name: "Others", value: 8, color: "#8b5cf6" }, // Purple-500
]

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analisis Lintas Area</h1>
                    <p className="text-muted-foreground">Analisis mendalam perbandingan performa antar kota operasional.</p>
                </div>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter Regional</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-4 ml-4 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Area Performa Tinggi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-2xl font-bold">SURABAYA</h3>
                                        <p className="text-xs text-cakli-green font-bold flex items-center">
                                            <ArrowUpRight className="size-3 mr-1" /> +15.4% Pertumbuhan YoY
                                        </p>
                                    </div>
                                    <Globe className="size-8 text-orange-500 opacity-20" />
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-4 ml-4 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Area Tingkat Pembatalan Rendah</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-2xl font-bold">BATU</h3>
                                        <p className="text-xs text-cakli-green font-bold flex items-center">
                                            <ArrowDownRight className="size-3 mr-1" /> 1.8% Minimum
                                        </p>
                                    </div>
                                    <Map className="size-8 text-orange-500 opacity-20" />
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-4 ml-4 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Pemimpin Pasar Global</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">HUB JAWA TIMUR</div>
                                <p className="text-xs opacity-70">Mendominasi 82% lalu lintas regional</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Perbandingan Pesanan & Pendapatan Kota</CardTitle>
                        <CardDescription>Volume dan skala finansial per area.</CardDescription>
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
                                    <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
                                        {cityComparisonData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                    <Bar dataKey="revenue" fill="#E04D04" radius={[4, 4, 0, 0]} hide />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pangsa Pendapatan Regional</CardTitle>
                        <CardDescription>Distribusi pasar antar kota.</CardDescription>
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
                    <CardTitle>Efisiensi & Tingkat Pembatalan per Area</CardTitle>
                    <CardDescription>Pelacakan kualitas operasional.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {cityComparisonData.map((city) => (
                        <div key={city.city} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">{city.city}</span>
                                <span className={city.cancelRate > 4 ? "text-orange-500 font-bold" : "text-muted-foreground"}>
                                    {city.cancelRate}% Tingkat Pembatalan
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
