"use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileJson,
    Search,
    Star,
    CheckCircle2,
    XCircle,
    TrendingUp,
    Trophy,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const driverData = [
    { id: "DRV-1024", name: "Agus Santoso", area: "Malang Kota", orders: 124, completion: "98%", rating: 4.8, status: "Aktif", cancelRate: "2%" },
    { id: "DRV-1025", name: "Siti Aminah", area: "Lowokwaru", orders: 98, completion: "92%", rating: 4.6, status: "Aktif", cancelRate: "8%" },
    { id: "DRV-1026", name: "Joko Wow", area: "Sukun", orders: 145, completion: "99%", rating: 4.9, status: "Aktif", cancelRate: "1%" },
    { id: "DRV-1027", name: "Rudi Hartono", area: "Blimbing", orders: 82, completion: "88%", rating: 4.2, status: "Peringatan", cancelRate: "12%" },
    { id: "DRV-1028", name: "Hendra P.", area: "Malang Kota", orders: 56, completion: "94%", rating: 4.7, status: "Aktif", cancelRate: "6%" },
]

export default function DriverPerformanceReportPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Wawasan Kinerja Pengemudi</h1>
                    <p className="text-muted-foreground">Analisis metrik pengemudi, penilaian, pembatalan, dan tingkat aktivitas.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Ekspor Laporan
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Rincian (.xlsx)
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileJson className="mr-2 h-4 w-4" />
                                Ringkasan (.pdf)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Performa Terbaik</CardTitle>
                        <Trophy className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Joko Wow</div>
                        <p className="text-xs text-muted-foreground">145 Pesanan bulan ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Penilaian</CardTitle>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.72</div>
                        <p className="text-xs text-muted-foreground">Berdasarkan 500+ ulasan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rata-rata Penyelesaian</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.5%</div>
                        <p className="text-xs text-muted-foreground">Target Operasional: 95%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tingkat Pembatalan Tinggi</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 Pengemudi</div>
                        <p className="text-xs text-muted-foreground">{">"} 10% Tingkat Pembatalan</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                <div className="col-span-2 lg:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari Nama atau ID Pengemudi..."
                            className="pl-8"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Input type="date" className="w-full" />
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger>
                            <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Area</SelectItem>
                            <SelectItem value="malang-kota">Malang Kota</SelectItem>
                            <SelectItem value="lowokwaru">Lowokwaru</SelectItem>
                            <SelectItem value="sukun">Sukun</SelectItem>
                            <SelectItem value="blimbing">Blimbing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-end">
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Metrik Pengemudi</CardTitle>
                    <CardDescription>Data kinerja untuk periode yang dipilih.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pengemudi</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Pesanan</TableHead>
                                <TableHead>Penyelesaian</TableHead>
                                <TableHead>Tingkat Pembatalan</TableHead>
                                <TableHead>Penilaian</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {driverData.map((driver) => (
                                <TableRow key={driver.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 hidden md:block">
                                                <AvatarImage src={`/avatars/${driver.id}.jpg`} alt={driver.name} />
                                                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{driver.name}</span>
                                                <span className="text-xs text-muted-foreground">{driver.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{driver.area}</TableCell>
                                    <TableCell>{driver.orders}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {parseInt(driver.completion) > 90 ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-orange-500" />
                                            )}
                                            {driver.completion}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-red-500 font-medium">
                                        {driver.cancelRate}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            {driver.rating}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={driver.status === "Aktif" ? "default" : "destructive"}>
                                            {driver.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="h-8 w-auto px-4" disabled>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">1</Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-[#E04D04] hover:bg-[#c94504]">2</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">4</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">5</Button>
                <Button variant="outline" size="sm" className="h-8 w-auto px-4">
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
