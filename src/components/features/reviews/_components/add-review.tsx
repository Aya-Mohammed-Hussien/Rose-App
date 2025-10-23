'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Star } from 'lucide-react';
import { reviewSchema, ReviewValues } from '@/lib/schemes/add-review.schema';
import { useTranslations } from 'next-intl';
import { useAddReview } from '../_hooks/use-review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

type AddReviewProps = {
  product: string;
};

export default function ReviewForm({ product }: AddReviewProps) {
  // Translations
  const t = useTranslations();

  // next-auth session
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  //  ==== FORM INITIALIZATION ====
  const form = useForm<ReviewValues>({
    defaultValues: {
      rating: 0,
      title: '',
      comment: '',
    },
    resolver: zodResolver(reviewSchema),
  });
  const { toast } = useToast();

  //Form state
  const { isSubmitted, isValid } = form.formState;

  // ==== MUTATION ====
  const { mutate, isError, error, isSuccess } = useAddReview();

  const onSubmit: SubmitHandler<ReviewValues> = async (values) => {
    const payload = {
      ...values,
      product: Array.isArray(product) ? product[0] : product,
    };
    mutate(payload, {
      onSuccess: () =>
        toast({
          title: 'Review submitted successfully!',
          description: 'Review submitted successfully!',
        }),
    });
  };

  return (
    <Form {...form}>
      <div className="relative w-full max-w-md mx-auto">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full bg-white border-l-2 border-[#E4E4E7] px-4 py-2 flex flex-col gap-4 min-h-[22rem]"
        >
          {/* Rating */}
          <FormField
            name="rating"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-0">
                <div className="flex items-center gap-2">
                  <FormLabel className="whitespace-nowrap">{t('your-rating')}</FormLabel>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      const isSelected = ratingValue <= field.value;
                      return (
                        <div
                          key={i}
                          className="w-8 h-8 p-1 rounded bg-white cursor-pointer flex items-center justify-center"
                          onClick={() => field.onChange(ratingValue)}
                        >
                          <Star
                            size={28}
                            strokeWidth={2}
                            color="#FFA500"
                            fill={isSelected ? '#FFA500' : 'none'}
                            className="transition-all duration-200"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-0">
                <FormLabel>{t('title-0')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title"
                    type="text"
                    className="border rounded-lg px-3 py-2 border-[#D4D4D8] hover:border-[#D4D4D8]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comment */}
          <FormField
            name="comment"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-0">
                <FormLabel>{t('review')}</FormLabel>
                <FormControl>
                  <Textarea className="h-36" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={!isValid || !isAuthenticated}
            className="w-full font-primary font-normal text-base leading-none tracking-normal text-white bg-[#A6252A] hover:bg-[#A6252A] rounded-xl px-4 py-3 mt-4 focus:outline-none active:outline-none transition-none shadow-none"
          >
            {isAuthenticated ? 'Add Review' : 'Sign in to add review'}
          </Button>
        </form>

        {!isAuthenticated && (
          <div
            aria-hidden={!isAuthenticated}
            className="absolute inset-0 z-50 flex items-center justify-center #FFFFFF backdrop-blur-sm"
          >
            <div className="text-center px-6">
              <p className="mb-3 text-sm font-medium text-gray-700">
                Please{' '}
                <Link
                  href="/login"
                  className="text-[#A6252A] font-semibold underline hover:no-underline"
                >
                  {t('sign-in')}
                </Link>{' '}
                {t('to-add-a-review')}
              </p>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
}
