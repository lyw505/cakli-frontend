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
import { AlertCircle, Clock, MapPin, CheckCircle2, MessageSquareWarning, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

function translateStatus(status: string) {
  if (status === "Picking Up") return "Menjemput"
  if (status === "In Transit") return "Dalam Perjalanan"
  if (status === "Assigning") return "Menugaskan"
  return status
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Operasional</h1>
          <p className="text-muted-foreground">Ikhtisar status sistem dan aktivitas saat ini.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50 dark:bg-orange-950/20 px-3 py-1">
            <Activity className="w-3 h-3 mr-2" />
            Sistem Normal
          </Badge>
          <span className="text-sm text-muted-foreground">Terakhir diperbarui: Baru saja</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pesanan Aktif</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-orange-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2 dari jam terakhir
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Driver Online</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18/25</div>
            <p className="text-xs text-muted-foreground">72% ketersediaan armada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keluhan Aktif</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">3</div>
            <div className="flex items-center text-xs text-orange-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1 dari kemarin
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendapatan Harian</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.4jt</div>
            <div className="flex items-center text-xs text-orange-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% dari kemarin
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Main Content Area */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          {/* Chart Section */}
          <ChartAreaInteractive />

          {/* Live Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Pesanan Langsung</CardTitle>
              <CardDescription>Status real-time dari perjalanan yang sedang berlangsung.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pesanan</TableHead>
                    <TableHead>Pelanggan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "ORD-001", cust: "Rina S.", status: "Picking Up" },
                    { id: "ORD-002", cust: "Ahmad J.", status: "In Transit" },
                    { id: "ORD-003", cust: "Dewi P.", status: "In Transit" },
                    { id: "ORD-004", cust: "Kevin L.", status: "Assigning" },
                    { id: "ORD-005", cust: "Sarah M.", status: "Picking Up" },
                  ].map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.cust}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "Assigning" ? "secondary" : "default"}>
                          {translateStatus(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Detail</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Content Area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          {/* Quick Actions */}
          <Card className="border-orange-200 bg-orange-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-orange-900">Operasi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 border-orange-200 hover:bg-orange-100 text-orange-800">
                <Activity className="h-4 w-4" />
                <span className="text-[10px] uppercase font-bold">Siaran</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 border-orange-200 hover:bg-orange-100 text-orange-800">
                <MapPin className="h-4 w-4" />
                <span className="text-[10px] uppercase font-bold">Heatmap</span>
              </Button>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Peringatan Sistem</CardTitle>
              <CardDescription>Pembaruan kritis yang membutuhkan perhatian.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-3 bg-orange-50 dark:bg-orange-950/20 border-orange-200">
                <AlertCircle className="h-5 w-5 text-orange-700 mt-0.5" />
                <div className="grid gap-1">
                  <p className="font-medium text-orange-900 dark:text-orange-200">Sinyal Darurat</p>
                  <p className="text-sm text-orange-800 dark:text-orange-300">
                    Driver "Agus T." memicu tombol PANIK.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="mt-1 bg-orange-700 hover:bg-orange-800 text-white border-none">Panggil Driver</Button>
                    <Button size="sm" variant="outline" className="mt-1 bg-white border-orange-200 text-orange-700 hover:bg-orange-50">Lacak Sekarang</Button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-3 bg-orange-50 dark:bg-orange-950/20 border-orange-200">
                <MessageSquareWarning className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="grid  gap-1">
                  <p className="font-medium text-orange-900 dark:text-orange-200">Peringatan Permintaan Tinggi</p>
                  <p className="text-sm text-orange-800 dark:text-orange-300">
                    Lonjakan mendadak di area "Malang Kota".
                  </p>
                  <Button size="sm" variant="outline" className="w-fit mt-1 border-orange-200 hover:bg-orange-100 text-orange-700">Sesuaikan Pembayaran</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Statistik Armada</CardTitle>
              <CardDescription>Status kendaraan real-time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-orange-600" />
                    <span>Dalam Perjalanan</span>
                  </div>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-orange-300" />
                    <span>Diam (Mencari)</span>
                  </div>
                  <span className="font-bold">6</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-stone-400" />
                    <span>Tidak Beroperasi</span>
                  </div>
                  <span className="font-bold">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
