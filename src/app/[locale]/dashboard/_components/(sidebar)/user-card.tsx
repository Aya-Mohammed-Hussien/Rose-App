import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserMenuItems } from './user-dropdown';

export function UserCard({ user }: { user?: User }) {
  // Variables
  // - Extract initials for fallback avatar
  // - Build full name from user data
  const first = user?.firstName?.[0] || '';
  const last = user?.lastName?.[0] || '';
  const initials = (first + last || 'JA').toUpperCase();

  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Jonathan Adrian';

  return (
    <Card className="flex w-full items-center justify-between gap-3 rounded-2xl border-t border-gray-200 px-2 py-3 shadow-none">
      {/* User Info Section */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.photo || undefined} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        {/* User name + email */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#111111]">{fullName}</span>
          <span className="text-xs text-[#666666]">{user?.email || 'user-email@example.com'}</span>
        </div>
      </div>

      {/* Dropdown Menu for profile actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" aria-label="Open user menu" className="text-xl text-[#444444]">
            ⋮
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44 p-0">
          {/* User identity label */}
          <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-[#8B1E1E]">
            {fullName}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuSeparator />

          {/* Pre-built menu component */}
          <UserMenuItems />
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
