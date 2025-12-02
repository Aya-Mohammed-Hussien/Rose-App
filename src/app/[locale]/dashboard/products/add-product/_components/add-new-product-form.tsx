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
import { useAddProduct } from '@/hooks/product/use-add-product';
import { ProductValues, useProductSchema } from '@/lib/schemes/product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import SelectCategoryField from './select-category-field';
import SelectOccasionField from './select-occasion-field';
import { Button } from '@/components/ui/button';

export default function AddNewProductForm() {
  //Translations
  const t = useTranslations('dashboard.product_form');

  //Mutation
  const { isPending, addNewProduct } = useAddProduct();

  const { productSchema } = useProductSchema();
  //Form
  const form = useForm<ProductValues>({
    defaultValues: {
      title: '',
      description: '',
      price: undefined,
      quantity: undefined,
      category: '',
      occasion: '',
      imgCover: undefined,
      images: [],
      discount: undefined,
      priceAfterDiscount: undefined,
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductValues> = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price.toString());
    formData.append('quantity', values.quantity.toString());
    formData.append('category', values.category);
    formData.append('occasion', values.occasion);
    if (values.discount !== undefined) {
      formData.append('discount', values.discount.toString());
    }
    if (values.priceAfterDiscount !== undefined) {
      formData.append('priceAfterDiscount', values.priceAfterDiscount.toString());
    }
    if (values.imgCover) {
      formData.append('imgCover', values.imgCover);
    }
    if (values.images?.length) {
      values.images.forEach((file) => formData.append('images', file));
    }
    addNewProduct(formData);
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

        {/* Product cover & gallery */}
        <div className="flex gap-[1.125rem] w-[46.625rem]">
          {/* Product Cover Image */}
          <FormField
            name="imgCover"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-[1.125rem] w-[22.75rem]">
                <FormLabel>
                  {t('cover_image')} <span className="text-red-600 font-medium text-sm">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Gallery Images */}
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-[1.125rem] w-[22.75rem]">
                <FormLabel>
                  {t('gallery')} <span className="text-red-600 font-medium text-sm">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      field.onChange(e.target.files ? Array.from(e.target.files) : [])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Category */}
        <SelectCategoryField form={form} />

        {/* Occasion */}
        <SelectOccasionField form={form} />

        {/* Submission Button */}
        <Button
          variant="default"
          type="submit"
          loading={isPending}
          disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          className="w-[46.625rem] mt-[7.625rem]"
        >
          {t('add_product_button')}
        </Button>
      </form>
    </Form>
  );
}
