'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { ProductsTableProps } from '@/lib/types/product';
import { useDeleteProduct } from '../_hooks/use-delete-product';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function ProductsTable({ products, selectedId, onRowClick }: ProductsTableProps) {
  // Translation
  const t = useTranslations('dashboard.productsTable');

  // Navigation
  const router = useRouter();

  // Mutation
  const { deleteProduct, isPending } = useDeleteProduct();

  // Functions
  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div className="flex-1 rounded-2xl">
      <Table>
        <TableHeader className="bg-zinc-50 border-b border-black text-zinc-900">
          <TableRow>
            <TableHead className="w-[30%] font-medium text-zinc-900 rtl:text-right ltr:text-left">
              {t('name')}
            </TableHead>
            <TableHead className="text-zinc-900 font-medium rtl:text-right ltr:text-left">
              {t('price')}
            </TableHead>

            <TableHead className="text-zinc-900 font-medium rtl:text-right ltr:text-left">
              {t('quantity')}
            </TableHead>

            <TableHead className="text-zinc-900 font-medium rtl:text-right ltr:text-left">
              {t('sales')}
            </TableHead>

            <TableHead className="text-zinc-900 font-medium rtl:text-right ltr:text-left">
              {t('ratings')}
            </TableHead>
            <TableHead className="text-zinc-900 font-medium"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => {
            const isSelected = product._id === selectedId;
            const isOutOfStock = product.quantity === 0;
            const priceToShow = product.priceAfterDiscount ?? product.price;

            const rowClass = `cursor-pointer text-sm transition-colors ${
              isSelected ? 'bg-maroon-50' : 'hover:bg-gray-50'
            }`;

            const quantityClass = `font-medium ${isOutOfStock ? 'text-red-600' : 'text-gray-700'}`;

            const handleRowClick = () => onRowClick(product._id);

            return (
              <TableRow key={product._id} onClick={handleRowClick} className={rowClass}>
                <TableCell className="font-semibold text-zinc-800">{product.title}</TableCell>

                <TableCell className="text-zinc-700">{priceToShow.toLocaleString()} EGP</TableCell>

                <TableCell className={quantityClass}>{product.quantity.toLocaleString()}</TableCell>

                <TableCell className="text-zinc-700">
                  {product.sold?.toLocaleString() ?? '0'}
                </TableCell>

                <TableCell className="text-zinc-700">
                  <span className="font-semibold">{(product.rateAvg ?? 0).toFixed(1)}/5</span>
                  <span className="text-xs text-zinc-500">({product.rateCount ?? 0})</span>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <div className="inline-flex items-center gap-2.5">
                    {/* Edit Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex h-7 w-14 items-center justify-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/products/update-product/${product._id}`)
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      {t('edit')}
                    </Button>

                    {/* Delete Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex h-7 w-18 items-center justify-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                      disabled={isPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product._id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t('delete')}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
