"use client"

import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Activity,
    Clock,
    AlertTriangle,
    UserX,
    MousePointerClick,
    TrendingDown,
    Search
} from "lucide-react"
import { Input } from "@/components/ui/input"

const activityData = [
    { id: "DRV-001", name: "Budi Santoso", issue: "Idle > 30 mins", location: "Suhat", duration: "32m", status: "Warning" },
    { id: "DRV-005", name: "Rudi H.", issue: "Frequent Cancellations", location: "Dinoyo", duration: "5 trips", status: "Critical" },
    { id: "DRV-009", name: "Agus T.", issue: "Sudden Offline", location: "Gadang", duration: "Just now", status: "Info" },
    { id: "DRV-012", name: "Slamet", issue: "Idle > 15 mins", location: "Matos", duration: "18m", status: "Stable" },
]

export default function ActivityPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Driver Activity Monitoring</h1>
                    <p className="text-muted-foreground">Detect non-productive patterns and sudden behavior changes.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-50">
                        <TrendingDown className="w-3 h-3 mr-2" />
                        2 Drivers Underperforming
                    </Badge>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Idle Drivers</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Waiting for 10+ mins</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">High Cancel Rate</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">More than 3 cancels/hr</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Offlines</CardTitle>
                        <UserX className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">In the last 30 mins</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Inactivity & Pattern Alerts</CardTitle>
                        <CardDescription>Drivers requiring operational attention.</CardDescription>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search drivers..." className="pl-8 w-[250px]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Driver</TableHead>
                                <TableHead>Issue Pattern</TableHead>
                                <TableHead>Last Location</TableHead>
                                <TableHead>Duration/Count</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activityData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-muted-foreground">{item.id}</div>
                                    </TableCell>
                                    <TableCell className="text-sm font-semibold">{item.issue}</TableCell>
                                    <TableCell className="text-sm">{item.location}</TableCell>
                                    <TableCell className="text-sm">{item.duration}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            item.status === "Critical" ? "destructive" :
                                                item.status === "Warning" ? "default" : "secondary"
                                        }>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="h-8 gap-1">
                                            <MousePointerClick className="h-3.5 w-3.5" />
                                            Intervention
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
