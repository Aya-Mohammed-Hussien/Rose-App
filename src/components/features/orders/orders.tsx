'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Banknote, CheckCheck, ChevronDown, Star, TriangleAlert, Truck } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import type { Order } from '@/lib/types/orders';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useFormattedDate } from '@/hooks/format-date/formatted-date';

export default function OrderCard({ order }: { order: Order }) {
  // Translations
  const t = useTranslations();

  //  State For Button Show All
  const [showAll, setShowAll] = useState(false);

  // Show First Two Element Only
  const initialVisibleElement = 2;

  // Fun To Handle Blur and Hidden Cards
  const getVisibilityState = (idx: number) => {
    const isBlurred = !showAll && idx >= initialVisibleElement && idx < initialVisibleElement + 2;

    const isHidden = !showAll && idx >= initialVisibleElement + 2;

    return { isBlurred, isHidden };
  };
  const formatDate = useFormattedDate();
  return (
    <Card>
      <CardHeader className="bg-[#A6252A] text-white px-4 py-3 rounded-t-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">Order {order.orderNumber}</div>
          </div>
          <div className="text-sm">
            Created in: <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 bg-zinc-50">
        <div className="border-b-2 border-gray-300 pb-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center text-primary">
              <div className="text-xl font-normal">{t('total-price')}:</div>
              <div className="text-2xl font-semibold">
                {order.totalPrice.toLocaleString()} {t('egp')}
              </div>
              {order.isPaid && (
                <Badge variant="outline" className="bg-[#00BC7D] text-white border-[#00BC7D]">
                  {t('paid')}
                </Badge>
              )}
            </div>
            <div className="text-sm text-black font-semibold ">
              {t('status')}:{' '}
              <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-[#2B7FFF] text-white">
                {order.state === 'pending' ? 'In Progress' : order.state}
              </span>
              {/* Only For  Review */}
              {/* <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-[#DC2626] text-white">
                {order.state === 'pending' ? 'In Progress' : order.state}
              </span>
              <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-[#00BC7D] text-white">
                {order.state === 'pending' ? 'In Progress' : order.state}
              </span> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-zinc-50 mt-2">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[#27272A] ">{t('payment-method')}</p> :{' '}
            <Banknote width={20} height={20} strokeWidth={1.5} />
            <span className="capitalize text-[#71717A]">{order.paymentType}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[#27272A]">{t('delivery-status')} :</p>

            {order.isDelivered ? (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCheck width={20} height={20} strokeWidth={1.5} />
                {t('delivered')}
              </span>
            ) : order.state === 'pending' ? (
              <span className="text-yellow-600 flex items-center gap-1">
                <Truck width={20} height={20} strokeWidth={1.5} />
                {t('pending')}
              </span>
            ) : (
              <span className="text-red-600 flex items-center gap-1">
                <TriangleAlert width={20} height={20} strokeWidth={1.5} />
                {t('canceled')}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 relative">
          <h3 className="text-base font-semibold mb-3">{t('order-items')}</h3>

          {order.orderItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t('no-items-in-this-order')}
            </div>
          ) : (
            <>
              <div className="bg-white p-3 rounded-xl relative">
                <div
                  className={cn(
                    'transition-all duration-300 overflow-hidden',
                    showAll ? 'max-h-[2000px]' : 'max-h-[16rem]'
                  )}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.orderItems.map((item, idx) => {
                      return (
                        <div
                          key={item._id}
                          className={cn(
                            'relative rounded-xl flex gap-4 p-3 bg-zinc-50 overflow-hidden transition-all duration-200',
                            getVisibilityState(idx).isHidden && 'hidden',
                            getVisibilityState(idx).isBlurred
                              ? 'filter blur-sm opacity-60 pointer-events-none select-none'
                              : 'opacity-100'
                          )}
                        >
                          {getVisibilityState(idx).isBlurred && (
                            <div className="absolute inset-0 bg-white/30 rounded-xl pointer-events-none" />
                          )}

                          {/* Product Image */}
                          <div className="relative w-28 h-36 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.imgCover}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex flex-col flex-1 justify-start mt-2">
                            <h3 className="text-lg mb-2 font-semibold text-[#741C21]">
                              {item.product.title}
                            </h3>

                            <div className="flex items-center text-sm text-gray-700 mb-4">
                              <Star className="text-[#FFA508] fill-[#FFA508] w-5 h-5 mr-1" />
                              <span className="font-semibold text-xs">
                                Rating: {item.product.rateAvg.toFixed(1)}/5
                              </span>
                              <span className="text-blue-600 ml-1">
                                ({item.product.rateCount} ratings)
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-auto">
                              <span className="text-[#A6252A] font-medium text-sm">
                                (x{item.quantity})
                              </span>
                              <span className="font-extrabold text-2xl">
                                {item.price.toLocaleString()} EGP
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {order.orderItems.length > initialVisibleElement && !showAll && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6">
                    <Button
                      onClick={() => setShowAll(true)}
                      className="relative z-10 text-[#A6252A] font-semibold  flex items-center gap-1 bg-transparent hover:bg-transparent"
                    >
                      {t('show-all')}
                      <ChevronDown className="transition-transform" size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
