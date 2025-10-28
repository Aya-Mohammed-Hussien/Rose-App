'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeSchema, SubscribeValue } from '@/lib/schemes/subscribe.schema';
import { ArrowRight } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubscriptionResponse } from '@/lib/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import useSubscribe from '../_hooks/use-subscribe';

export default function SubscribeForm() {
  const { toast } = useToast();

  // Form
  const form = useForm<SubscribeValue>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(subscribeSchema),
  });
  const { isValid, isSubmitted } = form.formState;

  // Mutation
  const { isPending, subscribe } = useSubscribe();

  // Function
  const onSubmit: SubmitHandler<SubscribeValue> = (values) => {
    subscribe(values, {
      onSuccess: (data: ApiResponse<SubscriptionResponse>) => {
        if ('message' in data) {
          // Success case
          toast({ description: data.message, duration: 1500 });
          form.reset();
        } else {
          toast({
            description: 'Something went wrong, please try again',
            duration: 1500,
            variant: 'destructive',
          });
        }
      },
    });
  };

  return (
    <Form {...form}>
      <div className="relative">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Input field */}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Field */}
                  <Input
                    className="bg-zinc-600 dark:bg-zinc-800 text-zinc-400 font-medium text-sm border-0 rounded-full ps-4 focus-visible:ring-0 
                              focus-visible:ring-offset-0 focus:outline-none"
                    type="email"
                    {...field}
                    placeholder="Enter Your Email"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Subscribe Button */}
          <Button
            loading={isPending}
            disabled={isPending || (!isValid && isSubmitted)}
            type="submit"
            variant="subscribe"
            className="absolute top-0 right-0 h-full"
          >
            Subscribe
            <ArrowRight size={16} />
          </Button>
        </form>
      </div>
    </Form>
  );
}
