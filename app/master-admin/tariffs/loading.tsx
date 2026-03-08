import {
    SkeletonHeader,
    SkeletonKPICards,
    SkeletonTable,
    SkeletonFilterRow,
    SkeletonPagination,
} from "@/components/skeleton-dashboard"

export default function TariffsLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <SkeletonKPICards count={4} />
            <SkeletonFilterRow />
            <SkeletonTable rows={5} cols={6} />
            <SkeletonPagination />
        </div>
    )
}
