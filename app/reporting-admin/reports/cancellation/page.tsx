    "use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileJson,
    Search,
    AlertCircle,
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

const cancellationData = [
    { id: "ORD-8919", date: "2024-02-09", reason: "Permintaan pengemudi", type: "Dibatalkan Pelanggan", penalty: "Tidak", area: "Malang Kota" },
    { id: "ORD-8850", date: "2024-02-08", reason: "Pengemudi terlalu jauh", type: "Dibatalkan Pelanggan", penalty: "Tidak", area: "Sukun" },
    { id: "ORD-8842", date: "2024-02-08", reason: "Masalah kendaraan", type: "Dibatalkan Pengemudi", penalty: "Ya", area: "Lowokwaru" },
    { id: "ORD-8790", date: "2024-02-07", reason: "Tidak ada respon", type: "Sistem Habis Waktu", penalty: "Tidak", area: "Blimbing" },
    { id: "ORD-8755", date: "2024-02-06", reason: "Berubah pikiran", type: "Dibatalkan Pelanggan", penalty: "Rp 2.000", area: "Malang Kota" },
]

export default function CancellationReportPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analisis Pembatalan</h1>
                    <p className="text-muted-foreground">Tinjau pesanan yang dibatalkan dan alasannya.</p>
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
                                Excel (.xlsx)
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileJson className="mr-2 h-4 w-4" />
                                PDF (.pdf)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                <div className="col-span-2 lg:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari ID Pesanan..."
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

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tingkat Pembatalan</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">4.2%</div>
                        <p className="text-xs text-muted-foreground">+0.5% dari minggu lalu</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pembatalan oleh Pengemudi</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.8%</div>
                        <p className="text-xs text-muted-foreground">Alasan utama: Masalah Kendaraan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pembatalan oleh Pelanggan</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2.4%</div>
                        <p className="text-xs text-muted-foreground">Alasan utama: Pengemudi terlalu jauh</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Log Pesanan Dibatalkan</CardTitle>
                    <CardDescription>Log rincian pembatalan pesanan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Pesanan</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Alasan</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Denda</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cancellationData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono">{item.id}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.reason}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {item.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{item.area}</TableCell>
                                    <TableCell className="font-medium text-destructive">{item.penalty}</TableCell>
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
