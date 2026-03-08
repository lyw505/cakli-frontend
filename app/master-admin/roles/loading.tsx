import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonTabs,
    SkeletonTable,
    SkeletonPagination,
    SkeletonFilterRow,
} from "@/components/skeleton-dashboard"

export default function RolesLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={5} />
            <SkeletonFilterRow />
            <SkeletonTabs />
            <SkeletonTable rows={6} cols={7} />
            <SkeletonPagination />
        </div>
    )
}
