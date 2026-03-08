import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonChart,
    SkeletonInfoCard,
} from "@/components/skeleton-dashboard"

export default function MasterAdminLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            {/* Header */}
            <SkeletonHeader />

            {/* KPI Cards */}
            <SkeletonKPICards count={4} />

            {/* Chart + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                <div className="lg:col-span-8">
                    <SkeletonChart height={280} />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-3">
                    <SkeletonInfoCard />
                    <SkeletonInfoCard />
                </div>
            </div>

            {/* Bottom row of 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <SkeletonInfoCard />
                <SkeletonInfoCard />
                <SkeletonInfoCard />
            </div>
        </div>
    )
}
