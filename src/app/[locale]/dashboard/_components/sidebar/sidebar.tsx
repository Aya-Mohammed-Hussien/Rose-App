import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardNav } from './dashboard-nav';
import { UserCard } from './user-card';
import { getProfileData } from '@/lib/apis/dashboard/user.api';
import PreviewWebsiteButton from './preview-website-button';

export async function Sidebar() {
  // Fetch logged user data
  const user = await getProfileData();

  return (
    <aside className="flex h-screen w-76 flex-col border-r bg-white">
      <ScrollArea className="flex-1 px-4 py-6">
        {/* Logo */}
        <div className="mx-auto mb-6 h-28 w-30">
          <Image
            src="/assets/images/RoseApp Logo.png"
            alt="Rose"
            width={120}
            height={112}
            className="h-full w-full object-contain"
            priority
          />
        </div>

        {/* Preview website button */}
        <PreviewWebsiteButton />

        {/* Navigation */}
        <DashboardNav />
      </ScrollArea>

      {/* User section */}
      <div className="px-4 pb-4">
        <UserCard user={user.user} />
      </div>
    </aside>
  );
}
