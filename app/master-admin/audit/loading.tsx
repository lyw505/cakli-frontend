import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonAlerts,
    SkeletonFilterRow,
    SkeletonTable,
    SkeletonPagination,
} from "@/components/skeleton-dashboard"

export default function AuditLoading() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={5} />
            <SkeletonAlerts count={3} />
            <SkeletonFilterRow />
            <SkeletonTable rows={5} cols={8} />
            <SkeletonPagination />
        </div>
    )
}
