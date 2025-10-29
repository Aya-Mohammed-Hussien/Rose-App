import Image from 'next/image';
import ToggleLocale from './top-header/toggle-locale';
import LoginButton from './top-header/login-button';
import SearchBar from './top-header/search-bar';
import HeaderIcons from './top-header/header-icons';
import AddressIcon from './top-header/address-icon';
export default function TopHeader() {
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
      <AddressIcon/> 
      
      {/* Search Bar */}
      <SearchBar />

      {/* Login */}
      <LoginButton />

      {/* Icons  */}
      <HeaderIcons />

      {/* Language Toggle  */}
      <ToggleLocale />
    </div>
  );
}
