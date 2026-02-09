"use client"

import * as React from "react"
import {
    Map,
    Clock,
    Plus,
    Search,
    Power,
    Settings,
    MoreVertical,
    LocateFixed,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Separator } from "@/components/ui/separator"

const zones = [
    { id: "ZO-001", name: "Malang Kota", status: "Active", hours: "00:00 - 23:59", fleet: 45, density: "High" },
    { id: "ZO-002", name: "Batu Tourism", status: "Active", hours: "06:00 - 22:00", fleet: 12, density: "Medium" },
    { id: "ZO-003", name: "Surabaya Pusat", status: "Active", hours: "00:00 - 23:59", fleet: 82, density: "Extreme" },
    { id: "ZO-004", name: "Kepunjen Suburbs", status: "Inactive", hours: "08:00 - 18:00", fleet: 0, density: "Low" },
    { id: "ZO-005", name: "Sidoarjo Industrial", status: "Maintenance", hours: "Locked", fleet: 0, density: "None" },
]

export default function AreaManagement() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Regional Controls</h1>
                    <p className="text-muted-foreground">Manage service availability across different cities and zones.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" /> Expand to New Zone
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-blue-600 text-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-widest">Global Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold italic flex items-center gap-2">
                            <LocateFixed className="size-8" /> ALL REGIONS OP
                        </div>
                        <p className="text-xs mt-2 opacity-70">Latency: 12ms | Cluster: SEA-CENTRAL</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Maintenance Window</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold italic">SUNDAY</p>
                            <p className="text-xs text-muted-foreground">02:00 AM - 03:00 AM</p>
                        </div>
                        <Clock className="size-8 text-muted-foreground opacity-20" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0 Requests</div>
                        <p className="text-xs text-muted-foreground">All zone changes verified</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search zone by name or ID..." className="pl-8" />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active Operation Zones</CardTitle>
                    <CardDescription>Direct control over live regional services.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Zone ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Oper. Hours</TableHead>
                                <TableHead>Density</TableHead>
                                <TableHead>Live Fleet</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {zones.map((zone) => (
                                <TableRow key={zone.id}>
                                    <TableCell className="font-mono text-xs">{zone.id}</TableCell>
                                    <TableCell className="font-bold">{zone.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground uppercase">{zone.hours}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            zone.density === "Extreme" ? "text-red-500 border-red-500 bg-red-50" :
                                                zone.density === "High" ? "text-orange-500 border-orange-500 bg-orange-50" : "text-slate-500"
                                        }>{zone.density}</Badge>
                                    </TableCell>
                                    <TableCell>{zone.fleet}</TableCell>
                                    <TableCell>
                                        <Badge variant={zone.status === "Active" ? "default" : "secondary"}>
                                            {zone.status}
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
                                                <DropdownMenuLabel>Zone Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Clock className="mr-2 h-4 w-4" /> Edit Hours
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Settings className="mr-2 h-4 w-4" /> Config Detail
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Power className="mr-2 h-4 w-4" /> Force Halt
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

            <p className="text-[10px] text-muted-foreground italic text-center uppercase tracking-tighter">
                MASTER CONTROL PANEL • CONSOLE V5.9.1 • ALL ACTIONS ARE LOGGED IN AUDIT VAULT
            </p>
        </div>
    )
}
