'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
export function CarouselSection() {

  // Translations
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  //  State
  const [emblaApi, setEmblaApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // variables
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

      img: '/assets/images/01467f720fe7a76f6c05ac3be7d4de290cc20957.png',
      title: t('sweet-surprises-for-loved-ones'),
      subtitle: t('delicious-chocolates-for-any-occasion'),
      btnText: t('shop-now'),
    },
    {
      id: 3,

      img: '/assets/images/01467f720fe7a76f6c05ac3be7d4de290cc20957.png',
      title: t('roses-romance'),
      subtitle: t('show-your-love-in-a-classic-way'),
      btnText: t('discover-more'),
    },
    {
      id: 4,

      img: '/assets/images/01467f720fe7a76f6c05ac3be7d4de290cc20957.png',
      title: t('roses-romance'),
      subtitle: t('show-your-love-in-a-classic-way'),
      btnText: t('discover-more'),
    },
  ];

  //  Effects
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="container  mb-6 ">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-4 gap-2 items-center ">
        {/*  Left Card */}
        <div className="relative w-full max-w-sm h-[440px] rounded-2xl overflow-hidden p-6 flex flex-col gap-3 lg:col-span-1 before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/70 before:to-transparent before:z-[1]">
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

            <h2 className="font-primary font-semibold text-2xl leading-tight capitalize">
              {t('special-gifts-for-the-people-you-love')}
              <br /> {t('people-you-love')}
            </h2>

            <button className="flex items-center justify-center gap-2 w-32 h-9 bg-[#FBEAEA] text-[#A6252A] font-medium text-sm px-4 rounded-lg hover:bg-[#FBEAEA] transition capitalize">
              {t('shop-now')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/*  Carousel Section */}
        <div className="lg:col-span-3 w-full h-[440px] rounded-xl overflow-hidden relative">
          <Carousel
            className="w-full h-full"
            setApi={setEmblaApi}
            opts={{
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          >
            <CarouselContent className="-ml-0">
              {slides.map((slide) => (
                <CarouselItem
                  key={slide.id}
                  className="relative w-full h-[440px] pl-0 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/70 before:to-transparent before:z-[1]"
                >
                  <Image src={slide.img} alt={slide.title} fill className="object-cover" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-[2]">
                    <h2 className="text-3xl font-semibold mb-2 capitalize">{slide.title}</h2>
                    <p className="text-base opacity-90 mb-4 capitalize">{slide.subtitle}</p>
                    <button className="flex items-center text-center gap-2 w-32 h-9 bg-[#FBEAEA] text-[#A6252A] whitespace-nowrap rounded-lg px-4 capitalize">
                      {slide.btnText}
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/*  Navigation Buttons */}
            <div className={cn(
              "absolute bottom-5 flex items-center gap-4 bg-[#FFF1F1] rounded-full py-2 px-3",
              isRTL ? "left-6" : "right-6"
            )}>
              {isRTL ? (
                <>
                  <button onClick={() => emblaApi?.scrollPrev()}>
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                  <button onClick={() => emblaApi?.scrollNext()}>
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => emblaApi?.scrollPrev()}>
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button onClick={() => emblaApi?.scrollNext()}>
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                </>
              )}
            </div>

            {/*  Dots Indicator */}
            <div className={cn(
              "absolute top-4 flex gap-2",
              isRTL ? "left-6" : "right-6"
            )}>
              {slides.map((slide, index) => (
                <button
                  key={`dot-${slide.id}`}
                  className={cn(
                    'w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-300',
                    index === selectedIndex && 'bg-rose-700 w-6'
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
