import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function GiftCategories() {
  // Translations
  const t = useTranslations();

  // Variables
  const giftCategories = [
    {
      id: 1,
      img: '/assets/images/650ebce97e11985e0c78fa1a2c8b1633ad6865ae.png',
      tag: t('wedding'),
      title: t('celebrate-her-forever-with-a-gift-she-ll-always-remember'),
    },
    {
      id: 2,
      img: '/assets/images/9c80f839880ae4729e2ed36e6a6e2ce4c8acf962.png',
      tag: t('engagement'),
      title: t('honor-the-beginning-of-a-beautiful-journey-together'),
    },
    {
      id: 3,
      img: '/assets/images/f1ae11b6a3272e3325efa8c7c66af85509d2b54c.png',
      tag: t('anniversary'),
      title: t('mark-every-year-of-love-with-a-meaningful-surprise'),
    },
  ];

  return (
    <div className="mx-auto mb-10">
      {/* 1 col on xs, 2 cols on sm, 3 cols on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {giftCategories.map((card) => (
          <div
            key={card.id}
            className="relative w-full h-56 sm:h-64 md:h-72 rounded-2xl overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-t
                       before:from-black/70 before:to-transparent before:z-[1]"
            aria-label={`Gift category: ${card.title}`}
          >
            {/* Background image */}
            <Image src={card.img} alt={card.title} fill className="object-cover" />

            {/* Text overlay */}
            <div className="absolute inset-0 p-4 sm:p-5 text-white flex flex-col justify-end z-[2]">
              <span className="text-xs sm:text-sm bg-[#FBEAEA] text-[#A6252A] px-3 py-1 rounded-full inline-block w-fit mb-1.5 sm:mb-2 capitalize">
                {card.tag}
              </span>
              <h3 className="font-medium text-base sm:text-lg leading-snug capitalize">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
