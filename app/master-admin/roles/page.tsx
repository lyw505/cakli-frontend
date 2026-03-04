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
    { name: "Goldi", role: "Manager Admin", access: "Full System", status: "Active", email: "goldi@cakli.com" },
    { name: "Aulia", role: "Master Admin", access: "Superuser", status: "Active", email: "aulia@cakli.com" },
    { name: "Risma", role: "Reporting Admin", access: "Read/Data Only", status: "Active", email: "risma@cakli.com" },
    { name: "Admin_O1", role: "Operation Admin", access: "Ops Dashboard", status: "Active", email: "ops1@cakli.com" },
    { name: "Dev_Internal", role: "System Admin", access: "Global Config", status: "Inactive", email: "dev@cakli.com" },
]

export default function RoleManagement() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
                    <p className="text-muted-foreground">Manage administrative roles and system permissions.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <UserPlus className="mr-2 h-4 w-4" /> New Admin Access
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="col-span-2 border border-slate-200">
                    <CardHeader>
                        <CardTitle>Team Hierarchy</CardTitle>
                        <CardDescription>Current administrative staff and assigned roles.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Filter by name or role..." className="pl-8" />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Staff</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Access Level</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
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
                                            <Badge variant={staff.status === "Active" ? "default" : "secondary"}>
                                                {staff.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="h-8">
                                                            View
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="border border-slate-200 shadow-none">
                                                        <DialogHeader>
                                                            <DialogTitle>Admin Profile: {staff.name}</DialogTitle>
                                                            <DialogDescription>Detailed access log and configuration.</DialogDescription>
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
                                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground italic">Current Role</p>
                                                                    <p className="text-sm font-semibold">{staff.role}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground italic">Access Level</p>
                                                                    <p className="text-sm font-semibold">{staff.access}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2 border-t pt-4">
                                                                <p className="text-[10px] uppercase font-bold text-muted-foreground italic">Recent Action</p>
                                                                <p className="text-xs">Changed global tariff v2.4.1 (2 hours ago)</p>
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
                                                        <DropdownMenuLabel>Control Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <ShieldCheck className="mr-2 h-4 w-4" /> Change Role
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <ClipboardList className="mr-2 h-4 w-4" /> View Audit Logs
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <ShieldAlert className="mr-2 h-4 w-4" /> Revoke Access
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
                                <ShieldAlert className="size-4 text-orange-500" /> Security Requirement
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-slate-400">
                                All administrative accounts are required to use Multi-Factor Authentication (MFA).
                                Access requests for "Master" roles must be approved by two regional heads.
                            </p>
                            <Button variant="secondary" size="sm" className="w-full text-xs h-7">Audit MFA Status</Button>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-sm">Quick Permissions Matrix</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { role: "Operation Admin", p: "Cancel Order, Driver Suspend" },
                                { role: "Reporting Admin", p: "Export Stats, View History" },
                                { role: "Master Admin", p: "Tariff Edit, Global Halt" },
                            ].map((row, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{row.role}</p>
                                    <p className="text-xs">{row.p}</p>
                                </div>
                            ))}
                            <Separator />
                            <Button variant="outline" size="sm" className="w-full text-xs">View Full Matrix <ArrowRight className="size-3 ml-2" /></Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
