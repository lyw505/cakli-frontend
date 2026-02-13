"use client"

import * as React from "react"
import {
    ShieldCheck,
    UserPlus,
    ArrowRight,
    MoreVertical,
    ShieldAlert,
    Search,
    UserMinus,
    Key,
    Lock,
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
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
                    <h1 className="text-3xl font-bold tracking-tight">Access Control (IAM)</h1>
                    <p className="text-muted-foreground">Manage administrative roles, system permissions, and revocations.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <UserPlus className="mr-2 h-4 w-4" /> Add New Admin
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="col-span-2">
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
                                    <TableHead>Staff Identity</TableHead>
                                    <TableHead>Assigned Role</TableHead>
                                    <TableHead>Access Level</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Manage</TableHead>
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
                                            <Badge variant="outline" className="font-medium bg-secondary/50">{staff.role}</Badge>
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
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Key className="mr-2 h-4 w-4" /> Change Role / Permissions
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Lock className="mr-2 h-4 w-4" /> Reset MFA
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600 font-medium">
                                                        <UserMinus className="mr-2 h-4 w-4" /> Revoke Access
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

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Privilege Matrix</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { role: "Operation Admin", p: "Cancel Order, Driver Suspend" },
                                { role: "Reporting Admin", p: "Export Stats, View History" },
                                { role: "Master Admin", p: "Tariff Edit, Global Halt" },
                            ].map((row, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase bg-muted w-fit px-1 rounded">{row.role}</p>
                                    <p className="text-xs pl-1">{row.p}</p>
                                </div>
                            ))}
                            <Separator />
                            <Button variant="outline" size="sm" className="w-full text-xs">View Full Policy <ArrowRight className="size-3 ml-2" /></Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
