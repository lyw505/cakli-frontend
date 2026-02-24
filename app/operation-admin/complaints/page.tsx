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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MoreHorizontal, MessageSquareWarning, ArrowRightCircle } from "lucide-react"

const complaints = [
    { id: "TKT-001", type: "User -> Driver", subject: "Perilaku kasar", from: "Rina S.", to: "Budi Santoso", status: "New", priority: "High" },
    { id: "TKT-002", type: "Driver -> User", subject: "Penumpang menolak membayar", from: "Siti Aminah", to: "Ahmad J.", status: "Investigating", priority: "Medium" },
    { id: "TKT-003", type: "User -> Driver", subject: "Mengemudi tidak aman", from: "Dewi P.", to: "Joko W.", status: "Resolved", priority: "High" },
    { id: "TKT-004", type: "User -> App", subject: "Aplikasi crash", from: "Kevin L.", to: "Support", status: "Escalated", priority: "Low" },
    { id: "TKT-005", type: "Driver -> App", subject: "Masalah GPS", from: "Budi Santoso", to: "Support", status: "Resolved", priority: "Medium" },
]

function translateStatus(status: string) {
    if (status === "New") return "Baru"
    if (status === "Investigating") return "Sedang Diselidiki"
    if (status === "Resolved") return "Selesai"
    if (status === "Escalated") return "Diteruskan"
    return status
}

function translatePriority(priority: string) {
    if (priority === "High") return "Tinggi"
    if (priority === "Medium") return "Sedang"
    if (priority === "Low") return "Rendah"
    return priority
}

export default function ComplaintsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Keluhan & Perselisihan</h1>
                    <p className="text-muted-foreground">Tangani laporan dari pengguna dan driver.</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Cari tiket..."
                        className="pl-8"
                    />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Prioritas</SelectItem>
                        <SelectItem value="high">Tinggi</SelectItem>
                        <SelectItem value="medium">Sedang</SelectItem>
                        <SelectItem value="low">Rendah</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="new">Baru</SelectItem>
                        <SelectItem value="investigating">Sedang Diselidiki</SelectItem>
                        <SelectItem value="resolved">Selesai</SelectItem>
                        <SelectItem value="escalated">Diteruskan</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID Tiket</TableHead>
                            <TableHead>Jenis</TableHead>
                            <TableHead>Subjek</TableHead>
                            <TableHead>Dari / Untuk</TableHead>
                            <TableHead>Prioritas</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {complaints.map((complaint) => (
                            <TableRow key={complaint.id}>
                                <TableCell className="font-medium">{complaint.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
                                        {complaint.type}
                                    </div>
                                </TableCell>
                                <TableCell>{complaint.subject}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">Dari: {complaint.from}</span>
                                        <span className="text-xs text-muted-foreground">Untuk: {complaint.to}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            complaint.priority === "High"
                                                ? "destructive"
                                                : complaint.priority === "Medium"
                                                    ? "default"
                                                    : "secondary"
                                        }
                                    >
                                        {translatePriority(complaint.priority)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {translateStatus(complaint.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-8">
                                                    Tinjau
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>Keputusan Perselisihan: {complaint.id}</DialogTitle>
                                                    <DialogDescription>Tinjau bukti dan keluarkan keputusan operasional akhir.</DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="p-3 bg-secondary/50 rounded-lg text-sm border font-mono">
                                                        "Driver terlambat 15 menit dan sangat tidak sopan saat saya bertanya mengapa." - {complaint.from}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Button variant="outline" className="text-xs uppercase font-bold text-orange-900">Pesanan Valid</Button>
                                                        <Button variant="outline" className="text-xs uppercase font-bold text-orange-700">Tidak Valid/Fraud</Button>
                                                    </div>
                                                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Konfirmasi Keputusan</Button>
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
                                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                <DropdownMenuItem>Tinjau Linimasa Lengkap</DropdownMenuItem>
                                                <DropdownMenuItem>Hubungi Pengguna</DropdownMenuItem>
                                                <DropdownMenuItem>Hubungi Driver</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-orange-600 font-medium">
                                                    <ArrowRightCircle className="mr-2 h-4 w-4" /> Teruskan ke Master
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
