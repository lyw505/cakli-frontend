import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonFilterRow,
    SkeletonTable,
    SkeletonPagination,
} from "@/components/skeleton-dashboard"

export default function ReportingDriversLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={4} />
            <SkeletonFilterRow />
            <SkeletonTable rows={6} cols={6} />
            <SkeletonPagination />
        </div>
    )
}
