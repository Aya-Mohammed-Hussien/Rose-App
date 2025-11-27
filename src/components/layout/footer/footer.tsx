import Image from 'next/image';
import FooterLinks from './_components/footer-links';
import SubscribeForm from './_components/subscribe-form';

export default function Footer() {
  return (
    <footer className="bg-zinc-800 w-full py-10 px-20 flex justify-between items-start dark:bg-gray-900">
      {/* Logo & links section */}
      <div className="flex justify-center gap-4">
        <div className="flex flex-col justify-center items-center">
          {/* Logo image */}
          <Image
            className="mx-1"
            src="/assets/images/RoseApp Logo.png"
            alt="RoseApp Logo"
            width={240}
            height={225}
          />
          <h6 className="text-softPink-300 font-semibold text-lg">Rose E-Commerce App</h6>
          <p className="text-zinc-100 text-sm font-normal">All rights reserved | 2025</p>
        </div>

        {/* Links  */}
        <FooterLinks />
      </div>

      {/* subscrib section */}
      <div className="felx flex-col justify-center w-[23.5rem]">
        <p className="text-softPink-300 font-semibold text-xl">
          Get<span className="text-maroon-50"> 20% </span>Off Discount Coupon
        </p>
        <p className="text-zinc-500 font-normal text-sm mb-5">By subscribing to our newsletter</p>
        <SubscribeForm />
      </div>
    </footer>
  );
}
