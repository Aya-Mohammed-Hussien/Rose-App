import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AllOccasionsSkeleton() {
    return (
        <section className="w-full mx-auto my-5">
            <div className="border rounded-lg overflow-hidden">
                <div className="w-11/12 mx-auto">
                    <div className="flex justify-between items-center mb-0 mt-5">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-44 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>

                <div className="relative w-11/12 mx-auto mb-5 mt-3">
                    <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
                </div>

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
                                <TableCell className="py-4">
                                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                                </TableCell>
                                <TableCell>
                                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                                </TableCell>
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

            <div className="flex justify-center mt-5 gap-2">
                {[...Array(7)].map((_, index) => (
                    <div key={index} className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                ))}
            </div>
        </section>
    );
}
