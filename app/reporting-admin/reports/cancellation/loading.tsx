import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonChart,
    SkeletonTable,
    SkeletonPagination,
} from "@/components/skeleton-dashboard"

export default function CancellationLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={4} />
            <SkeletonChart height={300} />
            <SkeletonTable rows={5} cols={5} />
            <SkeletonPagination />
        </div>
    )
}
