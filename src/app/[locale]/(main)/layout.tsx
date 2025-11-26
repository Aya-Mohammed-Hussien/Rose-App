import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
