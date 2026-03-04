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
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

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
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analitik Lintas Area</h1>
                    <p className="text-muted-foreground">Metrik performa komparatif di seluruh wilayah operasional.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Tabs defaultValue="harian">
                        <TabsList>
                            <TabsTrigger value="harian">Harian</TabsTrigger>
                            <TabsTrigger value="mingguan">Mingguan</TabsTrigger>
                            <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
                            <TabsTrigger value="tahunan">Tahunan</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter Wilayah" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Wilayah</SelectItem>
                            <SelectItem value="active">Hanya Aktif</SelectItem>
                            <SelectItem value="growth">Pertumbuhan Tinggi</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Ekspor Laporan
                    </Button>
                </div>
            </div>

            {/* Key Comparison Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Kota Pendapatan Tertinggi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            Surabaya <ArrowUpRight className="text-green-500 size-5" />
                        </div>
                        <p className="text-xs text-muted-foreground">Menyumbang 68% dari total pendapatan kotor</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Tingkat Pembatalan Terendah</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            Batu <Badge variant="secondary" className="ml-2 text-green-600 bg-green-50">2.1%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Skor kepuasan pelanggan tertinggi (4.9/5)</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pertumbuhan Tercepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            Sidoarjo <TrendingUp className="text-blue-500 size-5" />
                        </div>
                        <p className="text-xs text-muted-foreground">+5.8% MoM Akuisisi Pengguna Baru</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Revenue vs Orders Comparison */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pendapatan vs Volume Pesanan</CardTitle>
                        <CardDescription>Korelasi antara volume perjalanan dan pendapatan kotor per kota.</CardDescription>
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
                                    <Bar yAxisId="left" dataKey="revenue" name="Pendapatan (juta)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                    <Bar yAxisId="right" dataKey="orders" name="Pesanan" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Cancel Rate Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Analisis Tingkat Pembatalan</CardTitle>
                        <CardDescription>Persentase perjalanan yang dibatalkan oleh pengemudi atau pengguna.</CardDescription>
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
                                    <Bar dataKey="cancelRate" name="Tingkat Pembatalan %" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={30} />
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
                        <CardTitle>Wawasan Strategi Ekspansi</CardTitle>
                    </div>
                    <CardDescription>Rekomendasi berbasis AI untuk zona operasional berikutnya berdasarkan data saat ini.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <ArrowUpRight className="size-4 text-green-500" /> Target Utama: Gresik
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            Limpahan permintaan tinggi dari Surabaya Barat. Estimasi 15% penguasaan pasar dalam 3 bulan pertama karena pola komuter zona industri.
                        </p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <AlertCircle className="size-4 text-orange-500" /> Butuh Optimasi: Surabaya Timur
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            Tingkat pembatalan saat ini (6.8%) menunjukkan kekurangan pengemudi. Merekomendasikan peningkatan insentif pengemudi di Zona Timur sebesar 5% untuk mengimbangi permintaan.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
