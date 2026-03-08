import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonChart,
    SkeletonInfoCard,
} from "@/components/skeleton-dashboard"

export default function ReportingAdminLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={4} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <SkeletonChart height={260} />
                <SkeletonChart height={260} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <SkeletonInfoCard />
                <SkeletonInfoCard />
                <SkeletonInfoCard />
            </div>
        </div>
    )
}
