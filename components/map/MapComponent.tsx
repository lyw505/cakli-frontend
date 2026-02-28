"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Driver, Order, DemandArea, DriverStatus } from "@/app/operation-admin/map/page"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Navigation, User, MapPin, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Fix for default marker icons in Leaflet with React
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

// Custom Icons for Statuses
const getDriverIcon = (status: DriverStatus) => {
    const color =
        status === "available" ? "#22c55e" : // green
            status === "on-trip" ? "#3b82f6" : // blue
                status === "idle" ? "#eab308" : // yellow
                    "#94a3b8"; // slate

    return L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    })
}

const pickupIcon = L.divIcon({
    className: "pickup-icon",
    html: `<div style="background-color: #ef4444; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
})

const dropoffIcon = L.divIcon({
    className: "dropoff-icon",
    html: `<div style="background-color: #000; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
})

interface MapComponentProps {
    drivers: Driver[];
    orders: Order[];
    demandAreas: DemandArea[];
    layers: {
        drivers: boolean;
        orders: boolean;
        demand: boolean;
    };
}

// Map center for Malang
const center: [number, number] = [-7.9666, 112.6326]

export default function MapComponent({ drivers, orders, demandAreas, layers }: MapComponentProps) {
    return (
        <div className="h-full w-full relative">
            <MapContainer
                center={center}
                zoom={14}
                scrollWheelZoom={true}
                className="h-full w-full"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png"
                />

                {/* Demand Layer (Heatmap representation using Circles) */}
                {layers.demand && demandAreas.map((area) => (
                    <Circle
                        key={area.id}
                        center={[area.lat, area.lng]}
                        radius={800 * area.intensity}
                        pathOptions={{
                            fillColor: area.intensity > 0.8 ? "#ef4444" : area.intensity > 0.5 ? "#f97316" : "#eab308",
                            fillOpacity: 0.2,
                            color: "transparent",
                            className: "animate-pulse"
                        }}
                    >
                        <Popup>
                            <div className="p-1 space-y-1">
                                <h3 className="font-bold text-sm text-slate-800">{area.name}</h3>
                                <div className="flex items-center justify-between gap-4 text-xs">
                                    <span className="text-slate-500">Live Orders:</span>
                                    <span className="font-semibold">{area.orderCount}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 text-xs">
                                    <span className="text-slate-500">Available:</span>
                                    <span className="font-semibold">{area.driverCount}</span>
                                </div>
                                <Separator className="my-1" />
                                <div className="flex items-center justify-between gap-4 text-xs font-medium">
                                    <span className="text-slate-500">Surge:</span>
                                    <span className="text-rose-600">x1.{(area.intensity * 5).toFixed(0)}</span>
                                </div>
                            </div>
                        </Popup>
                    </Circle>
                ))}

                {/* Orders Layer */}
                {layers.orders && orders.map((order) => (
                    <div key={order.id}>
                        <Marker position={order.pickup} icon={pickupIcon}>
                            <Popup>
                                <div className="p-1">
                                    <Badge variant="outline" className="mb-1">Pickup: {order.id}</Badge>
                                    <p className="text-xs">Customer: {order.customerName}</p>
                                    <p className="text-xs">ETA: {order.eta}</p>
                                </div>
                            </Popup>
                        </Marker>
                        <Marker position={order.dropoff} icon={dropoffIcon}>
                            <Popup>
                                <div className="p-1">
                                    <Badge variant="outline" className="mb-1">Dropoff: {order.id}</Badge>
                                    <p className="text-xs">Customer: {order.customerName}</p>
                                </div>
                            </Popup>
                        </Marker>
                        {order.route.length > 0 && (
                            <Polyline
                                positions={order.route}
                                pathOptions={{ color: order.status === 'delayed' ? '#ef4444' : '#3b82f6', weight: 4, dashArray: order.status === 'on-the-way' ? '5, 10' : undefined }}
                            />
                        )}
                    </div>
                ))}

                {/* Drivers Layer */}
                {layers.drivers && drivers.map((driver) => (
                    <Marker
                        key={driver.id}
                        position={[driver.lat, driver.lng]}
                        icon={getDriverIcon(driver.status)}
                    >
                        <Popup className="driver-popup">
                            <div className="flex flex-col gap-2 min-w-[180px]">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="font-bold text-sm">{driver.name}</span>
                                    <Badge variant={driver.status === 'available' ? 'success' : driver.status === 'on-trip' ? 'blue' : 'neutral'} className="capitalize text-[10px] scale-90">
                                        {driver.status}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Truck className="w-3 h-3 text-muted-foreground" />
                                        <span>{driver.vehicle}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Navigation className="w-3 h-3 text-muted-foreground" />
                                        <span>Last Update: Just now</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs mt-1">
                                        <span className="text-yellow-500">★</span>
                                        <span>{driver.rating} Rating</span>
                                    </div>
                                </div>
                                <button className="bg-[#E04D04] text-white text-[10px] py-1 rounded-md mt-1 hover:bg-[#E04D04]/90 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <div className="leaflet-bottom leaflet-right !mb-4 !mr-4">
                    <div className="flex flex-col gap-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-2xl border border-slate-200">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors border-b" onClick={() => { }}>
                            <div className="w-4 h-4 flex items-center justify-center font-bold text-lg">+</div>
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => { }}>
                            <div className="w-4 h-4 flex items-center justify-center font-bold text-lg">-</div>
                        </button>
                    </div>
                </div>

            </MapContainer>
        </div>
    )
}
