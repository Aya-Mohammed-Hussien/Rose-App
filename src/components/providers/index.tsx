import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextIntlProvider from "./components/next-intl.provider";
import ReactQueryProvider from "./components/react-query.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Next-intl Provider
    <NextIntlProvider>
      {/*React query provider*/}
      <ReactQueryProvider>
        {/*React query devtools*/}
        <ReactQueryDevtools />

        {children}
      </ReactQueryProvider>
    </NextIntlProvider>
  );
}
