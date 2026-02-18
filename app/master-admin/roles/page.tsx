"use client"

import * as React from "react"
import {
    ShieldCheck,
    UserPlus,
    ArrowRight,
    MoreVertical,
    ShieldAlert,
    Search,
    ClipboardList,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

const team = [
    { name: "Goldi", role: "Manager Admin", access: "Sistem Penuh", status: "Aktif", email: "goldi@cakli.com" },
    { name: "Aulia", role: "Master Admin", access: "Superuser", status: "Aktif", email: "aulia@cakli.com" },
    { name: "Risma", role: "Reporting Admin", access: "Baca/Data Saja", status: "Aktif", email: "risma@cakli.com" },
    { name: "Admin_O1", role: "Operation Admin", access: "Dasbor Operasional", status: "Aktif", email: "ops1@cakli.com" },
    { name: "Dev_Internal", role: "System Admin", access: "Konfigurasi Global", status: "Tidak Aktif", email: "dev@cakli.com" },
]

export default function RoleManagement() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kontrol Akses</h1>
                    <p className="text-muted-foreground">Kelola peran administratif dan izin sistem.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <UserPlus className="mr-2 h-4 w-4" /> Akses Admin Baru
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Hierarki Tim</CardTitle>
                        <CardDescription>Staf administratif saat ini dan peran yang ditugaskan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Filter berdasarkan nama atau peran..." className="pl-8" />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Staf</TableHead>
                                    <TableHead>Peran</TableHead>
                                    <TableHead>Tingkat Akses</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {team.map((staff) => (
                                    <TableRow key={staff.email}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-8">
                                                    <AvatarFallback className="text-[10px]">{staff.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-semibold">{staff.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">{staff.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-sm font-medium">{staff.role}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-muted-foreground font-mono">{staff.access}</p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={staff.status === "Aktif" ? "default" : "secondary"}>
                                                {staff.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="h-8">
                                                            Lihat
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Profil Admin: {staff.name}</DialogTitle>
                                                            <DialogDescription>Log akses dan konfigurasi terperinci.</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <Avatar className="size-12">
                                                                    <AvatarFallback>{staff.name[0]}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-bold">{staff.name}</p>
                                                                    <p className="text-sm text-muted-foreground">{staff.email}</p>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                                                                <div>
                                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground italic">Peran Saat Ini</p>
                                                                    <p className="text-sm font-semibold">{staff.role}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground italic">Tingkat Akses</p>
                                                                    <p className="text-sm font-semibold">{staff.access}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2 border-t pt-4">
                                                                <p className="text-[10px] uppercase font-bold text-muted-foreground italic">Aksi Terakhir</p>
                                                                <p className="text-xs">Mengubah tarif global v2.4.1 (2 jam yang lalu)</p>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Aksi Kontrol</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <ShieldCheck className="mr-2 h-4 w-4" /> Ubah Peran
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <ClipboardList className="mr-2 h-4 w-4" /> Lihat Log Audit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-orange-900">
                                                            <ShieldAlert className="mr-2 h-4 w-4" /> Cabut Akses
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-slate-950 text-slate-50 border-none">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <ShieldAlert className="size-4 text-orange-500" /> Persyaratan Keamanan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-slate-400">
                                Semua akun administratif diwajibkan menggunakan Autentikasi Multi-Faktor (MFA).
                                Permintaan akses untuk peran "Master" harus disetujui oleh dua kepala regional.
                            </p>
                            <Button variant="secondary" size="sm" className="w-full text-xs h-7">Audit Status MFA</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Matriks Izin Cepat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { role: "Operation Admin", p: "Batal Pesanan, Suspend Pengemudi" },
                                { role: "Reporting Admin", p: "Ekspor Statistik, Lihat Riwayat" },
                                { role: "Master Admin", p: "Edit Tarif, Penghentian Global" },
                            ].map((row, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{row.role}</p>
                                    <p className="text-xs">{row.p}</p>
                                </div>
                            ))}
                            <Separator />
                            <Button variant="outline" size="sm" className="w-full text-xs">Lihat Matriks Lengkap <ArrowRight className="size-3 ml-2" /></Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
