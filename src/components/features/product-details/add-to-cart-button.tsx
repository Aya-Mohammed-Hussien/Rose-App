'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import { ShoppingCart } from 'lucide-react';
import useAddToCart from '../adding-to-cart/_hooks/use-add-to-cart';
import { useToast } from '@/hooks/use-toast';

// props
type AddToCartProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartProps) {
  // Hooks
  const { toast } = useToast();

  // Mutation
  const { isPending, addToCart } = useAddToCart();

  // Functions
  const handleAddToCart = () => {
    addToCart(
      { product },
      {
        onSuccess: (result) => {
          console.log('Add to cart success:', result);
          setTimeout(() => {
            toast({
              description: `${product.title} was added to your cart successfully! `,
            });
          }, 500);
        },
        onError: (error) => {
          console.error('Add to cart failed:', error);
          setTimeout(() => {
            toast({
              description: 'Something went wrong. Please try again.',
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
      {isOutOfStock ? 'Out Of Stock' : 'Add to cart'}
    </Button>
  );
}
