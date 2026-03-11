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
    <div className="bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-50">
      {/* Main row */}
      <div className="flex items-center justify-between gap-2 px-4 md:px-9 py-2">
        {/* Logo */}
        <Image
          src="/assets/images/RoseApp Logo.png"
          alt="RoseApp Logo"
          width={85}
          height={80}
          className="shrink-0"
          priority
        />

        {/* Address */}
        <div className="shrink-0">
          <AddressIcon addresses={session?.user.addresses || []} />
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 min-w-0">
          <SearchBar />
        </div>

        {/* Right-side controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Auth */}
          {!session ? <LoginButton /> : <HeaderDropdownMenu session={session.user} />}

          {/* Cart / Wishlist icons */}
          <HeaderIcons />

          {/* Locale toggle */}
          <ToggleLocale />
        </div>
      </div>

      {/* Search row (mobile / tablet only) */}
      <div className="lg:hidden px-4 md:px-9 pb-3">
        <SearchBar />
      </div>
    </div>
  );
}
