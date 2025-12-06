'use client';

import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Props
interface ImageDialogProps {
  images?: string[]; // Array of image URLs
  image?: string; // Cover image
  trigger: React.ReactNode; // Trigger button
}

export default function ImageDialog({ images, image, trigger }: ImageDialogProps) {
  // State
  const [api, setApi] = React.useState<CarouselApi | undefined>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Variable
  const imageArray = images || (image ? [image] : []);

  // Effects
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // Handle case where no images are passed
  if (!imageArray || imageArray.length === 0) {
    return null;
  }

  return (
    // Dialog
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Dialog Content */}
      <DialogContent
        showCloseIcon={true}
        className="max-w-3xl bg-white p-6 rounded-xl flex flex-col items-center"
      >
        {/* Carousel */}
        <Carousel setApi={setApi} className="mt-6 w-full max-w-2xl h-full">
          {/* Carousel Content */}
          <CarouselContent>
            {/* Array Of Images */}
            {imageArray.map((imgSrc, index) => (
              // Carousel Item
              <CarouselItem key={index}>
                {/* Card Image */}
                <div className="p-1">
                  <Card className="border-0 shadow-none">
                    <CardContent className="flex items-center justify-center p-0">
                      <div className="relative h-[400px] w-full bg-slate-100 rounded-md overflow-hidden flex items-center justify-center">
                        {/* Image */}
                        <img
                          src={imgSrc}
                          alt={`Slide ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        {/* I will use Image component in future */}
                        {/* <Image
                          src={imgSrc}
                          alt={`Slide ${index + 1}`}
                          fill
                          className="object-cover"
                        /> */}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Footer: Dots on the left, Navigation on the right */}
          {imageArray.length === 1 ? null : (
            <div className="mt-6 flex w-full items-center justify-between">
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {/* Array Of Buttons */}
                {Array.from({ length: count }).map((_, index) => (
                  // Dot Button
                  <button
                    key={index}
                    className={cn(
                      'h-3 w-3 rounded-full transition-all duration-300',
                      index + 1 === current ? 'bg-red-700' : 'bg-gray-200 hover:bg-gray-300'
                    )}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3">
                {/* Left Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-red-200 text-red-700 hover:bg-red-50 hover:text-red-900"
                  onClick={() => api?.scrollPrev()}
                  disabled={!api?.canScrollPrev()}
                >
                  {/* Left Icon */}
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous slide</span>
                </Button>

                {/* Right Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-red-200 text-red-700 hover:bg-red-50 hover:text-red-900"
                  onClick={() => api?.scrollNext()}
                  disabled={!api?.canScrollNext()}
                >
                  {/* Right Icon */}
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next slide</span>
                </Button>
              </div>
            </div>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
