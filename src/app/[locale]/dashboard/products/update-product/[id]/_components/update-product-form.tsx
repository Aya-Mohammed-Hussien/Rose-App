'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProductSchema } from '@/lib/schemes/product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SelectCategoryField from '../../../add-product/_components/select-category-field';
import SelectOccasionField from '../../../add-product/_components/select-occasion-field';
import { useUpdateProduct } from '@/hooks/product/use-update-products';
import { Product } from '@/lib/types/product';
import { UpdateProductValues } from '@/lib/actions/product/update-product.action';
import { Image, Images } from 'lucide-react';

// Props
type UpdateProductProps = {
  product: Product;
};

export default function UpdateProductForm({ product }: UpdateProductProps) {
  //Translations
  const t = useTranslations('dashboard.product_form');

  //Mutation
  const { isPending, updateProduct } = useUpdateProduct(product._id);

  const { updateProductSchema } = useProductSchema();

  //Form
  const form = useForm<UpdateProductValues>({
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      occasion: product.occasion,
      discount: product.discount,
      priceAfterDiscount: product.priceAfterDiscount,
    },
    resolver: zodResolver(updateProductSchema),
  });

  //Function
  const onSubmit: SubmitHandler<UpdateProductValues> = (data) => {
    console.log(data)
    const { ...payload } = data;
    updateProduct(payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white pt-6 ps-6 pe-[19.4375rem] pb-[11.6875rem] rounded-2xl"
      >
        {/* Product Title */}
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-[1.125rem] w-[46.625rem]">
              {/* Form Label */}
              <FormLabel>
                {t('title')} <span className="text-red-600 font-medium text-sm">*</span>
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input {...field} placeholder="Enter product title" type="text" />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Description */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-[1.125rem] w-[46.625rem]">
              {/* Form Label */}
              <FormLabel>
                {t('description')} <span className="text-red-600 font-medium text-sm">*</span>
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter product description"
                  className="h-[9.375rem]"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Fields  */}
        <div className="flex flex-row justify-between mb-[1.125rem] w-[46.625rem]">
          {/* Product Price */}
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-[15.125rem]">
                <FormLabel>
                  {t('price')} <span className="text-red-600 font-medium text-sm">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example: 5000"
                    type="number"
                    value={field.value === undefined ? '' : field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      const priceValue = val === '' ? 0 : Number(val);
                      field.onChange(priceValue);
                      const discountValue = form.watch('discount') || 0;
                      const newPrice =
                        priceValue > 0 ? priceValue - (priceValue * discountValue) / 100 : 0;
                      form.setValue('priceAfterDiscount', newPrice);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Discount */}
          <FormField
            name="discount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-[15.125rem]">
                <FormLabel>
                  {t('discount')} <span className="text-red-600 font-medium text-sm">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example: 5"
                    type="number"
                    max={99}
                    value={field.value === undefined ? '' : field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      const discountValue = val === '' ? 0 : Number(val);
                      field.onChange(discountValue);
                      const priceValue = form.watch('price') || 0;
                      const newPrice =
                        priceValue > 0 ? priceValue - (priceValue * discountValue) / 100 : 0;
                      form.setValue('priceAfterDiscount', newPrice);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price After Discount */}
          <FormField
            name="priceAfterDiscount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-[15.125rem]">
                <FormLabel>
                  {t('price_after_discount')}{' '}
                  <span className="text-red-600 font-medium text-sm">*</span>
                </FormLabel>
                <FormControl className="bg-zinc-100 border-none">
                  <Input
                    {...field}
                    readOnly
                    value={field.value ?? ''}
                    placeholder="Example: 4500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Quantity */}
        <FormField
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-[1.125rem] w-[46.625rem]">
              {/* Form Label */}
              <FormLabel>
                {t('quantity')} <span className="text-red-600 font-medium text-sm">*</span>
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type="number"
                  placeholder="Example: 200"
                  step={1}
                  min={0}
                  value={field.value === undefined ? ' ' : field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? 0 : Number(value));
                  }}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <SelectCategoryField form={form} />

        {/* Occasion */}
        <SelectOccasionField form={form} />

        {/* Image cover & gallery */}
        <div className="flex w-[46.625rem] items-center justify-end">
          {/* Image cover button */}
          <Button
            className="text-blue-600  hover:bg-transparent border-[rgba(0,0,0,0.08)]"
            variant="ghost"
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image size={18} aria-hidden="true" /> {t('View_product_cover')}
          </Button>

          {/* Gallery button */}
          <Button
            className="text-blue-600  hover:bg-transparent border-[rgba(0,0,0,0.08)]"
            variant="ghost"
          >
            <Images size={18} aria-hidden="true" /> {t('View_product_gallery')}
          </Button>
        </div>

        {/* Submission Button */}
        <Button
          variant="default"
          type="submit"
          loading={isPending}
          disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          className="w-[46.625rem] mt-[7.625rem]"
        >
          {t('update_product')}
        </Button>
      </form>
    </Form>
  );
}
