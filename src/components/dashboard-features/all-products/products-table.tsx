'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductsTableProps } from '@/lib/types/product';
import { useTranslations } from 'next-intl';
import EditProduct from './edit-product/edit-product';
import DeleteProductButton from './delete-product/delete-product';

export function ProductsTable({ products, selectedId, onRowClick }: ProductsTableProps) {
  // Translation
  const t = useTranslations('dashboard.productsTable');

  // Logic
  const processedProducts = products.map((product) => {
    const isSelected = product._id === selectedId;
    const isOutOfStock = product.quantity === 0;
    const priceToShow = product.priceAfterDiscount ?? product.price;

    return {
      ...product,
      isSelected,
      isOutOfStock,
      priceToShow,
      rowClass: `hover:bg-[#FBEAEA] hover:cursor-pointer border-b last:border-0 ${isSelected ? 'bg-[#FBEAEA]' : ''}`,
      quantityClass: `font-medium ${isOutOfStock ? 'text-red-600' : 'text-gray-700'}`,
    };
  });

  return (
    <div className="flex-1">
      <Table className="w-full">
        {/* Table Header */}
        <TableHeader className="w-11/12 mx-auto bg-zinc-50 px-5">
          <TableRow>
            <TableHead className="w-[200px] text-gray-900 font-semibold">{t('name')}</TableHead>
            <TableHead className="text-gray-900 font-semibold">{t('price')}</TableHead>
            <TableHead className="text-gray-900 font-semibold">{t('quantity')}</TableHead>
            <TableHead className="text-gray-900 font-semibold">{t('sales')}</TableHead>
            <TableHead className="text-gray-900 font-semibold">{t('ratings')}</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {processedProducts.map((product) => (
            <TableRow
              key={product._id}
              onClick={() => onRowClick(product._id)}
              className={product.rowClass}
            >
              <TableCell className="font-semibold text-gray-800 py-4">
                {product.title}
              </TableCell>

              <TableCell className="text-gray-600">
                {product.priceToShow.toLocaleString()} EGP
              </TableCell>

              <TableCell className={product.quantityClass}>
                {product.quantity.toLocaleString()}
              </TableCell>

              <TableCell className="text-gray-600">
                {product.sold?.toLocaleString() ?? '0'}
              </TableCell>

              <TableCell className="text-gray-600">
                <span className="font-semibold">{(product.rateAvg ?? 0).toFixed(1)}/5</span>
                <span className="text-xs text-zinc-500"> ({product.rateCount ?? 0})</span>
              </TableCell>

              {/* Action Buttons */}
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end gap-2">
                  {/* Edit Button */}
                  <EditProduct productId={product._id} />
                  {/* Delete Button */}
                  <DeleteProductButton productId={product._id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
