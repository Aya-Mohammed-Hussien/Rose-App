'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { addressSchema, AddressValue } from '@/lib/schemes/address.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {  useForm } from 'react-hook-form';

// props
interface AddressFormProps {
  onNext: (data: AddressValue) => void;
  intialValues :AddressValue | null ;
}

export default function AddressForm({ onNext , intialValues }: AddressFormProps) {
  // Translation
  const t = useTranslations('Addresses');

  // Hooks
  const form = useForm<AddressValue>({
    defaultValues: intialValues || {
      street: '',
      phone: '',
      city: '',
      username: 'username',
    },
    resolver: zodResolver(addressSchema),
  });


  return (
    <Form {...form}>
      <form>
        {/* City */}
        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-4">
              {/* Form Label */}
              <FormLabel>{t('city')}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input {...field} placeholder="Enter city name" type="text" />
              </FormControl>
              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          name="street"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-4">
              {/* Form Label */}
              <FormLabel>{t('address')}</FormLabel>

              {/* Field */}
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter your full address"
                  className="h-[9.375rem]"
                />
              </FormControl>
              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* phone */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>{t('phone')}</FormLabel>
              <FormControl>
                <PhoneInput {...field} defaultCountry="EG" international />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Next Button => will hold the data from step 1 to step 2  */}
        <Button
          variant="default"
          className="w-full"
          onClick={() => {
            const values = form.getValues(); 
            onNext(values);
          }}
        >
          {t('next-button')}
        </Button>
      </form>
    </Form>
  );
}
