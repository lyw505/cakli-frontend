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
    Bell,
    CheckCircle2,
    MessageSquare,
    History,
    ShieldAlert,
    Ban,
    ExternalLink,
    Send,
    TrendingDown,
    Clock,
    AlertTriangle,
    UserX,
    Search,
    Activity,
    AlertCircle,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const activityData = [
    { id: "DRV-001", name: "Budi Santoso", issue: "Diam > 30 menit", location: "Suhat", duration: "32m", status: "Peringatan", lastOnline: "5m lalu", lastTrip: "Suhat -> Dinoyo", cancelRate: "5%", acceptanceRate: "92%" },
    { id: "DRV-005", name: "Rudi H.", issue: "Pembatalan Sering", location: "Dinoyo", duration: "5 perjalanan", status: "Kritis", lastOnline: "Aktif Sekarang", lastTrip: "Landungsari -> Matos", cancelRate: "28%", acceptanceRate: "45%" },
    { id: "DRV-009", name: "Agus T.", issue: "Offline Mendadak", location: "Gadang", duration: "Baru saja", status: "Info", lastOnline: "Offline", lastTrip: "Pasar Besar -> Gadang", cancelRate: "2%", acceptanceRate: "98%" },
    { id: "DRV-012", name: "Slamet", issue: "Diam > 15 menit", location: "Matos", duration: "18m", status: "Info", lastOnline: "Aktif Sekarang", lastTrip: "Suhat -> Matos", cancelRate: "0%", acceptanceRate: "100%" },
]

interface ActionLog {
    id: string;
    admin: string;
    timestamp: string;
    action: string;
    driver: string;
}

export default function ActivityPage() {
    const [selectedDriver, setSelectedDriver] = React.useState<any>(null)
    const [actionType, setActionType] = React.useState<"monitor" | "reminder" | "investigate" | null>(null)
    const [showLogsModal, setShowLogsModal] = React.useState(false)
    const [logs, setLogs] = React.useState<ActionLog[]>([])
    const [message, setMessage] = React.useState("")

    const addLog = (action: string, driverName: string) => {
        const newLog: ActionLog = {
            id: `LOG-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            admin: "Admin Operasional",
            timestamp: new Date().toLocaleTimeString(),
            action,
            driver: driverName
        }
        setLogs([newLog, ...logs])
    }

    const openModal = (driver: any, type: "monitor" | "reminder" | "investigate") => {
        setSelectedDriver(driver)
        setActionType(type)
        if (type === "reminder") {
            setMessage(`Anda terdeteksi ${driver.issue}. Mohon aktif kembali atau pindah ke area permintaan tinggi.`)
        }
    }

    const closeModal = () => {
        setSelectedDriver(null)
        setActionType(null)
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pemantauan Aktivitas Pengemudi</h1>
                    <p className="text-muted-foreground">Deteksi pola tidak produktif dan perubahan perilaku mendadak.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 gap-2 rounded-xl text-slate-600 border-slate-200"
                        onClick={() => setShowLogsModal(true)}
                    >
                        <History className="w-4 h-4" />
                        Log Audit
                    </Button>
                    <Badge variant="outline" className="border-orange-500 text-orange-600 bg-orange-50 h-9 px-3 rounded-full">
                        <TrendingDown className="w-3 h-3 mr-2" />
                        2 Pengemudi Underperform
                    </Badge>
                </div>
            </div>

            <div className="flex items-center justify-between px-1 -mb-2">
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        Batas Diam: 15m
                    </span>
                    <span className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        Batas Batal: 3/jam
                    </span>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                    label="Pengemudi Diam"
                    value="12"
                    sublabel="Menunggu 10+ menit"
                    icon={<Clock className="w-4 h-4" />}
                />
                <MetricCard
                    label="Tingkat Batal Tinggi"
                    value="3"
                    sublabel="Lebih dari 3 batal/jam"
                    icon={<AlertTriangle className="w-4 h-4" />}
                />
                <MetricCard
                    label="Offline Terbaru"
                    value="8"
                    sublabel="Dalam 30 menit terakhir"
                    icon={<UserX className="w-4 h-4" />}
                />
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Peringatan Tidak Aktif & Pola</CardTitle>
                        <CardDescription>Pengemudi yang memerlukan perhatian operasional.</CardDescription>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Cari pengemudi..." className="pl-8 w-[250px]" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table className="min-w-[1000px]">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Pengemudi</TableHead>
                                    <TableHead>Pola Masalah</TableHead>
                                    <TableHead>Lokasi Terakhir</TableHead>
                                    <TableHead>Durasi/Jumlah</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activityData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 leading-tight">{item.name}</div>
                                                    <div className="text-[11px] text-muted-foreground">{item.id}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm font-semibold">{item.issue}</TableCell>
                                        <TableCell className="text-sm">{item.location}</TableCell>
                                        <TableCell className="text-sm">{item.duration}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                item.status === "Kritis" ? "danger" :
                                                    item.status === "Peringatan" ? "orange" : "neutral"
                                            }>
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {item.status === "Info" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-4"
                                                    onClick={() => openModal(item, "monitor")}
                                                >
                                                    Pantau
                                                </Button>
                                            )}
                                            {item.status === "Peringatan" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 border-[#E04D04]/30 text-[#E04D04] hover:bg-[#E04D04]/5"
                                                    onClick={() => openModal(item, "reminder")}
                                                >
                                                    Kirim Peringatan
                                                </Button>
                                            )}
                                            {item.status === "Kritis" && (
                                                <Button
                                                    size="sm"
                                                    className="h-8 bg-[#E04D04] hover:bg-[#E04D04]/90 text-white font-bold"
                                                    onClick={() => openModal(item, "investigate")}
                                                >
                                                    Selidiki
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination - Moved Outside Card */}
            <div className="flex items-center justify-between py-1">
                <div className="text-sm text-slate-500">
                    Menampilkan <span className="font-bold text-slate-900 mx-0.5">1-5</span> dari <span className="font-bold text-slate-900 mx-0.5">5</span> log
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200 bg-white">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                        <Button size="sm" className="h-9 w-9 rounded-xl bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 font-bold">1</Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl text-slate-500 font-bold hover:bg-slate-100">2</Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl text-slate-500 font-bold hover:bg-slate-100">3</Button>
                        <span className="text-slate-300 mx-1">...</span>
                        <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl text-slate-500 font-bold hover:bg-slate-100">12</Button>
                    </div>
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200 bg-white">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>


            {/* Workflow Modals */}
            <Dialog open={actionType === "monitor"} onOpenChange={closeModal}>
                <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                    <DialogHeader className="p-8 bg-slate-50 border-none">
                        <DialogTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                            <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200">
                                <Activity className="w-5 h-5 text-slate-600" />
                            </div>
                            Pantau Aktivitas: {selectedDriver?.name}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 mt-1">Ikhtisar untuk status stabil yang dikonfirmasi.</DialogDescription>
                    </DialogHeader>
                    <div className="p-8 pb-2 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Online Terakhir</span>
                                <div className="text-lg font-bold text-slate-900">{selectedDriver?.lastOnline}</div>
                            </div>
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Penerimaan</span>
                                <div className="text-lg font-bold text-emerald-600">{selectedDriver?.acceptanceRate}</div>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Riwayat Terbaru (2jam)</span>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-none">
                                    <span className="text-sm text-slate-500 font-medium">Perjalanan Terakhir</span>
                                    <span className="text-sm font-bold text-slate-900">{selectedDriver?.lastTrip}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-sm text-slate-500 font-medium">Pola Aktivitas</span>
                                    <span className="text-sm font-bold text-slate-900 bg-emerald-100 text-emerald-700 px-3 py-0.5 rounded-full">Konsisten</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="px-8 pb-8 pt-0 bg-transparent flex sm:justify-between items-center gap-4">
                        <Button variant="ghost" onClick={closeModal} className="text-sm font-bold text-slate-400 hover:text-slate-600 hover:bg-transparent px-0">Tutup Panel</Button>
                        <div className="flex gap-3">
                            <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold border-slate-200 bg-white hover:bg-slate-50 transition-all" onClick={() => { addLog("Konfirmasi Pemantauan Awal", selectedDriver.name); closeModal(); }}>Terus Pantau</Button>
                            <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold border-[#E04D04] text-[#E04D04] bg-white hover:bg-[#E04D04]/5 transition-all shadow-sm" onClick={() => { addLog("Dihubungi untuk info status", selectedDriver.name); closeModal(); }}>
                                Hubungi Pengemudi
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={actionType === "reminder"} onOpenChange={closeModal}>
                <DialogContent className="max-w-4xl rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                    <DialogHeader className="p-8 pb-6 bg-white border-b border-slate-100">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm">
                                <MessageSquare className="w-8 h-8 text-[#E04D04]" />
                            </div>
                            <div className="space-y-1">
                                <DialogTitle className="text-xl font-bold text-slate-900">Kirim Peringatan</DialogTitle>
                                <DialogDescription className="text-xs text-slate-500">Intervensi langsung untuk pola non-urgent.</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex">
                        {/* Left Side: Context - Enlarged width and reduced right padding */}
                        <div className="w-[52%] p-8 pr-4 space-y-4">
                            <div className="bg-white p-7 rounded-3xl border border-slate-100 relative overflow-hidden group shadow-sm">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <AlertCircle className="w-20 h-20 text-[#E04D04]" />
                                </div>
                                <div className="flex flex-col gap-7 relative z-10">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-0.5">Pengemudi Target</h4>
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-slate-600 shadow-inner">
                                                {selectedDriver?.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-slate-900 leading-none mb-1.5">{selectedDriver?.name}</div>
                                                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-md inline-block">{selectedDriver?.id}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-slate-100 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Deteksi</span>
                                            <span className="text-[11px] font-bold text-[#E04D04] tracking-wide ">Peringatan Tidak Aktif</span>
                                        </div>
                                        <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                                            <p className="text-sm font-bold text-slate-800 leading-relaxed italic">"{selectedDriver?.issue}"</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
                                            <Clock className="w-3 h-3" />
                                            Terdeteksi di {selectedDriver?.location}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button variant="ghost" onClick={() => { addLog("Peringatan ditingkatkan", selectedDriver.name); closeModal(); }} className="w-full justify-start text-xs h-11 px-6 text-rose-600 hover:bg-rose-50/50 font-bold rounded-2xl transition-colors">
                                <TrendingDown className="w-4 h-4 mr-2" />
                                Tingkatkan Level Deteksi
                            </Button>
                        </div>

                        {/* Right Side: Action Section - Reduced left padding */}
                        <div className="flex-1 p-8 pl-4 space-y-2 flex flex-col">
                            <div className="space-y-4 flex-1">
                                <div className="flex items-center gap-2 px-1">
                                    <Send className="w-3.5 h-3.5 text-slate-400" />
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pesan </label>
                                </div>
                                <Textarea
                                    className="h-[220px] bg-slate-50/30 border-slate-200 rounded-3xl text-sm leading-6 p-6 shadow-inner focus-visible:ring-[#E04D04]/10 transition-all font-medium resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button variant="outline" className="flex-1 h-14 rounded-2xl font-bold border-slate-200 bg-white hover:bg-slate-50" onClick={closeModal}>Batal</Button>
                                <Button className="flex-[1.5] bg-[#E04D04] hover:bg-[#E04D04]/90 h-14 font-bold rounded-2xl shadow-xl shadow-[#E04D04]/20 transition-all active:scale-95" onClick={() => { addLog(`Peringatan Dikirim: "${message.substring(0, 20)}..."`, selectedDriver.name); closeModal(); }}>
                                    <Send className="w-4 h-4 mr-2" />
                                    Kirim Peringatan
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={actionType === "investigate"} onOpenChange={closeModal}>
                <DialogContent className="max-w-2xl rounded-2xl overflow-hidden p-0 gap-0 border-none shadow-2xl">
                    <DialogHeader className="p-0 space-y-0">
                        <div className="p-8 bg-white flex items-center justify-between border-b border-slate-100">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                    <ShieldAlert className="w-8 h-8 text-[#E04D04]" />
                                </div>
                                <div className="space-y-1.5">
                                    <DialogTitle className="text-2xl font-bold leading-none text-slate-900">{selectedDriver?.name}</DialogTitle>
                                    <DialogDescription className="text-xs text-slate-500 uppercase tracking-widest font-bold">Panel Investigasi • {selectedDriver?.id}</DialogDescription>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-white text-slate-900 border-slate-200 font-bold uppercase tracking-wider text-[11px] py-4
                             px-4 shadow-sm ring-1 ring-slate-100">
                                Risiko Tinggi
                            </Badge>
                        </div>
                    </DialogHeader>

                    <div className="p-6 space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Tingkat Batal", val: selectedDriver?.cancelRate, highlight: true },
                                { label: "Penerimaan", val: selectedDriver?.acceptanceRate },
                                { label: "Pola", val: "Sering" },
                                { label: "Area Jemput", val: selectedDriver?.location }
                            ].map((st, i) => (
                                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#E04D04]/20 transition-colors">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">{st.label}</span>
                                    <span className={`text-xl font-bold ${st.highlight ? 'text-rose-600' : 'text-slate-800'}`}>{st.val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <History className="w-3 h-3" />
                                Linimasa Insiden (60m Terakhir)
                            </h3>
                            <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 space-y-4">
                                <div className="flex gap-4 relative">
                                    <div className="absolute left-1.5 top-6 bottom-[-12px] w-[1px] bg-slate-200" />
                                    <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/10 mt-1.5 shrink-0 z-10" />
                                    <div>
                                        <div className="text-[13px] font-bold text-slate-900 font-bold">3 Pembatalan Beruntun</div>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Area Jemput: {selectedDriver?.location} • Alasan: Lokasi Tidak Terjangkau</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-3 h-3 rounded-full bg-slate-300 mt-1.5 shrink-0 z-10" />
                                    <div>
                                        <div className="text-[13px] font-bold text-slate-600 font-bold">Aktivitas Stabil</div>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Menyelesaikan 2 perjalanan normal sebelum insiden</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <Button variant="outline" className="h-14 border-slate-200 justify-start gap-4 rounded-xl px-4 hover:border-orange-500/50 hover:bg-orange-50/50" onClick={() => { addLog("Peringatan Resmi Dikirim", selectedDriver.name); closeModal(); }}>
                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                <div className="text-left font-bold text-sm">Kirim Peringatan Resmi</div>
                            </Button>
                            <Button variant="outline" className="h-14 border-slate-200 justify-start gap-4 rounded-xl px-4 hover:border-rose-500/50 hover:bg-rose-50/50" onClick={() => { addLog("Suspensi Sementara 30m", selectedDriver.name); closeModal(); }}>
                                <Ban className="w-5 h-5 text-rose-500" />
                                <div className="text-left font-bold text-sm">Batasi Sementara (30m)</div>
                            </Button>
                            <Button variant="outline" className="h-14 border-slate-200 justify-start gap-4 rounded-xl px-4 hover:border-blue-500/50 hover:bg-blue-50/50" onClick={() => { addLog("Dieskalasi ke Supervisor", selectedDriver.name); closeModal(); }}>
                                <ExternalLink className="w-5 h-5 text-blue-500" />
                                <div className="text-left font-bold text-sm">Eskalasi Supervisor</div>
                            </Button>
                            <Button variant="outline" className="h-14 border-slate-200 justify-start gap-4 rounded-xl px-4 hover:border-emerald-500/50 hover:bg-emerald-50/50" onClick={() => { addLog("Investigasi Ditutup (False Alarm)", selectedDriver.name); closeModal(); }}>
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <div className="text-left font-bold text-sm">Tutup Kasus (False Alarm)</div>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Audit Logs Modal */}
            <Dialog open={showLogsModal} onOpenChange={setShowLogsModal}>
                <DialogContent className="max-w-2xl rounded-2xl overflow-hidden p-0 gap-0 border-none shadow-2xl">
                    <DialogHeader className="p-8 bg-[#E04D04] text-white flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center border border-white/20">
                                <History className="w-6 h-6 text-white" />
                            </div>
                            <div className="space-y-1">
                                <DialogTitle className="text-xl font-bold leading-none text-white">Log Audit Aktivitas</DialogTitle>
                                <DialogDescription className="text-sm text-white/70 mt-1">Jejak real-time intervensi operasional.</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="p-0">
                        <div className="max-h-[60vh] overflow-y-auto">
                            {logs.length === 0 ? (
                                <div className="p-20 text-center flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                                        <History className="w-8 h-8 text-slate-200" />
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 italic">Tidak ada aksi yang tercatat dalam sesi ini.</div>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {logs.map(log => (
                                        <div key={log.id} className="p-4 px-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                                                    {log.admin[0]}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900">{log.action}</div>
                                                    <div className="text-[11px] text-slate-500 mt-0.5">{log.driver} • {log.admin}</div>
                                                </div>
                                            </div>
                                            <div className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{log.timestamp}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function MetricCard({ icon, label, value, sublabel }: { icon: React.ReactNode, label: string, value: string, sublabel?: string }) {
    return (
        <Card className="relative group bg-white p-5 rounded-2xl border-none ring-1 ring-slate-200 shadow-sm flex flex-col justify-between h-32 transition-all hover:shadow-md">
            {/* Vertical Accent Bar */}
            <div className="absolute left-4 top-5 bottom-5 w-[6px] bg-[#E04D04] rounded-full" />

            {/* Top Right Icon */}
            <div className="absolute top-5 right-5 text-slate-200 group-hover:text-[#E04D04]/20 transition-colors text-slate-400">
                {icon}
            </div>

            <div className="pl-6 flex flex-col h-full justify-between py-0.5">
                <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
                        {label}
                    </h3>
                    <div className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
                        {value}
                    </div>
                </div>

                {sublabel && (
                    <div className="text-[10px] font-bold text-slate-500 mt-auto">
                        {sublabel}
                    </div>
                )}
            </div>
        </Card>
    )
}