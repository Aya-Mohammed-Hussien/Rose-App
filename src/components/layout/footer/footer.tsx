import Image from 'next/image';
import FooterLinks from './_components/footer-links';
import SubscribeForm from './_components/subscribe-form';

export default function Footer() {
  return (
    <footer className="bg-zinc-800 w-full py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-4 dark:bg-gray-900">
      {/* Logo & links section */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-6 sm:gap-4 w-full lg:w-auto">
        <div className="flex flex-col justify-center items-center">
          {/* Logo image */}
          <Image
            src="/assets/images/RoseApp Logo.png"
            alt="RoseApp Logo"
            width={240}
            height={225}
            className="mx-1 w-32 h-30 sm:w-40 sm:h-36 lg:w-60 lg:h-56 xl:w-[240px] xl:h-[225px]"
          />
          <h6 className="text-softPink-300 font-semibold text-base sm:text-lg mt-2">Rose E-Commerce App</h6>
          <p className="text-zinc-100 text-xs sm:text-sm font-normal">All rights reserved | 2025</p>
        </div>

        {/* Links  */}
        <FooterLinks />
      </div>

      {/* subscrib section */}
      <div className="flex flex-col justify-center w-full lg:w-[23.5rem]">
        <p className="text-softPink-300 font-semibold text-lg sm:text-xl mb-2">
          Get<span className="text-maroon-50"> 20% </span>Off Discount Coupon
        </p>
        <p className="text-zinc-500 font-normal text-xs sm:text-sm mb-4 sm:mb-5">By subscribing to our newsletter</p>
        <SubscribeForm />
      </div>
    </footer>
  );
}
