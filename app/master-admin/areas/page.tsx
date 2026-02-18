"use client"

import * as React from "react"
import {
    Map,
    Clock,
    Plus,
    Search,
    Power,
    Settings,
    MoreVertical,
    LocateFixed,
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
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const zones = [
    { id: "ZO-001", name: "Malang Kota", status: "Active", hours: "00:00 - 23:59", fleet: 45, density: "High" },
    { id: "ZO-002", name: "Wisata Batu", status: "Active", hours: "06:00 - 22:00", fleet: 12, density: "Medium" },
    { id: "ZO-003", name: "Surabaya Pusat", status: "Active", hours: "00:00 - 23:59", fleet: 82, density: "Extreme" },
    { id: "ZO-004", name: "Pinggiran Kepanjen", status: "Inactive", hours: "08:00 - 18:00", fleet: 0, density: "Low" },
    { id: "ZO-005", name: "Industri Sidoarjo", status: "Maintenance", hours: "Terkunci", fleet: 0, density: "None" },
]

export default function AreaManagement() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kontrol Regional</h1>
                    <p className="text-muted-foreground">Kelola ketersediaan layanan di berbagai kota dan zona.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" /> Ekspansi ke Zona Baru
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Ekspansi Layanan Regional</DialogTitle>
                            <DialogDescription>Inisialisasi zona operasional baru untuk layanan Cakli.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="zone-name">Nama Zona/Kota</Label>
                                <Input id="zone-name" placeholder="cth. Jakarta Selatan" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="base-tariff">Tarif Dasar Awal</Label>
                                    <Input id="base-tariff" defaultValue="2500" type="number" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cluster">Node Klaster</Label>
                                    <Select defaultValue="sea-1">
                                        <SelectTrigger id="cluster">
                                            <SelectValue placeholder="Pilih klaster" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sea-1">SEA-CENTRAL-1</SelectItem>
                                            <SelectItem value="sea-2">SEA-WEST-2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="hours">Jam Operasional</Label>
                                <Input id="hours" defaultValue="00:00 - 23:59" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline">Batal</Button>
                            <Button className="bg-primary">Daftarkan Zona</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-4 ml-4 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Status Global</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex items-center gap-2">
                                    SEMUA REGION OP
                                </div>
                                <p className="text-xs mt-2 opacity-70">Latensi: 12ms | Klaster: SEA-CENTRAL</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>
                <Card className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-cakli-orange rounded-full my-4 ml-4 shrink-0" />
                        <div className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Jendela Pemeliharaan</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold">MINGGU</p>
                                    <p className="text-xs text-muted-foreground">02:00 WIB - 03:00 WIB</p>
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
                                <CardTitle className="text-sm font-medium">Persetujuan Tertunda</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0 Permintaan</div>
                                <p className="text-xs text-muted-foreground">Semua perubahan zona terverifikasi</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Cari zona berdasarkan nama atau ID..." className="pl-8" />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Zona Operasi Aktif</CardTitle>
                    <CardDescription>Kontrol langsung atas layanan regional langsung.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Zona</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Jam Operasional</TableHead>
                                <TableHead>Kepadatan</TableHead>
                                <TableHead>Armada Aktif</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {zones.map((zone) => (
                                <TableRow key={zone.id}>
                                    <TableCell className="font-mono text-xs">{zone.id}</TableCell>
                                    <TableCell className="font-bold">{zone.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground uppercase">{zone.hours}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            zone.density === "Extreme" ? "text-orange-700 border-orange-700 bg-orange-100" :
                                                zone.density === "High" ? "text-orange-600 border-orange-600 bg-orange-50" : "text-stone-500"
                                        }>{zone.density}</Badge>
                                    </TableCell>
                                    <TableCell>{zone.fleet}</TableCell>
                                    <TableCell>
                                        <Badge variant={zone.status === "Active" ? "default" : "secondary"}>
                                            {zone.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Aksi Zona</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Clock className="mr-2 h-4 w-4" /> Edit Jam
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Settings className="mr-2 h-4 w-4" /> Detail Konfigurasi
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-orange-700">
                                                    <Power className="mr-2 h-4 w-4" /> Paksa Berhenti
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <p className="text-[10px] text-muted-foreground italic text-center uppercase tracking-tighter">
                PANEL KONTROL UTAMA • KONSOL V5.9.1 • SEMUA AKSI TERCATAT DI BRANKAS AUDIT
            </p>
        </div>
    )
}
