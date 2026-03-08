import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

/**
 * Skeleton for header section (title + subtitle)
 */
export function SkeletonHeader() {
    return (
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <Skeleton className="h-8 w-[280px]" />
                <Skeleton className="h-4 w-[360px]" />
            </div>
            <Skeleton className="h-9 w-[160px] rounded-md" />
        </div>
    )
}

/**
 * Skeleton for KPI stat cards (row of 4)
 */
export function SkeletonKPICards({ count = 4 }: { count?: number }) {
    return (
        <div className={`grid grid-cols-2 lg:grid-cols-${count} gap-3`}>
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <div className="flex items-stretch h-full">
                        <div className="w-1.5 bg-muted rounded-full my-3 ml-3 shrink-0 animate-pulse" />
                        <div className="flex-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
                                <Skeleton className="h-3 w-[100px]" />
                                <Skeleton className="h-3.5 w-3.5 rounded" />
                            </CardHeader>
                            <CardContent className="px-3 pb-3 space-y-1.5">
                                <Skeleton className="h-6 w-[80px]" />
                                <Skeleton className="h-3 w-[120px]" />
                            </CardContent>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

/**
 * Skeleton for a chart card
 */
export function SkeletonChart({ height = 280 }: { height?: number }) {
    return (
        <Card>
            <CardHeader className="pb-2 pt-4 px-4 space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[280px]" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
                <Skeleton className={`w-full rounded-lg`} style={{ height }} />
            </CardContent>
        </Card>
    )
}

/**
 * Skeleton for a table card with rows
 */
export function SkeletonTable({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
    return (
        <Card className="border-none ring-1 ring-slate-200">
            <CardContent className="p-0">
                {/* Header row */}
                <div className="flex items-center gap-4 px-5 py-3 bg-slate-50/50 border-b">
                    {Array.from({ length: cols }).map((_, i) => (
                        <Skeleton key={i} className="h-3 flex-1" />
                    ))}
                </div>
                {/* Data rows */}
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-slate-100 last:border-0">
                        {Array.from({ length: cols }).map((_, j) => (
                            <Skeleton key={j} className={`h-4 flex-1 ${j === 0 ? 'max-w-[80px]' : ''}`} />
                        ))}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

/**
 * Skeleton for a small info card (sidebar type)
 */
export function SkeletonInfoCard() {
    return (
        <Card>
            <CardHeader className="pb-2 pt-3 px-4 space-y-1">
                <Skeleton className="h-3.5 w-[140px]" />
            </CardHeader>
            <CardContent className="px-4 pb-3 space-y-2.5">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-[120px]" />
                    <Skeleton className="h-3 w-[60px]" />
                </div>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-[100px]" />
                    <Skeleton className="h-3 w-[80px]" />
                </div>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-[110px]" />
                    <Skeleton className="h-3 w-[70px]" />
                </div>
            </CardContent>
        </Card>
    )
}

/**
 * Skeleton for filter row (search + dropdowns)
 */
export function SkeletonFilterRow() {
    return (
        <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-9 w-[200px] rounded-md" />
            <Skeleton className="h-9 w-[130px] rounded-md" />
            <Skeleton className="h-9 w-[130px] rounded-md" />
            <Skeleton className="h-9 w-[130px] rounded-md" />
            <div className="ml-auto">
                <Skeleton className="h-9 w-[140px] rounded-md" />
            </div>
        </div>
    )
}

/**
 * Skeleton for alert banners
 */
export function SkeletonAlerts({ count = 3 }: { count?: number }) {
    return (
        <div className="flex flex-col gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200">
                    <Skeleton className="h-6 w-6 rounded-lg shrink-0" />
                    <Skeleton className="h-3 w-[60px]" />
                    <Skeleton className="h-3 flex-1" />
                </div>
            ))}
        </div>
    )
}

/**
 * Skeleton for pagination
 */
export function SkeletonPagination() {
    return (
        <div className="flex items-center justify-between px-2 py-4">
            <Skeleton className="h-3 w-[180px]" />
            <div className="flex items-center gap-1.5">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>
        </div>
    )
}

/**
 * Skeleton for tabs row
 */
export function SkeletonTabs() {
    return (
        <div className="flex items-center gap-1 mb-4">
            <Skeleton className="h-8 w-[100px] rounded-md" />
            <Skeleton className="h-8 w-[100px] rounded-md" />
            <Skeleton className="h-8 w-[100px] rounded-md" />
        </div>
    )
}
