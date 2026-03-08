import {
    SkeletonHeader,
    SkeletonFilterRow,
    SkeletonTable,
    SkeletonPagination,
} from "@/components/skeleton-dashboard"

export default function PartnersLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonFilterRow />
            <SkeletonTable rows={5} cols={5} />
            <SkeletonPagination />
        </div>
    )
}
