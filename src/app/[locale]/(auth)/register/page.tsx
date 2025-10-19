import Link from 'next/link';
import RegisterForm from './_components/register-form';
import AuthHeadline from '@/components/shared/auth/auth-title';
import { useTranslations } from 'next-intl';

export default function Page() {
  //Translations
  const t = useTranslations('register');
  return (
    <div>
      {/* tittle */}
      <AuthHeadline headline={t('titleAuth')} />

      {/* Form */}

      <div className="my-6">
        <RegisterForm />
        {/* Register*/}
        <p className="font-medium text-sm text-gray-500 text-center pb-4 pt-5 mt-9 border-t border-zinc-200 dark:border-zinc-600">
          <Link href="/login" className="text-sm hover:underline">
            {t('alreadyAccount')} <span className="text-maroon-700">{t('login')}</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
