"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
<<<<<<< HEAD
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Cell,
=======
>>>>>>> reporting-admin
} from "recharts"
import {
    Calendar as CalendarIcon,
    Download,
    TrendingUp,
    Users,
    ShoppingCart,
    Wallet,
<<<<<<< HEAD
    Info,
    Ban,
    CheckCircle2,
=======
    ArrowUpRight,
    Search,
    MapPin,
    Clock,
>>>>>>> reporting-admin
} from "lucide-react"
import { addDays, format, startOfWeek, endOfWeek, isSameDay } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const hourlyData = [
    { name: "06:00", orders: 12, revenue: 150000 },
    { name: "08:00", orders: 45, revenue: 560000 },
    { name: "10:00", orders: 30, revenue: 380000 },
    { name: "12:00", orders: 55, revenue: 720000 },
    { name: "14:00", orders: 40, revenue: 510000 },
    { name: "16:00", orders: 65, revenue: 950000 },
    { name: "18:00", orders: 85, revenue: 1200000 },
    { name: "20:00", orders: 42, revenue: 620000 },
    { name: "22:00", orders: 15, revenue: 210000 },
]

<<<<<<< HEAD
const statusData = [
    { name: "Completed", value: 2350, color: "#10b981" },
    { name: "Cancelled", value: 142, color: "#ef4444" },
]

const dailyTrendData = [
    { date: "Feb 01", orders: 120 },
    { date: "Feb 02", orders: 132 },
    { date: "Feb 03", orders: 101 },
    { date: "Feb 04", orders: 134 },
    { date: "Feb 05", orders: 90 },
    { date: "Feb 06", orders: 230 },
    { date: "Feb 07", orders: 210 },
]

const areaData = [
    { name: "Malang Kota", orders: 850 },
    { name: "Surabaya Pusat", orders: 720 },
    { name: "Batu City", orders: 480 },
    { name: "Sidoarjo", orders: 390 },
    { name: "Gresik", orders: 150 },
=======
const recentOrders = [
    { id: "ORD-9001", time: "10:23", area: "Malang Kota", status: "Completed", amount: "Rp 24.000" },
    { id: "ORD-9002", time: "10:21", area: "Lowokwaru", status: "Completed", amount: "Rp 18.500" },
    { id: "ORD-9003", time: "10:15", area: "Sukun", status: "Cancelled", amount: "Rp 32.000" },
    { id: "ORD-9004", time: "10:10", area: "Malang Kota", status: "Completed", amount: "Rp 15.000" },
    { id: "ORD-9005", time: "09:58", area: "Batu", status: "Completed", amount: "Rp 45.000" },
>>>>>>> reporting-admin
]

export default function ReportingDashboard() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
<<<<<<< HEAD
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">Selamat datang, Risma!</h1>
=======
                    <h1 className="text-3xl font-bold tracking-tight">Business Overview</h1>
                    <p className="text-muted-foreground">Real-time performance metrics and business health check.</p>
>>>>>>> reporting-admin
                </div>
                <div className="flex items-center gap-2">
                    <div className={cn("grid gap-2")}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
<<<<<<< HEAD
                                        "w-[300px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground border-orange-200"
=======
                                        "w-[240px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
>>>>>>> reporting-admin
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button variant="outline" size="icon" title="Export CSV/PDF">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<<<<<<< HEAD
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">2,492</div>
                        <p className="text-xs text-muted-foreground mt-1">In selected period</p>
=======
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,350</div>
                        <p className="text-xs text-muted-foreground">+12% from last week</p>
>>>>>>> reporting-admin
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<<<<<<< HEAD
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Revenue</CardTitle>
                        <Wallet className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">Rp 45.2M</div>
                        <p className="text-xs text-muted-foreground mt-1">Gross earnings</p>
=======
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rp 45.2M</div>
                        <p className="text-xs text-muted-foreground">+8% from last week</p>
>>>>>>> reporting-admin
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Drivers</CardTitle>
                        <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
<<<<<<< HEAD
                        <div className="text-3xl font-bold">142</div>
                        <p className="text-xs text-green-600 font-medium mt-1">Currently Online</p>
=======
                        <div className="text-2xl font-bold">145</div>
                        <p className="text-xs text-muted-foreground">Currently online</p>
>>>>>>> reporting-admin
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
<<<<<<< HEAD
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Completion Rate</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">94.3%</div>
                        <p className="text-xs text-muted-foreground mt-1">Avg. fulfillment success</p>
=======
                        <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.2%</div>
                        <p className="text-xs text-muted-foreground">5.8% Cancelled</p>
>>>>>>> reporting-admin
                    </CardContent>
                </Card>
            </div>

<<<<<<< HEAD
            <div className="grid gap-6 lg:grid-cols-7">
                {/* Busy Hours Chart (Bar Chart as requested) */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Peak Busy Hours</CardTitle>
                        <CardDescription>Bar chart showing hours with highest order volume.</CardDescription>
=======
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Visualizations */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Order Trend</CardTitle>
                        <CardDescription>Daily order volume over the selected period.</CardDescription>
>>>>>>> reporting-admin
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
<<<<<<< HEAD
                                <BarChart data={hourlyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
=======
                                <AreaChart data={hourlyData}>
                                    <defs>
                                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
>>>>>>> reporting-admin
                                    <XAxis
                                        dataKey="name"
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
<<<<<<< HEAD
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(224, 77, 4, 0.05)' }}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            borderColor: "#E04D04",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                                        }}
                                    />
                                    <Bar
                                        dataKey="orders"
                                        fill="#E04D04"
                                        radius={[4, 4, 0, 0]}
                                        barSize={40}
=======
                                    />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#2563eb"
                                        fillOpacity={1}
                                        fill="url(#colorOrders)"
>>>>>>> reporting-admin
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

<<<<<<< HEAD
                {/* Top Areas */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Top Areas by Volume</CardTitle>
                        <CardDescription>Areas with the highest concentration of orders.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={areaData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        width={100}
                                    />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="orders" fill="#E04D04" radius={[0, 4, 4, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                {/* Status Comparison (Bar Chart as requested) */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Order Status Comparison</CardTitle>
                        <CardDescription>Completed vs. Cancelled orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statusData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        width={80}
                                    />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm border-t pt-3">
                                <div className="flex items-center gap-2 font-medium">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>2,350 Completed</span>
                                </div>
                                <span className="text-muted-foreground">94.3%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 font-medium">
                                    <Ban className="h-4 w-4 text-red-500" />
                                    <span>142 Cancelled</span>
                                </div>
                                <span className="text-muted-foreground">5.7%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Trend Line Chart */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Order Trend (Selected Period)</CardTitle>
                        <CardDescription>Line chart visualizing order volume fluctuations over days.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dailyTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#6B7280"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            borderColor: "#E04D04",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#E04D04"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#E04D04", strokeWidth: 2, stroke: "white" }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-lg flex gap-3">
                <Info className="h-5 w-5 text-orange-600 shrink-0" />
                <p className="text-sm text-orange-900 leading-relaxed">
                    <strong>Read-Only Mode:</strong> This dashboard is optimized for data analysis and reporting. No data can be modified from this view. For operational controls, please switch to the Operation Admin portal.
                </p>
            </div>
=======
                <div className="col-span-3 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Peak Hours</CardTitle>
                            <CardDescription>Busiest times of the day.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-orange-500" />
                                        <span className="text-sm font-medium">17:00 - 19:00</span>
                                    </div>
                                    <Badge variant="secondary">Highest</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-orange-500" />
                                        <span className="text-sm font-medium">11:00 - 13:00</span>
                                    </div>
                                    <Badge variant="outline">High</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm font-medium">07:00 - 09:00</span>
                                    </div>
                                    <Badge variant="outline">Moderate</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Areas</CardTitle>
                            <CardDescription>Regions with highest demand.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Malang Kota</span>
                                    </div>
                                    <span className="font-bold">45%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-secondary">
                                    <div className="h-2 rounded-full bg-primary" style={{ width: "45%" }} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Lowokwaru</span>
                                    </div>
                                    <span className="font-bold">30%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-secondary">
                                    <div className="h-2 rounded-full bg-primary" style={{ width: "30%" }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest transactions and order updates.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <a href="/reporting-admin/history">View All History <ArrowUpRight className="ml-2 h-4 w-4" /></a>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono text-xs">{order.id}</TableCell>
                                    <TableCell>{order.time}</TableCell>
                                    <TableCell>{order.area}</TableCell>
                                    <TableCell>{order.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === "Completed" ? "default" : "destructive"}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
>>>>>>> reporting-admin
        </div>
    )
}

