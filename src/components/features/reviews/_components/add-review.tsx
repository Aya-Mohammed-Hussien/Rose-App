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
type AddReviewProps = {
  product: string;
};
export default function ReviewForm({ product }: AddReviewProps) {
  // Translations
  const t = useTranslations();

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 min-h-[22rem]"
      >
        {/* Rating */}
        <FormField
          name="rating"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <div className="flex items-center gap-2">
                <FormLabel className="whitespace-nowrap">Your rating:</FormLabel>
                <div className="flex items-center ">
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
            <FormItem className="mb-4">
              {/* Form Label */}
              <FormLabel>Tittle</FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  {...field}
                  placeholder="Title"
                  type="text"
                  className="border rounded-lg px-3 py-2
             border-[#D4D4D8] hover:border-[#D4D4D8]"
                />
              </FormControl>
              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comment */}
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Review</FormLabel>
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
          disabled={!isValid}
          className="w-full font-primary font-normal text-base leading-none tracking-normal  text-white bg-[#A6252A] hover:bg-[#A6252A] rounded-xl px-4 py-3 mt-4focus:outline-none active:outline-none transition-none shadow-none"
        >
          Add Review
        </Button>
      </form>
    </Form>
  );
}
