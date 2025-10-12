import Navbar from './_components/navbar/navbar';
import TopHeader from './_components/top-header';

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0">
      <TopHeader />
      <Navbar/>
    </header>
  );
}
