"use client"

import * as React from "react"
import {
    ClipboardList,
    Search,
    Filter,
    Download,
    Terminal,
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

const logs = [
    { id: "LOG-001", user: "Admin Goldi", action: "Tariff Update", target: "v2.4.1", timestamp: "2024-02-09 08:30:12", severity: "High" },
    { id: "LOG-002", user: "Admin Aulia", action: "Role Assigned", target: "Dev_Team_1", timestamp: "2024-02-09 08:15:00", severity: "Medium" },
    { id: "LOG-003", user: "Admin Risma", action: "Report Generated", target: "Monthly_Jan_24", timestamp: "2024-02-09 07:45:22", severity: "Low" },
    { id: "LOG-004", user: "System", action: "Security Patch", target: "Node-S3", timestamp: "2024-02-09 04:00:01", severity: "Critical" },
    { id: "LOG-005", user: "Admin Goldi", action: "Zone Shutdown", target: "Kepunjen_Sub", timestamp: "2024-02-08 23:10:45", severity: "Critical" },
]

export default function AuditLog() {
    return (
        <div className="flex flex-col gap-6 p-6 font-sans">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Audit Vault</h1>
                    <p className="text-muted-foreground">Immutable record of all administrative actions and system events.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Audit Log (.csv)
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-secondary/30 p-4 rounded-xl border border-dashed border-muted-foreground/20">
                <div className="flex flex-1 items-center gap-2 max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by actor, action, or target..." className="pl-8 bg-background border-none shadow-sm" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-background border-none shadow-sm">
                            <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Severities</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="bg-background shadow-sm hover:shadow-md transition-shadow">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[100px] pl-6">ID</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Actor (Who)</TableHead>
                                <TableHead>Action (What)</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead className="text-right pr-6">Trace</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id} className="text-sm">
                                    <TableCell className="font-mono text-[10px] pl-6 font-semibold">{log.id}</TableCell>
                                    <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                                    <TableCell className="font-bold">{log.user}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[10px] uppercase">{log.action}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="italic text-muted-foreground">{log.target}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            log.severity === "Critical" ? "destructive" :
                                                log.severity === "High" ? "default" : "secondary"
                                        }>
                                            {log.severity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Button variant="ghost" size="icon">
                                            <Terminal className="size-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <AlertCircle className="size-8 text-muted-foreground mb-4" />
                <h3 className="text-lg font-bold">Encrypted Audit Chain Enabled</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                    All logs are signed with RSA-4096 and stored in a decentralized vault.
                    Modification of these logs is cryptographically impossible.
                </p>
            </div>

            <p className="text-[10px] text-muted-foreground italic text-center uppercase tracking-[0.2em] font-mono">
                VAULT ENDPOINT: v2-pci-compliance-cluster7 • NODE: IND-JKT-04
            </p>
        </div>
    )
}
