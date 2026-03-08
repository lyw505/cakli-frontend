import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonChart,
    SkeletonTable,
    SkeletonInfoCard,
} from "@/components/skeleton-dashboard"

export default function OperationAdminLoading() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <SkeletonHeader />

            {/* Quick Stats */}
            <SkeletonKPICards count={4} />

            {/* Chart + Sidebar */}
            <div className="grid gap-6 lg:grid-cols-7">
                <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
                    <SkeletonChart height={280} />
                    <SkeletonTable rows={5} cols={4} />
                </div>
                <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
                    <SkeletonInfoCard />
                    <SkeletonInfoCard />
                    <SkeletonInfoCard />
                </div>
            </div>
        </div>
    )
}
