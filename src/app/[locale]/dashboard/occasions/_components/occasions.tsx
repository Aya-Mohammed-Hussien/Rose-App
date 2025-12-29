'use client';

import { AllOccasionsProps } from '@/lib/types/occasion';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import PaginationSection from '@/components/features/pagination/pagination';
import Link from 'next/link';
import { useDeleteOccasion } from '@/hooks/useDeleteOccasion';



//  Debounce Hook 
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

export default function AllOccasions({ occasions, metadata, initialSearch = '' }: AllOccasionsProps) {
    // Navigation
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const debouncedSearch = useDebounce(searchQuery, 500);

    // Mutation 
    const { mutate: deleteOccasion, isPending } = useDeleteOccasion();

    // Effects
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch.trim()) {
            params.set('search', debouncedSearch.trim());
            params.set('page', '1');
            router.push(`?${params.toString()}`);
            return;
        }

        params.delete('search');
        params.set('page', '1');
        router.push(`?${params.toString()}`);
        router.refresh();
    }, [debouncedSearch, router, searchParams]);

    // Functions
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());

        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim());
        } else {
            params.delete('search');
        }

        router.push(`?${params.toString()}`);
    };

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this occasion?")) return;

        deleteOccasion(id, {
            onSuccess: () => router.refresh(),
        });
    };

    const filteredOccasions = occasions;

    return (
        <section className="w-3/4 mx-auto my-5">
            <div className="border rounded-lg overflow-hidden">

                {/* Header */}
                <div className="w-full mx-auto px-3">
                    <div className="flex justify-between items-center mb-0 mt-5">
                        <h1 className="text-2xl font-semibold text-zinc-800">All Occasions</h1>

                        <Button
                            size="sm"
                            className="bg-maroon-600 hover:bg-maroon-700 text-white gap-2"
                        >
                            <Link href="/dashboard/occasions/add">
                                Add a new occasion
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-full px-3 mb-5 mt-3">
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full border border-gray-200 bg-white rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-800"
                    />
                </div>

                {/* Table */}
                <Table className="w-full">
                    <TableHeader className="bg-zinc-50 px-5">
                        <TableRow>
                            <TableHead className="w-[200px] text-gray-900 font-semibold">Name</TableHead>
                            <TableHead className="text-gray-900 font-semibold">Products</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredOccasions.length > 0 ? (
                            filteredOccasions.map((occasion) => (
                                <TableRow
                                    key={occasion._id}
                                    className="hover:bg-[#FBEAEA] hover:cursor-pointer border-b last:border-0"
                                >
                                    <TableCell className="font-semibold text-gray-800 py-4 capitalize">
                                        {occasion.name}
                                    </TableCell>

                                    <TableCell className="text-gray-600">
                                        {occasion.productsCount} products
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/dashboard/occasions/${occasion._id}`}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-blue-100 border-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-700 gap-1"
                                                >
                                                    Edit
                                                </Button>
                                            </Link>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-red-100 border-red-100 text-red-600 hover:bg-red-100 hover:text-red-700 gap-1"
                                                onClick={() => handleDelete(occasion._id)}
                                                disabled={isPending}
                                            >
                                                {isPending ? "Deleting..." : "Delete"}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                                    {`No Occasions found matching "${searchQuery}"`}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {metadata.totalPages > 1 && !searchQuery && (
                <div className="flex justify-center mt-5">
                    <PaginationSection
                        currentPage={metadata.currentPage}
                        totalPages={metadata.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </section>
    );
}
