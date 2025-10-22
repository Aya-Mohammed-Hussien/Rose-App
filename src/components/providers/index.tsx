import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NextIntlProvider from './_components/next-intl.provider';
import ReactQueryProvider from './_components/react-query.provider';
import NextAuthProvider from './_components/next-auth.provider';
import GuestCartMerger from '../features/adding-to-cart/guest-cart-merger';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Next-intl Provider
    <NextIntlProvider>
      {/*React query provider*/}
      <ReactQueryProvider>
        {/*React query devtools*/}
        <ReactQueryDevtools />

        {/* NextAuth Provider  */}
        <NextAuthProvider>
          <GuestCartMerger />
          {children}
        </NextAuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  );
}
