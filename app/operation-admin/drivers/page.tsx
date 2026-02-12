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
import { Search, MoreHorizontal, UserCheck, UserX, FileText, Bike, ShieldCheck } from "lucide-react"

const drivers = [
    { id: "DRV-001", name: "Budi Santoso", status: "Online", vehicle: "Becak Listrik A-01", phone: "081234567890", rating: 4.8 },
    { id: "DRV-002", name: "Siti Aminah", status: "Offline", vehicle: "Becak Listrik A-02", phone: "081234567891", rating: 4.9 },
    { id: "DRV-003", name: "Joko Widodo", status: "Busy", vehicle: "Becak Listrik A-03", phone: "081234567892", rating: 4.7 },
    { id: "DRV-004", name: "Agus T.", status: "Online", vehicle: "Becak Listrik B-01", phone: "081234567893", rating: 4.5 },
    { id: "DRV-005", name: "Rudi H.", status: "Suspended", vehicle: "Becak Listrik B-02", phone: "081234567894", rating: 3.2 },
]

export default function DriversPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Driver Management</h1>
                    <p className="text-muted-foreground">Manage drivers and fleet.</p>
                </div>
                <Button>Add New Driver</Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by name or vehicle..."
                        className="pl-8"
                    />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Driver</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {drivers.map((driver) => (
                            <TableRow key={driver.id}>
                                <TableCell>
                                    <div className="font-medium">{driver.name}</div>
                                    <div className="text-xs text-muted-foreground">{driver.id}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Bike className="h-4 w-4 text-muted-foreground" />
                                        {driver.vehicle}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            driver.status === "Online"
                                                ? "default"
                                                : driver.status === "Busy"
                                                    ? "secondary"
                                                    : driver.status === "Suspended"
                                                        ? "destructive"
                                                        : "outline"
                                        }
                                    >
                                        {driver.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{driver.phone}</TableCell>
                                <TableCell>{driver.rating} / 5.0</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Fleet Operations</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <FileText className="mr-2 h-4 w-4" />
                                                Vehicle Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-green-600">
                                                <ShieldCheck className="mr-2 h-4 w-4" />
                                                Verify Driver
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {driver.status === "Suspended" ? (
                                                <DropdownMenuItem className="text-green-600">
                                                    <UserCheck className="mr-2 h-4 w-4" /> Reinstate Driver
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem className="text-red-600">
                                                    <UserX className="mr-2 h-4 w-4" /> Suspend Driver
                                                </DropdownMenuItem>
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
