import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonChart,
    SkeletonFilterRow,
} from "@/components/skeleton-dashboard"

export default function ReportsLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={4} />
            <SkeletonFilterRow />
            <SkeletonChart height={320} />
        </div>
    )
}
