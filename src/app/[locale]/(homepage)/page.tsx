import { CarouselSection, GiftCategories, InfoBar } from '.';
import ForgotPasswordPage from '../(auth)/forgot-password/_components/forgotpass-form';

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 mt-10 mb-3">
      <CarouselSection />
      <GiftCategories />
      <InfoBar />
    </div>
  );
}
