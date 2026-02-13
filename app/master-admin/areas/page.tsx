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
    MapPin,
    AlertCircle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const areas = [
    { id: "AR-MLG", name: "Malang Raya", capital: "Malang Kota", status: "Active", zones: 12, fleet: 450 },
    { id: "AR-SBY", name: "Surabaya Metro", capital: "Surabaya Pusat", status: "Active", zones: 24, fleet: 1200 },
    { id: "AR-SDA", name: "Sidoarjo", capital: "Sidoarjo Kota", status: "Maintenance", zones: 8, fleet: 0 },
]

const zones = [
    { id: "ZO-001", area: "Malang Raya", name: "Malang Kota", status: "Active", hours: "00:00 - 23:59", fleet: 120, density: "High" },
    { id: "ZO-002", area: "Malang Raya", name: "Batu Tourism", status: "Active", hours: "06:00 - 22:00", fleet: 45, density: "Medium" },
    { id: "ZO-003", area: "Surabaya Metro", name: "Surabaya Pusat", status: "Active", hours: "00:00 - 23:59", fleet: 320, density: "Extreme" },
    { id: "ZO-004", area: "Surabaya Metro", name: "Gubeng", status: "Active", hours: "24 Hours", fleet: 150, density: "High" },
    { id: "ZO-005", area: "Sidoarjo", name: "Waru Industrial", status: "Inactive", hours: "08:00 - 18:00", fleet: 0, density: "None" },
]

export default function AreaManagement() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Area & Zone Management</h1>
                    <p className="text-muted-foreground">Configure operational territories, zones, and service hours.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <MapPin className="mr-2 h-4 w-4" /> Add New Zone
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Launch New Area
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-blue-600 text-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-widest">System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold italic flex items-center gap-2">
                            <LocateFixed className="size-8" /> 2 REGIONS ACTIVE
                        </div>
                        <p className="text-xs mt-2 opacity-70">1 Region in Maintenance Mode</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Operational Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold italic">STANDARD</p>
                            <p className="text-xs text-muted-foreground">05:00 - 23:59 (Most Zones)</p>
                        </div>
                        <Clock className="size-8 text-muted-foreground opacity-20" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Expansion Alert</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Medan (Pending)</div>
                        <p className="text-xs text-muted-foreground">awaiting tariff approval</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="areas" className="w-full">
                <TabsList>
                    <TabsTrigger value="areas">Active Areas (Regions)</TabsTrigger>
                    <TabsTrigger value="zones">Operational Zones</TabsTrigger>
                </TabsList>

                <TabsContent value="areas" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Operations</CardTitle>
                            <CardDescription>Major territories where Cakli services are deployed.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Area ID</TableHead>
                                        <TableHead>Region Name</TableHead>
                                        <TableHead>Active Zones</TableHead>
                                        <TableHead>Total Fleet</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Control</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {areas.map((area) => (
                                        <TableRow key={area.id}>
                                            <TableCell className="font-mono text-xs">{area.id}</TableCell>
                                            <TableCell className="font-bold">{area.name}</TableCell>
                                            <TableCell>{area.zones}</TableCell>
                                            <TableCell>{area.fleet}</TableCell>
                                            <TableCell>
                                                <Badge variant={area.status === "Active" ? "default" : "secondary"}>
                                                    {area.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">Manage <MoreVertical className="ml-2 h-4 w-4" /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>{area.name} Controls</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Settings className="mr-2 h-4 w-4" /> Configure Constants
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Power className="mr-2 h-4 w-4" /> Deactivate Area
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
                </TabsContent>

                <TabsContent value="zones" className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search zone..." className="pl-8" />
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Zone Granularity</CardTitle>
                            <CardDescription>Specific operational districts and their parameters.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Zone ID</TableHead>
                                        <TableHead>Parent Area</TableHead>
                                        <TableHead>Zone Name</TableHead>
                                        <TableHead>Oper. Hours</TableHead>
                                        <TableHead>Density</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {zones.map((zone) => (
                                        <TableRow key={zone.id}>
                                            <TableCell className="font-mono text-xs">{zone.id}</TableCell>
                                            <TableCell className="text-muted-foreground">{zone.area}</TableCell>
                                            <TableCell className="font-bold">{zone.name}</TableCell>
                                            <TableCell className="text-xs uppercase font-mono bg-muted/50 p-1 rounded w-fit">{zone.hours}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={
                                                    zone.density === "Extreme" ? "text-red-500 border-red-500 bg-red-50" :
                                                        zone.density === "High" ? "text-orange-500 border-orange-500 bg-orange-50" : "text-slate-500"
                                                }>{zone.density}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={zone.status === "Active" ? "default" : "secondary"}>
                                                    {zone.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200">
                <AlertCircle className="size-5 text-yellow-600 mt-0.5" />
                <div>
                    <p className="text-sm font-bold text-yellow-900 dark:text-yellow-200 uppercase tracking-wider">Caution: Geo-Fencing</p>
                    <p className="text-xs text-yellow-800 dark:text-yellow-300">
                        Deactivating a Parent Area will instantly halt all associated zones. Drivers in active trips may be forced to complete offline.
                    </p>
                </div>
            </div>
        </div>
    )
}
