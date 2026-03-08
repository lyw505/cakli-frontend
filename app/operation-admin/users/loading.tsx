import {
    SkeletonHeader,
    SkeletonFilterRow,
    SkeletonTable,
    SkeletonPagination,
} from "@/components/skeleton-dashboard"

export default function UsersLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonFilterRow />
            <SkeletonTable rows={8} cols={6} />
            <SkeletonPagination />
        </div>
    )
}
