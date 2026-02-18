"use client"

import * as React from "react"
import {
    Save,
    History,
    TrendingDown,
    TrendingUp,
    Info,
    ChevronRight,
    Plus,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TariffManagement() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Tarif</h1>
                    <p className="text-muted-foreground">Sesuaikan harga seluruh sistem dan lihat riwayat konfigurasi.</p>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" /> Simpan Harga Global
                </Button>
            </div>

            <Tabs defaultValue="active" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="active">Tarif Aktif</TabsTrigger>
                    <TabsTrigger value="history">Riwayat Versi</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Core Pricing Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Harga Layanan Inti</CardTitle>
                                <CardDescription>Tarif dasar yang diterapkan pada semua perjalanan standar.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="base-fare">Tarif Dasar (Per KM)</Label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground text-sm font-semibold">Rp</span>
                                            <Input id="base-fare" defaultValue="2500" type="number" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="min-fare">Tarif Minimum (Buka Pintu)</Label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground text-sm font-semibold">Rp</span>
                                            <Input id="min-fare" defaultValue="12000" type="number" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="text-sm font-semibold">Biaya Tambahan</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="night">Shift Malam (22:00 - 05:00)</Label>
                                            <Input id="night" defaultValue="15%" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="surge">Pengali Lonjakan (Maks)</Label>
                                            <Input id="surge" defaultValue="2.5x" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Price Preview / Impact */}
                        <Card className="bg-slate-50 dark:bg-slate-900 border-dashed">
                            <CardHeader>
                                <CardTitle>Simulasi Dampak</CardTitle>
                                <CardDescription>Perkiraan perubahan nilai rata-rata perjalanan.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center py-10">
                                <div className="size-20 rounded-full bg-orange-100 flex items-center justify-center mb-4 text-orange-600">
                                    <TrendingUp className="size-10" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-orange-600">+4.5%</h3>
                                    <p className="text-sm text-muted-foreground">Perkiraan Kenaikan Pendapatan Kotor Harian</p>
                                </div>
                                <div className="mt-8 w-full space-y-3 px-10">
                                    <div className="flex justify-between text-xs">
                                        <span>Estimasi Perjalanan 5km</span>
                                        <span className="font-bold">Rp 24.500 <ChevronRight className="inline size-3" /> Rp 25.600</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span>Estimasi Perjalanan 10km</span>
                                        <span className="font-bold">Rp 37.000 <ChevronRight className="inline size-3" /> Rp 38.600</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Log Revisi Tarif</CardTitle>
                            <CardDescription>Catatan historis perubahan harga sistem.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Versi</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Penulis</TableHead>
                                        <TableHead>Perubahan</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { v: "v2.4.1", date: "15 Jan 2024", user: "Admin Goldi", change: "Tarif dasar 2.4k -> 2.5k", status: "Aktif" },
                                        { v: "v2.4.0", date: "01 Des 2023", user: "Admin Aulia", change: "Menambahkan biaya malam", status: "Diarsipkan" },
                                        { v: "v2.3.9", date: "12 Nov 2023", user: "Admin Goldi", change: "Tarif min 10k -> 12k", status: "Diarsipkan" },
                                    ].map((row) => (
                                        <TableRow key={row.v}>
                                            <TableCell className="font-bold">{row.v}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.user}</TableCell>
                                            <TableCell className="text-sm italic text-muted-foreground">{row.change}</TableCell>
                                            <TableCell>
                                                <Badge variant={row.status === "Aktif" ? "default" : "secondary"}>{row.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Rollback</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200">
                <Info className="size-5 text-orange-600 mt-0.5" />
                <div>
                    <p className="text-sm font-bold text-orange-900 dark:text-orange-200 uppercase tracking-wider">Catatan Propagasi</p>
                    <p className="text-xs text-orange-800 dark:text-orange-300">
                        Tarif baru akan berlaku dalam 15-30 menit di seluruh segmen pengguna setelah disimpan. Perubahan dicatat dan diaudit secara otomatis.
                    </p>
                </div>
            </div>
        </div>
    )
}
