import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextIntlProvider from './_components/next-intl.provider';
import ReactQueryProvider from './_components/react-query.provider';
import NextAuthProvider from './_components/next-auth.provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Next-intl Provider
    <NextIntlProvider>
      {/*React query provider*/}
      <ReactQueryProvider>
        {/*React query devtools*/}
        <ReactQueryDevtools />

        {/* NextAuth Provider  */}
        <NextAuthProvider>{children}</NextAuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  );
}
