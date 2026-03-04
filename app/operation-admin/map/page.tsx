"use client"

import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Map as MapIcon,
    Navigation,
    Layers,
    Maximize2,
    Users,
    Truck,
    AlertCircle
} from "lucide-react"

export default function MapPage() {
    return (
        <div className="flex flex-col h-full gap-6 p-6 pb-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Real-time Map Monitoring</h1>
                    <p className="text-muted-foreground">Spatial visualization of active fleet and order distribution.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Layers className="h-4 w-4" />
                        Layers
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Maximize2 className="h-4 w-4" />
                        Fullscreen
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-4 flex-1">
                {/* Map Area */}
                <Card className="lg:col-span-3 h-[600px] relative overflow-hidden bg-slate-100 dark:bg-slate-900 border-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Placeholder for real map */}
                        <div className="flex flex-col items-center gap-4 text-muted-foreground animate-pulse">
                            <MapIcon className="h-16 w-16" />
                            <p className="font-medium">Initializing Real-time Spatial Layer...</p>
                        </div>
                    </div>

                    {/* UI Overlays on Map */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur shadow-sm border-orange-200 text-orange-700">
                            <Truck className="w-3 h-3 mr-2" />
                            12 Active Becak
                        </Badge>
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur shadow-sm border-red-200 text-red-700">
                            <AlertCircle className="w-3 h-3 mr-2" />
                            2 Problematic Orders
                        </Badge>
                    </div>

                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                        <div className="bg-white p-2 rounded-lg shadow-lg border space-y-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8">+</Button>
                            <div className="h-px bg-slate-200" />
                            <Button size="icon" variant="ghost" className="h-8 w-8">-</Button>
                        </div>
                    </div>
                </Card>

                {/* Legend & Quick Stats */}
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Hotspots (High Demand)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Malang Kota</span>
                                <Badge className="bg-red-500">Very High</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Suhat</span>
                                <Badge className="bg-orange-500">High</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Sawojajar</span>
                                <Badge className="bg-yellow-500">Moderate</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle className="text-sm">Nearby Drivers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                { name: "Budi S.", dist: "200m", status: "Active" },
                                { name: "Siti A.", dist: "450m", status: "Idle" },
                                { name: "Joko W.", dist: "1.2km", status: "Heading to Base" },
                            ].map((d, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className={`size-2 rounded-full ${d.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`} />
                                        <span className="text-xs font-semibold">{d.name}</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">{d.dist}</span>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full text-xs text-orange-600 mt-2">View Full List</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
