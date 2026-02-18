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
import { Search, MoreHorizontal, UserCheck, UserX, FileText, MessageSquareWarning } from "lucide-react"

const users = [
    { id: "USR-001", name: "Rina Sullistia", email: "rina@example.com", status: "Active", joined: "2023-01-15", orders: 24 },
    { id: "USR-002", name: "Ahmad Junaedi", email: "ahmad@example.com", status: "Suspended", joined: "2023-02-20", orders: 15 },
    { id: "USR-003", name: "Dewi Putri", email: "dewi@example.com", status: "Active", joined: "2023-03-10", orders: 8 },
    { id: "USR-004", name: "Kevin Lim", email: "kevin@example.com", status: "Active", joined: "2023-05-05", orders: 42 },
    { id: "USR-005", name: "Sarah Mara", email: "sarah@example.com", status: "Active", joined: "2023-06-12", orders: 12 },
]

export default function UsersPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Manage user accounts and status.</p>
                </div>
                <Button>Add New User</Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by name or email..."
                        className="pl-8"
                    />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead>Total Orders</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.status === "Active" ? "outline" : "destructive"}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.joined}</TableCell>
                                <TableCell>{user.orders}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Account Management</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <FileText className="mr-2 h-4 w-4" />
                                                Order History
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-orange-600">
                                                <MessageSquareWarning className="mr-2 h-4 w-4" />
                                                Check Reports
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {user.status === "Active" ? (
                                                <DropdownMenuItem className="text-orange-900">
                                                    <UserX className="mr-2 h-4 w-4" /> Suspend User
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem className="text-orange-600">
                                                    <UserCheck className="mr-2 h-4 w-4" /> Reactivate User
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
