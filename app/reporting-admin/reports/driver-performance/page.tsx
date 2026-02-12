"use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileJson,
    Search,
    Star,
    CheckCircle2,
    XCircle,
    TrendingUp,
    Trophy,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const driverData = [
    { id: "DRV-1024", name: "Agus Santoso", area: "Malang Kota", orders: 124, completion: "98%", rating: 4.8, status: "Active", cancelRate: "2%" },
    { id: "DRV-1025", name: "Siti Aminah", area: "Lowokwaru", orders: 98, completion: "92%", rating: 4.6, status: "Active", cancelRate: "8%" },
    { id: "DRV-1026", name: "Joko Wow", area: "Sukun", orders: 145, completion: "99%", rating: 4.9, status: "Active", cancelRate: "1%" },
    { id: "DRV-1027", name: "Rudi Hartono", area: "Blimbing", orders: 82, completion: "88%", rating: 4.2, status: "Warning", cancelRate: "12%" },
    { id: "DRV-1028", name: "Hendra P.", area: "Malang Kota", orders: 56, completion: "94%", rating: 4.7, status: "Active", cancelRate: "6%" },
]

export default function DriverPerformanceReportPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Driver Performance Insight</h1>
                    <p className="text-muted-foreground">Analyze driver metrics, ratings, cancellations, and activity levels.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Export Report
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Details (.xlsx)
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileJson className="mr-2 h-4 w-4" />
                                Summary (.pdf)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                        <Trophy className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Joko Wow</div>
                        <p className="text-xs text-muted-foreground">145 Orders this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.72</div>
                        <p className="text-xs text-muted-foreground">Based on 500+ reviews</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.5%</div>
                        <p className="text-xs text-muted-foreground">Operational Target: 95%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">High Cancel Rate</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 Drivers</div>
                        <p className="text-xs text-muted-foreground">{">"} 10% Cancel Rate</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                <div className="col-span-2 lg:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search Driver Name or ID..."
                            className="pl-8"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Input type="date" className="w-full" />
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger>
                            <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            <SelectItem value="malang-kota">Malang Kota</SelectItem>
                            <SelectItem value="lowokwaru">Lowokwaru</SelectItem>
                            <SelectItem value="sukun">Sukun</SelectItem>
                            <SelectItem value="blimbing">Blimbing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-end">
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Driver Metrics</CardTitle>
                    <CardDescription>Performance data for the selected period.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Driver</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Completion</TableHead>
                                <TableHead>Cancel Rate</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {driverData.map((driver) => (
                                <TableRow key={driver.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 hidden md:block">
                                                <AvatarImage src={`/avatars/${driver.id}.jpg`} alt={driver.name} />
                                                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{driver.name}</span>
                                                <span className="text-xs text-muted-foreground">{driver.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{driver.area}</TableCell>
                                    <TableCell>{driver.orders}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {parseInt(driver.completion) > 90 ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-orange-500" />
                                            )}
                                            {driver.completion}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-red-500 font-medium">
                                        {driver.cancelRate}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            {driver.rating}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={driver.status === "Active" ? "default" : "destructive"}>
                                            {driver.status}
                                        </Badge>
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
