'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export function CarouselSection() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // State
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Variables
  const slides = [
    {
      id: 1,
      img: '/assets/images/01467f720fe7a76f6c05ac3be7d4de290cc20957.png',
      title: t('say-it-with-flowers'),
      subtitle: t('elegant-gifts-for-every-special-moment'),
      btnText: t('im-buying'),
    },
    {
      id: 2,

      img: '/assets/images/slide2.png',
      title: t('sweet-surprises-for-loved-ones'),
      subtitle: t('delicious-chocolates-for-any-occasion'),
      btnText: t('shop-now'),
    },
  ];

  // Effects
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="container mb-6">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 gap-2 items-stretch">
        {/* Left promo card – hidden on mobile, shown on lg+ */}
        <div
          className="hidden lg:block relative w-full h-[440px] rounded-2xl overflow-hidden
                     lg:col-span-1
                     before:absolute before:inset-0 before:bg-gradient-to-t
                     before:from-black/70 before:to-transparent before:z-[1]"
        >
          <Image
            src="/assets/images/132a2f7f5902767a6f99bcab7221e6bf3f2703e8.png"
            alt="Special Gifts For The People You Love"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white gap-2 z-[2]">
            <span className="bg-[#FBEAEA] text-[#A6252A] text-xs px-3 py-1 rounded-full w-fit font-medium capitalize">
              {t('starting-from')} 10.99 {t('egp')}
            </span>
            <h2 className="font-primary font-semibold text-xl xl:text-2xl leading-tight capitalize">
              {t('special-gifts-for-the-people-you-love')}
              <br /> {t('people-you-love')}
            </h2>
            <button className="flex items-center justify-center gap-2 w-32 h-9 bg-[#FBEAEA] text-[#A6252A] font-medium text-sm px-4 rounded-lg hover:bg-[#FBEAEA] transition capitalize">
              {t('shop-now')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="lg:col-span-3 w-full h-[280px] sm:h-[360px] lg:h-[440px] rounded-xl overflow-hidden relative">
          <Carousel
            className="w-full h-full"
            setApi={setEmblaApi}
            opts={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <CarouselContent className="-ml-0">
              {slides.map((slide) => (
                <CarouselItem
                  key={slide.id}
                  className="relative w-full h-[440px] pl-0 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover "
                  />

                  {/* Overlay*/}
                  <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 ms-5 text-white z-[2]">
                    <h2 className="text-3xl font-semibold mb-2 capitalize">{slide.title}</h2>
                    <p className="text-base opacity-90 mb-4 capitalize">{slide.subtitle}</p>
                    <button className="flex items-center justify-center gap-2 w-32 h-9 bg-[#FBEAEA] text-[#A6252A] whitespace-nowrap rounded-lg px-4 capitalize">
                      {slide.btnText}
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div
              className={cn(
                'absolute bottom-4 sm:bottom-5 flex items-center gap-3 sm:gap-4 bg-[#FFF1F1] rounded-full py-1.5 sm:py-2 px-2.5 sm:px-3',
                isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
              )}
            >
              {isRTL ? (
                <>
                  <button onClick={() => emblaApi?.scrollPrev()} aria-label="Previous slide">
                    <ChevronRight size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </button>
                  <button onClick={() => emblaApi?.scrollNext()} aria-label="Next slide">
                    <ChevronLeft size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => emblaApi?.scrollPrev()} aria-label="Previous slide">
                    <ChevronLeft size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </button>
                  <button onClick={() => emblaApi?.scrollNext()} aria-label="Next slide">
                    <ChevronRight size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            <div
              className={cn(
                'absolute top-3 sm:top-4 flex gap-1.5 sm:gap-2',
                isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
              )}
            >
              {slides.map((slide, index) => (
                <button
                  key={`dot-${slide.id}`}
                  className={cn(
                    'w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-300',
                    index === selectedIndex && 'bg-rose-700 w-5 sm:w-6'
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
