import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonChart,
    SkeletonTable,
    SkeletonPagination,
} from "@/components/skeleton-dashboard"

export default function DriverPerformanceLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={4} />
            <SkeletonChart height={300} />
            <SkeletonTable rows={6} cols={6} />
            <SkeletonPagination />
        </div>
    )
}
