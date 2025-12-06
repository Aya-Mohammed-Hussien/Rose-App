'use client';

import { useState, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ProductsHeader } from './products-header';
import { ProductsTable } from './products-table';
import PaginationSection from '@/components/features/pagination/pagination';
import { Product, ProductsMetadata } from '@/lib/types/product';

type AllProductsPageProps = {
  products: Product[];
  metadata: ProductsMetadata;
};

export function AllProductsPage({ products, metadata }: AllProductsPageProps) {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const currentPage = metadata.currentPage ?? 1;
  const totalPages = metadata.totalPages ?? 1;

  // Variables
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
    <div className="flex flex-col rounded-2xl bg-white p-6">
      {/* Header */}
      <ProductsHeader search={search} onSearchChange={setSearch} />

      {/* Table */}
      <ProductsTable
        products={filteredProducts}
        selectedId={selectedId}
        onRowClick={handleRowClick}
      />

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <PaginationSection
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
