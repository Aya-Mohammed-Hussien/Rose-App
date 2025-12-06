import AuthHeadline from '@/components/shared/auth/auth-headline';
import LoginForm from './_components/login-form';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Page() {
  // Translations
  const t = useTranslations();

  return (
    <main className="bg-white dark:bg-zinc-800 flex justify-center items-center">
      <div className="max-w-[25.375rem] mt-10">
        {/* Headline */}
        <AuthHeadline headline={t('auth.login.headline')} />

        {/* Login Form */}
        <LoginForm />

        {/* Register Button */}
        <p className="text-sm font-sarabun font-medium text-zinc-700 dark:text-zinc-50 text-center mt-14">
          {t('auth.login.register-prompt')}{' '}
          <span className="text-maroon-700 dark:text-softPink-300 font-bold">
            <Link href="/register">{t('auth.login.register-link')}</Link>
          </span>
        </p>
      </div>
    </main>
  );
}
