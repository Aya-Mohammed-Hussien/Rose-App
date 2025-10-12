import { CarouselSection, GiftCategories, InfoBar } from ".";

export default function Page() {
  return (
     <div className="max-w-7xl mx-auto flex flex-col gap-10 my-3">
      <CarouselSection />
      <GiftCategories />
      <InfoBar />
    </div>
  );
}
