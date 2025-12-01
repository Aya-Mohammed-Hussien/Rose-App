'use client';

import { useState, useMemo } from 'react';
import { ProductsHeader } from './products-header';
import { ProductsTable } from './products-table';
import PaginationSection from '@/components/features/pagination/pagination';
import { Product } from '@/lib/types/product';

type AllProductsPageProps = {
  products: Product[];
};

const PAGE_SIZE = 12;

export function AllProductsPage({ products }: AllProductsPageProps) {
  // State
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Variables
  const filteredProducts = useMemo(
    () => products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  // Functions
  const handleRowClick = (id: string) => {
    setSelectedId(id);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white p-6">
      {/* Header */}
      <ProductsHeader search={search} onSearchChange={setSearch} />

      {/* Table */}
      <ProductsTable products={pageItems} selectedId={selectedId} onRowClick={handleRowClick} />

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <PaginationSection
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
