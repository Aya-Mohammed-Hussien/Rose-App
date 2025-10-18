import Image from "next/image";


export function GiftCategories() {


  //variables  
  const giftCategories = [
  {  id : 1,
    img: "/assets/images/650ebce97e11985e0c78fa1a2c8b1633ad6865ae.png",
    tag: "Wedding",
    title: "Celebrate Her Forever with a Gift\nShe’ll Always Remember",
  },
  { 
    id : 2,
    img: "/assets/images/9c80f839880ae4729e2ed36e6a6e2ce4c8acf962.png",
    tag: "Engagement",
    title: "Honor the Beginning of a\nBeautiful Journey Together",
  },
  {
    id : 3,
    img: "/assets/images/f1ae11b6a3272e3325efa8c7c66af85509d2b54c.png",
    tag: "Anniversary",
    title: "Mark Every Year of Love with\na Meaningful Surprise",
  },
];

  return (

    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
      {giftCategories.map((card) => (
  
        <div
          key={card.id}
          className="relative w-full max-w-md h-72 rounded-2xl overflow-hidden p-6 gap-2 
          before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/70 before:to-transparent before:z-[1]"
          aria-label={`Gift category: ${card.title}`}
        >
          {/*  Image and overlay handled with pseudo-element instead of extra DOM layers */}
          <Image src={card.img} alt={card.title} fill className="object-cover" />

          {/*  Text casing controlled by Tailwind (capitalize) */}
          <div className="absolute inset-0 p-5 text-white flex flex-col justify-end z-[2]">
            <span className="text-sm bg-[#FBEAEA] text-[#A6252A] px-3 py-1 rounded-full inline-block w-fit mb-2 capitalize">
              {card.tag}
            </span>

            <h3 className="font-medium text-lg leading-snug whitespace-pre-line capitalize">
              {card.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
