'use client';

import { useState, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ProductsHeader } from './products-header';
import { ProductsTable } from './products-table';
import PaginationSection from '@/components/features/pagination/pagination';
import { Product, ProductsMetadata } from '@/lib/types/product';

// Props
type AllProductsProductProps = {
  products: Product[];
  metadata: ProductsMetadata;
};

export default function AllProductsProduct({ products, metadata }: AllProductsProductProps) {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const currentPage = metadata.currentPage ?? 1;
  const totalPages = metadata.totalPages ?? 1;

  // Filter products based on character on Search
  const filteredProducts = useMemo(
    () => products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  // Functions
  const handleRowClick = (id: string) => {
    setSelectedId(id);
  };

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', nextPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="bg-white w-full mx-auto my-5">
      <div className="border rounded-lg overflow-hidden">
        {/* Add Button */}
        <div className="w-full mx-auto px-3">
          <ProductsHeader search={search} onSearchChange={setSearch} />
        </div>

        {/* Search - already inside ProductsHeader */}

        {/* Table */}
        <ProductsTable
          products={filteredProducts}
          selectedId={selectedId}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && !search && (
        <div className="flex justify-center mt-5 pb-3">
          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
