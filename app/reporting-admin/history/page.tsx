"use client"

import * as React from "react"
import {
    Search,
    Filter,
    Eye,
    ArrowUpDown,
    Download,
    FileSpreadsheet,
    FileText,
} from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { toast } from "sonner"

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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const historyData = [
    { id: "ORD-8921", customer: "Budi Pratama", driver: "Agus Santoso", date: "2024-02-09 08:30", amount: "Rp 24.000", status: "Completed", pickup: "Jl. Merdeka No. 10", dropoff: "Malang City Point", area: "Malang Kota", distance: "4.2 km", duration: "18 mins" },
    { id: "ORD-8920", customer: "Sani Wijaya", driver: "Siti Aminah", date: "2024-02-09 08:15", amount: "Rp 18.500", status: "Completed", pickup: "Stasiun Malang", dropoff: "UB", area: "Lowokwaru", distance: "3.5 km", duration: "14 mins" },
    { id: "ORD-8919", customer: "Rizky D.", driver: "Joko Wow", date: "2024-02-09 07:45", amount: "Rp 32.000", status: "Cancelled", pickup: "Bandara Abd Saleh", dropoff: "Ijen Nirwana", area: "Sukun", distance: "12.0 km", duration: "-" },
    { id: "ORD-8918", customer: "Anisa K.", driver: "Rudi Hartono", date: "2024-02-09 07:10", amount: "Rp 15.000", status: "Completed", pickup: "Pasar Besar", dropoff: "Alun-alun", area: "Malang Kota", distance: "2.1 km", duration: "10 mins" },
    { id: "ORD-8917", customer: "Fahmi R.", driver: "Hendra P.", date: "2024-02-08 22:30", amount: "Rp 45.000", status: "Completed", pickup: "Batu Night Spectacular", dropoff: "Hotel Santika", area: "Batu", distance: "8.5 km", duration: "25 mins" },
]

function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 1, 1),
        to: addDays(new Date(2024, 1, 1), 7),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[260px] justify-start text-left font-normal border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <Search className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd MMM yyyy")} - {format(date.to, "dd MMM yyyy")}
                                </>
                            ) : (
                                format(date.from, "dd MMM yyyy")
                            )
                        ) : (
                            <span>Pilih Rentang Tanggal</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
    )
}

export default function HistoryPage() {
    const [selectedOrder, setSelectedOrder] = React.useState<typeof historyData[0] | null>(null)

    React.useEffect(() => {
        toast.message("Data Berhasil Dimuat", {
            description: "Riwayat pesanan terbaru telah siap ditampilkan.",
        })
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Order History & Reports</h1>
                    <p className="text-muted-foreground">Comprehensive log of all orders with reporting capabilities.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-[#E04D04] hover:bg-[#c94504] text-white">
                                <Download className="mr-2 h-4 w-4 text-white" />
                                Ekspor Data
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Format</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast.success("Data berhasil di export", { position: "bottom-right", style: { background: "#E6F4EA", color: "#137333", border: "1px solid #CEEAD6" } })}>
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Buku Besar Bulanan (.xlsx)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Data berhasil di export", { position: "bottom-right", style: { background: "#E6F4EA", color: "#137333", border: "1px solid #CEEAD6" } })}>
                                <FileText className="mr-2 h-4 w-4" />
                                Laporan Pencairan (.pdf)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by ID or customer..."
                        className="pl-8 border-gray-200 focus-visible:border-[#E04D04] focus-visible:ring-0 bg-white"
                    />
                </div>
                <div className="ml-2">
                    <DatePickerWithRange />
                </div>
                <div className="flex items-center gap-4 ml-4">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[140px] focus:ring-0 focus:ring-offset-0 border-gray-200 bg-white">
                            <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            <SelectItem value="malang-kota">Malang Kota</SelectItem>
                            <SelectItem value="lowokwaru">Lowokwaru</SelectItem>
                            <SelectItem value="sukun">Sukun</SelectItem>
                            <SelectItem value="batu">Batu</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[140px] focus:ring-0 focus:ring-offset-0 border-gray-200 bg-white">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Order ID</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">View</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historyData.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono text-sm">{order.id}</TableCell>
                                    <TableCell className="text-sm">{order.date}</TableCell>
                                    <TableCell className="font-medium">{order.customer}</TableCell>
                                    <TableCell>{order.driver}</TableCell>
                                    <TableCell className="font-semibold">{order.amount}</TableCell>
                                    <TableCell>
                                        <Badge className={order.status === "Completed" ? "bg-[#E04D04] text-white hover:bg-[#E04D04]" : ""} variant={order.status === "Completed" ? undefined : "destructive"}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                                                    <Eye className="size-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[500px]">
                                                <DialogHeader className="px-3 pt-4">
                                                    <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                                                    <DialogDescription>
                                                        Full transactional audit for this order instance.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4 px-3 pb-2">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-xs text-muted-foreground uppercase font-semibold">User Details</p>
                                                            <p className="text-sm">{selectedOrder?.customer}</p>
                                                        </div>
                                                        <div className="space-y-1 text-right flex flex-col items-end">
                                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Driver Details</p>
                                                            <p className="text-sm">{selectedOrder?.driver}</p>
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                    <div className="space-y-2">
                                                        <div className="flex items-start gap-2">
                                                            <div className="size-2 bg-[#E04D04] rounded-full mt-1.5" />
                                                            <div className="space-y-0.5">
                                                                <p className="text-xs text-muted-foreground">Pickup Location</p>
                                                                <p className="text-sm font-medium">{selectedOrder?.pickup}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="size-2 bg-red-600 rounded-full mt-1.5" />
                                                            <div className="space-y-0.5">
                                                                <p className="text-xs text-muted-foreground">Drop-off Location</p>
                                                                <p className="text-sm font-medium">{selectedOrder?.dropoff}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Fare</p>
                                                            <p className="text-xl font-bold text-[#E04D04]">{selectedOrder?.amount}</p>
                                                        </div>
                                                        <div className="space-y-1 text-right flex flex-col items-end">
                                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Status</p>
                                                            <Badge className="px-4 py-1 rounded-full text-sm font-semibold border-0" variant={selectedOrder?.status === "Completed" ? "default" : "destructive"} style={selectedOrder?.status === "Completed" ? { backgroundColor: '#E04D04', color: 'white' } : {}}>
                                                                {selectedOrder?.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="bg-muted p-3 rounded-lg text-xs space-y-1 mt-2">
                                                        <p><span className="font-semibold">Distance:</span> {selectedOrder?.distance}</p>
                                                        <p><span className="font-semibold">Duration:</span> {selectedOrder?.duration}</p>
                                                        <p><span className="font-semibold">Payment:</span> CakliWallet</p>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground font-medium">
                    Menampilkan <span className="font-bold text-foreground">1–{historyData.length}</span> dari <span className="font-bold text-foreground">{historyData.length}</span> pesanan
                </div>
                <Pagination className="justify-center w-auto mx-0">
                    <PaginationContent className="gap-1">
                        <PaginationItem>
                            <PaginationPrevious href="#" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 border border-gray-200 bg-white rounded-md shadow-none transition-all" text="" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive className="h-8 w-8 bg-[#E04D04] border-0 text-white hover:bg-[#E04D04] hover:text-white rounded-md shadow-none">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="h-8 w-8 border-0 bg-transparent text-gray-700 hover:text-foreground hover:bg-transparent rounded-md shadow-none">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="h-8 w-8 border-0 bg-transparent text-gray-700 hover:text-foreground hover:bg-transparent rounded-md shadow-none">
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis className="h-8 w-8 flex items-center justify-center text-gray-400" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" className="h-8 w-8 border-0 bg-transparent text-gray-700 hover:text-foreground hover:bg-transparent rounded-md shadow-none">
                                12
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 border border-gray-200 bg-white rounded-md shadow-none transition-all" text="" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}