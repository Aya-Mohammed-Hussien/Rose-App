import Link from 'next/link';
import VerifyForm from './_components/verify-otp';
import { useTranslations } from 'next-intl';
import { cookies } from 'next/headers';

export default function VerifyOTPage() {
  // Translations
  const t = useTranslations();

  // Get Email From Cookies
  const cookieStore = cookies();
  const email = cookieStore.get('reset_email')?.value;
  return (
    <section>
      <div className="max-w-md mx-auto mt-10 border-b border-[#E4E4E7] pb-4 pe-5">
        {/*  Heading Of The Section */}
        <h2 className="text-lg font-semibold text-gray-900">{t('enter-the-otp-code')}</h2>

        {/* User email Info and Edit Link */}
        <p className="font-primary font-normal text-base leading-none align-middle text-[#27272A]">
          We have sent a 6-digit code to
          <span className="ms-2">{email}</span>
          <Link href="/login" className="text-blue-600 underline ml-1 font-medium">
            {t('edit')}
          </Link>
        </p>
      </div>
      {/* Verify Form */}
      <VerifyForm />
    </section>
  );
}
