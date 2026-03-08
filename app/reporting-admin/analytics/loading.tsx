import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonChart,
    SkeletonFilterRow,
} from "@/components/skeleton-dashboard"

export default function AnalyticsLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={4} />
            <SkeletonFilterRow />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <SkeletonChart height={300} />
                <SkeletonChart height={300} />
            </div>
        </div>
    )
}
