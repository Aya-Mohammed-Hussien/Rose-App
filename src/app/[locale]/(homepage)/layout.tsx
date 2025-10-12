import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';

export default function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='mt-36'>{children}</main>
      <Footer />
    </>
  );
}
