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

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Operasional</h1>
          <p className="text-muted-foreground">Overview of current system status and activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 dark:bg-green-950/20 px-3 py-1">
            <Activity className="w-3 h-3 mr-2" />
            System Normal
          </Badge>
          <span className="text-sm text-muted-foreground">Last updated: Just now</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2 from last hour
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drivers Online</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18/25</div>
            <p className="text-xs text-muted-foreground">72% fleet availability</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">3</div>
            <div className="flex items-center text-xs text-red-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1 from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.4M</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from yesterday
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
              <CardTitle>Live Orders</CardTitle>
              <CardDescription>Real-time status of ongoing trips.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
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
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
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
          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Critical updates needing attention.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-3 bg-red-50 dark:bg-red-950/20">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="grid gap-1">
                  <p className="font-medium text-red-900 dark:text-red-200">Driver Unresponsive</p>
                  <p className="text-sm text-red-800 dark:text-red-300">
                    Driver "Budi Santoso" has been stationary for 15 mins.
                  </p>
                  <Button size="sm" variant="destructive" className="w-fit mt-1">Check Location</Button>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
                <MessageSquareWarning className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="grid  gap-1">
                  <p className="font-medium text-blue-900 dark:text-blue-200">New Complaint</p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    User reported "Rude behavior" for Order #ORD-882.
                  </p>
                  <Button size="sm" variant="outline" className="w-fit mt-1 border-blue-200 hover:bg-blue-100 text-blue-700">View Ticket</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  { user: "System", action: "Automatic payout processed", time: "2 mins ago" },
                  { user: "Admin Aulia", action: "Verified Driver 'Agus T.'", time: "15 mins ago" },
                  { user: "Admin Risma", action: "Resolved Ticket #TKT-003", time: "1 hour ago" },
                  { user: "System", action: "Daily report generated", time: "3 hours ago" },
                ].map((item, i) => (
                  <div className="flex items-center" key={i}>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.action}</p>
                      <p className="text-xs text-muted-foreground">
                        by {item.user} • {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
