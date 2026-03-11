'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/wishlist/use-get-wishlist';
import { useDeleteWishlist } from '@/hooks/wishlist/use-delete-wishlist';
import { GetWishlistResponse } from '@/lib/types/wishlist';
import WishlistButton from '@/components/features/wishlist/wishlist-button';
import { LoaderCircle, Trash2 } from 'lucide-react';

export default function WishlistList() {
  const t = useTranslations('WishlistList');
  const router = useRouter();
  const { wishlistProducts, isLoading, error } = useWishlist();
  const { mutate: deleteFromWishlist, isPending: isDeleting } = useDeleteWishlist();

  const products = wishlistProducts?.wishlist?.products ?? [];
  const totalProducts = products.length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <LoaderCircle className="w-10 h-10 animate-spin text-rose-600" />
        <p className="text-zinc-500">{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <p className="text-red-500 text-center">{t('loadError')}</p>
        <Button onClick={() => router.push('/')} variant="outline">
          <ArrowLeft size={18} className="mr-2" />
          {t('continueShopping')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 pt-8 sm:pt-12 lg:pt-16 max-w-5xl w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-end gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-zinc-800 dark:text-zinc-100">
            {t('title')}
          </h1>
          <span className="text-zinc-400 text-sm sm:text-base font-medium">
            {totalProducts} {totalProducts === 1 ? t('singleProduct') : t('multipleProducts')}
          </span>
        </div>
      </div>

      <div className="flex flex-col px-3 sm:px-5 rounded-md border border-zinc-200 dark:border-zinc-700 divide-y divide-zinc-200 dark:divide-zinc-700">
        {totalProducts > 0 ? (
          products.map((product) => (
            <WishlistItem
              key={product._id}
              product={product}
              onRemove={() => deleteFromWishlist(product._id)}
              isRemoving={isDeleting}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center py-16">
            <p className="text-zinc-500 dark:text-zinc-400 text-center py-6 text-sm sm:text-base">
              {t('empty')}
            </p>
            <Button
              onClick={() => router.push('/products')}
              className="bg-rose-700 hover:bg-rose-800 text-white"
            >
              <ArrowLeft size={18} className="mr-2" />
              {t('continueShopping')}
            </Button>
          </div>
        )}
      </div>

      {totalProducts > 0 && (
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="w-full sm:w-[213px] h-11 flex items-center justify-center gap-2 rounded-[10px] border-rose-700 text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
        >
          <ArrowLeft size={18} strokeWidth={2} />
          {t('continueShopping')}
        </Button>
      )}
    </div>
  );
}

type WishlistProductItem = GetWishlistResponse['wishlist']['products'][number];

function WishlistItem({
  product,
  onRemove,
  isRemoving,
}: {
  product: WishlistProductItem;
  onRemove: () => void;
  isRemoving: boolean;
}) {
  const t = useTranslations('CartItem');
  const price = product.priceAfterDiscount ?? product.price;
  const hasDiscount = product.priceAfterDiscount != null;

  return (
    <div className="flex flex-row gap-4 sm:gap-6 py-4 sm:py-6 items-start">
      <a href={`/products/${product.id}`} className="flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={product.imgCover || '/placeholder-product.png'}
          alt={product.title}
          width={120}
          height={120}
          className="object-cover w-24 h-24 sm:w-28 sm:h-28"
        />
      </a>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <a
          href={`/products/${product.id}`}
          className="font-medium text-zinc-800 dark:text-zinc-100 hover:text-rose-600 line-clamp-2"
        >
          {product.title}
        </a>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-rose-600 font-semibold">{price} {t('currency')}</span>
          {hasDiscount && (
            <span className="text-zinc-400 line-through">{product.price} {t('currency')}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <WishlistButton productId={product._id} />
        <button
          type="button"
          onClick={onRemove}
          disabled={isRemoving}
          aria-label={t('removeButton')}
          className="p-2 text-zinc-500 hover:text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-50"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
