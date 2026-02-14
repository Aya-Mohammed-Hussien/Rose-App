'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import { ShoppingCart } from 'lucide-react';
import useAddToCart from '../../../app/[locale]/cart/_hooks/use-add-to-cart';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

// props
type AddToCartProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartProps) {
  // Translations
  const t = useTranslations('Cart');

  // Hooks
  const { toast } = useToast();

  // Mutation
  const { isPending, addToCart } = useAddToCart();

  // Functions
  const handleAddToCart = () => {
    addToCart(
      { product },
      {
        onSuccess: () => {
          setTimeout(() => {
            toast({
              description: t('addedSuccess', { product: product.title }),
            });
          }, 500);
        },
        onError: (error: unknown) => {
          console.error('Add to cart error in button:', error);
          const errorMessage = error instanceof Error ? error.message : String(error) || t('addFailed');
          setTimeout(() => {
            toast({
              description: errorMessage,
              variant: 'destructive',
            });
          }, 500);
        },
      }
    );
  };

  // variables
  const isOutOfStock = product.quantity <= 0;

  return (
    <Button
      loading={isPending}
      onClick={handleAddToCart}
      disabled={isOutOfStock || isPending}
      variant="default"
      className="h-[3.0625rem] flex-grow text-white dark:text-zinc-800 text-base font-medium"
    >
      <ShoppingCart size={25} />
      {isOutOfStock ? t('outOfStock') : t('addToCart')}
    </Button>
  );
}
