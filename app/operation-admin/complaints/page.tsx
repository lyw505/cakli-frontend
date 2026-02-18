"use client"

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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Search, MoreHorizontal, MessageSquareWarning, ArrowRightCircle } from "lucide-react"

const complaints = [
    { id: "TKT-001", type: "User -> Driver", subject: "Rude behavior", from: "Rina S.", to: "Budi Santoso", status: "New", priority: "High" },
    { id: "TKT-002", type: "Driver -> User", subject: "Passenger refused to pay", from: "Siti Aminah", to: "Ahmad J.", status: "Investigating", priority: "Medium" },
    { id: "TKT-003", type: "User -> Driver", subject: "Unsafe driving", from: "Dewi P.", to: "Joko W.", status: "Resolved", priority: "High" },
    { id: "TKT-004", type: "User -> App", subject: "App crashing", from: "Kevin L.", to: "Support", status: "Escalated", priority: "Low" },
    { id: "TKT-005", type: "Driver -> App", subject: "GPS Issue", from: "Budi Santoso", to: "Support", status: "Resolved", priority: "Medium" },
]

export default function ComplaintsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Complaints & Disputes</h1>
                    <p className="text-muted-foreground">Handle reports from users and drivers.</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search tickets..."
                        className="pl-8"
                    />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="investigating">Investigating</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>From / To</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {complaints.map((complaint) => (
                            <TableRow key={complaint.id}>
                                <TableCell className="font-medium">{complaint.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
                                        {complaint.type}
                                    </div>
                                </TableCell>
                                <TableCell>{complaint.subject}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">From: {complaint.from}</span>
                                        <span className="text-xs text-muted-foreground">To: {complaint.to}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            complaint.priority === "High"
                                                ? "destructive"
                                                : complaint.priority === "Medium"
                                                    ? "default"
                                                    : "secondary"
                                        }
                                    >
                                        {complaint.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {complaint.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-8">
                                                    Review
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>Dispute Decision: {complaint.id}</DialogTitle>
                                                    <DialogDescription>Review evidence and issue a final operational decision.</DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="p-3 bg-secondary/50 rounded-lg text-sm border font-mono">
                                                        "The driver was 15 minutes late and very rude when I asked why." - {complaint.from}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Button variant="outline" className="text-xs uppercase font-bold text-orange-900">Valid Order</Button>
                                                        <Button variant="outline" className="text-xs uppercase font-bold text-orange-700">Invalid/Fraud</Button>
                                                    </div>
                                                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Confirm Decision</Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Review Full Timeline</DropdownMenuItem>
                                                <DropdownMenuItem>Contact User</DropdownMenuItem>
                                                <DropdownMenuItem>Contact Driver</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-orange-600 font-medium">
                                                    <ArrowRightCircle className="mr-2 h-4 w-4" /> Escalate to Master
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
