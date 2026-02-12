"use client"

import * as React from "react"
import {
    Search,
    Filter,
    Eye,
    CalendarIcon,
    MapPin,
    User,
    Truck,
    Clock,
    Route,
    DollarSign
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

const orderHistory = [
    { id: "ORD-92812", customer: "Budi Santoso", driver: "Ahmad Yani", origin: "Sawojajar", dest: "Suhat", price: 15000, status: "Completed", date: "2024-02-12 10:15", dist: "4.2km", duration: "12m" },
    { id: "ORD-92813", customer: "Siti Aminah", driver: "Slamet", origin: "Dinoyo", dest: "Matos", price: 12000, status: "Completed", date: "2024-02-12 10:20", dist: "2.5km", duration: "8m" },
    { id: "ORD-92814", customer: "Joko Wow", driver: "-", origin: "Landungsari", dest: "UM", price: 18000, status: "Cancelled", date: "2024-02-12 10:25", dist: "5.1km", duration: "0m" },
    { id: "ORD-92815", customer: "Rini", driver: "Eko", origin: "Arjosari", dest: "Stasiun Kota", price: 25000, status: "Completed", date: "2024-02-12 10:30", dist: "7.8km", duration: "22m" },
    { id: "ORD-92816", customer: "Deni", driver: "Bambang", origin: "Gadang", dest: "Klayatan", price: 10000, status: "Completed", date: "2024-02-12 10:35", dist: "1.8km", duration: "5m" },
]

export default function OrderHistoryPage() {
    const [selectedOrder, setSelectedOrder] = React.useState<typeof orderHistory[0] | null>(null)

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Order Audit Logs</h1>
                    <p className="text-muted-foreground">Comprehensive history of all transactions and trip data.</p>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Audit Search</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        <div className="relative flex-1 min-w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by Order ID, Customer, or Driver..." className="pl-8" />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" /> More Filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

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
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="size-3 text-green-500" />
                                                        <p className="text-xs font-medium">{order.dest}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="p-3 bg-secondary/50 rounded-lg text-center space-y-1">
                                                    <Route className="size-3 mx-auto text-muted-foreground" />
                                                    <p className="text-[10px] text-muted-foreground">Distance</p>
                                                    <p className="text-xs font-bold">{order.dist}</p>
                                                </div>
                                                <div className="p-3 bg-secondary/50 rounded-lg text-center space-y-1">
                                                    <Clock className="size-3 mx-auto text-muted-foreground" />
                                                    <p className="text-[10px] text-muted-foreground">Duration</p>
                                                    <p className="text-xs font-bold">{order.duration}</p>
                                                </div>
                                                <div className="p-3 bg-secondary/50 rounded-lg text-center space-y-1">
                                                    <DollarSign className="size-3 mx-auto text-muted-foreground" />
                                                    <p className="text-[10px] text-muted-foreground">Tariff</p>
                                                    <p className="text-xs font-bold">Rp {order.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
