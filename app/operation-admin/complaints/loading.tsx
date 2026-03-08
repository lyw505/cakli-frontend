import {
    SkeletonHeader,
    SkeletonFilterRow,
    SkeletonTable,
    SkeletonPagination,
} from "@/components/skeleton-dashboard"

export default function ComplaintsLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonFilterRow />
            <SkeletonTable rows={6} cols={6} />
            <SkeletonPagination />
        </div>
    )
}
