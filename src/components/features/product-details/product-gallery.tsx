'use client';

import * as React from 'react';
import { CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from '@/components/ui/carousel';
import Image from 'next/image';

// Props
type ProductGalleryProps = {
  coverImage: string;
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title, coverImage }: ProductGalleryProps) {
  // States
  const [selectedImage, setSelectedImage] = React.useState(coverImage);

  // Variables
  const allImages = [coverImage, ...images];

  return (
    <section className="w-full lg:w-1/2">
      {/* Cover Image */}
      <div className="w-full max-w-[605px] h-[250px] sm:h-[350px] lg:h-[402px] relative mb-2.5 rounded-xl overflow-hidden">
        <Image
          src={selectedImage}
          alt={`${title}- cover image`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 605px"
        />
      </div>

      {/* Gallery */}
      <Carousel opts={{ align: 'start' }} className="w-full select-none relative">
        <CarouselContent className="flex justify-start ms-0 gap-2 sm:gap-2.5">
          {allImages.map((src, index) => {
            const isSelected = selectedImage === src;
            return (
              <CarouselItem
                key={index}
                className="basis-[70px] sm:basis-[80px] lg:basis-[91px] cursor-pointer flex-shrink-0 px-0"
                onClick={() => {
                  setSelectedImage(src);
                }}
              >
                <CardContent
                  className={`p-0 m-0 relative cursor-pointer ${isSelected ? 'border-2 border-maroon-600 rounded-md' : ''
                    }`}
                >
                  <Image
                    src={src}
                    alt={`${title} - image ${index + 1}`}
                    width={91}
                    height={111}
                    className="rounded-md object-cover w-full h-[85px] sm:h-[95px] lg:h-[111px]"
                  />

                  {/* Overlay only for non-active image */}
                  {selectedImage !== src && (
                    <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] rounded-md transition-opacity duration-200 hover:opacity-0" />
                  )}
                </CardContent>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Show arrow only if there are more than 6 images */}
        {allImages.length > 6 && (
          <CarouselNext className="!right-0 !translate-x-0 top-1/2 -translate-y-1/2" />
        )}
      </Carousel>
    </section>
  );
}
