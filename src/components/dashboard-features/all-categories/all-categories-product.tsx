'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import AddCategory from "./add-category/add-category";
import { Category } from "@/lib/types/category";
import PaginationSection from "@/components/features/pagination/pagination";
import DeleteCategoryButton from "./delete-category/delete-category";
import EditCategory from "./edit-category/edit-category";
import { useTranslations } from "next-intl";

// Props
type AllCategoriesProductProps = {
    products: Category[];
    metadata: {
        currentPage: number;
        limit: number;
        totalPages: number;
        totalItems: number;
    };
};

export default function AllCategoriesProduct({ products, metadata }: AllCategoriesProductProps) {

    // Translation
    const t = useTranslations()

    // Hooks
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    // Function
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    // Filter products based on Charachter on Search
    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return products;

        return products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    // If Not Found Product Categories
    if (!products || products.length == 0) {
        return <div className="text-center text-red-600 p-10">{t('no-product-categories-found')}</div>;
    }

    return (
        <section className="bg-white w-full mx-auto  my-5">
            <div className="border rounded-lg overflow-hidden " >
                {/* Add Button */}
                <div className="w-full mx-auto px-3">
                    <div className="flex justify-between items-center mb-0 mt-5">
                        <h1 className="text-2xl font-semibold text-zinc-800">{t('all-categories')}</h1>
                        <AddCategory />
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
                        className="pl-10 w-full border border-gray-200 bg-white rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                    />
                </div>

                <Table className="w-full">
                    <TableHeader className="w-11/12 mx-auto bg-zinc-50 px-5">
                        <TableRow>
                            <TableHead className="w-[200px] text-gray-900 font-semibold">{t('name-1')}</TableHead>
                            <TableHead className="text-gray-900 font-semibold">{t('products')}</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <TableRow key={product._id} className="hover:bg-[#FBEAEA] hover:cursor-pointer border-b last:border-0 ">

                                    {/* Category Name */}
                                    <TableCell className="font-semibold text-gray-800 py-4 capitalize">
                                        {product.name}
                                    </TableCell>

                                    {/* Products Count */}
                                    <TableCell className="text-gray-600">
                                        {product.productsCount || 12} {t('products-1')}


                                    </TableCell>

                                    {/* Action Buttons  */}
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* Edit Button */}
                                            <EditCategory categoryId={product._id} />

                                            {/* Delete Button */}
                                            <DeleteCategoryButton categoryId={product._id} />
                                        </div>
                                    </TableCell>

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-gray-500 py-8">
                                    {t('no-categories-found-matching-0')} {searchQuery}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {metadata.totalPages > 1 && !searchQuery && (
                <div className="flex justify-center mt-5 pb-3">
                    <PaginationSection
                        currentPage={metadata.currentPage}
                        totalPages={metadata.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </section>
    )
}