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

const orders = [
    { id: "ORD-001", customer: "Rina S.", driver: "Budi Santoso", status: "Ongoing", date: "2023-10-27 10:30", amount: "Rp 15.000" },
    { id: "ORD-002", customer: "Ahmad J.", driver: "Siti Aminah", status: "Ongoing", date: "2023-10-27 10:45", amount: "Rp 25.000" },
    { id: "ORD-005", customer: "Sarah M.", driver: "Rudi H.", status: "Completed", date: "2023-10-27 09:15", amount: "Rp 12.000" },
    { id: "ORD-006", customer: "Doni P.", driver: "Eko W.", status: "Cancelled", date: "2023-10-27 08:30", amount: "Rp 0" },
    { id: "ORD-007", customer: "Lina K.", driver: "Agus T.", status: "Completed", date: "2023-10-27 08:10", amount: "Rp 18.000" },
    { id: "ORD-008", customer: "Fajar S.", driver: "Budi Santoso", status: "Completed", date: "2023-10-26 18:45", amount: "Rp 20.000" },
]

export default function OrdersPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
                    <p className="text-muted-foreground">Manage ongoing and past orders.</p>
                </div>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Data</Button>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-2">
                    <Input placeholder="Search orders..." className="max-w-[300px]" />
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
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
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View Chronology</DropdownMenuItem>
                                            {order.status === "Ongoing" && (
                                                <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
