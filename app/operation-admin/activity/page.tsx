"use client"

import * as React from "react"
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
import { Button } from "@/components/ui/button"
import {
    Activity,
    Clock,
    AlertTriangle,
    UserX,
    MousePointerClick,
    TrendingDown,
    Search
} from "lucide-react"
import { Input } from "@/components/ui/input"

const activityData = [
    { id: "DRV-001", name: "Budi Santoso", issue: "Diam > 30 menit", location: "Suhat", duration: "32m", status: "Warning" },
    { id: "DRV-005", name: "Rudi H.", issue: "Sering Membatalkan", location: "Dinoyo", duration: "5 trips", status: "Critical" },
    { id: "DRV-009", name: "Agus T.", issue: "Offline Mendadak", location: "Gadang", duration: "Baru saja", status: "Info" },
    { id: "DRV-012", name: "Slamet", issue: "Diam > 15 menit", location: "Matos", duration: "18m", status: "Stable" },
]

function translateStatus(status: string) {
    if (status === "Critical") return "Kritis"
    if (status === "Warning") return "Peringatan"
    if (status === "Info") return "Info"
    if (status === "Stable") return "Stabil"
    return status
}

export default function ActivityPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pemantauan Aktivitas Driver</h1>
                    <p className="text-muted-foreground">Deteksi pola tidak produktif dan perubahan perilaku mendadak.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-50">
                        <TrendingDown className="w-3 h-3 mr-2" />
                        2 Driver Berkinerja Rendah
                    </Badge>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Driver Diam</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Menunggu 10+ menit</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tingkat Batal Tinggi</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Lebih dari 3 pembatalan/jam</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Offline Terbaru</CardTitle>
                        <UserX className="h-4 w-4 text-orange-700" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">Dalam 30 menit terakhir</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Peringatan Inaktivitas & Pola</CardTitle>
                        <CardDescription>Driver yang membutuhkan perhatian operasional.</CardDescription>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Cari driver..." className="pl-8 w-[250px]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Driver</TableHead>
                                <TableHead>Pola Masalah</TableHead>
                                <TableHead>Lokasi Terakhir</TableHead>
                                <TableHead>Durasi/Jumlah</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activityData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">{item.id}</div>
                                    </TableCell>
                                    <TableCell className="text-sm font-semibold">{item.issue}</TableCell>
                                    <TableCell className="text-sm">{item.location}</TableCell>
                                    <TableCell className="text-sm">{item.duration}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            item.status === "Critical" ? "destructive" :
                                                item.status === "Warning" ? "default" : "secondary"
                                        }>
                                            {translateStatus(item.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                                            <MousePointerClick className="h-3.5 w-3.5" />
                                            Intervensi
                                        </Button>
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
