import Image from 'next/image';
import ToggleLocale from './top-header/toggle-locale';
import LoginButton from './top-header/login-button';
import SearchBar from './top-header/search-bar';
import HeaderIcons from './top-header/header-icons';
import HeaderDropdownMenu from './top-header/header-dropdown-menu';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import AddressIcon from './top-header/address-icon';

export default async function TopHeader() {
  const session = await getServerSession(authOptions);

  return (
    <div
      className="px-9 bg-white dark:bg-zinc-800 flex justify-center items-center text-zinc-700
     dark:text-zinc-50"
    >
      {/* Logo image */}
      <Image
        src="/assets/images/RoseApp Logo.png"
        alt="RoseApp Logo"
        width={85}
        height={80}
        className="my-1 me-4"
      />

      {/* Address if user logged in  */}
      <AddressIcon addresses={session?.user.addresses || []}/> 
      
      {/* Search Bar */}
      <SearchBar />

      {/* Dropdown Menu for authenticated user & Login button for guests */}
      {!session ? <LoginButton /> : <HeaderDropdownMenu session ={session.user}/>}

      {/* Icons  */}
      <HeaderIcons />

      {/* Language Toggle  */}
      <ToggleLocale />
    </div>
  );
}
