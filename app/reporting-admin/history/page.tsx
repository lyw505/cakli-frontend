"use client"

import * as React from "react"
import {
    Search,
    Filter,
    Eye,
    ArrowUpDown,
    Calendar as CalendarIcon,
    Download,
    FileSpreadsheet,
    FileJson,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const historyData = [
    { id: "ORD-8921", customer: "Budi Pratama", driver: "Agus Santoso", date: "2024-02-09 08:30", amount: "Rp 24.000", status: "Completed", pickup: "Jl. Merdeka No. 10", dropoff: "Malang City Point", area: "Malang Kota", distance: "4.2 km", duration: "18 mins" },
    { id: "ORD-8920", customer: "Sani Wijaya", driver: "Siti Aminah", date: "2024-02-09 08:15", amount: "Rp 18.500", status: "Completed", pickup: "Stasiun Malang", dropoff: "UB", area: "Lowokwaru", distance: "3.5 km", duration: "14 mins" },
    { id: "ORD-8919", customer: "Rizky D.", driver: "Joko Wow", date: "2024-02-09 07:45", amount: "Rp 32.000", status: "Cancelled", pickup: "Bandara Abd Saleh", dropoff: "Ijen Nirwana", area: "Sukun", distance: "12.0 km", duration: "-" },
    { id: "ORD-8918", customer: "Anisa K.", driver: "Rudi Hartono", date: "2024-02-09 07:10", amount: "Rp 15.000", status: "Completed", pickup: "Pasar Besar", dropoff: "Alun-alun", area: "Malang Kota", distance: "2.1 km", duration: "10 mins" },
    { id: "ORD-8917", customer: "Fahmi R.", driver: "Hendra P.", date: "2024-02-08 22:30", amount: "Rp 45.000", status: "Completed", pickup: "Batu Night Spectacular", dropoff: "Hotel Santika", area: "Batu", distance: "8.5 km", duration: "25 mins" },
]

export default function OrderHistoryPage() {
    const [selectedOrder, setSelectedOrder] = React.useState<typeof orderHistory[0] | null>(null)

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Order History & Reports</h1>
                    <p className="text-muted-foreground">Comprehensive log of all orders with reporting capabilities.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Export History
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

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by ID or customer..."
                            className="pl-8"
                        />
                    </div>
                    <Input type="date" className="w-[150px] md:w-[180px]" />
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            <SelectItem value="malang-kota">Malang Kota</SelectItem>
                            <SelectItem value="lowokwaru">Lowokwaru</SelectItem>
                            <SelectItem value="sukun">Sukun</SelectItem>
                            <SelectItem value="batu">Batu</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Trip</TableHead>
                        <TableHead>Tariff</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderHistory.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-mono text-xs">{order.id}</TableCell>
                            <TableCell className="text-sm">{order.date}</TableCell>
                            <TableCell className="font-medium">{order.customer}</TableCell>
                            <TableCell className="text-muted-foreground">{order.driver}</TableCell>
                            <TableCell className="text-xs">
                                <div className="flex flex-col">
                                    <span className="truncate max-w-[150px]">{order.origin} → {order.dest}</span>
                                    <span className="text-[10px] text-muted-foreground">{order.dist}</span>
                                </div>
                            </TableCell>
                            <TableCell className="font-semibold text-sm">Rp {order.price.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={order.status === "Completed" ? "default" : "destructive"}>
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                                            <Eye className="h-4 w-4 mr-2" /> Detail
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Order Detail Audit</DialogTitle>
                                            <DialogDescription>Full record for {order.id}</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase text-muted-foreground font-bold italic">Entity: Customer</p>
                                                    <div className="flex items-center gap-2">
                                                        <User className="size-3 text-orange-500" />
                                                        <p className="text-sm font-semibold">{order.customer}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase text-muted-foreground font-bold italic">Entity: Driver</p>
                                                    <div className="flex items-center gap-2">
                                                        <Truck className="size-3 text-orange-500" />
                                                        <p className="text-sm font-semibold">{order.driver}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="space-y-2">
                                                <p className="text-[10px] uppercase text-muted-foreground font-bold italic">Trip Path</p>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="size-3 text-red-500" />
                                                        <p className="text-xs font-medium">{order.origin}</p>
                                                    </div>
                                                    <div className="bg-muted p-3 rounded-lg text-xs space-y-1">
                                                        <p><span className="font-semibold">Distance:</span> {selectedOrder?.distance}</p>
                                                        <p><span className="font-semibold">Duration:</span> {selectedOrder?.duration}</p>
                                                        <p><span className="font-semibold">Payment:</span> CakliWallet</p>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
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
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    1
                </Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-[#E04D04] hover:bg-[#c94504]">
                    2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    3
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    4
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    5
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-auto px-4">
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
