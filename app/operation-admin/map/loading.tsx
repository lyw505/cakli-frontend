import {
    SkeletonHeader,
    SkeletonChart,
} from "@/components/skeleton-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function MapLoading() {
    return (
        <div className="flex flex-col gap-4 p-6">
            <SkeletonHeader />
            <Skeleton className="w-full h-[500px] rounded-xl" />
        </div>
    )
}
