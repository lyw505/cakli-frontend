"use client"

import * as React from "react"
import {
    Download,
    Filter,
    FileSpreadsheet,
    FileJson,
    Calendar as CalendarIcon,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    CreditCard,
    DollarSign,
    Wallet,
    AlertCircle,
    TrendingUp,
} from "lucide-react"

import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const transactionData = [
    { id: "REV-2024-001", date: "2024-02-09", source: "Komisi Order", amount: "Rp 450.000", area: "Malang Kota", status: "Settled", type: "Credit" },
    { id: "REV-2024-002", date: "2024-02-09", source: "Biaya Layanan App", amount: "Rp 25.000", area: "Lowokwaru", status: "Settled", type: "Credit" },
    { id: "REV-2024-003", date: "2024-02-08", source: "Insentif Mitra", amount: "Rp 150.000", area: "Sukun", status: "Dibayarkan", type: "Debit" },
    { id: "REV-2024-004", date: "2024-02-08", source: "Langganan", amount: "Rp 150.000", area: "Semua Area", status: "Settled", type: "Credit" },
    { id: "REV-2024-005", date: "2024-02-07", source: "Refund Pelanggan", amount: "Rp 45.000", area: "Blimbing", status: "Disesuaikan", type: "Debit" },
]

const revenueTrendData = [
    { name: "Sen", gross: 4000000, net: 1200000 },
    { name: "Sel", gross: 3000000, net: 900000 },
    { name: "Rab", gross: 2000000, net: 600000 },
    { name: "Kam", gross: 2780000, net: 800000 },
    { name: "Jum", gross: 1890000, net: 500000 },
    { name: "Sab", gross: 2390000, net: 750000 },
    { name: "Min", gross: 3490000, net: 1100000 },
]

export default function RevenueReportPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kokpit Keuangan</h1>
                    <p className="text-muted-foreground">Panel kendali ekonomi menyeluruh: Pendapatan, Pencairan, dan Penyesuaian.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border">
                        <Button variant="ghost" size="sm" className="h-8">Harian</Button>
                        <Button variant="ghost" size="sm" className="h-8 bg-white dark:bg-slate-950 shadow-sm">Mingguan</Button>
                        <Button variant="ghost" size="sm" className="h-8">Bulanan</Button>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Ekspor Data
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Buku Besar Bulanan (.xlsx)
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FileJson className="mr-2 h-4 w-4" />
                                Laporan Pencairan (.pdf)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
                    <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                    <TabsTrigger value="breakdown">Rincian & Layanan</TabsTrigger>
                    <TabsTrigger value="settlement">Pencairan Mitra</TabsTrigger>
                    <TabsTrigger value="adjustments">Refund & Penyesuaian</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-4">
                    {/* KPI Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Pendapatan Kotor</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp 45.231.000</div>
                                <p className="text-xs text-muted-foreground">+20.1% dari bulan lalu</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pendapatan Bersih</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">Rp 12.450.000</div>
                                <p className="text-xs text-muted-foreground">Setelah insentif & promo</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pembayaran ke Mitra</CardTitle>
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp 28.500.000</div>
                                <p className="text-xs text-muted-foreground">78% dari order selesai</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Bakar Uang Promo</CardTitle>
                                <AlertCircle className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-500">Rp 4.281.000</div>
                                <p className="text-xs text-muted-foreground">9.4% dari Pendapatan Kotor</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Section Placeholder */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Tren Pendapatan</CardTitle>
                                <CardDescription>Performa Harian Pendapatan Kotor vs Bersih</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[200px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis
                                                dataKey="name"
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#888888"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `${value / 1000}k`}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                                                formatter={(value: any) => [`Rp ${value.toLocaleString()}`, ""]}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="gross" name="Kotor" stroke="#8884d8" strokeWidth={2} />
                                            <Line type="monotone" dataKey="net" name="Bersih" stroke="#82ca9d" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Sumber Pendapatan</CardTitle>
                                <CardDescription>Distribusi pemasukan berdasarkan kategori</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-full space-y-1">
                                            <p className="text-sm font-medium leading-none">Komisi CakliBike</p>
                                            <div className="h-2 w-full rounded-full bg-secondary">
                                                <div className="h-full w-[65%] rounded-full bg-primary" />
                                            </div>
                                            <p className="text-xs text-muted-foreground">65% (Rp 8.1M)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-full space-y-1">
                                            <p className="text-sm font-medium leading-none">Komisi CakliKirim</p>
                                            <div className="h-2 w-full rounded-full bg-secondary">
                                                <div className="h-full w-[25%] rounded-full bg-blue-500" />
                                            </div>
                                            <p className="text-xs text-muted-foreground">25% (Rp 3.1M)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-full space-y-1">
                                            <p className="text-sm font-medium leading-none">Biaya Platform</p>
                                            <div className="h-2 w-full rounded-full bg-secondary">
                                                <div className="h-full w-[10%] rounded-full bg-orange-500" />
                                            </div>
                                            <p className="text-xs text-muted-foreground">10% (Rp 1.2M)</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* BREAKDOWN TAB */}
                <TabsContent value="breakdown" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performa Regional</CardTitle>
                            <CardDescription>Rincian pendapatan per area operasional.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Wilayah/Kota</TableHead>
                                        <TableHead>Total Order</TableHead>
                                        <TableHead>Pendapatan Kotor</TableHead>
                                        <TableHead>Pendapatan Bersih</TableHead>
                                        <TableHead>Penggunaan Promo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Malang Kota</TableCell>
                                        <TableCell>1,250</TableCell>
                                        <TableCell>Rp 18.500.000</TableCell>
                                        <TableCell>Rp 5.200.000</TableCell>
                                        <TableCell className="text-red-500">Rp 1.2M (TINGGI)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Lowokwaru</TableCell>
                                        <TableCell>980</TableCell>
                                        <TableCell>Rp 12.100.000</TableCell>
                                        <TableCell>Rp 3.800.000</TableCell>
                                        <TableCell>Rp 800K</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Sukun</TableCell>
                                        <TableCell>850</TableCell>
                                        <TableCell>Rp 9.500.000</TableCell>
                                        <TableCell>Rp 2.100.000</TableCell>
                                        <TableCell>Rp 400K</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Batu</TableCell>
                                        <TableCell>420</TableCell>
                                        <TableCell>Rp 5.131.000</TableCell>
                                        <TableCell>Rp 1.350.000</TableCell>
                                        <TableCell>Rp 1.8M (Ekspansi)</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SETTLEMENTS TAB */}
                <TabsContent value="settlement" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Menunggu Pencairan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp 4.500.000</div>
                                <p className="text-xs text-muted-foreground">Akan diproses hari ini</p>
                            </CardContent>
                            <CardFooter>
                                <Button size="sm" className="w-full">Proses Batch</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Telah Dicairkan (Minggu Ini)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">Rp 12.850.000</div>
                                <p className="text-xs text-muted-foreground">Berhasil ditransfer</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Riwayat Pencairan</CardTitle>
                            <CardDescription>Riwayat dana yang ditransfer ke mitra.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID Batch</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Jlh Mitra</TableHead>
                                        <TableHead>Total Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-mono">BATCH-9921</TableCell>
                                        <TableCell>2024-02-09</TableCell>
                                        <TableCell>45 Mitra</TableCell>
                                        <TableCell>Rp 3.200.000</TableCell>
                                        <TableCell><Badge>Diproses</Badge></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono">BATCH-9920</TableCell>
                                        <TableCell>2024-02-08</TableCell>
                                        <TableCell>120 Mitra</TableCell>
                                        <TableCell>Rp 9.650.000</TableCell>
                                        <TableCell><Badge>Diproses</Badge></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ADJUSTMENTS TAB */}
                <TabsContent value="adjustments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Audit Log Keuangan</CardTitle>
                            <CardDescription>Catatan permanen penyesuaian manual, refund, dan koreksi.</CardDescription>
                        </CardHeader>
                        <div className="flex items-center gap-2 p-4 border-b">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Cari ID Transaksi..." className="max-w-sm" />
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Tipe</SelectItem>
                                    <SelectItem value="credit">Kredit (Masuk)</SelectItem>
                                    <SelectItem value="debit">Debit (Keluar)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID Transaksi</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Tipe</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Area</TableHead>
                                        <TableHead className="text-right">Jumlah</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactionData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-mono text-xs">{item.id}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.type === "Credit" ? "outline" : "secondary"}>
                                                    {item.type === "Credit" ? "Kredit" : "Debit"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{item.source}</TableCell>
                                            <TableCell>{item.area}</TableCell>
                                            <TableCell className={`text-right font-medium ${item.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                                                {item.type === "Credit" ? "+" : "-"} {item.amount}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.status}</Badge>
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
