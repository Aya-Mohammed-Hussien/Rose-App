import Navbar from './_components/navbar/navbar';
import TopHeader from './_components/top-header';

export default async function Header() {
  return (
    <header>
      <TopHeader />
      <Navbar />
    </header>
  );
}
