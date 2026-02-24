"use client"

import * as React from "react"
import {
    Users,
    Star,
    TrendingUp,
    TrendingDown,
    Award,
    Search,
    Ban,
    Truck,
    CheckCircle2
} from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"

import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const driverStats = [
    { name: "Ahmad Yani", orders: 154, rating: 4.9, cancelRate: "1.2%", status: "Top Performer", avatar: "A" },
    { name: "Slamet", orders: 132, rating: 4.7, cancelRate: "3.5%", status: "Stable", avatar: "S" },
    { name: "Eko", orders: 98, rating: 4.8, cancelRate: "0.5%", status: "Top Performer", avatar: "E" },
    { name: "Bambang", orders: 85, rating: 4.5, cancelRate: "5.2%", status: "Needs Review", avatar: "B" },
    { name: "Suprapto", orders: 72, rating: 4.2, cancelRate: "12.0%", status: "Warning", avatar: "U" },
]

function translateStatus(status: string) {
    if (status === "Top Performer") return "Performa Terbaik"
    if (status === "Stable") return "Stabil"
    if (status === "Needs Review") return "Butuh Tinjauan"
    if (status === "Warning") return "Peringatan"
    return status
}

const performanceData = [
    { name: "Ahmad", orders: 154 },
    { name: "Slamet", orders: 132 },
    { name: "Eko", orders: 98 },
    { name: "Bambang", orders: 85 },
    { name: "Suprapto", orders: 72 },
]

export default function DriverPerformancePage() {
    return (
        <div className="flex flex-col gap-6 p-6 pb-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Wawasan Performa Driver</h1>
                    <p className="text-muted-foreground">Analisis komprehensif efisiensi armada dan kualitas layanan.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rating Rata-rata Driver</CardTitle>
                        <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.72 / 5.0</div>
                        <p className="text-xs text-muted-foreground">+0.2 dari bulan lalu</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tingkat Batal Global</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2%</div>
                        <p className="text-xs text-green-600 font-medium">Menurun vs minggu lalu</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ukuran Armada Aktif</CardTitle>
                        <Truck className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">285</div>
                        <p className="text-xs text-muted-foreground">12 driver baru bergabung</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Driver Terbaik berdasarkan Pemenuhan Pesanan</CardTitle>
                        <CardDescription>Perbandingan visual total pesanan yang diselesaikan oleh performa terbaik.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            borderColor: "#E04D04",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="orders" fill="#E04D04" radius={[4, 4, 0, 0]} barSize={40}>
                                        {performanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? "#E04D04" : "#f97316"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Peringkat Driver</CardTitle>
                        <CardDescription>Tampilan cepat driver berdampak tinggi.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {driverStats.slice(0, 3).map((driver, i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="size-10 border-2 border-orange-100">
                                            <AvatarFallback>{driver.avatar}</AvatarFallback>
                                        </Avatar>
                                        {i === 0 && <Award className="absolute -top-1 -right-1 size-4 text-yellow-500 fill-yellow-500" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{driver.name}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="size-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-[10px] text-muted-foreground">Rating {driver.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-orange-600">{driver.orders}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Pesanan</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Tabel Performa Komprehensif</CardTitle>
                        <CardDescription>KPI mendetail untuk seluruh audit armada administratif.</CardDescription>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Filter driver..." className="pl-8 w-[250px]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama Driver</TableHead>
                                <TableHead>Total Pesanan</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Tingkat Batal</TableHead>
                                <TableHead>Label Status</TableHead>
                                <TableHead className="text-right">Efisiensi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {driverStats.map((driver) => (
                                <TableRow key={driver.name}>
                                    <TableCell className="font-medium">{driver.name}</TableCell>
                                    <TableCell>{driver.orders}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Star className="size-3 text-yellow-500 fill-yellow-500" />
                                            <span>{driver.rating}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className={cn(
                                        "font-medium",
                                        parseFloat(driver.cancelRate) > 5 ? "text-destructive" : "text-green-600"
                                    )}>
                                        {driver.cancelRate}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            driver.status === "Top Performer" ? "default" :
                                                driver.status === "Stable" ? "secondary" :
                                                    driver.status === "Warning" ? "destructive" : "outline"
                                        }>
                                            {translateStatus(driver.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {parseFloat(driver.cancelRate) < 5 ? (
                                                <TrendingUp className="size-3 text-green-500" />
                                            ) : (
                                                <TrendingDown className="size-3 text-red-500" />
                                            )}
                                            <span className="text-xs font-mono">
                                                {((driver.orders / 160) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
