import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AllCategoriesSkeleton() {
    return (
        <section className="w-3/4 mx-auto my-5">
            <div className="border rounded-lg overflow-hidden">
                {/* Header Skeleton */}
                <div className="w-11/12 mx-auto">
                    <div className="flex justify-between items-center mb-0 mt-5">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-44 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>

                {/* Search Skeleton */}
                <div className="relative w-11/12 mx-auto mb-5 mt-3">
                    <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
                </div>

                {/* Table */}
                <Table className="w-full">
                    <TableHeader className="bg-zinc-50">
                        <TableRow>
                            <TableHead className="w-[200px] text-gray-900 font-semibold">Name</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Products</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {[...Array(5)].map((_, index) => (
                            <TableRow key={index} className="border-b last:border-0">
                                {/* Category Name Skeleton */}
                                <TableCell className="py-4">
                                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                                </TableCell>

                                {/* Products Count Skeleton */}
                                <TableCell>
                                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                                </TableCell>

                                {/* Action Buttons Skeleton */}
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <div className="h-9 w-9 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-9 w-9 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-5 gap-2">
                {[...Array(7)].map((_, index) => (
                    <div key={index} className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                ))}
            </div>
        </section>
    );
}