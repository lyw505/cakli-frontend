"use client"

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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal, Filter, Download } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, UserPlus, XCircle, Info, MapPin, User, Truck, Clock, DollarSign } from "lucide-react"

const orders = [
    { id: "ORD-001", customer: "Rina S.", driver: "Budi Santoso", status: "Ongoing", date: "2023-10-27 10:30", amount: "Rp 15.000", origin: "Sawojajar", dest: "Suhat", dist: "4.2km" },
    { id: "ORD-002", customer: "Ahmad J.", driver: "Siti Aminah", status: "Ongoing", date: "2023-10-27 10:45", amount: "Rp 25.000", origin: "Dinoyo", dest: "Matos", dist: "2.5km" },
    { id: "ORD-005", customer: "Sarah M.", driver: "Rudi H.", status: "Completed", date: "2023-10-27 09:15", amount: "Rp 12.000", origin: "Landungsari", dest: "UM", dist: "5.1km" },
    { id: "ORD-006", customer: "Doni P.", driver: "Eko W.", status: "Cancelled", date: "2023-10-27 08:30", amount: "Rp 0", origin: "Arjosari", dest: "Stasiun", dist: "7.8km" },
    { id: "ORD-007", customer: "Lina K.", driver: "Agus T.", status: "Completed", date: "2023-10-27 08:10", amount: "Rp 18.000", origin: "Gadang", dest: "Klayatan", dist: "1.8km" },
]

function translateStatus(status: string) {
    if (status === "Ongoing") return "Berlangsung"
    if (status === "Completed") return "Selesai"
    if (status === "Cancelled") return "Dibatalkan"
    return status
}

export default function OrdersPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Pesanan</h1>
                    <p className="text-muted-foreground">Kelola pesanan yang sedang berlangsung dan yang sudah lewat.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Ekspor Data</Button>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-2">
                    <Input placeholder="Cari pesanan..." className="max-w-[300px]" />
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="ongoing">Berlangsung</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                            <SelectItem value="cancelled">Dibatalkan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID Pesanan</TableHead>
                            <TableHead>Pelanggan</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Biaya</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.driver}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.amount}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            order.status === "Ongoing"
                                                ? "default"
                                                : order.status === "Completed"
                                                    ? "secondary"
                                                    : "destructive"
                                        }
                                    >
                                        {translateStatus(order.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-8">
                                                    <Info className="h-3.5 w-3.5 mr-1" /> Detail
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>Detail Pesanan: {order.id}</DialogTitle>
                                                    <DialogDescription>Catatan operasional lengkap.</DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase text-muted-foreground font-bold">Pelanggan</p>
                                                            <div className="flex items-center gap-2">
                                                                <User className="size-3 text-primary" />
                                                                <p className="text-sm font-semibold">{order.customer}</p>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase text-muted-foreground font-bold">Driver</p>
                                                            <div className="flex items-center gap-2">
                                                                <Truck className="size-3 text-primary" />
                                                                <p className="text-sm font-semibold">{order.driver}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 border-t pt-4">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="size-3 text-red-500" />
                                                            <p className="text-xs font-medium">{order.origin}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="size-3 text-green-500" />
                                                            <p className="text-xs font-medium">{order.dest}</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 border-t pt-4">
                                                        <div className="p-2 bg-secondary/50 rounded-lg text-center">
                                                            <p className="text-[10px] text-muted-foreground">Jarak</p>
                                                            <p className="text-xs font-bold">{order.dist}</p>
                                                        </div>
                                                        <div className="p-2 bg-secondary/50 rounded-lg text-center">
                                                            <p className="text-[10px] text-muted-foreground">Biaya</p>
                                                            <p className="text-xs font-bold">{order.amount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Aksi Operasional</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <UserPlus className="mr-2 h-4 w-4" />
                                                    Tugaskan Ulang Driver
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-orange-600">
                                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                                    Tandai sebagai Bermasalah
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-orange-900">
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Batalkan Pesanan
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
