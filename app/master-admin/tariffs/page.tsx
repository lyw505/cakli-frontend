"use client"

import * as React from "react"
import {
    Save,
    History,
    TrendingDown,
    TrendingUp,
    Info,
    ChevronRight,
    Plus,
    Play,
    Edit,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function TariffManagement() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tariff Management</h1>
                    <p className="text-muted-foreground">Adjust system-wide pricing, surcharges, and minimum fares.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <History className="mr-2 h-4 w-4" /> View Logs
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Play className="mr-2 h-4 w-4" /> Activate New Tariff
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="active" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="active">Active Configuration</TabsTrigger>
                    <TabsTrigger value="history">Version History</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Core Pricing Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Base Pricing Structure</CardTitle>
                                <CardDescription>Standard rates for regular CakliBike services.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="base-fare" className="flex items-center justify-between">
                                            Price per KM
                                            <Badge variant="outline" className="text-xs">Current: Rp 2.500</Badge>
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground text-sm font-semibold">Rp</span>
                                            <Input id="base-fare" defaultValue="2500" type="number" />
                                            <span className="text-muted-foreground text-sm">/ km</span>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="min-fare" className="flex items-center justify-between">
                                            Minimum Fare (Flag Drop)
                                            <Badge variant="outline" className="text-xs">Current: Rp 12.000</Badge>
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground text-sm font-semibold">Rp</span>
                                            <Input id="min-fare" defaultValue="12000" type="number" />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold">Surcharges & Fees</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="night">Night Service (22:00-05:00)</Label>
                                            <Input id="night" defaultValue="+ 15%" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="surge">Max Surge Cap</Label>
                                            <Input id="surge" defaultValue="2.5x" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="platform">Platform Fee</Label>
                                            <Input id="platform" defaultValue="Rp 2.000" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="rain">Rain Surcharge</Label>
                                            <Input id="rain" defaultValue="+ Rp 3.000" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/50 flex justify-between">
                                <p className="text-xs text-muted-foreground">Last edited by Admin Goldi, 2 days ago</p>
                                <Button size="sm"><Edit className="mr-2 h-3 w-3" /> Edit Draft</Button>
                            </CardFooter>
                        </Card>

                        {/* Impact Simulation */}
                        <div className="space-y-6">
                            <Card className="bg-slate-50 dark:bg-slate-900 border-dashed">
                                <CardHeader>
                                    <CardTitle>Revenue Impact Simulation</CardTitle>
                                    <CardDescription>Projected outcome of current draft changes.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center py-6">
                                    <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-600">
                                        <TrendingUp className="size-8" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-green-600 font-mono">+4.5%</h3>
                                        <p className="text-sm text-muted-foreground">Estimated Gross Revenue Increase</p>
                                    </div>
                                    <div className="mt-8 w-full space-y-3 px-4">
                                        <div className="flex justify-between text-sm py-2 border-b">
                                            <span>5km Trip</span>
                                            <span className="font-mono">Rp 24.500 <ChevronRight className="inline size-3 mx-1 text-muted-foreground" /> <b>Rp 25.600</b></span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b">
                                            <span>10km Trip</span>
                                            <span className="font-mono">Rp 37.000 <ChevronRight className="inline size-3 mx-1 text-muted-foreground" /> <b>Rp 38.600</b></span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2">
                                            <span>Driver Take-home (Avg)</span>
                                            <span className="font-mono text-green-600">+ Rp 150.000 / week</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                                <CardHeader className="flex flex-row items-center gap-2 py-3">
                                    <Info className="size-4 text-blue-600" />
                                    <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Competitive Analysis</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-blue-800 dark:text-blue-300">
                                        Current prices are <b>5-8% lower</b> than Competitor G in Malang area, and matched in Surabaya.
                                        Increasing base fare by Rp 200 maintains competitiveness.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revision History</CardTitle>
                            <CardDescription>Archive of all tariff adjustments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Version</TableHead>
                                        <TableHead>Effective Date</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Key Changes</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { v: "v2.5.0-draft", date: "Pending", user: "Admin Goldi", change: "Base fare review (+4%)", status: "Draft" },
                                        { v: "v2.4.1", date: "Jan 15, 2024", user: "Admin Goldi", change: "Minimal adjustment", status: "Active" },
                                        { v: "v2.4.0", date: "Dec 01, 2023", user: "Admin Aulia", change: "Night surcharge added", status: "Archived" },
                                        { v: "v2.3.9", date: "Nov 12, 2023", user: "Admin Goldi", change: "Legacy base fare", status: "Archived" },
                                    ].map((row) => (
                                        <TableRow key={row.v}>
                                            <TableCell className="font-mono font-bold text-xs">{row.v}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.user}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{row.change}</TableCell>
                                            <TableCell>
                                                <Badge variant={row.status === "Active" ? "default" : row.status === "Draft" ? "outline" : "secondary"}>{row.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" disabled={row.status === "Draft"}>Rollback</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
